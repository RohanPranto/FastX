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

      if (progress === 100) {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          console.log(file, downloadURL);
          saveInfo(file, downloadURL);
          setUploadCompleted(true);
        });
      }
    });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generate().toString();
    const userName = user?.fullName || 'Unknown User';

    // Store file information in Firestore
    await setDoc(doc(db, "fileInformation", docId), {
      filename: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userName: user.email,
      id: docId,
      shortUrl: `${import.meta.env.VITE_PUBLIC_BASE_URL}f/${docId}`,
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
        <p style={{color:"white"}}>Please login to continue</p>
      )}
    </div>
  );
}

export default UploadPage;
