
import { Tabs} from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined, SettingOutlined } from '@ant-design/icons';
import '../../Css/Tabs.css'
import AccountForm from '@/components/SettingsComponents/AcountForm';
import ChangePasswordForm from '@/components/SettingsComponents/ChangePassword';

const { TabPane } = Tabs;

const Settings = () => {
    

    return (
        <div className="p-6 mt-7  min-h-screen">

            <Tabs 
            defaultActiveKey="1"
            tabBarGutter={40}
            className="custom-tab-bar"
            >
                <TabPane 
                
                    tab={
                        <span>
                            <UserOutlined /> Account
                        </span>
                    }
                    key="1"
                >
                    <AccountForm />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <LockOutlined /> Change Password
                        </span>
                    }
                    key="2"
                >
                    <ChangePasswordForm />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <KeyOutlined /> Change API KEY
                        </span>
                    }
                    key="3"
                >
                    <p>API Key management yahan hoga.</p>
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            <SettingOutlined /> Other Settings
                        </span>
                    }
                    key="4"
                >
                    <p>Other settings content here.</p>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Settings;
