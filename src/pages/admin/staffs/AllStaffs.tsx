import { Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useContext, useEffect, useState } from "react";
import CreateStaffModal from "../../../components/CreateStaffModal";
import AuthContext from "../../../context/AuthContext";
import { staffColumns, Staffs } from "../../../models/Staffs";
import { getAllStaffs } from "../../../services/beAPIs";

type TablePaginationConfig = Exclude<
  TableProps<Staffs>["pagination"],
  boolean
>;

export default function AllStaffs() {
  const { token } = useContext(AuthContext);
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5, // Default page size
    total: 0,
    showSizeChanger: true, // Enables changing page size
    pageSizeOptions: ["5", "10", "20", "50"], // Options for user to select
  });

  // Fetch data
  const fetchAllStaffs = async () => {
    try {
      setLoading(true);
      const results = await getAllStaffs(token);
      setStaffs(results);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        total: results.length, // Set total records
      }));
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setLoading(false);
    }
  };

  // Fetch when pagination or sorting changes
  useEffect(() => {
    fetchAllStaffs();
  }, [tableParams?.current, tableParams?.pageSize]);

  // Handle table changes (pagination, filters, sorting)
  const handleTableChange: TableProps<Staffs>["onChange"] = (
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
        <Title level={3} className="m-0">Danh sách nhân viên</Title>
        <CreateStaffModal />
      </div>

      <Table<Staffs>
        columns={staffColumns}
        dataSource={staffs}
        bordered
        rowClassName={(_, index) => (index % 2 === 0 ? "bg-green-200" : "bg-slate-200")}
        pagination={tableParams} // ✅ Dynamic Pagination
        loading={loading}
        onChange={handleTableChange}
        size="large"
        scroll={{ x: "max-content" }}
        className="rounded-lg overflow-hidden shadow-lg p-5"
      />
    </div>
  );
}
