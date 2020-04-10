import React, { useMemo, forwardRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
interface Props {
    to: string;
    icon?: React.ReactElement;
    text: string;
}

export const ListItemLink: React.FC<Props> = ({ to, icon, text }) => {
    const renderLink = useMemo(
        () =>
            forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button key={text} component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={text} />
            </ListItem>
        </li>
    );
};
