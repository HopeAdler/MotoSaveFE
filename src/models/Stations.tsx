import { Button, TableColumnsType } from "antd"
import { formatDate } from "../utils/Utils"
import { InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export interface Stations {
  id: string,
  name: string,
  address: string,
  long: number,
  lat: number,
  createddate: string,
  updateddate: string
}

export const stationColumns: TableColumnsType<Stations> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_item, _record, index) => (<>{index + 1}</>)
  },
  {
    title: 'Station Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Longitude',
    dataIndex: 'long',
    key: 'long',
  },
  {
    title: 'Latitude',
    dataIndex: 'lat',
    key: 'lat',
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
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_item, record) => (
      <Link to="./stationDetails" state={{ stationId: record.id, stationName: record.name }}>
        <Button type="primary" className="rounded-full" icon={<InfoCircleOutlined />}>
        </Button>
      </Link>
    ),
  }

]