import { Layout } from "antd";
import Title from "antd/es/typography/Title";
import FareCalculatingCard from "../../components/FareCalculatingCard";
import ServicePackagePreview from "../../components/ServicePackagePreview";
import DistanceRateList from "../admin/services/DistanceRateList";
import RepairCostPreviewList from "../admin/services/RepairCostPreviewList";

export default function Services() {
  return (
    <Layout className="max-h-[90vh] bg-gradient-to-br from-green-500 via-blue to-blue-500 flex items-center">
      <div className="max-w-full w-full p-6 h-[85vh] overflow-y-auto">
        <Title level={2} className="text-start mb-8">🧾 Fare Calculation Information</Title>
        {/* Right column: DistanceRateList */}
        <div className="flex flex-row rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 p-4 gap-4">
          <div className="flex-1 flex flex-col justify-between">
            <DistanceRateList />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <ServicePackagePreview />
          </div>
        </div>
        <div className="flex-1 items-start gap-6 mt-6">
          {/* Left column: inline cards */}
          <FareCalculatingCard/>
        </div>
        <div className="flex-1 items-start gap-6 mt-6">
          <RepairCostPreviewList />
        </div>
      </div>
    </Layout>
  );
}
