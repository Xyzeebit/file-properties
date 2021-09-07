import React, { useState, useRef } from 'react'

import { nanoid } from 'nanoid';

let fileProps = null;

const FileUploader = ({ addToFilePropList }) => {
    const [fileValue, setFileValue] = useState('');
    const [extension, setExtension] = useState('upload');

    const uploadBtn = useRef(null);
    const progressbarRef = useRef(null);
    const barWidthRef = useRef(null);
    const progressRef = useRef(null);

    let barWidth = 0;
    let interval = null;
    

    const makeProgress = () => {
        interval = setInterval(() => {
            barWidth += 1;
            progressRef.current.innerHTML = `Uploading... ${barWidth}`;
            barWidthRef.current.style.width = `${barWidth}%`;
            if (barWidth >= 100) {
                clearInterval(interval);
                progressRef.current.innerHTML = 'Upload completed';
                setTimeout(() => {
                    progressRef.current.innerHTML = '';
                    progressbarRef.current.style.display = 'none';
                    setFileValue('');
                    setExtension('upload');
                    uploadBtn.current.style.display = 'block';
                    const { name, lastModified, lastModifiedDate, size, type } = fileProps;
                    
                    addToFilePropList({ name, lastModified, lastModifiedDate, size, type, extension, id: nanoid(10) });
                }, 1000);
            }
        }, 10);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (fileValue.length > 1) {
            uploadBtn.current.style.display = 'none';
            progressbarRef.current.style.display = 'block';
            makeProgress();
        }
        
    }

    const handleOnChange = evt => {
        const { value, files } = evt.target;
        fileProps = files[0];
        setFileValue(value);
        let ext = value.substring(value.lastIndexOf('.') + 1, value.length);
    
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const docExtensions = ['pdf', 'code', 'contract', 'csv', 'excel', 'word'];
        const videoExtensions = ['mp4', 'mpeg4', 'vid', '3gp'];
        const audioExtensions = ['mp3', 'ogg'];

        if (imageExtensions.includes(ext)) {
            setExtension('image');
        }
        else if (docExtensions.includes(ext)) {
            setExtension(docExtensions[docExtensions.indexOf(ext)]);
        }
        else if (videoExtensions.includes(ext)) {
            setExtension('video');
        }
        else if (audioExtensions.includes(ext)) {
            setExtension('audio');
        }
        else {
            setExtension('alt')
        }
    }
    
    const styles = {
        progress: {
            backgroundColor: '#4778e5',
            minHeight: 10,
            width: `${barWidth}%`
        }
    };
    console.log('rendering uploader'); // useMemo
    return (
        <div className="file-upload-panel">
            <div className="extension-image"><span><i className={`fa fa-file-${extension}`} /></span></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="file" value={fileValue} onChange={handleOnChange} />
                </div>
                <div>
                    <input type="submit" value="Upload" className="submit-button" ref={uploadBtn} />
                </div>
            </form>
            <div className="progressbar" ref={progressbarRef}><div style={styles.progress} ref={barWidthRef}></div></div>
            <div className="progress-text" ref={progressRef}></div>
        </div>
    );
}

export default FileUploader;