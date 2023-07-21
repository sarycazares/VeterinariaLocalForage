import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AddAlarmIcon from '@mui/icons-material/AddAlarm'

export interface AppTableProps {
    titleCells: string[]
    dataCells: any[]
    handleClickButton: Function
    handleClickVisit?: Function
}

export default function AppTable(props: AppTableProps) {
    const { titleCells, dataCells, handleClickButton, handleClickVisit = () => { } } = props

    const visibleColumns = titleCells.slice(0, titleCells.length - 1)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {titleCells.map((row, index) => (
                            <TableCell key={index}>{row}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataCells.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {visibleColumns.map((cellKey, cellIndex) => (
                                <TableCell key={cellIndex} align="left">
                                    {row[cellKey]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <IconButton
                                    aria-label="Editar"
                                    color='inherit'
                                    onClick={() => handleClickButton('edit', row['id'])}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Eliminar"
                                    color='inherit'
                                    onClick={() => handleClickButton('delete', row['id'])}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="Eliminar"
                                    color='inherit'
                                    onClick={() => handleClickVisit('handleClickVisit', row['id'])}
                                >
                                    <AddAlarmIcon />
                                </IconButton>


                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
