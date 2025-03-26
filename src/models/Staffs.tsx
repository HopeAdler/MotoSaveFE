import { TableColumnsType, Tag } from "antd";
import { formatDate } from "../utils/Utils";

export interface StaffAccountCreatFields {
  username: string,
  password: string,
  fullName: string,
  phone: string,
  roleId: number
}

export interface Staffs {
  staffid: number,
  username: string,
  fullname: string,
  email: string,
  phone: string,
  roleid: number,
  rolename: string,
  stationid: string,
  stationname: number,
  statusid: number,
  statusname: string
  createddate: string
  updateddate: string
}
export const staffColumns: TableColumnsType<Staffs> = [
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role',
    dataIndex: 'rolename',
    key: 'rolename',
    filters: [
      {
        text: 'Driver',
        value: 'Driver',
      },
      {
        text: 'Mechanic',
        value: 'Mechanic',
      },
    ],
    onFilter: (value, record) => record.rolename.indexOf(value as string) === 0,
    sorter: (a: any, b: any) => (a.rolename ?? "").localeCompare(b.rolename ?? ""),
  },
  {
    title: 'Station',
    dataIndex: 'stationname',
    key: 'stationname',
    sorter: (a: any, b: any) => (a.stationname ?? "").localeCompare(b.stationname ?? ""),
  },
  {
    title: 'Status',
    dataIndex: 'statusname',
    key: 'statusname',
    sorter: (a: any, b: any) => (a.statusname ?? "").localeCompare(b.statusname ?? ""),
    render: (_: any, { statusname }: { statusname: string }) => {
      const color = statusname === "Active" ? "green" : "volcano";
      return <Tag color={color}>{statusname.toUpperCase()}</Tag>;
    }
  },
  {
    title: 'Created Date',
    dataIndex: 'createddate',
    key: 'createddate',
    render: (createddate) => (
      formatDate(createddate)
    )
  },
  {
    title: 'Updated Date',
    dataIndex: 'updateddate',
    key: 'updateddate',
    render: (updateddate) => (
      formatDate(updateddate)
    )
  },
];