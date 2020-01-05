import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
interface Props {
    links: link[];
    children?: React.ReactNode;
}

type link = {
    to: string;
    name: string;
};

const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`;

export const ReusableNav: React.FC<Props> = ({ links, children }) => (
    <AppBar position='static' color='inherit'>
        <StyledToolbar>
            <Typography variant='h6'>Budget-App</Typography>
            <div>
                {links.map((link, index) => (
                    <Button color='inherit' key={index}>
                        <Link to={link.to}>{link.name}</Link>
                    </Button>
                ))}
                {children}
            </div>
        </StyledToolbar>
    </AppBar>
);
