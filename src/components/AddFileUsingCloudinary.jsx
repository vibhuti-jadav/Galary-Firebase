
import React, { useState, useEffect } from 'react';

const AddFileUsingCloudnary = () => {
  const [file, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); 

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('imageGallery') || '[]');
    setFiles(storedFiles);
  }, []);

 
  useEffect(() => {
    if (file.length > 0) {
      localStorage.setItem('imageGallery', JSON.stringify(file));
    }
  }, [file]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    const data = new FormData();
    data.append('file', selectedFile);
    data.append('upload_preset', 'student');
    data.append('cloud_name', 'dpqbg9fck');

    setLoading(true);

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dpqbg9fck/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const uploadedData = await res.json();
      setFiles((prev) => [...prev, uploadedData]);
    } catch (error) {
      alert('Error uploading the file.');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = (index) => {
    const updatedFiles = file.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    localStorage.setItem('imageGallery', JSON.stringify(updatedFiles));
    setConfirmDelete(null); 
  };

  
  const triggerDeleteConfirmation = (index) => {
    setConfirmDelete(index); 
  };

  
  const cancelDelete = () => {
    setConfirmDelete(null);
  };



  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Image Gallery
      </h1>

      
      <div className="flex justify-center mb-6">
        <input
          type="file"
          onChange={handleFileUpload}
          className="p-3 border border-gray-300 rounded-md shadow-md"
        />
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className={`ml-4 px-6 py-3 rounded-md font-medium text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-all duration-300`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {file.map((f, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
          >
          
            <img
              src={f.url}
              alt={`file-${index}`}
              className="w-full h-48 object-cover transition-all duration-300 cursor-pointer"
              onClick={() => openModal(f.url)} // Open modal on click
            />

           
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerDeleteConfirmation(index); // show confirmation
                }}
                className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
              >
                🗑️
              </button>
            </div>

          
            {confirmDelete === index && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center relative z-30">
                  <p className="text-xl font-semibold mb-4 text-gray-700">
                    Are you sure you want to delete this image?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

           
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xl">View Image</span>
            </div>
          </div>
        ))}
      </div>

     
 
    </div>
  );
};

export default AddFileUsingCloudnary;
