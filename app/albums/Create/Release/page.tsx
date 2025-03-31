"use client";
import React, { useState } from 'react';
import SliderTabs from '@/components/Slider'; // Assuming the slider is in the same folder
// import { cookies } from 'next/headers';

export default function ReleasePage() {
  const [RecordKey, setRecordKey] = useState<number>(0);
  const [RecordBox, setRecordBox] = useState<string>('01');
  const [Release, setRelease] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const allowed = fetch('http://localhost:3001/api/user', {
    method: 'GET',
  })
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(Release);
      console.log(`Form submitted with RecordBox: ${RecordBox}, RecordKey: ${RecordKey}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new URLSearchParams();
    console.log(Release);
    body.append('Release', Release);
    body.append('location', `${RecordBox}-${RecordKey}`);
    body.append('isChecked', isChecked.toString());

    try {
      const response = await fetch('/api/Disk/Release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', result);
        setRelease('');
        setIsChecked(true);
        setRecordKey((prevKey) => prevKey + 1);
        setIsFailed(false);
      } else {
        setRelease('');
        setIsChecked(true);
        console.error('Form submission error:', result);
        setIsFailed(true);
      }
    } catch (error) {
      setIsFailed(true);
      console.error('Form submission failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SliderTabs currentPage='release' />
      <form 
        onSubmit={handleSubmit} 
        onKeyUp={handleKeyPress} 
        className="bg-white p-6 rounded shadow-md w-80 mt-12"
      >
        <h2 className="text-lg font-semibold mb-4">Release Submission Form</h2>

        <label htmlFor="Release" className="block mb-1 font-medium">Release</label>
        <input
          name="Release"
          id="Release"
          value={Release}
          onChange={(e) => setRelease(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
          required
        />

        <label htmlFor="location" className="block mb-1 font-medium">Location</label>
        <input
          name="location"
          // value={`${RecordBox}-${RecordKey}`}
          onChange={(e) => setRecordBox(e.target.value)}
          id="location"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
          required
        />

        <label htmlFor="checkbox" className="flex items-center mb-4">
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          Checked
        </label>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 w-full"
        >
          Submit
        </button>
      </form>

      {isFailed && <h1 className="text-red-500 mt-4">Submission failed. Please try again.</h1>}
    </div>
  );
}
