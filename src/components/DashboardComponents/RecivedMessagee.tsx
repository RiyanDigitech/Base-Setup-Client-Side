import { getDashboardData } from "@/services/DashboardServices/DashboardService";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

function RecivedMessagee() {

    const { data, isFetching, isError } = useQuery({
        queryKey: ['failedSMS'],
        queryFn: getDashboardData,
    });

    // console.log('Total Recived Message' , data.length)

    if (isFetching) return <Spin spinning={isFetching} className="custom-green-spin"></Spin>;
    if (isError) return <p>Error to Loading Total Recived Message</p>;
    
    return (
        <div className="flex items-center gap-2 p-4">
            <img src="/icons/two.png" alt="Used" className="w-8 h-8" />
            <div className="flex flex-col space-y-0">
                <span className="leading-tight text-lg font-bold text-gray-800">{data?.total_received ?? 0}</span>
                <span className="leading-tight text-sm text-gray-500">Total Received</span>
            </div>
        </div>
    )
}

export default RecivedMessagee
