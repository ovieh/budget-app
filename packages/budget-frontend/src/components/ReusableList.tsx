import React from 'react';
import List from '@material-ui/core/List';
import { ListItemLink } from './ListItemLink';

interface Props {
    listItems: listItem[];
}

type listItem = {
    text: string;
    to: string;
    icon: React.ReactElement;
};

export const ReusableList: React.FC<Props> = ({ listItems }) => {
    return (
        <List>
            {listItems.map(({ text, to, icon }) => (
                <ListItemLink text={text} to={to} key={text} icon={icon} />
            ))}
        </List>
    );
};
