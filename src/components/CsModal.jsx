import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CsModal = ({ event, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    institute: '',
    phone: '',
    email: '',
    eventCategory: '',
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
    if (!formData.name || !formData.institute || !formData.phone || !formData.email || !formData.eventCategory) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all fields.',
        icon: 'error',
      });
      return;
    }

    console.log('Registration form submitted:', formData);

    Swal.fire({
      title: 'Registration successful!',
      text: 'A confirmation mail will be sent to your email address.',
      icon: 'success',
    });

    closeModal(); 
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="institute" className="block text-sm font-medium text-gray-700">Institute Name:</label>
            <input type="text" id="institute" name="institute" value={formData.institute} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="eventCategory" className="block text-sm font-medium text-gray-700">Event Category:</label>
            <select id="eventCategory" name="eventCategory" value={formData.eventCategory} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="">Select Event Category</option>
              <option value="Web">Web</option>
              <option value="App">App</option>
              <option value="Mobile">Mobile</option>
              <option value="Prototype Contest">Prototype Contest</option>
            </select>
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

export default CsModal;
