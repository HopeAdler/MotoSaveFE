import {
  ReconciliationOutlined,
  SendOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography, Select } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MySpin from "../../components/MySpin";
import { Column, Line } from "@ant-design/charts";
import AuthContext from "../../context/AuthContext";

const AdminDashboard = () => {
  const { Title } = Typography;
  const { Option } = Select;
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [countUser, setCountUser] = useState(0);
  const [countRequest, setCountRequest] = useState(0);
  const [countFeedback, setCountFeedback] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("4"); // Default to April
  const [requestData, setRequestData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const getTotalUser = async () => {
    setLoading(true);
    await axios
      .get("https://motor-save-be.vercel.app/api/v1/auth/count", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setCountUser(res.data.totalAccounts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getTotalRequest = async () => {
    setLoading(true);
    await axios
      .get("https://motor-save-be.vercel.app/api/v1/requests/count", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setCountRequest(res.data.totalRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getTotalFeedback = async () => {
    setLoading(true);
    await axios
      .get("https://motor-save-be.vercel.app/api/v1/feedbacks/total/count", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setCountFeedback(res.data.totalFeedbacks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getTotalRevenue = async () => {
    setLoading(true);
    await axios
      .get(
        "https://motor-save-be.vercel.app/api/v1/transactions/totalRevenue",
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setRevenue(res.data.totalRevenue);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // Fetch total requests by month
  const getTotalRequestsByDate = async (
    selectedYear: string,
    selectedMonth: string
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://motor-save-be.vercel.app/api/v1/requests/count/total-by-date?year=${selectedYear}&month=${selectedMonth}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const formattedData = res.data.totalRequestsByDate.map(
        (item: { date: string; totalrequests: number }) => ({
          date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          }), // format dd/MM
          value: Number(item.totalrequests),
        })
      );

      setRequestData(formattedData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Fetch total revenue by month
  const getTotalRevenueByDate = async (
    selectedYear: string,
    selectedMonth: string
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://motor-save-be.vercel.app/api/v1/transactions/totalRevenue/total-by-date?year=${selectedYear}&month=${selectedMonth}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const formattedData = res.data.totalRevenueByDate.map(
        (item: { date: string; totalrevenue: number }) => ({
          date: new Date(item.date).toLocaleDateString("en-GB", {
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
    getTotalUser();
    getTotalRequest();
    getTotalFeedback();
    getTotalRevenue();
    getTotalRequestsByDate(year, month);
    getTotalRevenueByDate(year, month);
  }, [year, month]);

  const count = [
    {
      today: "Total Users",
      title: countUser,
      icon: <UserOutlined className="text-blue-500 text-4xl" />,
      color: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      today: "Total Requests",
      title: countRequest,
      icon: <ReconciliationOutlined className="text-red-500 text-4xl" />,
      color: "bg-red-100 text-red-800 border-red-300",
    },
    {
      today: "Total Feedbacks",
      title: countFeedback,
      icon: <SendOutlined className="text-green-500 text-4xl" />,
      color: "bg-green-100 text-green-800 border-green-300",
    },
    {
      today: "Revenue",
      title: revenue.toLocaleString() + " VNĐ",
      icon: <WalletOutlined className="text-purple-500 text-4xl" />,
      color: "bg-purple-100 text-purple-800 border-purple-300",
    },
  ];

  const columnConfig = {
    data: requestData,
    xField: "date",
    yField: "value",
    color: "#1890ff",
  };

  const lineConfig = {
    data: revenueData,
    xField: "date",
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
      <Title level={2} className="text-gray-800 mb-4">
        Admin Dashboard
      </Title>
      <Row gutter={[24, 24]}>
        {count.map((c, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card className={`shadow-lg rounded-xl border ${c.color}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold">{c.today}</p>
                  <p className="text-sm font-semibold text-black">{c.title}</p>
                </div>
                <div className="p-2 bg-white rounded-full shadow-md">
                  {c.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[24, 24]} className="mt-8">
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
            </div>
            <Line {...lineConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
