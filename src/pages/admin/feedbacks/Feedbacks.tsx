import { Rate } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Feedback } from "../../../models/Feedbacks";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>("https://motor-save-be.vercel.app/api/v1/feedbacks");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const columns: ColumnsType<Feedback> = [
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
      title: "Service Package",
      dataIndex: "servicepackagename",
      key: "servicepackagename",
      filters: [
        {
          text: 'Cứu hộ đến trạm',
          value: 'Cứu hộ đến trạm',
        },
        {
          text: 'Cứu hộ thường',
          value: 'Cứu hộ thường',
        },
        {
          text: 'Cứu hộ nước ngập',
          value: 'Cứu hộ nước ngập',
        }
      ],
      onFilter: (value: any, record) => record.servicepackagename.indexOf(value) === 0,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => (
        <Rate allowHalf disabled defaultValue={rating} />
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (text) => <p className="truncate max-w-xs">{text || "No comment"}</p>,
    },
    {
      title: "Created Date",
      dataIndex: "createddate",
      key: "createddate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];
  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Customer Feedback</h2>
      <Table
        columns={columns}
        dataSource={feedbacks}
        rowKey="feedbackid"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="overflow-hidden rounded-lg"
      />
    </div>
  )
}

export default Feedbacks
