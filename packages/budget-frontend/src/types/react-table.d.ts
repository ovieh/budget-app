// Type definitions for react-table 7
// Project: https://github.com/tannerlinsley/react-table#readme
// Definitions by: Adrien Denat <https://github.com/grsmto>
//                 Artem Berdyshev <https://github.com/berdyshev>
//                 Christian Murphy <https://github.com/ChristianMurphy>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0
declare module 'react-table' {
    import { Dispatch, SetStateAction, ReactNode } from 'react';

    export type StringKey<D> = Extract<keyof D, string>;
    export type IdType<D> = StringKey<D> | string;
    export type CellValue<V = any> = V;

    export interface Cell<D extends object> {
        render: (type: string) => any;
        getCellProps: () => any;
        column: Column<D>;
        row: Row<D>;
        state: TableState<D>;
        value: any;
    }

    export interface Row<D> {
        index: number;
        cells: Cell<D>[];
        getRowProps: () => any;
        original: any;
    }

    export interface ColumnInstance<D extends object = {}>
        extends Omit<Column<D>, 'id' | 'columns'>,
            UseTableColumnProps<D> {}

    export interface HeaderColumn<D, A extends keyof D = never> {
        /**
         * This string/function is used to build the data model for your column.
         */
        accessor: A | ((originalRow: D) => string);
        Header?: string | ((props: TableInstance<D>) => ReactNode);
        Filter?: string | ((props: TableInstance<D>) => ReactNode);
        Cell?: string | ((cell: Cell<D>) => ReactNode);

        /**
         * This is the unique ID for the column. It is used by reference in things like sorting, grouping, filtering etc.
         */
        id?: string | number;
        minWidth?: string | number;
        maxWidth?: string | number;
        width?: string | number;
        canSortBy?: boolean;
        sortByFn?: (a: any, b: any, desc: boolean) => 0 | 1 | -1;
        defaultSortDesc?: boolean;
    }

    export interface Column<D, A extends keyof D = never> extends HeaderColumn<D, A> {
        id: string | number;
    }

    export type Page<D> = Row<D>[];

    export interface EnhancedColumn<D, A extends keyof D = never> extends Column<D, A> {
        render: (type: string) => any;
        getHeaderProps: (userProps?: any) => any;
        getSortByToggleProps: (userProps?: any) => any;
        sorted: boolean;
        sortedDesc: boolean;
        sortedIndex: number;
    }

    export type HeaderGroup<D, A extends keyof D = never> = {
        headers: EnhancedColumn<D, A>[];
        getRowProps: (userProps?: any) => any;
        getHeaderGroupProps: (userProps?: any) => any;
    };

    export interface Hooks<D> {
        beforeRender: [];
        columns: [];
        headerGroups: [];
        headers: [];
        rows: Row<D>[];
        row: [];
        renderableRows: [];
        getTableProps: [];
        getRowProps: [];
        getHeaderRowProps: [];
        getHeaderProps: [];
        getCellProps: [];
    }

    export interface TableInstance<D>
        extends TableOptions<D>,
            UseRowsValues<D>,
            UseFiltersValues,
            UsePaginationValues<D>,
            useGlobalFilter<D>,
            UseColumnsValues<D> {
        hooks: Hooks<D>;
        rows: Row<D>[];
        columns: EnhancedColumn<D>[];
        getTableProps: (userProps?: any) => any;
        getTableBodyProps: (userProps?: any) => any;
        getRowProps: (userProps?: any) => any;
        prepareRow: (row: Row<D>) => any;
        getSelectRowToggleProps: (userProps?: any) => any;
        toggleSelectAll: (forcedState: boolean) => any;
        preGlobalFilteredRows: any;
        setGlobalFilter: () => void;
        selectedFlatRows: any;
    }

    export interface TableOptions<D> {
        data: D[];
        columns: HeaderColumn<D>[];
        state?: any;
        debug?: boolean;
        sortByFn?: (a: any, b: any, desc: boolean) => 0 | 1 | -1;
        manualSorting?: boolean;
        disableSorting?: boolean;
        defaultSortDesc?: boolean;
        disableMultiSort?: boolean;
        initialState?: any;
        manualPagination?: boolean;
        pageCount?: number;
        controlledPageIndex?: number;
        useControlledState?: boolean;
    }

    export interface RowsProps {
        subRowsKey: string;
    }

    export interface FiltersProps {
        filterFn: () => void;
        manualFilters: boolean;
        disableFilters: boolean;
        setFilter: () => any;
        setAllFilters: () => any;
    }

    export interface UsePaginationValues<D> {
        nextPage: () => any;
        previousPage: () => any;
        setPageSize: (size: number) => any;
        gotoPage: (page: number) => any;
        canPreviousPage: boolean;
        canNextPage: boolean;
        page: Page<D>;
        pageOptions: [];
    }

    export interface UseRowsValues<D> {
        rows: Row<D>[];
    }

    export interface UseColumnsValues<D> {
        columns: EnhancedColumn<D>[];
        headerGroups: HeaderGroup<D>[];
        headers: EnhancedColumn<D>[];
    }

    export interface UseFiltersValues {
        setFilter: () => any;
        setAllFilters: () => any;
    }

    export interface UseGlobalFilterValues {
        preGlobalFilteredRows: any;
        setGlobalFilter: () => void;
    }

    export function useTable<D>(props: TableOptions<D>, ...plugins: any[]): TableInstance<D>;

    export function useColumns<D>(props: TableOptions<D>): TableOptions<D> & UseColumnsValues<D>;

    export function useRows<D>(props: TableOptions<D>): TableOptions<D> & UseRowsValues<D>;

    export function useFilters<D>(
        props: TableOptions<D>
    ): TableOptions<D> & {
        rows: Row<D>[];
    };

    export function useSortBy<D>(
        props: TableOptions<D>
    ): TableOptions<D> & {
        rows: Row<D>[];
    };

    export function useRowSelect<D>(
        props: TableOptions<D>
    ): TableOptions<D> & {
        rows: Row<D>[];
    };

    export function useGroupBy<D>(props: TableOptions<D>): TableOptions<D> & { rows: Row<D>[] };

    export function usePagination<D>(props: TableOptions<D>): UsePaginationValues<D>;

    export function useGlobalFilter<D>(props: TableOptions<D>): UseGlobalFilterValues;

    export function useFlexLayout<D>(props: TableOptions<D>): TableOptions<D>;

    export function useExpanded<D>(
        props: TableOptions<D>
    ): TableOptions<D> & {
        toggleExpandedByPath: () => any;
        expandedDepth: [];
        rows: [];
    };

    export function useTableState(
        initialState?: {
            pageIndex?: number;
        },
        overriddenState?: any,
        options?: {
            reducer?: (oldState: any, newState: any, type: string) => any;
            useState?: [any, Dispatch<SetStateAction<any>>];
        },
        pageIndex?: number
    );

    export interface TableState<D extends object = {}> {
        hiddenColumns?: Array<IdType<D>>;
        initialState?: any;
        overriddenState?: any;
        options?: {
            reducer?: (oldState: any, newState: any, type: string) => any;
            useState?: [any, Dispatch<SetStateAction<any>>];
        };
        pageIndex?: number;
    }

    export const actions: any;
}
