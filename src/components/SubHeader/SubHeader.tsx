import { useState } from 'react';
import WidgetConfigModal from '../WidgetConfigModal/WidgetConfigModal';

const SubHeader = () => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  return (
    <>
      <div className="bg-base-100 border-b border-base-300 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral">Recruiter Dashboard</h1>
            <button className="btn btn-ghost btn-sm">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {/* User Alert Badge */}
            <div className="flex items-center gap-2 text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">User: Alena Bailey</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Period Dropdown */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-md bg-white border border-gray-300 hover:bg-gray-50 normal-case font-normal text-neutral gap-4 min-w-[140px] justify-between px-4 h-11"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Period:</span>
                  <span className="text-base font-semibold">Default</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52 mt-2 border border-gray-200"
              >
                <li><a className="font-semibold text-neutral hover:bg-gray-100">Today</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">This Week</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">This Month</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">This Quarter</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">This Year</a></li>
              </ul>
            </div>

            {/* Entity Dropdown */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-md bg-white border border-gray-300 hover:bg-gray-50 normal-case font-normal text-neutral gap-4 min-w-[140px] justify-between px-4 h-11"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Entity:</span>
                  <span className="text-base font-semibold">Default</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52 mt-2 border border-gray-200"
              >
                <li><a className="font-semibold text-neutral hover:bg-gray-100">All Entities</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">Entity 1</a></li>
                <li><a className="font-semibold text-neutral hover:bg-gray-100">Entity 2</a></li>
              </ul>
            </div>

            {/* Widget Button - NOW WITH MODAL FUNCTIONALITY */}
            <button 
              onClick={() => setIsConfigModalOpen(true)}
              className="btn btn-md normal-case text-white font-bold gap-2 border-none hover:opacity-90 shadow-md px-5 h-11 text-base" 
              style={{ backgroundColor: '#4065FF' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Widget
            </button>

            {/* Share Icon */}
            <button className="btn btn-md btn-square bg-white border border-gray-300 hover:bg-gray-50 h-11 w-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>

            {/* More Options */}
            <button className="btn btn-md btn-square bg-white border border-gray-300 hover:bg-gray-50 h-11 w-11">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Widget Configuration Modal */}
      <WidgetConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />
    </>
  );
};

export default SubHeader;