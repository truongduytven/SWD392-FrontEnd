import React, { useState } from "react";

const SingleImageUpload = () => {
  var singleFileObj = [];
  var singleFileArray = [];
  const [singleFile, setSingleFile] = useState([]);

  const uploadSingleFiles = (e) => {
    singleFileObj.push(e.target.files);
    singleFileArray.push(URL.createObjectURL(singleFileObj[0][0]));
    setSingleFile(singleFileArray);
  };

  console.log(singleFile.length);

  const uploadFiles = (e) => {
    e.preventDefault();
    console.log(singleFile);
  };

  const removeImage = (index) => {
    console.log("reomve");
    setSingleFile([
      ...singleFile.slice(0, index),
      ...singleFile.slice(index + 1, singleFile.length)
    ]);
  };

  return (
    <>
      <form>
        <div className="container">
          <h1 className="mb-3"> Upload Single Image </h1>
          <div className="form-group multi-preview">
            <div className="row">
              {singleFile.length != 0 &&
                singleFile.map((url, index) => (
                  <div key={url} className="col-md-2">
                    <div className="img-block bg-gray">
                      <img className="img-fluid2" src={url} alt="..." />
                      <span
                        className="remove_img"
                        onClick={() => removeImage(index)}
                      >
                        {" "}
                        {index}{" "}
                      </span>
                    </div>
                  </div>
                ))}

              <div className="col-md-2">
                <div className="form-group">
                  <div className="upload-btn-wrapper">
                    <button className="image-btn"> + </button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={uploadSingleFiles}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={uploadFiles}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default SingleImageUpload;
