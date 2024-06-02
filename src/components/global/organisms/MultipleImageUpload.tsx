import React, { useState } from "react";

const MultipleImageUpload = () => {
  var multipleFileObj = [];
  var multipleFileArray = [];

  const [multipleFile, setMultipleFile] = useState([]);

  const uploadMultipleFiles = (e) => {
    multipleFileObj.push(e.target.files);
    for (let i = 0; i < multipleFileObj[0].length; i++) {
      multipleFileArray.push(URL.createObjectURL(multipleFileObj[0][i]));
    }
    setMultipleFile(multipleFileArray);
  };

  console.log(multipleFileArray?.[0]);

  const uploadFiles = (e) => {
    e.preventDefault();
    console.log(multipleFile);
  };

  const removeImage = (index) => {
    console.log("reomve");
    console.log(index);
    setMultipleFile([
      ...multipleFileArray.slice(0, index),
      ...multipleFileArray.slice(index + 1, multipleFileArray.length)
    ]);
  };

  return (
    <>
      <form>
        {/* <div className="container">
                    <h1 className="mb-3">  Select Multiple Image </h1>
                    <div className="form-group multi-preview">
                        <div className='row'>
                            {multipleFile.length != 0 && (multipleFile).map(url => (
                                <div className="col-md-2">
                                    <img  className='img-fluid' src={url} alt="..." />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple/>
                    </div>
                    <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
                </div> */}

        <div className="container">
          <h1 className="mb-3">Select Multiple Image </h1>
          <div className="form-group multi-preview">
            <div className="row">
              {multipleFile.length != 0 &&
                multipleFile.map((url, index) => (
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

              {/* {multipleFile.length > 3  ?  */}
              {/* null : */}
              <div className="col-md-2">
                <div className="form-group">
                  <div className="upload-btn-wrapper">
                    <button className="image-btn"> + </button>
                    <input
                      type="file"
                      name="myfile"
                      onChange={uploadMultipleFiles}
                      multiple
                    />
                  </div>
                </div>
              </div>
              {/* }                             */}
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

export default MultipleImageUpload;
