import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import "./../../assets/Preview.css";
import { ArrowLeftSquare, Backpack, Copy, Save } from "lucide-react";
import Header2 from "../Header2";
import { generate } from "../UploadForm/Generate";

function FilePreviewPage() {
  const { docid } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchFileInfo = async () => {
      try {
        if (docid) {
          const docRef = doc(db, "fileInformation", docid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFileInfo(docSnap.data());
          } else {
            console.log("Document does not exist!");
          }
        } else {
          console.log("docid is undefined");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchFileInfo();
  }, [db, docid]);

  const handleCopyClick = () => {
    const textArea = document.createElement("textarea");
    textArea.value = fileInfo.shortUrl;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Copied to clipboard!");
  };
  const handleSavePasswordClick = () => {
    // Save the password logic here
    if (password.trim() !== "") {
      // Password data
      const passwordData =
        isPasswordVisible && password ? { password: password } : {};

      // Merge existing file information with the new passwordData
      const updatedFileInfo = { ...fileInfo, ...passwordData };

      // Update file information in Firestore
      const docRef = doc(db, "fileInformation", docid);
      setDoc(docRef, updatedFileInfo)
        .then(() => {
          console.log("Password saved successfully!");
          alert("Password saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving password:", error);
        });
    }
  };
  const saveInfo = async (file, fileUrl) => {
    const docId = generate().toString();
    const userName = fileInfo.userName || "Unknown User";

    // Password data
    const passwordData =
      isPasswordVisible && password ? { password: password } : {};

    // Store file information in Firestore
    await setDoc(doc(db, "fileInformation", docId), {
      filename: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userName: userName,
      id: docId,
      shortUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}f/${docId}`,
      ...passwordData,
    });

    // Log the file information after storing in Firestore
    console.log("File information stored in Firestore:", {
      filename: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userName: userName,
      id: docId,
      shortUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}f/${docId}`,
      ...passwordData,
    });

    // Redirect to file preview page
    // (You may want to adjust the navigation logic as needed)
    window.location.href = `${
      import.meta.env.VITE_PUBLIC_BASE_URL
    }file-preview/${docId}`;
  };

  return (
    <div className="preview-div container-fluid d-flex align-items-center justify-content-center h-100">
      <div className="container">
        <Header2 />

        <div className="mt-5">
          {fileInfo ? (
            <div className="row pt-3 gap-4 justify-content-center">
              <div className="col-lg-5 col-md-12 p-3 rounded-3 text-center">
                <Save size={150} color="#e2dfdf" className="mb-3" />
                <h2 className="fw-bold">{fileInfo.filename}</h2>
                <p>
                  {fileInfo.fileType}{" "}
                  {(fileInfo.fileSize / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <div className="col-lg-5 col-md-12 p-3 rounded-3">
                <h3>Username: {fileInfo.userName}</h3>
                <h3>Document ID: {fileInfo.id}</h3>
                <div className="d-flex align-items-center border p-2">
                  <h3 className="mb-0 flex-grow-1 shorturl">
                    Short URL: {fileInfo.shortUrl}
                  </h3>
                  <Copy
                    className="copy-icon"
                    style={{ cursor: "pointer" }}
                    color="#aea9b9"
                    width={30}
                    onClick={handleCopyClick}
                  />
                </div>

                {/* Password Input */}
                <div className="mt-3 pw">
                  <label>
                    Enable Password?
                    <input
                      type="checkbox"
                      className="mx-1"
                      checked={isPasswordVisible}
                      onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  </label>
                  {isPasswordVisible && (
                    <div>
                      <input
                        className="w-100 password-input mt-2 mb-1"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        className="btn mt-2"
                        style={{ color: "white" }}
                        onClick={handleSavePasswordClick}
                      >
                        Save Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilePreviewPage;
