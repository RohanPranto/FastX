import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import download from "../../assets/download-file.gif";
import rocket from "../../assets/rocket.png";

function ReceiverPage() {
  const { shorturl } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true); // Default to true if no password is set
  const db = getFirestore(app);

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        const docRef = doc(db, "fileInformation", shorturl);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFileInfo(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          console.log("Document does not exist!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchFileInfo();
  }, [db, shorturl]);

  const handlePasswordSubmit = () => {
    // Check if the entered password is correct
    const enteredPassword = password.trim();
    const correctPassword = fileInfo?.password || ""; // Retrieve the correct password from fileInfo

    setIsPasswordCorrect(enteredPassword === correctPassword);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      {fileInfo ? (
        <div className="receiver_div text-center">
          <h3 style={{backgroundColor:"white"}}> <strong style={{backgroundColor:"white"}}>{fileInfo.userName}</strong> shared a file!</h3>
          <img
            style={{ backgroundColor: "white" }}
            src={download}
            alt={fileInfo.filename}
            className="w-25"
          />
          <h2 style={{ backgroundColor: "white", fontWeight: "800" }}>
            {fileInfo.filename}
          </h2>
          <p>
            {(fileInfo.fileSize / (1024 * 1024)).toFixed(2)}mb &nbsp;
            {fileInfo.fileType}
          </p>
          {fileInfo.password && (
            <div style={{ backgroundColor: "white" }}>
              <input
                type="password"
                placeholder="Enter password"
                className="text-center rounded-3 mb-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "black", backgroundColor: "white" }}
              />
            </div>
          )}
          {fileInfo.password == password && (
            <Link
              className="btn btn-primary"
              style={{ border: "none" }}
              to={fileInfo.fileUrl}
            >
              Download
            </Link>
          )}{" "}
          <br />
          <small style={{ backgroundColor: "white" }}>
            powered by{" "}
            <img
              src={rocket}
              style={{ backgroundColor: "white" }}
              width={20}
              alt="logo"
            />{" "}
            <strong style={{ backgroundColor: "white" }}>
                <Link to="/" style={{backgroundColor:"white", textDecoration:"none"}}>FastX</Link>
            </strong>
          </small>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default ReceiverPage;
