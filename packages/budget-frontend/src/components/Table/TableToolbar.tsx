import React from 'react';

import GlobalFilter from './GlobalFilter';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import { ToolbarConfig } from './ReusableTable';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';
import { SelectCategoryCell } from '../../pages/Transactions/Components/SelectCategoryCell';

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
    selectedItems: string[];
}

const TableToolbar = ({
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    config = { title: '', checkboxes: false },
    numSelected,
    selectedItems,
}: Props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(selectedItems);

    return (
        <Toolbar className={classes.root}>
            <Typography variant='h4'>{config.title}</Typography>
            {numSelected > 0 && <SelectCategoryCell selectedItems={selectedItems} />}
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
