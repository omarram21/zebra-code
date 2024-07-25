import React, { useState, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import printBarcode from '@/lib/print';

const TableComponent = () => {
    const [tableData, setTableData] = useState([
        { item: 'Mouse', brand: 'Logitech', type: 'Accessory', color: 'Black', status: 'New', asset: '', qt: '0', relatedPO: '', comments: 'Mouse and Keyboard' },
        { item: 'Toner', brand: 'HP', type: 'Accessory', color: 'Black', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
        { item: 'Monitor', brand: 'Dell', type: 'Accessory', color: 'Black', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
        { item: 'All in One Desktop', brand: 'HP', type: 'Desktop', color: 'White', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
        { item: 'Laptop', brand: 'HP', type: 'Laptop', color: 'Silver', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
        { item: 'USB Camera', brand: 'Logitech', type: 'Accessory', color: 'Black', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
        { item: 'Headset', brand: 'Jabra', type: 'Accessory', color: 'Black', status: 'New', asset: '', qt: '0', relatedPO: '', comments: '' },
    ]);

    const brands = ['HP', 'Dell', 'Lenovo', 'Apple', 'Jabra', 'Logitech', 'Other'];
    const types = ['Desktop', 'Laptop', 'Tablet', 'Accessory', 'Other'];
    const colors = ['Black', 'White', 'Silver', 'Other'];
    const quantities = ['0', '1', '2', '3', '4', '5', '10', '15', '20'];
    const statuses = ['New', 'Used'];

    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: '6px 8px',
                    },
                    head: {
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#ffffff', // Red background for header cells
                        color: '#ff5c57', // White text for better contrast
                        fontWeight: 'bold',
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        padding: '0.5rem',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        padding: '0.25rem 0.5rem',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: '0.25rem 0.5rem',
                    },
                },
            },
        },
    });

    const handleSubmit = (rowData) => {
        console.log('Submitted row data:', rowData);
        if (rowData.qt == 0){
            toast.error('the QT must be grater than 0', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return ; 
        }
        try {
            for (let i = 0; i < rowData.qt; i++) {
                printBarcode(rowData.asset);
            }
            toast.success('Printed Success', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error:any) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(error);
        }


    };

    const columns = useMemo(() => [
        { accessorKey: 'item', header: 'Item', enableSorting: false },
        {
            accessorKey: 'brand',
            header: 'Brand',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <Select
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, brand: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            accessorKey: 'type',
            header: 'Type',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <Select
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, type: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                >
                    {types.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            accessorKey: 'color',
            header: 'Color',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <Select
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, color: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                >
                    {colors.map((color) => (
                        <MenuItem key={color} value={color}>{color}</MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <Select
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, status: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                >
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            accessorKey: 'asset',
            header: 'Asset',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <TextField
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, asset: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                />
            ),
        },
        {
            accessorKey: 'qt',
            header: 'QT',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <Select
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, qt: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                >
                    {quantities.map((qt) => (
                        <MenuItem key={qt} value={qt}>{qt}</MenuItem>
                    ))}
                </Select>
            ),
        },
        {
            accessorKey: 'relatedPO',
            header: 'Related PO Number',
            enableSorting: false,
            Cell: ({ row, cell, table }) => (
                <TextField
                    value={cell.getValue() || ''}
                    onChange={(e) => {
                        table.setEditingCell(null);
                        setTableData((old) =>
                            old.map((oldRow, index) =>
                                index === row.index ? { ...oldRow, relatedPO: e.target.value } : oldRow
                            )
                        );
                    }}
                    size="small"
                />
            ),
        },
        {
            accessorKey: 'comments',
            header: 'Comments',
            enableSorting: false
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: false,

            Cell: ({ row }) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(row.original)}
                    size="small"
                >
                    Submit
                </Button>
            ),
        },
    ], []);


    return (
        <ThemeProvider theme={theme}>
            <Typography component="div" style={{ width: '100%' }}>
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableColumnActions={false} // This removes the three-dot menu
                    muiTableHeadCellProps={{
                        sx: {
                            '& .Mui-TableHeadCell-Content': {
                                justifyContent: 'left',
                                color: 'white',
                                backgroundColor: '#ff5c57',
                                borderRadius: '10px',
                                paddingX: '20px',
                                paddingY: '5px',
                                display: 'table-cell'
                            },
                        },
                    }}
                />
            </Typography>
        </ThemeProvider>
    );
};

export default TableComponent;