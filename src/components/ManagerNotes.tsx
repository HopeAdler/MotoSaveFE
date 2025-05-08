import { Card, List } from "antd";
import { NotesProps } from "../models/Notes";

export default function ManagerNotes({ data }: NotesProps) {
  return (
    <Card>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="text-yellow-900 font-bold">{item}</List.Item>
        )}
      />
    </Card>
  );
}
