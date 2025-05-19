
import { Tabs} from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined, SettingOutlined } from '@ant-design/icons';
import '../../Css/Tabs.css'
import AccountForm from '@/components/SettingsComponents/AcountForm';
import ChangePasswordForm from '@/components/SettingsComponents/ChangePassword';
import OtherSettings from '@/components/SettingsComponents/OtherSetting';

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
                            <SettingOutlined /> Other Settings
                        </span>
                    }
                    key="4"
                >
                    <OtherSettings />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Settings;
