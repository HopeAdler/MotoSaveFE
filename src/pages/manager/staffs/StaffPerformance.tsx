import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import Table, { ColumnsType } from "antd/es/table";
import { Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";
import dayjs from "dayjs";
import MySpin from "../../../components/MySpin";
import { Column, Line } from "@ant-design/charts";
import { removeVietnameseTones } from "../../../utils/Utils";

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
  const { Title } = Typography;
  const { Option } = Select;
  const [data, setData] = useState<StaffPerformance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("5");
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState<string>();
  const [requestData, setRequestData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [searchText, setSearchText] = useState<string>("");

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

  const fetchStaffList = async () => {
    const res = await axios.get(
      "https://motor-save-be.vercel.app/api/v1/auth/staffs",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setStaffList(res.data);
    if (res.data.length > 0) {
      setSelectedStaff(res.data[0].staffid); // <-- Set default to first staff
    }
  };

  useEffect(() => {
    fetchPerformance();
    fetchStaffList();
  }, [selectedDate]);

  const getTotalRequestsByDate = async (
    selectedYear: string,
    selectedMonth: string,
    selectedStaffid: string | any
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://motor-save-be.vercel.app/api/v1/requests/count/total-by-date/staff?staffid=${selectedStaffid}&year=${selectedYear}&month=${selectedMonth}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const formattedData = res.data.map(
        (item: { day: string; requestcount: number }) => ({
          day: new Date(item.day).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          }), // format dd/MM
          value: Number(item.requestcount),
        })
      );

      setRequestData(formattedData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getTotalRevenueByDate = async (
    selectedYear: string,
    selectedMonth: string,
    selectedStaffid: string | any
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://motor-save-be.vercel.app/api/v1/transactions/totalRevenue/total-by-date/staff?year=${selectedYear}&month=${selectedMonth}&staffid=${selectedStaffid}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const formattedData = res.data.map(
        (item: { day: string; totalrevenue: number }) => ({
          day: new Date(item.day).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          }), // format dd/MM
          revenue: item.totalrevenue,
        })
      );

      setRevenueData(formattedData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTotalRequestsByDate(year, month, selectedStaff);
    getTotalRevenueByDate(year, month, selectedStaff);
  }, [year, month, selectedStaff]);
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
      filters: [
        {
          text: "Driver",
          value: "Driver",
        },
        {
          text: "Mechanic",
          value: "Mechanic",
        },
      ],
      onFilter: (value: any, record) => record.role.indexOf(value) === 0,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Requests Completed",
      dataIndex: "requestcount",
      key: "requestcount",
      sorter: (a, b) => a.requestcount - b.requestcount,
      render: (amount) => <span>{amount}</span>,
    },
    {
      title: "Total Earned",
      dataIndex: "totalearned",
      key: "totalearned",
      sorter: (a, b) => a.totalearned - b.totalearned,
      render: (amount) => (
        <span className="font-medium text-green-600">
          {amount.toLocaleString()} VND
        </span>
      ),
    },
  ];

  const columnConfig = {
    data: requestData,
    xField: "day",
    yField: "value",
    color: "#1890ff",
  };

  const lineConfig = {
    data: revenueData,
    xField: "day",
    yField: "revenue",
    color: "#52c41a",
    point: {
      size: 4,
      shape: "circle",
    },
    xAxis: { title: { text: "Date" } },
    yAxis: { title: { text: "Revenue (VND)" } },
  };

  if (loading) {
    <MySpin />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Staff Performance</h2>
      <Row gutter={[24, 24]} className="mt-2">
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl p-2">
            <Title level={3} className="text-gray-800">
              Requests Per Month
            </Title>
            <div className="flex gap-2 items-center mb-4">
              <Select value={year} onChange={setYear} className="w-28">
                <Option value="2023">2023</Option>
                <Option value="2024">2024</Option>
                <Option value="2025">2025</Option>
                <Option value="2026">2026</Option>
              </Select>
              <Select value={month} onChange={setMonth} className="w-24">
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i + 1} value={(i + 1).toString()}>
                    {new Date(0, i).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Select Staff"
                value={selectedStaff}
                onChange={setSelectedStaff}
                className="w-full"
              >
                {staffList.map((staff: any) => (
                  <Option key={staff.staffid} value={staff.staffid}>
                    {staff.fullname}
                  </Option>
                ))}
              </Select>
            </div>
            <Column {...columnConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl p-2">
            <Title level={3} className="text-gray-800">
              Revenue Per Month
            </Title>
            <div className="flex gap-2 items-center mb-4">
              <Select value={year} onChange={setYear} className="w-28">
                <Option value="2023">2023</Option>
                <Option value="2024">2024</Option>
                <Option value="2025">2025</Option>
                <Option value="2026">2026</Option>
              </Select>
              <Select value={month} onChange={setMonth} className="w-24">
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i + 1} value={(i + 1).toString()}>
                    {new Date(0, i).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Select Staff"
                value={selectedStaff}
                onChange={setSelectedStaff}
                className="w-full"
              >
                {staffList.map((staff: any) => (
                  <Option key={staff.staffid} value={staff.staffid}>
                    {staff.fullname}
                  </Option>
                ))}
              </Select>
            </div>
            <Line {...lineConfig} />
          </Card>
        </Col>
      </Row>
      <div className="flex items-center justify-end my-4">
        <Input.Search
          placeholder="Search staff name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 200, marginRight: 10 }}
        />
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date || dayjs())}
          format="YYYY-MM-DD"
          className="rounded px-2 py-1 border"
        />
      </div>
      <Table
        columns={columns}
        dataSource={data.filter((item) =>
          removeVietnameseTones(item.staffname.toLowerCase()).includes(
            removeVietnameseTones(searchText.toLowerCase())
          )
        )}
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default StaffPerformance;
