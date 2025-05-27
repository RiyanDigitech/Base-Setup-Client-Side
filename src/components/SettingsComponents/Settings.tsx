import React, { useEffect, useState } from "react";
import { Input, Card, Typography, Spin, Button, Alert } from "antd";
import { useSettings, useUpdateSetting } from "@/services/settingService/SettingService";

const { TextArea } = Input;
const { Title, Text } = Typography;

const SettingsEditor: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [footerMessage, setFooterMessage] = useState("");
  const [originalWelcome, setOriginalWelcome] = useState("");
const [originalFooter, setOriginalFooter] = useState("");


  const { data, isFetching, isError, error } = useSettings();
  console.log("setting",data)
  const { mutate: updateSettings, isPending } = useUpdateSetting();

  // Extract values from query result
  const welcomeSetting = data?.find((d:any) => d.key === "welcome_message");
  const footerSetting = data?.find((d:any) => d.key === "footer");

  // Initialize form fields when data is loaded
 useEffect(() => {
  if (welcomeSetting) {
    setWelcomeMessage(welcomeSetting.value);
    setOriginalWelcome(welcomeSetting.value); // store original
  }
  if (footerSetting) {
    setFooterMessage(footerSetting.value);
    setOriginalFooter(footerSetting.value); // store original
  }
}, [welcomeSetting, footerSetting]);

  const isChanged = welcomeMessage !== originalWelcome || footerMessage !== originalFooter;


const handleSave = () => {
  updateSettings({
    welcome: welcomeMessage,
    footer: footerMessage,
  });
};


  return (
    <div >
        <Spin
            style={{ color: '#15803D' }}
            className="custom-green-spin"
            spinning={isFetching}
          >
            {isError ? (
              <Alert
                type="error"
                message="Failed to load Settings"
                description={String(error)}
                showIcon
                className="mb-4"
              />
            ) : (
      <Card title={<Title level={4}>Edit Bot Messages</Title>}>
      {/* Formatting guides */}
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Formatting Guide</Title>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>*bold text*</code> to make text <b>bold</b>.
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>_italic text_</code> to make text <i>italic</i>.
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>~strikethrough~</code> to strikethrough text.
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>[text](url)</code> to add a hyperlink.
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>- list item</code> for bullet points.
          </Text>
          <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
            • Use <code>1. list item</code> for numbered lists.
          </Text>
        </div>
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Welcome Message</Title>
          <TextArea
            rows={5}
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
             className="border-green-500 focus:border-green-500 hover:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={5}>Footer Message</Title>
          <TextArea
            rows={5}
            value={footerMessage}
            onChange={(e) => setFooterMessage(e.target.value)}
             className="border-green-500 focus:border-green-500 hover:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <Button
          loading={isPending} 
          onClick={handleSave}
          disabled={!isChanged || !welcomeMessage || !footerMessage}
          className="bg-green-600 text-white hover:!bg-green-700 "
        >
          Save Changes
        </Button>
      </Card>
      )}
      </Spin>
    </div>
  );
};

export default SettingsEditor;
