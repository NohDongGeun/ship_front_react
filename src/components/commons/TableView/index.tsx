import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
} from '@mui/material';
import React from 'react';

interface ITableView {
    headerItems: any[];
    bodyItems: any[];
}

const TableView: React.FC<ITableView> = ({ headerItems, bodyItems }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{ borderRadius: '6px', minHeight: '500px' }}
        >
            <Table>
                <TableHead
                    sx={{
                        backgroundColor: '#e1e1e8',
                    }}
                >
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                // onChange={(event) => {
                                //     const checked = event.target.checked;
                                //     const newRows = rows.map((row) => ({
                                //         ...row,
                                //         isChecked: checked,
                                //     }));
                                //     setRows(newRows);
                                // }}
                            />
                        </TableCell>
                        {headerItems.map((item) => (
                            <TableCell key={item.id}>{item.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyItems.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={false}
                                    // onChange={() => handleCheck(row.id)}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;
