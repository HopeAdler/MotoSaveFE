import type { ColumnsType } from 'antd/es/table';

export const fareCalculations = [
  {
    key: '1',
    condition: (
      <span className="text-blue-700 font-semibold">s ≤ 1</span>
    ),
    formula: (
      <>
        F = <span className="text-purple-700">m₁</span> × <span className="text-blue-700">R</span>
      </>
    ),
    note: <span>Total fare for distance from 1km and below</span>,
  },
  {
    key: '2',
    condition: (
      <span className="text-blue-700 font-semibold">1 &lt; s ≤ d₁</span>
    ),
    formula: (
      <>
        F = <span className="text-purple-700">m₁</span> + (s − 1) × <span className="text-purple-700">m₂</span> × <span className="text-blue-700">R</span>
      </>
    ),
    note: <span>Total fare for distance between 1km and <span className="text-purple-700">d₁</span></span>,
  },
  {
    key: '3',
    condition: (
      <span className="text-blue-700 font-semibold">d₁ &lt; s ≤ d₂</span>
    ),
    formula: (
      <>
        F = {'('}
          <span className="text-purple-700">m₁</span>
          + (d₁ − 1) × <span className="text-purple-700">m₂</span>
          + (s − d₁) × <span className="text-purple-700">m₃</span>
        {')'} × <span className="text-blue-700">R</span>
      </>
    ),
    note: <span>Total fare for distance between <span className="text-purple-700">d₁</span> and <span className="text-purple-700">d₂</span></span>,
  },
  {
    key: '4',
    condition: (
      <span className="text-blue-700 font-semibold">s &gt; d₂</span>
    ),
    formula: (
      <>
        F = {'('}
          <span className="text-purple-700">m₁</span>
          + (d₁ − 1) × <span className="text-purple-700">m₂</span>
          + (d₂ − d₁) × <span className="text-purple-700">m₃</span>
          + (s − d₂) × <span className="text-purple-700">m₄</span>
        {')'} × <span className="text-blue-700">R</span>
      </>
    ),
    note: <span>Total fare for distance beyond <span className="text-purple-700">d₂</span></span>,
  },
];

export const fareCalculationColumns: ColumnsType<typeof fareCalculations[0]> = [
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
  },
  {
    title: 'Formula',
    dataIndex: 'formula',
    key: 'formula',
  },
  {
    title: 'Notes',
    dataIndex: 'note',
    key: 'note',
  },
];
