import DashboardChart from "@/components/DashboardComponents/DashboardChart";
import FailedSMS from "@/components/DashboardComponents/FailedSMS";
import { Card } from "antd";

const DashboardPage = () => {
  return (
    <div className="mt-7 flex flex-col md-flex-row">
      <Card className="rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">WhatsAPP Account Statistics</h2>
        <hr className="mb-10" />
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 p-4">
            <img src="/icons/one.png" alt="Quota" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">1</span>
              <span className="leading-tight text-sm text-gray-500">Total Sent</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4">
            <img src="/icons/two.png" alt="Used" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">1</span>
              <span className="leading-tight text-sm text-gray-500">Total Delivered</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4">
            <img src="/icons/three.svg" alt="Connected" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">1</span>
              <span className="leading-tight text-sm text-gray-500">Total Read</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4">
            <img src="/icons/four.png" alt="Balance" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">195</span>
              <span className="leading-tight text-sm text-gray-500">Balance</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4">
            <img src="/icons/five.png" alt="Sent" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">5</span>
              <span className="leading-tight text-sm text-gray-500">Sent</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4">
            <img src="/icons/six.png" alt="Queue" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
              <span className="leading-tight text-lg font-bold text-gray-800">0</span>
              <span className="leading-tight text-sm text-gray-500">Queue</span>
            </div>
          </div>

          
          <FailedSMS />
        </div>
      </Card>

      <div className="mt-7">
        <DashboardChart />
      </div>
    </div>
  );
};

export default DashboardPage;
