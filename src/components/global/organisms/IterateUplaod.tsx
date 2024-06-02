import React, { useState, ChangeEvent, FormEvent } from 'react';

const IterateUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const uploadFiles = () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    console.log('Form Data:', formData);
    console.log('Form Data:', files);
    // You can now send formData to the backend
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => [
      ...prevFiles.slice(0, index),
      ...prevFiles.slice(index + 1)
    ]);
  };

  return (
    <>
      <form>
        <div className="container">
          <h1 className="mb-3">Add Image one by one</h1>
          <div className="form-group multi-preview">
            <div className="row">
              {files.map((file, index) => (
                <div key={index} className="col-md-2">
                  <div className="img-block bg-gray">
                    <img className="img-fluid2" src={URL.createObjectURL(file)} alt="..." />
                    <span className="remove_img" onClick={() => removeFile(index)}>X</span>
                  </div>
                </div>
              ))}
              {files.length < 3 && (
                <div className="col-md-2">
                  <div className="form-group">
                    <div className="upload-btn-wrapper">
                      <button className="image-btn">+</button>
                      <input
                        type="file"
                        name="myfile"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={uploadFiles}
            disabled={files.length === 0}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default IterateUpload;
