import React, { useState } from 'react';
import axios from 'axios';
import Userpanel from '@/components/ui/Userpanel';
import { useStore } from '../store/Store';
import { Upload, Check, AlertCircle , BookDown , CloudUpload } from 'lucide-react';

const Worksheet_user = () => {
  const user = useStore((state) => state.user);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      setStatus('error');
      setErrorMessage('Please select a file first');
      return;
    }

    setStatus('loading');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', user._id);
    
    try {
      const response = await axios.post('http://localhost:3000/submitfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('success');
      setTimeout(() => {
        setFile(null);
        setFileName('');
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Userpanel />
      <div className="flex flex-1 items-center justify-center ">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white">Upload Worksheet</h2>
              <p className="text-blue-100 mt-1">Upload your file to continue</p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="file-upload"
                    className={`
                      relative flex flex-col items-center justify-center w-full h-32
                      border-2 border-dashed rounded-lg cursor-pointer
                      transition-colors duration-300
                      ${fileName ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className={`w-8 h-8 mb-2 ${fileName ? 'text-blue-500' : 'text-gray-400'}`} />
                      {!fileName ? (
                        <div className="text-center">
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Any file format supported</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-600 truncate max-w-xs">
                            {fileName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {status === 'error' && (
                  <div className="flex items-center p-3 text-sm text-red-800 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`
                    w-full flex items-center justify-center gap-2 px-4 py-3 
                    rounded-lg text-base font-medium transition-all duration-300
                    ${status === 'loading' ? 'bg-blue-400 text-white cursor-not-allowed' : 
                      status === 'success' ? 'bg-green-500 text-white cursor-not-allowed' : 
                      'bg-blue-600 text-white hover:bg-blue-700'}
                  `}
                >
                  {status === 'loading' && (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  )}
                  {status === 'success' && <Check className="w-5 h-5" />}
                  {status === 'loading' ? 'Uploading...' : 
                   status === 'success' ? 'Uploaded Successfully' : 'Upload File'}
                   <span><CloudUpload></CloudUpload></span>
                </button>
              </form>
              <button className=' mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white bg-blue-600'>
                  <a 
                  href={user.worksheet}
                  >Preview your worksheet </a> 
                  <span><BookDown></BookDown></span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worksheet_user;