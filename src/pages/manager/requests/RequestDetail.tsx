import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Descriptions, Spin, Tag } from "antd";

const RequestDetail = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [requestDetail, setRequestDetail] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `https://motor-save-be.vercel.app/api/v1/requests/driver/${id}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setRequestDetail(res.data);
      } catch (error) {
        console.error("Error fetching request detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="p-4 bg-blue-400 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Request Detail</h2>
      <Card title="User Information" className="mb-3">
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Customer Name">
            {requestDetail.customername ? requestDetail.customername : requestDetail.receivername}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Phone">
            {requestDetail.customerphone ? requestDetail.customerphone : requestDetail.receiverphone}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {requestDetail.drivername && (
        <Card title="Staff Information" className="mb-3">
          <Descriptions column={1} bordered>
            {requestDetail.requesttype === "Sửa xe" ? (
              <>
                <Descriptions.Item label="Mechanic Name">
                  {requestDetail.drivername}
                </Descriptions.Item>
                <Descriptions.Item label="Mechanic Phone">
                  {requestDetail.driverphone}
                </Descriptions.Item>
              </>
            ) : (
              <>
                <Descriptions.Item label="Driver Name">
                  {requestDetail.drivername}
                </Descriptions.Item>
                <Descriptions.Item label="Driver Phone">
                  {requestDetail.driverphone}
                </Descriptions.Item>
                <Descriptions.Item label="License Plate">
                  {requestDetail.licenseplate}
                </Descriptions.Item>
                <Descriptions.Item label="Brand Name">
                  {requestDetail.brandname}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </Card>
      )}
      <Card title="Service Detail" className="mb-3">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Service Package">
            {requestDetail.servicepackagename}
          </Descriptions.Item>
          <Descriptions.Item label="Request Type">
            {requestDetail.requesttype}
          </Descriptions.Item>
          {requestDetail.pickuplocation && (
            <Descriptions.Item label="Pickup Location">
              {requestDetail.pickuplocation}
            </Descriptions.Item>
          )}
          {requestDetail.destination && (
            <Descriptions.Item label="Destination">
              {requestDetail.destination}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            {requestDetail.requeststatus === "Done" ? (
              <Tag color="green">{requestDetail.requeststatus}</Tag>
            ) : (
              <Tag color="volcano">{requestDetail.requeststatus}</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {new Date(requestDetail.createddate).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {requestDetail.totalprice && requestDetail.paymentstatus && (
        <Card title="Payment Information" className="mb-3">
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Total Price">
              {requestDetail.totalprice.toLocaleString()} VNĐ
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {requestDetail.paymentmethod}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              {requestDetail.paymentstatus === "Success" ? (
                <Tag color="green">{requestDetail.paymentstatus}</Tag>
              ) : (
                <Tag color="volcano">{requestDetail.paymentstatus}</Tag>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default RequestDetail;
