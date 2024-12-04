import React from 'react';
const LoadingSpinner = () => {
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
          Loading
        </div>
    </div>
};

export default LoadingSpinner;