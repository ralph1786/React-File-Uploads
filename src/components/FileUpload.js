import React, { Fragment, useState } from "react";
import Message from "./Message";
import ProgressBar from "./ProgressBar";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round(progressEvent.loaded * 100) / progressEvent.total
              )
            );
            setTimeout(() => setUploadPercentage(0), 5000);
          }
        }
      );
      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File Successfully Uploaded");
    } catch (error) {
      if (error.response.status === 500) {
        setMessage("there was a problem with the server");
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message message={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <ProgressBar percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {Object.keys(uploadedFile).length > 0 ? (
        <div className="row mt-5">
          <div className="md-6 m-auto">
            <h3>{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
              alt="no file"
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default FileUpload;
