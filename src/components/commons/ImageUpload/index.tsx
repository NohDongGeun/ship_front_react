import React, { useCallback, useState } from 'react';
import { FilledInput, InputLabel, Typography, Box } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface IImageUpload {
    label: string;
    preview?: string;
    fileName?: string;
    serverImage?: string;
    onHandleFileChange: (name: string, blob: string, file: File) => void;
}

const ImageUpload: React.FC<IImageUpload> = ({
    label,
    preview,
    fileName,
    onHandleFileChange,
}) => {
    const handleFileChange = useCallback(
        (event: any) => {
            const file = event.target.files[0];

            if (!file) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                onHandleFileChange(
                    file.name as string,
                    reader.result as string,
                    file
                );
            };
        },
        [onHandleFileChange]
    );

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    padding: '10px 20px',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Typography
                    variant="body1"
                    color="#9E9EA7"
                    fontSize={'14px'}
                    lineHeight={'36px'}
                    sx={{
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: '180px',
                        marginRight: '20px',
                    }}
                >
                    {label}
                </Typography>
                <InputLabel
                    htmlFor={`file_upload_${label}`}
                    sx={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        border: 'dashed 2px black',
                        borderRadius: '4px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '0 10px',
                        }}
                    >
                        <ImageOutlinedIcon
                            fontSize="large"
                            sx={{ marginRight: '10px' }}
                        />
                        <Typography
                            color={'primary'}
                            fontWeight={'bold'}
                            sx={{ marginRight: '5px' }}
                        >
                            Upload file
                        </Typography>
                        <Typography>or drag and drop</Typography>
                    </Box>
                </InputLabel>
                <FilledInput
                    id={`file_upload_${label}`}
                    type="file"
                    inputProps={{
                        accept: 'image/*',
                        style: { display: 'none', padding: 0 },
                    }}
                    onChange={handleFileChange}
                />
            </Box>
            {fileName && (
                <Typography sx={{ marginLeft: '220px' }}>{fileName}</Typography>
            )}
            {preview && (
                <Box
                    sx={{
                        width: '200px',
                        height: '200px',
                        marginLeft: '220px',
                        border: '1px solid #fff',
                        marginTop: '10px',
                    }}
                >
                    <img
                        src={preview}
                        alt="preview"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}
        </>
    );
};

export default ImageUpload;
