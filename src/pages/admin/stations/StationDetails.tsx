import Title from "antd/es/typography/Title";
import { useLocation } from "react-router-dom";
import GoBackButton from "../../../components/GoBackButton";
import { Empty, Table, TableProps } from "antd";
import { staffsInStationColumn, StaffsInStations } from "../../../models/StaffsInStations";
import { useContext, useEffect, useState } from "react";
import { getStaffsInStation } from "../../../services/beAPIs";
import AuthContext from "../../../context/AuthContext";
import AssignStaffModal from "../../../components/AssignStaffModal";

type TablePaginationConfig = Exclude<
  TableProps<StaffsInStations>["pagination"],
  boolean
>;

export default function StationDetails() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { stationId, stationName } = location.state; // Access the ID

  const [sis, setSis] = useState<StaffsInStations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5, // Default page size
    total: 0,
    showSizeChanger: true, // Enables changing page size
    pageSizeOptions: ["5", "10", "20", "50"], // Options for user to select
  });

  // Fetch data
  const fetchStaffsInStation = async () => {
    try {
      setLoading(true);
      const results = await getStaffsInStation(stationId, token);
      setSis(results);
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
    fetchStaffsInStation();
  }, [tableParams?.current, tableParams?.pageSize]);

  // Handle table changes (pagination, filters, sorting)
  const handleTableChange: TableProps<StaffsInStations>["onChange"] = (
    pagination,
  ) => {
    setTableParams((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };
  return (
    <div>
      <GoBackButton />
      <div className="p-10">
        <div className="flex items-center justify-between">
          <Title level={3}>Danh sách các nhân viên thuộc trạm: {stationName}</Title>
          <AssignStaffModal stationId={stationId} onStaffAssigned={fetchStaffsInStation} />
        </div>
        <Table<StaffsInStations>
          columns={staffsInStationColumn(fetchStaffsInStation)}
          dataSource={sis}
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
              <Empty description="Trạm này hiện chưa có nhân viên, hãy bố trí thêm"></Empty>
          }}
        />
      </div>
    </div>
  );
};
