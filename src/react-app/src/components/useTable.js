import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TablePagination } from '@material-ui/core'


export default function useTable(records, headCells, length) {

    const [page, setPage] = useState(0)
    console.log(records,"recordsrecords")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        count={length}
        onChangePage={handleChangePage}
        rowsPerPage='5'
        rowsPerPageOptions={[]}
    />)

    const recordsAfterPaging = () => {
        return records.slice(page * 5, (page * 5 + 5))
    }

    const TblContainer = props => (
        <Table >
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell}>
                                {
                                  headCell
                                }
                            </TableCell>))
                    }
                </TableRow>
            </TableHead>
            {props.children}
        </Table>
    )

    return {
        TblContainer,
        TblPagination,
        recordsAfterPaging
    }
}