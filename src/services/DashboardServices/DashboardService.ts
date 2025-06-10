import axios from '@/lib/config/axios-instance';
import { TokenValue } from '../Base/TokenGet';




export const getPieChartData = async () => {
  try {

    const response = await axios.get('/stats/messages-today', {
      headers: {
        Authorization: `Bearer ${TokenValue}`,
      },
    });

    if (response.status === 200 && response.data?.data) {
      return response?.data?.data; // Should be { sent: number, delivered: number, read: number }
    } else {
      throw new Error("Invalid response");
    }
  } catch (error: any) {
    console.error("Pie chart API error:", error?.response?.data?.message || error.message);
    throw new Error("Failed to fetch pie chart data");
  }
};

export const getBarChartData = async () => {
  try {
    const response = await axios.get('/stats/total-messages', {
      headers: {
        Authorization: `Bearer ${TokenValue}`,
      },
    });

    if (response.status === 200 && response.data?.data?.weekly) {
      return response.data.data.weekly; // Return only the array
    } else {
      throw new Error("Invalid weekly data response");
    }
  } catch (error: any) {
    console.error("Bar chart API error:", error?.response?.data?.message || error.message);
    throw new Error("Failed to fetch bar chart data");
  }
};


export const getDashboardData = async () => {
  try {
    const response = await axios.get('/stats/total-messages', {
      headers: {
        Authorization: `Bearer ${TokenValue}`,
      },
    });

    if (response.status === 200 && response.data?.data?.weekly) {
      return response.data.data; // Return only the array
    } else {
      throw new Error("Invalid weekly data response");
    }
  } catch (error: any) {
    console.error("Bar chart API error:", error?.response?.data?.message || error.message);
    throw new Error("Failed to fetch bar chart data");
  }
};


export const getFailedSMS = async () => {
  try {
    const response = await axios.get('/stats/failures', {
      headers: {
        Authorization: `Bearer ${TokenValue}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Invalid weekly data response");
    }
  } catch (error: any) {
    console.error("Bar chart API error:", error?.response?.data?.message || error.message);
    throw new Error("Failed to fetch bar chart data");
  }
};

