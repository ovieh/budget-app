import React, { FC, Fragment } from 'react';
import styled from '@emotion/styled/macro';
import { ReusuableTable } from '../components/ReusableTable';
import { LoggedInNav } from '../components/LoggedInNav';

interface Props {}

const Wrapper = styled.div`
    display: flex;
    section,
    aside {
        background: whitesmoke;
        margin: 2.5rem;
    }
`;

const Section = styled.section`
    /* background: whitesmoke; */
    flex: 1 60%;
`;

const Panel = styled.aside`
    /* background:  */
    flex: 2 40%;
    padding: 15px;
`;

const StyledDiv = styled.div`
    padding: 5px;
    input {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 0.75rem;
    }
`;

export const Dashboard: FC<Props> = () => {
    const DashboardColumns = [
        { Header: 'Totals' },
        { Header: 'Planned' },
        { Header: 'Actual' },
        { Header: 'Difference' },
    ];

    return (
        <Fragment>
            <LoggedInNav />
            <Wrapper>
                <Section>
                    {/* <ReusuableTable
                    columns={DashboardColumns}
                    // data={{ name: '' }}
                /> */}
                </Section>
            </Wrapper>
        </Fragment>
    );
};
