import React, { useContext, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { getAccessToken } from '../accessToken';
import { useTransactionsByMonthAndYearLazyQuery } from '../generated/graphql';
import { ActiveDateContext } from '../Contexts/ActiveDate';

interface Props {}

export const FileUpload: React.FC<Props> = () => {
    const ref = useRef(null);
    const URL = `/api`;

    const onUploadButtonClick = () => (ref as any).current.click();

    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    const accessToken = getAccessToken();
    const [loading, setLoading] = useState('idle');
    const [getTransactions, { data }] = useTransactionsByMonthAndYearLazyQuery();

    const fileUpload = (file: any): any => {
        const formData = new FormData();
        formData.append('file', file);
        setLoading('fetching');
        accessToken &&
            fetch(`${URL}/fileupload`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    setLoading('idle');
                    const result = response.json();
                    if (result) {
                        getTransactions({
                            variables: { year: activeDate?.year, month: activeDate?.month },
                        });

                        console.log(data);
                    }
                })
                .catch(error => {
                    setLoading('idle');

                    console.log(error);
                });
    };

    return (
        <>
            <Button
                variant='contained'
                style={{ marginTop: '10px' }}
                fullWidth
                onClick={onUploadButtonClick}
                type='submit'
                disabled={loading === 'fetching'}
            >
                Upload File
            </Button>
            <div style={{ display: 'none' }}>
                <input ref={ref} onChange={(e: any) => fileUpload(e.target.files[0])} type='file' />
            </div>
        </>
    );
};
