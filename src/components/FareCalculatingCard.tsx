import { useState } from "react";
import { Card } from "antd";
import { CodeOutlined, InfoCircleOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";

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
                <div className="flex gap-4">
                    <Card
                        className="flex-1 rounded-2xl shadow-md bg-gray-50 hover:shadow-xl transition-shadow duration-300"
                        title={
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <InfoCircleOutlined /> Symbol Definitions
                            </div>
                        }
                    >
                        <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                            <li><strong className="text-blue-700">R</strong>: Package Service's Rate</li>
                            <li><strong className="text-blue-700">s</strong>: Distance traveled (in kilometers)</li>
                            <li><strong className="text-blue-700">F</strong>: Total fare</li>
                            <li><strong className="text-blue-700">d₁</strong>: First threshold (km, e.g., 1 km)</li>
                            <li><strong className="text-blue-700">d₂</strong>: Second threshold (km, e.g., 5 km)</li>
                            <li><strong className="text-blue-700">m₁</strong>: Flat fare when s ≤ d₁</li>
                            <li><strong className="text-blue-700">m₂</strong>: Fare per km between d₁ and d₂</li>
                            <li><strong className="text-blue-700">m₃</strong>: Fare per km beyond d₂</li>
                        </ul>
                    </Card>

                    <div className="flex-1 relative font-mono text-sm md:text-base space-y-6 text-gray-800">
                        <div>
                            <span className="text-blue-600 font-semibold">If</span>{" "}
                            <span className="text-purple-700">s ≤ d₁</span>:<br />
                            <span className="pl-6 block text-gray-700">
                                F = <span className="text-purple-700">m₁</span> × <span className="text-blue-700">R</span>
                            </span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-semibold">If</span>{" "}
                            <span className="text-purple-700">d₁ &lt; s ≤ d₂</span>:<br />
                            <span className="pl-6 block text-gray-700">
                                F = (<span className="text-purple-700">m₁</span> + (s - d₁) × <span className="text-purple-700">m₂</span>) × <span className="text-blue-700">R</span>
                            </span>
                        </div>
                        <div>
                            <span className="text-blue-600 font-semibold">If</span>{" "}
                            <span className="text-purple-700">s &gt; d₂</span>:<br />
                            <span className="pl-6 block text-gray-700">
                                F = (<span className="text-purple-700">m₁</span> + (d₂ - d₁) × <span className="text-purple-700">m₂</span> + (s - d₂) × <span className="text-purple-700">m₃</span>) × <span className="text-blue-700">R</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
