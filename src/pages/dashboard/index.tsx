import DashboardChart from "@/components/DashboardComponents/DashboardChart";
import { Card } from "antd";

const DashboardPage = () => {
  const stats = [
    { icon: "/icons/one.png", value: 1, label: "Quota" },
    { icon: "/icons/two.png", value: 1, label: "Used" },
    { icon: "/icons/three.svg", value: 1, label: "Connected" },
    { icon: "/icons/four.png", value: 195, label: "Balance" },
    { icon: "/icons/five.png", value: 5, label: "Sent" },
    { icon: "/icons/six.png", value: 0, label: "Queue" },
    { icon: "/icons/seven.svg", value: 0, label: "SMS" },
  ];
  return (
    <div className="mt-7 flex flex-col md-flex-row">
      <Card className="rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">WhatsAPP Account Statistics</h2>
        <hr className="mb-10" />
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 p-4">
              <img src={stat.icon} alt={stat.label} className="w-8 h-8" />
              <div className="flex flex-col space-y-0">
                <span className="leading-tight text-lg font-bold text-gray-800">{stat.value}</span>
                <span className="leading-tight text-sm text-gray-500">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

      </Card>

      <div className="mt-7">
        <DashboardChart />
      </div>
    </div>
  );
};

export default DashboardPage;
