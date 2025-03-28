import { Space, TableColumnsType, Typography } from "antd";
import ChangeDistanceRateModal from "../components/ChangeDisRateModal";
import { formatMoney } from "../utils/Utils";

export interface DistanceRates {
  id: number,
  name: string,
  moneyperkm: number,
  distance: number,
  isbigger: string,
  managedby: string
}

export const distanceRateColumns= (fetchDistanceRates: () => void): TableColumnsType<DistanceRates> => [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_item, _record, index) => (<>{index + 1}</>)
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'VNĐ/km',
    dataIndex: 'moneyperkm',
    key: 'moneyperkm',
    render: (_item, record) => (
      <Space className="flex flex-row">
        <Typography> {formatMoney(record.moneyperkm)}</Typography>
        <ChangeDistanceRateModal distanceRate={record} onDisRateChanged={fetchDistanceRates}/>
      </Space>
    )
  },
]