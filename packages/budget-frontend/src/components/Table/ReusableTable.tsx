/* eslint-disable indent */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy, useRowSelect } from 'react-table';
import { Checkbox, TableFooter, TablePagination } from '@material-ui/core';
import TableToolbar from './TableToolbar';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || (defaultRef as any);

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest} />;
});

export type ToolbarConfig = {
    title?: string;
    checkboxes?: boolean;
    search?: boolean;
    numSelected?: number;
};

export type TableConfig = {
    checkboxes?: boolean;
};

interface Props {
    columns: any;
    data: any;
    toolbarConfig?: ToolbarConfig;
    tableConfig?: TableConfig;
}

export const ReusuableTable: React.FC<Props> = ({
    columns,
    data,
    toolbarConfig,
    tableConfig = { checkboxes: false },
}) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        selectedFlatRows,
        page,
        state: { globalFilter = '', selectedRowIds },
        gotoPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: rowsPerPage },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks: any) => {
            tableConfig.checkboxes &&
                hooks.visibleColumns.push((columns: any) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }: any) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }: any) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...(columns as any),
                ]);
        }
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        gotoPage(newPage);
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <TableToolbar
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
                config={toolbarConfig}
                numSelected={Object.keys(selectedRowIds).length}
            />
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <TableCell
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    <TableSortLabel
                                        active={column.isSorted}
                                        // react-table has a unsorted state which is not treated here
                                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i: number) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <TableCell
                                        key={cell.column.id}
                                        align='left'
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
