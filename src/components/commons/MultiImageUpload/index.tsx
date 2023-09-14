import {
    FilledInput,
    InputLabel,
    Typography,
    Box,
    IconButton,
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import React, { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface IImage {
    preview: string;
    fileName: string;
    file?: File;
}

interface IMultiImageUpload {
    images: IImage[];
    serverImages?: any[];
    onHandleFileChange: (name: string, blob: string, file: File) => void;
    onDeleteImage: (index: string) => void;
    onDeleteServerImage?: (id: number) => void;
}

const MultiImageUpload: React.FC<IMultiImageUpload> = ({
    images,
    serverImages,
    onHandleFileChange,
    onDeleteImage,
    onDeleteServerImage,
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

    const deleteImage = useCallback(
        (index: string) => {
            onDeleteImage(index);
        },
        [onDeleteImage]
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
                    이미지 업로드
                </Typography>
                <InputLabel
                    htmlFor={'file_upload'}
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
                    id="file_upload"
                    type="file"
                    inputProps={{
                        accept: 'image/*',
                        style: { display: 'none', padding: 0 },
                    }}
                    onChange={handleFileChange}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    padding: '0 20px',
                    marginTop: '10px',
                }}
            >
                {serverImages &&
                    onDeleteServerImage &&
                    serverImages.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '310px',
                                position: 'relative',
                                marginBottom: '10px',
                                '&:after': {
                                    content: '""',
                                    width: '100%',
                                    display: 'block',
                                    paddingBottom: '66.6%',
                                },

                                '&:nth-child(2n)': {
                                    marginLeft: '20px',
                                },
                            }}
                        >
                            <IconButton
                                onClick={() => onDeleteServerImage(item.id)}
                                sx={{
                                    position: 'absolute',
                                    right: '3px',
                                    top: '3px',
                                    zIndex: 2,
                                }}
                            >
                                <CloseIcon fontSize={'large'} />
                            </IconButton>
                            <img
                                src={item.path}
                                alt="preview"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    border: '1px solid #fff',
                                }}
                            />
                        </Box>
                    ))}
                {images &&
                    images.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '310px',
                                position: 'relative',
                                marginBottom: '10px',
                                '&:after': {
                                    content: '""',
                                    width: '100%',
                                    display: 'block',
                                    paddingBottom: '66.6%',
                                },

                                '&:nth-child(2n)': {
                                    marginLeft: '20px',
                                },
                            }}
                        >
                            <IconButton
                                onClick={() => deleteImage(`${index}`)}
                                sx={{
                                    position: 'absolute',
                                    right: '3px',
                                    top: '3px',
                                    zIndex: 2,
                                }}
                            >
                                <CloseIcon fontSize={'large'} />
                            </IconButton>
                            <img
                                src={item.preview}
                                alt="preview"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    border: '1px solid #fff',
                                }}
                            />
                        </Box>
                    ))}
            </Box>
        </>
    );
};

export default MultiImageUpload;
