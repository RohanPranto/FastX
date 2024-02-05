// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Hero from "./Components/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./Components/Pages/UploadPage";
import FilePreviewPage from "./Components/Pages/FilePreviewPage";
import ReceiverPage from "./Components/Pages/ReceiverPage";
import History from "./Components/Pages/History";
// import OffCanvas from './Components/OffCanvas'
function App() {
  return (
    <Router>
      <div>  
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/history" element={<History/>} />
          <Route path="/file-preview/:docid" element={<FilePreviewPage />} />
          <Route path="/f/:shorturl" element={<ReceiverPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
