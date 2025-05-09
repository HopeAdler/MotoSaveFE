import { Empty, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { useContext, useEffect, useState } from "react";
import CreateStaffModal from "../../../components/CreateStaffModal";
import AuthContext from "../../../context/AuthContext";
import { staffColumns, Staffs } from "../../../models/Staffs";
import { getAllStaffs } from "../../../services/beAPIs";

type TablePaginationConfig = Exclude<TableProps<Staffs>["pagination"], boolean>;

export default function AllStaffs() {
  const { token } = useContext(AuthContext);
  const [allStaffs, setAllStaffs] = useState<Staffs[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staffs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });
  // Hold filter state (for example, for role filtering)
  const [roleFilter, setRoleFilter] = useState<string[] | null>(null);

  // Fetch data from the API
  const fetchAllStaffs = async () => {
    try {
      setLoading(true);
      const results = await getAllStaffs(token);
      setAllStaffs(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setLoading(false);
    }
  };

  // Run fetch on mount
  useEffect(() => {
    fetchAllStaffs();
  }, [token]);

  // Update filteredStaffs whenever allStaffs or the filter changes.
  useEffect(() => {
    let data = allStaffs;
    if (roleFilter && roleFilter.length > 0) {
      data = data.filter((staff) => roleFilter.includes(staff.rolename));
    }
    setFilteredStaffs(data);
    // Also update the total count in tableParams
    setTableParams((prev) => ({
      ...prev,
      total: data.length,
      // If current page is now out of range, reset to page 1:
      current:
        (prev?.current ?? 1) > Math.ceil(data.length / (prev?.pageSize ?? 1))
          ? 1
          : prev?.current ?? 1,
    }));
  }, [allStaffs, roleFilter]);

  // Handle table changes (pagination, filters, sorting)
  const handleTableChange: TableProps<Staffs>["onChange"] = (
    pagination,
    filters,
    // sorter
  ) => {
    // Check for role filter changes from the table’s built-in filter
    if (filters.rolename) {
      // filters.rolename can be an array of selected roles or null
      setRoleFilter(filters.rolename as string[] | null);
    } else {
      setRoleFilter(null);
    }

    // Update pagination (and optionally sorting) in state.
    setTableParams((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
      // total is managed by our effect, so you may leave it unchanged here.
    }));
  };

  // For the index column, let’s calculate the index at render time:
  const modifiedColumns = staffColumns.map((col) => {
    if ("dataIndex" in col && col.dataIndex === "index") {
      return {
        ...col,
        render: (_item: any, _record: any, index: number) => {
          return (tableParams?.current! - 1) * tableParams?.pageSize! + index + 1;
        },
      };
    }
    return col;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Title level={3} className="m-0">
          Danh sách nhân viên
        </Title>
        <CreateStaffModal onStaffCreated={fetchAllStaffs} />
      </div>

      <Table<Staffs>
        columns={modifiedColumns}
        dataSource={filteredStaffs} // use filtered data hereee
        rowKey="staffid"
        bordered
        rowClassName={(_, index) =>
          index % 2 === 0 ? "bg-green-200" : "bg-slate-200"
        }
        pagination={tableParams}
        loading={loading}
        onChange={handleTableChange}
        size="large"
        scroll={{ x: "max-content" }}
        className="rounded-lg overflow-hidden shadow-lg p-5"
        locale={{
          emptyText: <Empty description="Không tìm thấy nhân viên nào (?!)" />,
        }}
      />
    </div>
  );
}
