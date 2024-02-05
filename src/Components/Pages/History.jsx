// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

// Define the History component
function History() {
  // State to store the list of uploaded files
  const [fileList, setFileList] = useState([]);

  // Effect to fetch the list of uploaded files from Firestore
  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const db = getFirestore(app);
        const filesCollection = collection(db, "fileInformation");
        const filesSnapshot = await getDocs(filesCollection);

        // Extract file information from the snapshot
        const files = filesSnapshot.docs.map((doc) => doc.data());

        // Update the state with the file list
        setFileList(files);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    // Call the fetchFileList function
    fetchFileList();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-light">File Upload History</h2>

<div className="border border-warning border-2 rounded rounded-3 p-1">
{fileList.length > 0 ? (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Upload Date</th>
              <th scope="col">Short URL</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((file) => (
              <tr key={file.id}>
                <td>
                <Link to={`/file-preview/${file.id}`} className="text-light">
                    {file.filename}
                  </Link>
                </td>
                <td>{new Date(file.uploadDate?.seconds * 1000).toLocaleString()}</td>
                <td>
                  <Link to={`/file-preview/${file.id}`} className="text-light">
                    {file.shortUrl}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-light">No files uploaded yet.</p>
      )}
</div>
    </div>
  );
}

export default History;
