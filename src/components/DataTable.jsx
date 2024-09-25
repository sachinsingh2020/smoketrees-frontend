import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const DataTable = ({ data, openAddressModal }) => {
    const columns = useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'No. of Addresses', accessor: 'addressCount' },
            {
                Header: 'Show Addresses',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => openAddressModal(row.original.addresses)}>
                            Show Address
                        </button>
                    </div>
                ),
            },
        ],
        [openAddressModal]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                key={column.id}
                                style={{ borderBottom: '2px solid black', padding: '10px' }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td
                                    {...cell.getCellProps()}
                                    key={cell.column.id}
                                    style={{ padding: '10px', border: '1px solid black' }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DataTable;
