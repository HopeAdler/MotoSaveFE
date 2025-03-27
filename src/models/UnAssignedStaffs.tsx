import { TableColumnsType, Tag } from "antd";

export interface UnAssignedStaffs {
  staffid: string,
  username: string,
  fullname: string,
  phone: string,
  rolename: string,
  status: string
}
export const unAssignStaffsColumns: TableColumnsType<UnAssignedStaffs> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_item, _record, index) => (<>{index + 1}</>)
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role Name',
    dataIndex: 'rolename',
    key: 'rolename',
    onFilter: (value, record) => record.rolename.indexOf(value as string) === 0,
    sorter: (a: any, b: any) => (a.rolename ?? "").localeCompare(b.rolename ?? ""),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: any, { status }: { status: string }) => {
      const color = status === "Active" ? "green" : "volcano";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    }
  },
];