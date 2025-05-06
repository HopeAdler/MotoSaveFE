import { CodeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Card, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { fareCalculationColumns, fareCalculations } from "../models/FareCalculations";

export default function FareCalculatingCard() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Card
            className="flex-1 rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
            title={
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-between text-left text-lg font-semibold text-blue-800 hover:text-blue-900 transition focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        <CodeOutlined /> Cách tính tiền dựa trên khoảng cách
                    </div>
                    {collapsed ? <UpOutlined /> : <DownOutlined />}
                </button>
            }
        >
            {collapsed && (
                <div className="flex flex-col md:flex-row gap-8 text-gray-800 font-mono text-sm md:text-base">
                    {/* Left Column – Definitions */}
                    <div className="md:w-1/3 space-y-4">
                        <Title level={4} className="!mb-2 text-blue-700">Chú thích</Title>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong className="text-blue-700">R</strong>: Tỉ giá (theo gói dịch vụ)</li>
                            <li><strong className="text-blue-700">s</strong>: Quãng đường di chuyển (km)</li>
                            <li><strong className="text-blue-700">F</strong>: Tổng chi phí</li>
                            <li><strong className="text-blue-700">d₁</strong>: Mốc thứ nhất (vd: 5km)</li>
                            <li><strong className="text-blue-700">d₂</strong>: Mốc thứ hai (vd: 10km)</li>
                            <li><strong className="text-blue-700">m₁</strong>: Giá cố định trong vòng 1 km</li>
                            <li><strong className="text-blue-700">m₂</strong>: Phí trên mỗi km từ 1 km đến d₁</li>
                            <li><strong className="text-blue-700">m₃</strong>: Phí trên mỗi km từ d₁ to d₂</li>
                            <li><strong className="text-blue-700">m₄</strong>: Phí trên mỗi km khi vượt quá d₂</li>
                        </ul>

                    </div>

                    {/* Right Column – Table and Examples */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <Table
                                columns={fareCalculationColumns}
                                dataSource={fareCalculations}
                                pagination={false}
                                bordered
                                className="bg-white"
                            />
                        </div>

                        <div>
                            <Title level={4} className="!mb-2 text-blue-700">Ví dụ</Title>
                            <ul className="list-disc list-inside space-y-2 leading-relaxed">
                                <li>
                                    <span className="font-semibold text-gray-700">
                                        d₁ = 1 km, d₂ = 5 km, d₃ = 10 km, m₁ = 55 000, m₂ = 50 000, m₃ = 45 000, m₄ = 40 000, R = 1×
                                    </span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 0.8 km</span> → F = 55 000 × 1 = <span className="font-bold text-green-500">55.000 VND</span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 3 km</span> → F = (55 000 + (3 − 1) × 50 000) × 1 = <span className="font-bold text-green-500">155.000 VND</span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 8 km</span> → F = (55 000 + (5 − 1) × 50 000 + (8 − 5) × 45 000) × 1 = <span className="font-bold text-green-500">390.000 VND</span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 12 km</span> → F = (55 000 + (5 − 1) × 50 000 + (10 − 5) × 45 000 + (12 − 10) × 40 000) × 1 = <span className="font-bold text-green-500">560.000 VND</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            )}
        </Card>
    );
}
