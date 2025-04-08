import { useContext, useEffect, useState } from "react";
import { Payment } from "../../../models/Payments";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import Table, { ColumnsType } from "antd/es/table";
import { Tag } from "antd";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get<Payment[]>(
          "https://motor-save-be.vercel.app/api/v1/transactions/payments",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const columns: ColumnsType<Payment> = [
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
          <p className="font-semibold">{text}</p>
          <p className="text-gray-500 text-sm">{record.customerphone}</p>
        </div>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentmethod",
      key: "paymentmethod",
      filters: [
        {
          text: "Tiền mặt",
          value: "Tiền mặt",
        },
        {
          text: "ZaloPay",
          value: "ZaloPay",
        },
      ],
      onFilter: (value: any, record) =>
        record.paymentmethod.indexOf(value) === 0,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "totalamount",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentstatus",
      key: "paymentstatus",
      render: (text) => {
        const color = text === "Success" ? "green" : "volcano";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      }
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
      title: "Date",
      dataIndex: "updateddate",
      key: "updateddate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];
  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Customer Payment
      </h2>
      <Table
        columns={columns}
        dataSource={payments}
        rowKey="paymentid"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
    </div>
  );
};

export default Payments;
