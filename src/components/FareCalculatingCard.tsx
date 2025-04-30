import { CodeOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Card, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { fareCalculationColumns, fareCalculations } from "../models/FareCalculations";

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
                        <CodeOutlined /> Distance Fare Calculation
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
                            <li><strong className="text-blue-700">R</strong>: Package service's multiplier rate</li>
                            <li><strong className="text-blue-700">s</strong>: Distance traveled (in kilometers)</li>
                            <li><strong className="text-blue-700">F</strong>: Total fare</li>
                            <li><strong className="text-blue-700">d₁</strong>: First threshold (e.g., 5 km)</li>
                            <li><strong className="text-blue-700">d₂</strong>: Second threshold (e.g., 10 km)</li>
                            <li><strong className="text-blue-700">m₁</strong>: Fixed fare for the first 1 km</li>
                            <li><strong className="text-blue-700">m₂</strong>: Fare per km from 1 km to d₁</li>
                            <li><strong className="text-blue-700">m₃</strong>: Fare per km from d₁ to d₂</li>
                            <li><strong className="text-blue-700">m₄</strong>: Fare per km beyond d₂</li>
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
