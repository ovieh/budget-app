import React, { FormEvent, useState, ChangeEvent, useRef, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { getAccessToken } from '../accessToken';

interface Props {}

export const FileUpload: React.FC<Props> = () => {
    const ref = useRef(null);
    const URL = `${process.env.REACT_APP_API_URL}`;

    const onUploadButtonClick = () => (ref as any).current.click();

    const accessToken = getAccessToken();

    const fileUpload = (file: any): any => {
        const formData = new FormData();
        formData.append('file', file);

        accessToken &&
            fetch(`${URL}/fileupload`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    Authorization: `bearer ${accessToken}`,
                },
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(error => console.log(error));

        return `hey`;
    };

    return (
        <>
            <Button
                variant='contained'
                style={{ marginTop: '10px' }}
                fullWidth
                // onClick={() => console.log('hey')}
                onClick={onUploadButtonClick}
                type='submit'
            >
                Upload File
            </Button>
            <div style={{ display: 'none' }}>
                <input ref={ref} onChange={(e: any) => fileUpload(e.target.files[0])} type='file' />
            </div>
        </>
    );
};
