import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Upload from '../UploadForm/Upload';
import { useAuth0 } from '@auth0/auth0-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import { generate } from '../UploadForm/Generate';

function UploadPage() {
  const { isAuthenticated, user } = useAuth0();
  const [progress, setProgress] = useState();
  const [fileDocId, setFileDocId] = useState();
  const [uploadCompleted, setUploadCompleted] = useState();
  const storage = getStorage();
  const db = getFirestore(app);
  const navigate = useNavigate();

  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "file-upload/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
  
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress);
  
      // Check if the upload is complete
      if (progress === 100) {
        // Get the download URL when the upload is complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            console.log(file, downloadURL);
            saveInfo(file, downloadURL);
            setUploadCompleted(true);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    });
  };
  

  const saveInfo = async (file, fileUrl) => {
    const docId = generate().toString();
    const userName = user?.fullName || 'Unknown User';

    const currentDate = new Date();
    const uploadDate = `${padNumber(currentDate.getDate())}-${padNumber(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`;
    const uploadTime = `${padNumber(currentDate.getHours())}:${padNumber(currentDate.getMinutes())}:${padNumber(currentDate.getSeconds())}`;


    // Store file information in Firestore
    await setDoc(doc(db, "fileInformation", docId), {
      filename: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userName: user.email,
      id: docId,
      shortUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}f/${docId}`,
      uploadDate,
      uploadTime,
    });

    // Log the file information after storing in Firestore
    console.log("File information stored in Firestore:", {
      filename: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userName: user.email,
      id: docId,
      shortUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}f/${docId}`,
      uploadDate,
      uploadTime,
    });

    setFileDocId(docId);
    navigate(`/file-preview/${docId}`);
  };

  useEffect(() => {
    if (uploadCompleted) {
      navigate(`/file-preview/${fileDocId}`);
    }
  }, [uploadCompleted, fileDocId, navigate]);

  return (
    <div>
      {isAuthenticated ? (<div className='text-center'>
        <Upload uploadBtnClick={(file) => uploadFile(file)} progress={progress} />
      </div>):
      (
        <div className="container mt-5">
          <h2 style={{color:"white"}}>Please login to continue</h2>
          <h6 style={{color:"white"}}>Loading...</h6>
        </div>
      )}
    </div>
  );
}
function padNumber(number) {
  return String(number).padStart(2, "0");
}
export default UploadPage;
