"use client";
import React, { useState } from 'react';

export default function Page() {
  const [RecordKey, setRecordKey] = useState<number>(0); // Type RecordKey as number
  const [RecordBox, setRecordBox] = useState<string>('01'); // Type RecordBox as string
  const [barcode, setBarcode] = useState<string>(''); // State for barcode input
  const [isChecked, setIsChecked] = useState<boolean>(true); // State for checkbox, default is true
  const [isFailed, setIsFailed] = useState<boolean>(false); // State for failure message

  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(`Form submitted with RecordBox: ${RecordBox}, RecordKey: ${RecordKey}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Create URL-encoded string
    const body = new URLSearchParams();
    body.append('barcode', barcode); // Use the barcode from state
    body.append('location', `${RecordBox}-${RecordKey}`);
    body.append('isChecked', isChecked.toString()); // Add the checkbox value

    try {
      // Send form data to /api/Disk using fetch
      const response = await fetch('/api/Disk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(), // Use URLSearchParams as body
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', result);
        // Reset the form fields after successful submission
        setBarcode(''); // Reset the barcode state
        setIsChecked(true); // Reset the checkbox back to true
        setRecordKey((prevKey) => prevKey + 1); // Increment the RecordKey
        setIsFailed(false); // Reset failure state
      } else {
        setBarcode(''); // Reset the barcode state
        setIsChecked(true); // Reset the checkbox back to true
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
    // Always update the location input based on user input, whether correct or not
    const [box, key] = value.split('-');
    setRecordBox(box || RecordBox); // Default to the current RecordBox if input is invalid
    setRecordKey(parseInt(key, 10) || 0); // Default to 0 if key part is invalid
  };

  return (
    <>
      <form onSubmit={handleSubmit} onKeyUp={handleKeyPress}>
        <label htmlFor="barcode">Barcode</label>
        <input
          name="barcode"
          id="barcode"
          value={barcode} // Controlled input
          onChange={(e) => setBarcode(e.target.value)} // Update state on input change
        />
        <br />
        <label htmlFor="location">Location</label>
        <input
          name="location"
          value={`${RecordBox}-${RecordKey}`} // Controlled value
          onChange={handleLocationChange} // Update location on change
          id="location"
        />
        <br />
        <label htmlFor="checkbox">Checked</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={isChecked} // Controlled checkbox
          onChange={(e) => setIsChecked(e.target.checked)} // Update checkbox state
        />
        <br />
        <button type="submit">Submit</button> {/* Submit button for form */}
      </form>
      {isFailed && <h1>Submission failed. Please try again.</h1>}
    </>
  );
}
