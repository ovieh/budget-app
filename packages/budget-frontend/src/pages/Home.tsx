import React, { Fragment } from 'react';
import { useMeQuery } from '../generated/graphql';
import { LoggedInNav } from '../components/LoggedInNav';
import { LoggedOutNav } from '../components/LoggedOutNav';

interface Props {}

export const Home: React.FC<Props> = () => {
    const { data } = useMeQuery();

    return (
        <Fragment>
            {data ? <LoggedInNav /> : <LoggedOutNav />}
            <h1>Home</h1>
        </Fragment>
    );
};
