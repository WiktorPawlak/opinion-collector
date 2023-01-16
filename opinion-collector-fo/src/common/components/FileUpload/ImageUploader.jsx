import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';


const ImageUploader = ({onChange, onDrop}) => {
    const [files, setFiles] = useState([]);
    const [isFileAdded, setIsFileAdded] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            if(acceptedFiles.length){
                setFiles(acceptedFiles.map(file => {
                    onDrop(file);
                    setIsFileAdded(true);
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    });
                }));

            }
        }
    });

    const thumbs = files.length>0 && files.map(file => (
        <div key={file.name}>
            <div>
                <img
                    src={file.preview}
                    alt={file.name}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    ));


    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} onChange={onChange} />
                { !isFileAdded && <p>Drag 'n' drop some files here, or click to select files</p> }
            </div>
            <aside>
                {thumbs}
            </aside>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dropzone: {
        width: '100%',
        height: '200px',
        border: `1px dashed ${theme.palette.primary.main}`,
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    thumbsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
    },
    thumb: {
        display: 'inline-flex',
        borderRadius: '2px',
        border: '1px solid #eaeaea',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100px',
        height: '100px',
        padding: theme.spacing(1),
        boxSizing: 'border-box',
    },
    thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
    },
    img: {
        display: 'block',
        width: 'auto',
        height: '100%',
    },
}));

const ImageUploaderWrapper = ({onChange, onDrop}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
                Image Uploader
            </Typography>
            <div className={classes.dropzone}>
                <ImageUploader onChange={onChange} onDrop={onDrop}/>
            </div>
            <div className={classes.thumbsContainer}>
                {/* thumbs components here */}
            </div>
        </Paper>
    );
}

export default ImageUploaderWrapper;
