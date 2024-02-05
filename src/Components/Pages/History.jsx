// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import Header2 from "../Header2";
import { useAuth0 } from "@auth0/auth0-react";
import { Trash2 } from "lucide-react";

// Define the History component
function History() {
  const { isAuthenticated, user } = useAuth0();
  // State to store the list of uploaded files
  const [fileList, setFileList] = useState([]);
  const handleDelete = async (fileId) => {
    try {
      const db = getFirestore(app);
      const fileRef = doc(db, 'fileInformation', fileId);
      await deleteDoc(fileRef);
      // Remove the file from the state
      setFileList((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  // Effect to fetch the list of uploaded files from Firestore
  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const db = getFirestore(app);

        // Create a query to filter files based on userName
        const filesQuery = query(
          collection(db, "fileInformation"),
          where("userName", "==", user.email),
          orderBy("uploadDate", "desc"),
        );
       
        
        const filesSnapshot = await getDocs(filesQuery);

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
  }); // Dependency array includes user.email to re-run the effect when the user changes

  return (
    <div className="container">
      <Header2 />
      <h2 className="mt-3 mb-3 text-light">File Upload History</h2>

      {isAuthenticated ? (
        <div className="border border-warning border-2 rounded rounded-3 p-1">
          {fileList.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">File Name</th>
                  <th scope="col">Upload Date</th>
                  <th scope="col">Upload Time</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {fileList.map((file) => (
                  <tr key={file.id}>
                    <td className="w-50">
                      <Link
                        target="_blank"
                        style={{ backgroundColor: "transparent", textDecoration: "none" }}
                        to={`/file-preview/${file.id}`}
                        className="text-light"
                      >
                        {file.filename}
                      </Link>
                    </td>
                    <td>{file.uploadDate}</td>
                    <td>{file.uploadTime}</td>
                    <td>
                      
                      <Link
                        target="_blank"
                        style={{ backgroundColor: "transparent", textDecoration: "none" }}
                        to={`/file-preview/${file.id}`}
                        className="text-light"
                      >
                        {file.shortUrl}
                      </Link>
                    </td>
                    <td>
                        <Trash2 style={{backgroundColor:"transparent", cursor:"pointer"}} size={24} onClick={() => handleDelete(file.id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p className="text-light">No files uploaded yet.</p>
          )}
        </div>
      ) : (
        <p style={{ color: "white" }}>Please login to continue</p>
      )}
    </div>
  );
}

export default History;
