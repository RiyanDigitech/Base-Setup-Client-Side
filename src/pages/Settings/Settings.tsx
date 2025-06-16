
import { Tabs} from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined, SettingOutlined } from '@ant-design/icons';
import '../../Css/Tabs.css'
import AccountForm from '@/components/SettingsComponents/AcountForm';
import ChangePasswordForm from '@/components/SettingsComponents/ChangePassword';
import OtherSettings from '@/components/SettingsComponents/OtherSetting';
import SettingsEditor from '@/components/SettingsComponents/Settings';

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
                        <span className='hover:!bg-[#047857] focusbg-[#047857] p-4 rounded'>
                            <UserOutlined /> Account
                        </span>
                    }
                    key="1"
                >
                    <AccountForm />
                </TabPane>
                <TabPane tab ={
                        <span className='hover:!bg-[#047857] focus:!bg-[#047857] p-4 rounded'>
                            <SettingOutlined />  Settings
                        </span>
                    }
                    key="2">
                    <SettingsEditor />
                </TabPane>

                

                <TabPane
                    tab={
                        <span className='hover:!bg-[#047857] focus:!bg-[#047857] p-4 rounded'>
                            <SettingOutlined /> Other Settings
                        </span>
                    }
                    key="3"
                >
                    <OtherSettings />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Settings;
