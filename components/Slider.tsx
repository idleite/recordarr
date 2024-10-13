"use client";

import React from 'react';
import Link from 'next/link';

interface SliderTabsProps {
  currentPage: 'barcode' | 'release'; // Prop to determine the active tab
}

const SliderTabs: React.FC<SliderTabsProps> = ({ currentPage }) => {
  return (
    <div className="relative w-full bg-gray-200 shadow-md py-2 mb-6 rounded-lg">
      <div className="flex justify-center items-center space-x-6">
        {/* Barcode Page Tab */}
        <Link href="/albums/Create">
          <button
            className={`px-6 py-2 font-semibold rounded-lg transition-colors duration-300 ease-in-out ${
              currentPage === 'barcode'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-100'
            }`}
          >
            Barcode Page
          </button>
        </Link>

        {/* Release Page Tab */}
        <Link href="/albums/Create/Release">
          <button
            className={`px-6 py-2 font-semibold rounded-lg transition-colors duration-300 ease-in-out ${
              currentPage === 'release'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-100'
            }`}
          >
            Release Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SliderTabs;
