import { TableColumnsType } from "antd";
import ChangStaionModal from "../components/ChangeStationModal";

export interface StaffsInStations {
  staffid: string,
  stationid: string,
  username: string,
  email: string,
  fullname: string,
  gender: string,
  phone: string,
  rolename: string
}
export const staffsInStationColumn = (fetchStaffsInStation: () => void): TableColumnsType<StaffsInStations> => [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_item, _record, index) => <>{index + 1}</>
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
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
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
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_item, record) => <ChangStaionModal staff={record} onStationChanged={fetchStaffsInStation} />,
  }
];
