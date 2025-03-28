import { Empty, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { stationColumns, Stations } from "../../../models/Stations";
import { getAllStations } from "../../../services/beAPIs";

type TablePaginationConfig = Exclude<
  TableProps<Stations>["pagination"],
  boolean
>;

export default function AllStations() {
  const [stations, setStations] = useState<Stations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5, // Default page size
    total: 0,
    showSizeChanger: true, // Enables changing page size
    pageSizeOptions: ["5", "10", "20", "50"], // Options for user to select
  });

  // Fetch data
  const fetchAllStations = async () => {
    try {
      setLoading(true);
      const results = await getAllStations();
      setStations(results);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        total: results.length, // Set total records
      }));
    } catch (error) {
      console.error("Error fetching stations:", error);
      setLoading(false);
    }
  };

  // Fetch when pagination or sorting changes
  useEffect(() => {
    fetchAllStations();
  }, [tableParams?.current, tableParams?.pageSize]);

  // Handle table changes (pagination, filters, sorting)
  const handleTableChange: TableProps<Stations>["onChange"] = (
    pagination,
  ) => {
    setTableParams((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Title level={3} className="m-0">Danh sách các trạm</Title>
      </div>

      <Table<Stations>
        columns={stationColumns}
        dataSource={stations}
        bordered
        rowClassName={(_, index) => (index % 2 === 0 ? "bg-green-200" : "bg-slate-200")}
        pagination={tableParams} // ✅ Dynamic Pagination
        loading={loading}
        onChange={handleTableChange}
        size="large"
        scroll={{ x: "max-content" }}
        className="rounded-lg overflow-hidden shadow-lg p-5"
        locale={{
          emptyText:
            <Empty description="Không có trạm nào (?!)"></Empty>
        }}
      />
    </div>
  );
}
