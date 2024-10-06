"use client";
import React, { useState } from 'react';

export default function Page() {
  const [RecordKey, setRecordKey] = useState<number>(0);
  const [RecordBox, setRecordBox] = useState<string>('01');
  const [barcode, setBarcode] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(`Form submitted with RecordBox: ${RecordBox}, RecordKey: ${RecordKey}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new URLSearchParams();
    body.append('barcode', barcode);
    body.append('location', `${RecordBox}-${RecordKey}`);
    body.append('isChecked', isChecked.toString());

    try {
      const response = await fetch('/api/Disk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', result);
        setBarcode('');
        setIsChecked(true);
        setRecordKey((prevKey) => prevKey + 1);
        setIsFailed(false);
      } else {
        setBarcode('');
        setIsChecked(true);
        console.error('Form submission error:', result);
        setIsFailed(true);
      }
    } catch (error) {
      setIsFailed(true);
      console.error('Form submission failed:', error);
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [box, key] = value.split('-');
    setRecordBox(box || RecordBox);
    setRecordKey(parseInt(key, 10) || 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        onKeyUp={handleKeyPress} 
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-lg font-semibold mb-4">Barcode Submission Form</h2>

        <label htmlFor="barcode" className="block mb-1 font-medium">Barcode</label>
        <input
          name="barcode"
          id="barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="border border-gray-300 p-2 rounded mb-4 w-full"
          required
        />

        <label htmlFor="location" className="block mb-1 font-medium">Location</label>
        <input
          name="location"
          value={`${RecordBox}-${RecordKey}`}
          onChange={handleLocationChange}
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
