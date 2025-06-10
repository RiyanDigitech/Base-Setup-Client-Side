import { getDashboardData } from "@/services/DashboardServices/DashboardService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

function SentMessage() {

    const { data, isFetching, isError } = useQuery({
        queryKey: ['failedSMS'],
        queryFn: getDashboardData,
    });

    if (isFetching) return <Spin spinning={isFetching} className="custom-green-spin"></Spin>;
    if (isError) return <p>Error to Loading Total Send Message</p>;
    return (
        <div className="flex items-center gap-2 p-4">
            <img src="/icons/one.png" alt="Quota" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
                <span className="leading-tight text-lg font-bold text-gray-800">{data?.total_sent ?? 0}</span>
                <span className="leading-tight text-sm text-gray-500">Total Sent</span>
            </div>
        </div>
    )
}

export default SentMessage
