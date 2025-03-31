import { Divider, Layout, Typography } from 'antd';
import MapView from '../../components/MapView';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  const [interactive, setInteractive] = useState(false);

  return (
    <Layout className="p-8 flex flex-1 items-center justify-center bg-gray-100 max-h-screen">
      <div className="grid grid-cols-4 gap-8 w-full items-stretch">

        {/* Left Section (1/4) */}
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-center">
          <Title level={1} className="text-4xl font-bold text-blue-500 cursor-pointer">
            About Us
          </Title>
          <Divider className="border-blue-500" />
          <Paragraph className="text-lg leading-relaxed text-gray-700">
            <strong>We specialize in motorcycle rescue services</strong>, helping riders recover from flooded conditions in Ho Chi Minh City. With multiple branches across the city, we ensure quick and efficient assistance whenever you need it.
          </Paragraph>
          <Paragraph className="text-lg leading-relaxed text-gray-700">
            <strong>24/7 Support:</strong> Our team is available around the clock, offering on-the-spot motorcycle recovery, water drainage, and repair services.
          </Paragraph>
          <Paragraph className="text-lg leading-relaxed text-gray-700">
            <strong>Get Help Now:</strong> Contact us today for immediate assistance, and let us take care of your motorcycle rescue needs.
          </Paragraph>
          <Divider />
          <Paragraph className="text-lg leading-relaxed text-gray-700 font-bold">
            Bên cạnh là bản đồ kèm các trạm cứu hộ
          </Paragraph>
        </div>

        {/* Right Section (3/4) - Map */}
        <div className="col-span-3 relative h-auto">
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => setInteractive(true)}
            onMouseLeave={() => setInteractive(false)}
          >
            <MapView />
            {!interactive && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg text-gray-700">
                Bấm vào đây để tương tác với bản đồ
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
