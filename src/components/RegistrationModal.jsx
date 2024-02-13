import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegistrationModal = ({ event, closeModal }) => {
  const [formData, setFormData] = useState({
    aiubId: '',
    name: '',
    reasonToJoin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!formData.aiubId || !formData.name || !formData.reasonToJoin) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all fields.',
        icon: 'error',
      });
      return;
    }

    // Your registration submission logic here
    console.log('Registration form submitted:', formData);

    // Show success message
    Swal.fire({
      title: 'Registration successful!',
      text: 'A confirmation mail will go in your account.',
      icon: 'success',
    });

    closeModal(); // Close the modal after successful submission
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name(AIUB format): </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="aiubId" className="block text-sm font-medium text-gray-700">Enter your ID: </label>
            <input type="text" id="aiubId" name="aiubId" value={formData.aiubId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Enter your mail: </label>
            <input type="text" id="name" name="mail" value={formData.mail} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="reasonToJoin" className="block text-sm font-medium text-gray-700">Why do you want to join?</label>
            <textarea id="reasonToJoin" name="reasonToJoin" value={formData.reasonToJoin} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={closeModal} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
