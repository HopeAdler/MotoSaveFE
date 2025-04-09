import { CodeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Card, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { fareCalculationColumns, fareCalculations } from "../models/FareCalclations";

export default function FareCalculatingCard() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Card
            className="flex-1 rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
            title={
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-between text-left text-lg font-semibold text-blue-800 hover:text-blue-900 transition focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        <CodeOutlined /> Conditional Fare Logic
                    </div>
                    {collapsed ? <DownOutlined /> : <UpOutlined />}
                </button>
            }
        >
            {!collapsed && (
                <div className="flex flex-col md:flex-row gap-8 text-gray-800 font-mono text-sm md:text-base">
                    {/* Left Column – Definitions */}
                    <div className="md:w-1/3 space-y-4">
                        <Title level={4} className="!mb-2 text-blue-700">Symbol Definitions</Title>
                        <ul className="list-disc list-inside space-y-2 leading-relaxed">
                            <li><strong className="text-blue-700">R</strong>: Package Service's Rate</li>
                            <li><strong className="text-blue-700">s</strong>: Distance traveled (in kilometers)</li>
                            <li><strong className="text-blue-700">F</strong>: Total fare</li>
                            <li><strong className="text-blue-700">d₁</strong>: First threshold (e.g., 1 km)</li>
                            <li><strong className="text-blue-700">d₂</strong>: Second threshold (e.g., 5 km)</li>
                            <li><strong className="text-blue-700">m₁</strong>: Flat fare when s ≤ d₁</li>
                            <li><strong className="text-blue-700">m₂</strong>: Fare per km between d₁ and d₂</li>
                            <li><strong className="text-blue-700">m₃</strong>: Fare per km beyond d₂</li>
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
                            <Title level={4} className="!mb-2 text-blue-700">Examples</Title>
                            <ul className="list-disc list-inside space-y-2 leading-relaxed">
                                <li>
                                    <span className="font-semibold text-gray-700">
                                        d₁ = 1km, d₂ = 5km, m₁ = 15000, m₂ = 13000, m₃ = 11000, R = 1x
                                    </span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 0.8km</span> → F = 15000 × 1 = <span className="font-bold text-green-500">15.000 VND</span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 3km</span> → F = (15000 + (3 − 1) × 13000) × 1 = <span className="font-bold text-green-500">41.000 VND</span>
                                </li>
                                <li>
                                    <span className="text-yellow-500">s = 8km</span> → F = (15000 + (5 − 1) × 13000 + (8 − 5) × 11000) × 1 = <span className="font-bold text-green-500">100.000 VND</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
