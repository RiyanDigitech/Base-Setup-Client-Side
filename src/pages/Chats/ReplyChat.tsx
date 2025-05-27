import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '@/Css/Scroll.css'

const ReplyChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'opponent', text: 'Hello! How are you?' },
    { id: 2, sender: 'me', text: 'I am good, thanks! What about you?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: newMessage }]);
    setNewMessage('');
  };

   // Auto scroll to bottom
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  

  return (
    <div className="flex flex-col p-4 h-screen">
      {/* Top Bar */}
      <div className="flex justify-end mb-4">
        <Button className="!bg-green-600 !text-white" icon={<ArrowLeftOutlined />} onClick={() => navigate('/chats')}>
          Back
        </Button>
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col border rounded-lg overflow-auto scrollbar-hide bg-white shadow-md">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[70%] shadow ${msg.sender === 'me' ? 'bg-green-200' : 'bg-gray-200'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex p-3 border-t bg-white">
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSend}
            className="mr-2"
          />
          <Button className="!bg-green-600 !text-white" icon={<SendOutlined />} onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;
