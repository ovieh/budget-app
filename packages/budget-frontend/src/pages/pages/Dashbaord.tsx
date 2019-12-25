import React from 'react';
import { useGetTransactionsQuery } from '../../generated/graphql';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
    const { data, error } = useGetTransactionsQuery();
    if (error) {
        return <div>{error}</div>;
    }

    return <div>{JSON.stringify(data)}</div>;
};
