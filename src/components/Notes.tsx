import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Card, Collapse, List, Typography } from "antd";
import { useState } from "react";
import FareCalculatingCard from "./FareCalculatingCard";

const { Title } = Typography;
const { Panel } = Collapse;

interface NotesProps {
  data: string[];
}

export default function Notes({ data }: NotesProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="absolute right-4 w-fit bg-yellow-100 p-3 rounded-lg shadow-md border border-yellow-300 z-10">
      <Collapse
        bordered={false}
        ghost
        expandIconPosition="right"
        activeKey={isExpanded ? ["1"] : []} // ✅ Control expansion
        expandIcon={({ isActive }) =>
          isActive ? <UpOutlined className="text-yellow-800" /> : <DownOutlined className="text-yellow-800" />
        }
        onChange={() => setIsExpanded(!isExpanded)}
      >
        <Panel header={<Title level={5} className="text-yellow-800 m-0">🔔 Ghi chú</Title>} key="1">
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => <List.Item className="text-yellow-900 font-bold">{item}</List.Item>}
          />
          <FareCalculatingCard/>
        </Panel>
      </Collapse>
    </Card>
  );
}
