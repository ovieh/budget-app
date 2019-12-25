import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';

interface Props {
    links: link[];
}

type link = {
    to: string;
    name: string;
};

const StyledNav = styled.nav`
    background: gray;
    color: white;
`;

const StyledList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const StyledListItem = styled.li`
    display: inline;
    margin: 5px;
    a {
        :visited {
            color: whitesmoke;
        }
    }
`;

export const ReusableNav: React.FC<Props> = ({ links }) => (
    <StyledNav>
        <StyledList>
            {links.map((link, index) => (
                <StyledListItem key={index}>
                    <Link to={link.to}>{link.name}</Link>
                </StyledListItem>
            ))}
        </StyledList>
    </StyledNav>
);
