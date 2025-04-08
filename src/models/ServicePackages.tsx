import { TableColumnsType, Typography } from "antd"

export interface ServicePackages {
  id: string,
  name: string,
  description: string,
  rate: number,
  createddate: string,
  updateddate: string
}

export const servicePackageColumns: TableColumnsType<ServicePackages> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_item, _record, index) => (<>{index + 1}</>)
  },
  {
    title: 'Package Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (rate) => (
          <Typography>{rate}x</Typography> 
        )
  },
]