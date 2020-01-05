import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface Props {}

export const Home: React.FC<Props> = () => {
    const { data } = useMeQuery();

    return <h1>index</h1>;
};
