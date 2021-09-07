import React, { useState } from 'react';

import FileListProperties from './components/FileProperties';
import Header from './components/Header';
import FileUploader from './components/FileUploader';

import './App.css';

export default function App() {
  const [data, setData] = useState([]);

  const handleProperties = props => {
    setData([...data, props].reverse());
  }
  const handleDelete = id => {
    let index = data.findIndex(i => i.id === id);
    data.splice(index, 1);
    setData([...data]);
  }
  return (
    <div className="App">
      <Header />
      <FileUploader addToFilePropList={handleProperties} />
      <FileListProperties data={data} deleteFile={handleDelete} />
    </div>
  );
}

