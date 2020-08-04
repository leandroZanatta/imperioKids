import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead } from '@material-ui/core';
import api from '../services/api';

export default function RestTable(props) {

    const [rows, setRows] = React.useState([]);

    async function getData() {

        let request = await api.get(props.data.url);

        setRows(request.data.content);
    }

    React.useEffect(() => getData(), []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            props.data.columns.map((item) => <TableCell>{item.label}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow key={row[props.data.key]}>
                                {
                                    props.data.columns.map((column) => <TableCell>{row[column.name]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
