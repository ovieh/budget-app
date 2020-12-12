import React from 'react';

import GlobalFilter from './GlobalFilter';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import { ToolbarConfig } from './ReusableTable';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

interface Props {
    globalFilter: string;
    preGlobalFilteredRows: any;
    setGlobalFilter: (filter: string | undefined) => void;
    config?: ToolbarConfig;
    numSelected: number;
}

const TableToolbar = ({
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    config = { title: '', checkboxes: false },
    numSelected,
}: Props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Toolbar className={classes.root}>
            <Typography variant='h4'>{config.title}</Typography>
            {numSelected > 0 && (
                <Box className={classes.root}>
                    <p>Add Category to Selected</p>
                    <IconButton aria-label='delete' color='primary' onClick={handleClick}>
                        <MenuOpenIcon />
                    </IconButton>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            )}
            {config.search && numSelected === 0 && (
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    setGlobalFilter: PropTypes.func.isRequired,
    preGlobalFilteredRows: PropTypes.array.isRequired,
    globalFilter: PropTypes.string.isRequired,
};

export default TableToolbar;
