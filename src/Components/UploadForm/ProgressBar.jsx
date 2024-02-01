import React from 'react';

function ProgressBar({ progress = 100 }) {
  const progressBarStyle = {
    background: '#ccc',
    height: '12px',
    width: '100%',
    marginTop: '13px',
    borderRadius: '10px',
  };

  const progressFillStyle = {
    background: '#3498db', // Use your preferred color
    height: '100%',
    width: `${progress}%`,
    padding: '0.2em',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '7px',
    fontWeight: 'bold',
  };

  return (
    <div style={progressBarStyle}>
      <div style={progressFillStyle}>
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
