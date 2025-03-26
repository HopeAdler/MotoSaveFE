import Title from "antd/es/typography/Title";
import GoBackButton from "../../../components/GoBackButton";
import MapView from "../../../components/MapView";
export default function StationMap() {
  return (
    <div>
      <GoBackButton />
      <Title level={3} className="text-center">StationMap</Title>
      <MapView />
    </div>
  )
}
