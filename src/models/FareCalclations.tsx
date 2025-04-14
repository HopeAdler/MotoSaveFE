import type { ColumnsType } from 'antd/es/table';

export const fareCalculations = [
    {
        key: '1',
        condition: (
            <>
                <span className="text-blue-700 font-semibold">s ≤ 1</span>
            </>
        ),
        formula: (
            <>
                F = <span className="text-purple-700">m₁</span> × <span className="text-blue-700">R</span>
            </>
        ),
        note: (
            <span> Cước phí cố định từ 1km trở xuống
            </span>
        )
    },
    {
        key: '2',
        condition: (
            <>
                <span className="text-blue-700 font-semibold">1 &lt; s ≤ d₁</span>
            </>
        ),
        formula: (
            <>
                F = <span className="text-purple-700">m₁</span> × s x <span className="text-blue-700">R</span>
            </>
        ),
        note: (
            <span> Cước phí cho mỗi km trong khoảng <span className="text-purple-700">d₁</span> km đầu</span>
        )
    },
    {
        key: '3',
        condition: (
            <span className="text-blue-700 font-semibold">d₁ &lt; s ≤ d₂</span>
        ),
        formula: (
            <>
                F = (<span className="text-purple-700">m₁</span> + (s - d₁) × <span className="text-purple-700">m₂</span>) × <span className="text-blue-700">R</span>
            </>
        ),
        note: (

            <span> Cước phí cho mỗi km đi từ khoảng <span className="text-purple-700">d₁ </span>
                đến <span className="text-purple-700">d₂</span> km</span>
        )
    },
    {
        key: '4',
        condition: (
            <>
                <span className="text-blue-700 font-semibold">s &gt; d₂</span>
            </>
        ),
        formula: (
            <>
                F = (<span className="text-purple-700">m₁</span> + (d₂ - d₁) × <span className="text-purple-700">m₂</span> + (s - d₂) × <span className="text-purple-700">m₃</span>) × <span className="text-blue-700">R</span>
            </>
        ),
        note: (
            <span> Cước phí cho mỗi km đi từ <span className="text-purple-700">d₂</span> km trở đi</span>
        )
    },
];

export const fareCalculationColumns: ColumnsType<typeof fareCalculations[0]> = [
    {
        title: "Condition",
        dataIndex: 'condition',
        key: 'condition',
    },
    {
        title: "Formular",
        dataIndex: 'formula',
        key: 'formula',
    },
    {
        title: "Notes",
        dataIndex: 'note',
        key: 'note',
    },
];
