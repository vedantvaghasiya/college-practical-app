import React, { useRef } from 'react';
import { Excalidraw, exportToCanvas, exportToSvg } from '@excalidraw/excalidraw';
import Navbar from './Navbar';

const Whiteboard = () => {
  const excalidrawRef = useRef(null);

  const handleExportAsImage = () => {
    const canvas = exportToCanvas({
      elements: excalidrawRef.current.getSceneElements(),
    });
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
  };

  const handleExportAsSVG = () => {
    const svg = exportToSvg({
      elements: excalidrawRef.current.getSceneElements(),
    });
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'whiteboard.svg';
    link.click();
  };

  return (
    <>
      <Navbar />
      <div style={{ width: 'calc(100% - 30px)', height: 'calc(100vh - 94px)', background: 'black', margin: '15px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button onClick={handleExportAsImage}>Export as Image</button>
          <button onClick={handleExportAsSVG}>Export as SVG</button>
        </div>
        <Excalidraw
          ref={excalidrawRef}
          initialData={{
            elements: [],
            appState: {
              ...Excalidraw.defaultAppState,
              backgroundColor: '#000000', // Set the background color to black
              theme: 'dark', // Set the theme to dark
            },
          }}
        />
      </div>
    </>
  );
};

export default Whiteboard;
