import React from 'react';

import moment from 'moment';

const FileListProperties = ({ data, deleteFile }) => {
    return (
        <div className="file-list">
            {   (data.length > 0) ?
                data.map((file, i) => (<FileInfo {...file} deleteFile={deleteFile} key={file.id} />)) :
                <div className="empty-list">No file uploaded</div>
            }
        </div>
    );
}

const FileInfo = ({ id, name, extension, size, type, lastModified, deleteFile }) => {
    let timeString = moment(lastModified).fromNow();
    let fileType = name.substring(name.lastIndexOf('.') + 1, name.length);
    const handleFileDelete = () => {
        deleteFile(id);
    }
    return (
        <div className="file">
            <div className="extension-image props">
                <span><i className={`fa fa-${extension}`} /></span>
                <div className="extension">{ fileType }</div>
            </div>
            
            <table>
                <caption><strong>Properties</strong></caption>
                <tbody>
                    <tr>
                        <td>File name</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>{(size / 1024).toFixed(4)}kb</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>{type}</td>
                    </tr>
                    <tr>
                        <td>Last modified</td>
                        <td>{timeString}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button className="delete-button" onClick={handleFileDelete}>Delete</button>
            </div>
        </div>
    );
}

export default FileListProperties;