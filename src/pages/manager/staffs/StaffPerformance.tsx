import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import Table, { ColumnsType } from "antd/es/table";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface StaffPerformance {
  staffid: string;
  staffname: string;
  staffphone: string;
  role: string;
  day: string;
  requestcount: number;
  totalearned: number;
}

const StaffPerformance = () => {
  const [data, setData] = useState<StaffPerformance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        const response = await axios.get<StaffPerformance[]>(
          `https://motor-save-be.vercel.app/api/v1/transactions/performance/staff?date=${formattedDate}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching staff performance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [selectedDate]);
  const columns: ColumnsType<StaffPerformance> = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
        title: "Name",
        dataIndex: "staffname",
        key: "staffname",
      },
      {
        title: "Phone",
        dataIndex: "staffphone",
        key: "staffphone",
      },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Requests Completed",
      dataIndex: "requestcount",
      key: "requestcount",
    },
    {
      title: "Total Earned",
      dataIndex: "totalearned",
      key: "totalearned",
      render: (amount) => (
        <span className="font-medium text-green-600">
          {amount.toLocaleString()} VND
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Staff Performance</h2>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date || dayjs())}
          format="YYYY-MM-DD"
          className="rounded px-2 py-1 border"
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default StaffPerformance;
