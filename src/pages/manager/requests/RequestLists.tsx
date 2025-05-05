import Table, { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Request } from "../../../models/Requests";
import AuthContext from "../../../context/AuthContext";
import { formatDate } from "../../../utils/Utils";
import { Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const RequestLists = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get<Request[]>(
          "https://motor-save-be.vercel.app/api/v1/requests",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const columns: ColumnsType<Request> = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Customer",
      dataIndex: "customername",
      key: "customername",
      render: (text, record) => (
        <div>
          <p className="font-semibold">{text ? text : record.receivername}</p>
          <p className="text-gray-500 text-sm">{record.customerphone ? record.customerphone : record.receiverphone}</p>
        </div>
      ),
    },
    {
      title: "Service Package",
      dataIndex: "servicepackagename",
      key: "servicepackagename",
      filters: [
        {
          text: "Cứu hộ đến trạm",
          value: "Cứu hộ đến trạm",
        },
        {
          text: "Cứu hộ thường",
          value: "Cứu hộ thường",
        },
        {
          text: "Cứu hộ nước ngập",
          value: "Cứu hộ nước ngập",
        },
      ],
      onFilter: (value: any, record) =>
        record.servicepackagename.indexOf(value) === 0,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Request Type",
      dataIndex: "requesttype",
      key: "requesttype",
      filters: [
        {
          text: "Cứu hộ",
          value: "Cứu hộ",
        },
        {
          text: "Sửa xe",
          value: "Sửa xe",
        },
        {
          text: "Trả xe",
          value: "Trả xe",
        },
      ],
      onFilter: (value: any, record) => record.requesttype.indexOf(value) === 0,
      render: (text) => <span>{text}</span>,
    },
    {
        title: "Status",
        dataIndex: "requeststatus",
        key: "requeststatus",
        render: (text) => {
          const color = text === "Done" ? "green" : "volcano";
          return <Tag color={color}>{text.toUpperCase()}</Tag>;
        }
      },
    {
      title: "Create Date",
      dataIndex: "createddate",
      key: "createddate",
      render: (createddate) => formatDate(createddate),
    },
    {
      title: "Detail",
      key: "detail",
      render: (record) => (
        <Space size="middle">
          <Link to={`/manager/requests/detail/${record.requestdetailid}`}>
            <EyeOutlined />
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Customer Requests
      </h2>
      <Table
        columns={columns}
        dataSource={requests}
        // rowKey="requestid"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default RequestLists;
