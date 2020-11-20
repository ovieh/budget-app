import React from 'react';

import GlobalFilter from './GlobalFilter';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { ToolbarConfig } from './ReusableTable';

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
}

const TableToolbar = ({
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    config = { title: '' },
}: Props) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.root}>
            <Typography variant='h4'>{config.title}</Typography>
            {config.search && (
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
