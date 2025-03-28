import { Card, Empty, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { distanceRateColumns, DistanceRates } from "../../../models/DistanceRate";
import { getDistanceRates } from "../../../services/beAPIs";

export default function DistanceRateList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [distancerates, setDistanceRates] = useState<DistanceRates[]>([])
  const fetchDistanceRates = async () => {
    try {
      setLoading(true);
      const results = await getDistanceRates();
      setDistanceRates(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stations:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDistanceRates();
  }, [])
  return (
    <div>
      <Card className="p-6 shadow-lg relative">
        {/* Main Title */}
        <Typography className="text-2xl font-bold mb-4">📏 Tính tiền dựa trên khoảng cách</Typography>
        <Typography className="text-lg">Quản lí số tiền trên mỗi km tại đây.</Typography>
      </Card>

      {/* Floating Note */}
      <Table<DistanceRates>
        columns={distanceRateColumns(fetchDistanceRates)}
        dataSource={distancerates} // use filtered data here
        rowKey="id"
        bordered
        loading={loading}
        size="large"
        className="rounded-lg overflow-hidden shadow-lg p-5"
        locale={{
          emptyText: <Empty description="Không tìm thấy danh sách tỷ giá (?!)" />,
        }}
      />
    </div>
  )
}
