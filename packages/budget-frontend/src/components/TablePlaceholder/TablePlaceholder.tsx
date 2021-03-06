import React from 'react';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

interface Props {}

export const TablePlaceholder: React.FC<Props> = () => {
    return (
        <Box>
            <Skeleton height={72} />
            <Skeleton height={72} />
            <Skeleton height={72} />
            <Skeleton height={72} />
            <Skeleton height={72} />
            <Skeleton height={72} />
        </Box>
    );
};
