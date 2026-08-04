import React from 'react';

const TabNavigation = ({ showPreview, setShowPreview, hasGenerated }) => {
    return (
        <div className='flex gap-4 mb-6 border-b border-gray-200'>
            <button
                onClick={() => setShowPreview(false)}
                className={`px-4 py-2 font-semibold transition ${
                    !showPreview ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                Edit
            </button>
            <button
                onClick={() => setShowPreview(true)}
                disabled={!hasGenerated}
                className={`px-4 py-2 font-semibold transition ${
                    showPreview
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
                Preview
            </button>
        </div>
    );
};

export default TabNavigation;
