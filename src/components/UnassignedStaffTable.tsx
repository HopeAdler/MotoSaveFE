import type { TablePaginationConfig, TableProps } from 'antd';
import { Divider, Empty, Radio, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { UnAssignedStaffs, unAssignStaffsColumns } from '../models/UnAssignedStaffs';
import { getUnAssignedStaffs } from '../services/beAPIs';

interface AssignStaffProps {
  setSelectedStaffIds: React.Dispatch<React.SetStateAction<string[]>>;
}


const UnassignedStaffsTable: React.FC<AssignStaffProps> = ({
  setSelectedStaffIds,
}
) => {
  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<UnAssignedStaffs>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UnAssignedStaffs[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const selectedStaffIds = selectedRows.map((row) => row.staffid); // ✅ Extracts only staffid values
      console.log("Selected Staff IDs:", selectedStaffIds);
      setSelectedStaffIds(selectedStaffIds);
    },
    getCheckboxProps: (record: UnAssignedStaffs) => ({
      name: record.staffid,
    }),
  };
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  const { token } = useContext(AuthContext);
  const [unAssignedStaffs, setUnAssignedStaffs] = useState<UnAssignedStaffs[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[] | null>(null);
  const [filteredStaffs, setFilteredStaffs] = useState<UnAssignedStaffs[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5, // Default page size
    total: 0,
    showSizeChanger: true, // Enables changing page size
    pageSizeOptions: ["5", "10", "20", "50"], // Options for user to select
  });
  const fetchUnAssignedStaffs = async () => {
    try {
      setLoading(true);
      const results = await getUnAssignedStaffs(token);
      setUnAssignedStaffs(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUnAssignedStaffs();
  }, [tableParams?.current, tableParams?.pageSize]);

  // Update filteredStaffs whenever allStaffs or the filter changes.
    useEffect(() => {
      let data = unAssignedStaffs;
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
    }, [unAssignedStaffs, roleFilter]);
  
    // Handle table changes (pagination, filters, sorting)
    const handleTableChange: TableProps<UnAssignedStaffs>["onChange"] = (
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
    const modifiedColumns = unAssignStaffsColumns.map((col) => {
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
    <div>
      <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
        <Radio value="checkbox">Chọn nhiều</Radio>
        <Radio value="radio">Chọn 1</Radio>
      </Radio.Group>
      <Divider />
      <Table<UnAssignedStaffs>
        rowKey={(record) => record.staffid}
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={modifiedColumns}
        dataSource={filteredStaffs} 
        pagination={tableParams} // ✅ Dynamic Pagination
        loading={loading}
        onChange={handleTableChange}
        size="large"
        scroll={{ x: "max-content" }}
        className="rounded-lg overflow-hidden shadow-lg p-5"
        locale={{
          emptyText:
            <Empty description="Không tìm thấy nhân viên nào (?!)"></Empty>
        }}
      />
    </div>
  );
};

export default UnassignedStaffsTable;