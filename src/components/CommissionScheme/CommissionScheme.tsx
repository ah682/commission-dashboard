const CommissionScheme = () => {
  const commissionBands = [
    { range: '£0 → £5k', rate: '0%', color: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' },
    { range: '£5k → £10k', rate: '10%', color: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
    { range: '£10k → £15k', rate: '15%', color: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
    { range: '£15k → £20k', rate: '20%', color: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
    { range: '£20k+', rate: '25%', color: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  ];

  return (
    <div className="card bg-base-100 shadow-md rounded-lg border border-base-300">
      <div className="card-body p-6">
        {/* Header */}
        <h3 className="text-xl font-bold text-neutral mb-2">Commission Scheme</h3>
        <p className="text-sm text-gray-600 mb-6">
          The static commission scheme for this assignment is as follows:
        </p>

        {/* Commission Bands */}
        <div className="space-y-2 mb-6">
          {commissionBands.map((band, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${band.color} ${band.borderColor}`}
            >
              <span className={`font-medium ${band.textColor}`}>
                {band.range}
              </span>
              <span className={`font-bold ${band.textColor}`}>
                {band.rate} commission
              </span>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="p-4 bg-info/10 rounded-lg border border-info/20">
          <p className="text-sm text-gray-700 leading-relaxed">
            The bands in this scheme work like tax bands. For example, if the user enters a revenue 
            value of <strong>£18,000</strong>, they should see a total commission value of{' '}
            <strong className="text-success">£1,850</strong>, and a breakdown showing that they earned:
          </p>
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>0% (£0) from the first £5k</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>10% (£500) from the next £5k</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>15% (£750) from the next £5k</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">•</span>
              <span>20% (£600) from the remaining £3k</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommissionScheme;