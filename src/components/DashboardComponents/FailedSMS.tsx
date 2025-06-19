import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFailedSMS } from "@/services/DashboardServices/DashboardService";
import { Spin} from "antd";
import '../../Css/Spin.css';
import { useNavigate } from 'react-router-dom';

function FailedSMS() {
  const {data , isFetching , isError} = useQuery({
        queryKey:['failedSMSFail'],
        queryFn:getFailedSMS
    })

    // const getDataFailedSMS = Array.isArray(data?.data) ? data?.data : []

    // const totalFailedSMS = getDataFailedSMS.length;
// console.log("Total Failed SMS:", data?.data?.total_failed);

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/failed')


  }

  if (isFetching) return  <Spin spinning={isFetching} className="custom-green-spin"></Spin>;
  if (isError) return <p>Error loading failed SMS.</p>;

  return (
    <div onClick={handleClick} className="flex items-center gap-2 p-4 cursor-pointer active:scale-110">
      <img src="/icons/seven.svg" alt="SMS" className="w-8 h-8" />
      <div className="flex flex-col space-y-0">
        <span className="leading-tight text-lg font-bold text-gray-800">
          {data?.data?.total_failed ?? 0}
        </span>
        <span className="leading-tight text-sm text-gray-500">SMS</span>
      </div>
    </div>
  );
}

export default FailedSMS;
