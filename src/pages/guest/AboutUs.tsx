import { Card, Divider, Layout, Typography } from 'antd';
import MapView from '../../components/MapView';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export default function AboutUs() {
  const [interactive, setInteractive] = useState(false);

  return (
    <Layout className="h-fit flex flex-1 p-8 bg-transparent items-center justify-center">
      <Card className="h-fit flex flex-1 items-center w-full rounded-2xl shadow-2xl bg-white">
        {/* Title */}
        <Title level={2} className="text-blue-600 text-center mb-4">About Us</Title>
        <Divider className="border-blue-500" />

        {/* Text and Map Sections */}
        <div className="flex-1 justify-between items-stretch grid h-fit grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-4 mb-8">
          {/* Text Section */}
          <div className="col-span-1 flex flex-col gap-4 text-justify">
            <div className="p-4 rounded-xl hover:bg-blue-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Chúng tôi chuyên cung cấp dịch vụ cứu hộ xe máy</strong>, giúp người đi xe khắc phục tình trạng ngập nước tại Thành phố Hồ Chí Minh. Với nhiều chi nhánh trên khắp thành phố, chúng tôi đảm bảo hỗ trợ nhanh chóng và hiệu quả bất cứ khi nào bạn cần.
              </Paragraph>
            </div>
            <div className="p-4 rounded-xl hover:bg-blue-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Hỗ trợ 24/7:</strong> Đội ngũ của chúng tôi luôn sẵn sàng phục vụ suốt ngày đêm, cung cấp dịch vụ cứu hộ xe máy tại chỗ, rút nước và sửa chữa.
              </Paragraph>
            </div>
            <div className="p-4 rounded-xl hover:bg-blue-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Gọi hỗ trợ ngay:</strong> Liên hệ với chúng tôi ngay hôm nay để được hỗ trợ kịp thời, và để chúng tôi chăm sóc nhu cầu cứu hộ xe máy của bạn.
              </Paragraph>
            </div>
            <Divider />
            <div className="p-2 rounded-xl hover:bg-yellow-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, Thành phố Hồ Chí Minh
              </Paragraph>
            </div>
            <div className="p-2 rounded-xl hover:bg-yellow-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Số điện thoại:</strong> 0123-456-789
              </Paragraph>
            </div>
            <div className="p-2 rounded-xl hover:bg-yellow-300 hover:shadow transition duration-200">
              <Paragraph className="text-gray-700 text-base leading-relaxed">
                <strong>Email:</strong> motorsaveproject@gmail.com
              </Paragraph>
            </div>
          </div>

          {/* Map Section */}
          <div
            className="col-span-1 lg:col-span-2 relative w-[fit] h-[80vh] flex flex-1 justify-center items-center rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setInteractive(true)}
            onMouseLeave={() => setInteractive(false)}
          >
            <MapView />
            {!interactive && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg text-gray-700 font-medium">
                Bấm vào đây để tương tác với bản đồ
              </div>
            )}
          </div>
        </div>
      </Card>
    </Layout>
  );
}
