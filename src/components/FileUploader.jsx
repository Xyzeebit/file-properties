import React, { useState, useRef, useEffect } from 'react'

import { nanoid } from 'nanoid';

let fileProps = null;

const FileUploader = ({ addToFilePropList }) => {
    const [fileValue, setFileValue] = useState('');
    const [extension, setExtension] = useState('upload');

    const uploadBtn = useRef(null);
    const progressbarRef = useRef(null);
    const progressRef = useRef(null);
    const barWidthRef = useRef(null);

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
                    uploadBtn.current.style.display = 'block';
                    const { name, lastModified, lastModifiedDate, size, type } = fileProps;
                    addToFilePropList({ name, lastModified, lastModifiedDate, size, type, extension, id: nanoid(10) });
                }, 1000);
            }
        }, 10);
    }

    useEffect(() => {
        let ext = fileValue.substring(fileValue.lastIndexOf('.') + 1, fileValue.length);
        setExtension(setExtensionEffect(ext));
    }, [fileValue]);

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
    }
    
    const styles = {
        progress: {
            backgroundColor: '#4778e5',
            minHeight: 10,
            width: `${barWidth}%`
        }
    };
    return (
        <div className="file-upload-panel">
            <div className="extension-image"><span><i className={`fa fa-${extension}`} /></span></div>
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

const setExtensionEffect = extension => {
    switch (true) {
        case ['txt', 'log'].includes(extension): return 'file-alt';
        case ['doc', 'docx'].includes(extension): return 'file-word';
        case 'excel' === extension: return 'file-excel';
        case 'csv' === extension: return 'file-csv';
        case 'pptx' === extension: return 'file-powerpoint';
        case ['mp3', 'ogg', 'wave'].includes(extension): return 'file-audio';
        case ['mp4', 'mpeg4', 'avi', '3gp'].includes(extension): return 'file-video';
        case ['png', 'jpeg', 'jpg', 'webm', 'ico', 'gif'].includes(extension): return 'file-image';
        case 'pdf' === extension: return 'file-pdf';
        case ['bat', 'exe'].includes(extension): return 'file-code';
        case ['html', 'java', 'js', 'jsx', 'ts', 'py', 'css', 'php'].includes(extension): return 'file-code';
        case ['zip', 'tar', 'apk', 'jar'].includes(extension): return 'file-archive';
        default: return 'upload';
    }
}

export default FileUploader;