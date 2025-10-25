import QuarterlyTargetCard from '../QuarterlyTargets/QuarterlyTargetCard';

const QuarterlyTargets = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral">Quarterly Targets</h2>
        <div className="badge badge-outline badge-primary">This Quarter</div>
      </div>

      {/* Target Cards - Horizontal Grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max lg:grid lg:grid-cols-4 lg:min-w-0">
          {/* Quarterly Revenue Target */}
          <div className="w-64 lg:w-auto">
            <QuarterlyTargetCard
              label="Quarterly Revenue Target"
              subtitle="Total Revenue Booked"
              current={61740}
              target={45000}
              unit="£"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              color="success"
            />
          </div>

          {/* Quarterly Team Revenue Target */}
          <div className="w-64 lg:w-auto">
            <QuarterlyTargetCard
              label="Quarterly Team Revenue Target"
              subtitle="Total Revenue Booked"
              current={469790}
              target={587870}
              unit="£"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              color="warning"
            />
          </div>

          {/* Quarterly Jobs Added Target */}
          <div className="w-64 lg:w-auto">
            <QuarterlyTargetCard
              label="Quarterly Jobs Added Target"
              subtitle="Jobs Added"
              current={23}
              target={15}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              color="success"
            />
          </div>

          {/* Quarterly BD Calls Target */}
          <div className="w-64 lg:w-auto">
            <QuarterlyTargetCard
              label="Quarterly BD Calls Target"
              subtitle="BD Calls"
              current={16}
              target={70}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              color="error"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuarterlyTargets;