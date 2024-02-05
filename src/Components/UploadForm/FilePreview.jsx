import { File, Trash2 } from 'lucide-react';
import React from 'react';

function FilePreview({ file, removeFile }) {
  return (
    <div className="mt-2 rounded-4 p-2 " style={{width:"80%" , marginLeft:"auto" , marginRight:"auto", border:"2px #e1f240 solid" }}>
      <div className=" align-items-center p-2">
        <File color='#e1f240' size={48} />
        <div className="text-left">
          <h2 style={{color:"#fff"}}>{file.name}</h2>
          <h6 className="text" style={{color:"#fff"}}>
            {file.type} {(file.size / 1024 / 1024).toFixed(2)} MB
          </h6>
        </div>
        <Trash2 style={{backgroundColor:"transparent", cursor:"pointer", color:"red"}} size={24} onClick={removeFile}/>
      </div>
    </div>
  );
}

export default FilePreview;
