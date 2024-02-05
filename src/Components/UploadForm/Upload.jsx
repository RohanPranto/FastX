import React, { useEffect, useState } from "react";
import Header2 from "../Header2";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import { File, UploadCloud } from "lucide-react";

function Upload({ uploadBtnClick, progress }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState('');

  const onFileSelect = (file) => {
    console.log(file);
    if (file && file.size > 5000000) {
      setErrorMsg("File size is too big");
      console.log("File size is larger than 5MB");
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };
  const handleRemoveFile = () => {
    setFile(null);
    setErrorMsg(null);
  };
  const handleUploadClick = () => {
    if (file) {
      uploadBtnClick(file);

      // Save password if enabled
      if (enablePassword) {
        // You can add your logic to save the password here
        console.log('Password saved:', password);
      }
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setUploadComplete(true);
    }
  }, [progress]);

  return (
    <div className="container">
      <Header2 />
      <h1 className="mt-5 text-center">Start uploading files and share it!</h1>{" "}
      <br />
      {file ? (
         <FilePreview file={file} removeFile={handleRemoveFile} />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center rounded-5 upload" style={{border:"3px solid #e1f240", backgroundColor:"#13161b"}}>
          <label
            htmlFor="dropzone-file"
            className="d-flex flex-column align-items-center justify-content-center rounded-lg" 
          >
            <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-6" >
              <UploadCloud style={{color:"#fff"}} size={150} />
              <p className="mb-2 text-sm" style={{color:"#fff"}}>
                Click to upload or drag
                and drop (Max 5MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => onFileSelect(event.target.files[0])}
            />
          </label>
        </div>
      )}
      {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}
      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <div className="text-center">
          <button
            disabled={!file}
            className={`p-2 ${
              !file ? "btn btn-secondary" : "hover:bg-blue-700"
            } w-[30%] rounded-full mt-5`}
            onClick={handleUploadClick}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
