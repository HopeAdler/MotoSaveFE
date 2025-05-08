import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Descriptions, Divider, Spin, Tag } from "antd";

interface RepairQuote {
  id: string;
  requestdetailid: string;
  repairpackagename: string;
  repairname: string;
  detail: string;
  partcategoryname: string;
  accessoryname: string;
  cost: number;
  wagerate: number;
  wage: number;
  total: number;
}

const RequestDetail = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [requestDetail, setRequestDetail] = useState<any>(null);
  const [repairQuotes, setRepairQuotes] = useState<RepairQuote[]>([]);

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

  const fetchRepairQuote = async () => {
    try {
      const response = await axios.get<RepairQuote[]>(
        `https://motor-save-be.vercel.app/api/v1/repairquotes/requestdetail/${requestDetail?.requestdetailid}`
      );
      setRepairQuotes(response.data);
    } catch (error) {
      console.error("Error fetching repair quotes:", error);
    }
  };

  useEffect(() => {
    if (
      requestDetail?.requesttype === "Sửa xe" &&
      requestDetail?.requeststatus !== "Pending" &&
      requestDetail?.requeststatus !== "Inspecting"
    ) {
      fetchRepairQuote();
    }
  }, [requestDetail?.requeststatus]);

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
            {requestDetail.customername
              ? requestDetail.customername
              : requestDetail.receivername}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Phone">
            {requestDetail.customerphone
              ? requestDetail.customerphone
              : requestDetail.receiverphone}
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
            <span className="bg-pink-100 text-black text-base font-bold px-3 py-1 rounded-full">
                {(requestDetail?.totalprice || 0).toLocaleString()} VNĐ
              </span>
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
      {requestDetail?.requeststatus !== "Pending" &&
        requestDetail?.requeststatus !== "Inspecting" &&
        requestDetail?.requesttype === "Sửa xe" && (
          <Card className="mb-3">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Repair Vehicle Quote
              </h3>
              {repairQuotes.filter((q) => q.repairpackagename === "Basic")
                .length > 0 ? (
                repairQuotes
                  .filter((q) => q.repairpackagename === "Basic")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div className="font-semibold text-[#1a3148]">
                        {item.repairname}
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {item.wage.toLocaleString()} VNĐ
                      </span>
                    </div>
                  ))
              ) : (
                <div className="text-gray-500 italic">
                  No repair quote yet
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Accessory List
              </h3>
              {repairQuotes.filter((q) => q.repairpackagename === "Addons")
                .length > 0 ? (
                repairQuotes
                  .filter((q) => q.repairpackagename === "Addons")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start py-2 border-b"
                    >
                      <div>
                        <div className="font-semibold text-[#1a3148]">
                          {item.accessoryname || item.repairname}
                        </div>
                        <div className="text-gray-500">
                          {item.partcategoryname}
                        </div>
                        <div className="text-xs">
                          Wage: {item.wage.toLocaleString()} VNĐ
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {item.cost.toLocaleString()} VNĐ
                      </span>
                    </div>
                  ))
              ) : (
                <div className="text-gray-500 italic">No accessory yet</div>
              )}
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <span className="font-semibold text-base text-gray-900">
                Total wage
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                {repairQuotes
                  .filter((q) => q.repairpackagename !== "Basic")
                  .reduce((sum, q) => sum + (q.wage || 0), 0)
                  .toLocaleString()}{" "}
                VNĐ
              </span>
            </div>

            <Divider className="mt-2" />

            <div className="flex justify-between items-center mt-4 pt-3">
              <span className="text-lg font-bold text-gray-900">Total Repair Quote Price</span>
              <span className="bg-pink-100 text-black text-base font-bold px-3 py-1 rounded-full">
                {(requestDetail?.totalprice || 0).toLocaleString()} VNĐ
              </span>
            </div>
          </Card>
        )}
    </div>
  );
};

export default RequestDetail;
