import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, message, Spin, Tag } from 'antd';
import { SendOutlined, ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import '@/Css/Scroll.css';
import '@/Css/Chat.css';
import '@/Css/Spin.css';
import echo from '@/utils/echo';
import moment from 'moment';
import {
  getAllChatswithPusher,
  getChatByNumber,
  handleReplyButton,
  sendMessagewithPusher,
} from '@/services/ChatServices/ChatsService';
import ChatButton from './ChatButton';
import { ChatItem } from '@/lib/types/ChatItem';


const ReplyChat: React.FC = () => {
  const [agentLastSeen, setAgentLastSeen] = useState<Date | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();
  const waNumber = useParams();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  let lastDate = '';

  const { data, isFetching } = useQuery({
    queryKey: ['chats', waNumber.waNumber],
    queryFn: () => getChatByNumber(waNumber.waNumber),
  });

  const getData: ChatItem[] = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    setAgentLastSeen(new Date(Date.now() - 5 * 60 * 1000));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [getData]);

  const firstUnreadIndex = getData.findIndex(
    (msg) =>
      msg.sender !== 'agent' &&
      agentLastSeen !== null &&
      new Date(msg.created_at) > agentLastSeen
  );

  const unreadCount = firstUnreadIndex !== -1 ? getData.slice(firstUnreadIndex).filter(msg => msg.sender !== 'agent').length : 0;

  const renderStatusIcon = (status?: string | null) => {
    if (!status) return null;

    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      case 'sent':
        return <CheckOutlined style={{ color: '#999' }} />;
      case 'delivered':
        return (
          <>
            <CheckOutlined style={{ color: '#999', marginRight: -6 }} />
            <CheckOutlined style={{ color: '#999' }} />
          </>
        );
      case 'read':
        return (
          <>
            <CheckOutlined style={{ color: '#1890ff', marginRight: -6 }} />
            <CheckOutlined style={{ color: '#1890ff' }} />
          </>
        );
      case 'status not yet':
        return <ClockCircleOutlined style={{ color: '#999' }} />;
      default:
        return null;
    }
  };

  const mutation = useMutation({
    mutationFn: (msg: any) => sendMessagewithPusher(msg),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      handleMutationReply.mutate(waNumber.waNumber);
      // Update temporary message with server data
      queryClient.setQueryData(['chats', waNumber.waNumber], (oldData: any) => {
        const updatedData = oldData?.data?.map((msg: ChatItem) =>
          msg.wa_id.startsWith('temp_') && msg.message === newMessage
            ? { ...msg, wa_id: response?.data?.wa_id || msg.wa_id, status: response?.data?.status || 'sent' }
            : msg
        );
        return { ...oldData, data: updatedData };
      });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Failed to Send Message');
      console.error('Failed to send message:', error);
      // Revert optimistic update on error
      queryClient.setQueryData(['chats', waNumber.waNumber], (oldData: any) => ({
        ...oldData,
        data: oldData?.data?.filter((msg: ChatItem) => !msg.wa_id.startsWith('temp_')),
      }));
    },
  });

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const wa_id = waNumber.waNumber;

    // Optimistic update: Create a temporary message object
    const tempMessage: ChatItem = {
      wa_id: `temp_${Date.now()}`, // Temporary unique ID
      message: newMessage,
      sender: 'agent',
      created_at: new Date().toISOString(),
      status: 'status not yet',
    };

    // Update the local data immediately
    queryClient.setQueryData(['chats', waNumber.waNumber], (oldData: any) => ({
      ...oldData,
      data: Array.isArray(oldData?.data) ? [...oldData.data, tempMessage] : [tempMessage],
    }));

    // Send the message via Pusher
    mutation.mutate({ message: newMessage, wa_id });
    setNewMessage('');
  };

  const handleMutationReply = useMutation({
    mutationFn: handleReplyButton,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.message || 'Chat Not Closed Something Wrong');
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!echo) {
        console.error("Echo is not initialized");
        return;
      }

      console.log('Pusher instance:', echo);
      const channel = echo.channel('new-message');

      // Listen for new incoming chat messages
      channel.listen('.chat-new', (e: ChatItem) => {
        console.log('New message received:', e);
        console.log('User message:', e.message);

        if (e.wa_id === waNumber.waNumber) {
          queryClient.setQueryData(['chats', waNumber.waNumber], (oldData: any) => ({
            ...oldData,
            data: Array.isArray(oldData?.data) ? [...oldData.data, e] : [e],
          }));
        }
      });

      // Listen for message status updates (sent, delivered, read)
      channel.listen('.chat-status-update', (e: any) => {
        console.log('Status update received:', e);

        if (e.wa_id === waNumber.waNumber && e.status && e.message_id) {
          queryClient.setQueryData(['chats', waNumber.waNumber], (oldData: any) => {
            const updatedData = oldData?.data?.map((msg: ChatItem) =>
              msg.wa_id === e.message_id || (msg.wa_id.startsWith('temp_') && msg.message === e.message)
                ? { ...msg, status: e.status, wa_id: e.message_id || msg.wa_id }
                : msg
            );
            return { ...oldData, data: updatedData };
          });
        }
      });

      // Clean up on unmount
      return () => {
        echo.leave('new-message');
      };
    }, 1500); // Optional delay for initialization safety

    return () => {
      clearTimeout(timeout);
      if (echo) echo.leave('new-message');
    };
  }, [waNumber.waNumber, queryClient]);

  const getDayLabel = (dateString: string) => {
    const date = moment(dateString);
    const now = moment();
    const diffInDays = now.startOf('day').diff(date.startOf('day'), 'days');

    if (diffInDays > 5) return date.format('DD MMM YYYY');
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';

    return date.format('dddd');
  };

  return (
    <div className="flex flex-col p-4 h-[510px]">
      <ChatButton />

      <div className="flex-1 flex flex-col border p-7 rounded-lg overflow-auto scrollbar-hide bg-white shadow-md">
        <div className="flex-1 p-4 overflow-y-auto">
          <Spin spinning={isFetching} style={{ color: '#15803D' }} className="custom-green-spin">
            <div className="chat-container">
              {getData.map((msg, index) => {
                if (!msg.message || msg.message.trim() === 'A') return null;
                if (msg.message.startsWith('Status update')) return null;

                const formattedTime = moment(msg.created_at).format('hh:mm A');
                const dayLabel = getDayLabel(msg.created_at);
                const isAgent = msg.sender === 'agent';

                const showDayLabel = (() => {
                  if (lastDate !== dayLabel) {
                    lastDate = dayLabel;
                    return true;
                  }
                  return false;
                })();

                const isUnreadTagHere = index === firstUnreadIndex;

                return (
                  <React.Fragment key={`${msg.wa_id}-${index}`}>
                    {showDayLabel && (
                      <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <Tag
                          color="#d9d9d9"
                          style={{
                            margin: '0 16px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#555',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            display: 'inline-block',
                          }}
                        >
                          {dayLabel}
                        </Tag>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                    )}

                    {isUnreadTagHere && (
                      <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <Tag
                          style={{
                            margin: '0 16px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#1890ff',
                            padding: '6px 16px',
                            borderRadius: '6px',
                            display: 'inline-block',
                          }}
                        >
                          Unread Messages ({unreadCount})
                        </Tag>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                    )}

                    <div className={`message-wrapper ${isAgent ? 'agent' : 'user'}`}>
                      <div className={`message ${isAgent ? 'agent-message' : 'user-message'}`}>
                        <div>{msg.message}</div>
                        <div className="message-time flex justify-end gap-4">
                          <p>{formattedTime}</p>
                          <p>{renderStatusIcon(msg.status)}</p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </Spin>

          <div ref={messagesEndRef} />
        </div>

        <div className="flex p-3 border-t bg-white">
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSend}
            className="mr-2 mt-3 hover: border-green-600 focus:border-green-600"
          />
          <Button
            className="!bg-green-600 !text-white mt-3 p-4 rounded"
            icon={<SendOutlined />}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;