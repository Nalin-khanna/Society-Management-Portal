import React from 'react'
import axios from 'axios';

const Worksheet_user = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        const fileInput = event.target.elements.files;
        
        if (!fileInput.files || fileInput.files.length === 0) {
          console.log('No file selected');
          return;
        }
    
        formData.append('file', fileInput.files[0]);
    
        try {
          const response = await axios.post('http://localhost:3000/submitfile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Upload successful:', response.data);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      };    
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Upload File</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="files" className="block text-gray-600 font-medium">
                Select a file:
              </label>
              <input 
                id="files" 
                type="file" 
                className="w-full p-2 border rounded-md text-gray-700"
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      );
}

export default Worksheet_user