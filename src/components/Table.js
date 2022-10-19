import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Popover,
  Typography
} from '@mui/material';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import TableFooter from '@mui/material/TableFooter';
import { useState } from 'react';

const TableData = ({ data, onClickEditRow, onClickDeleteRow }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <TableContainer
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell>
              <strong>Apellido</strong>
            </TableCell>
            <TableCell>
              <strong>E-mail</strong>
            </TableCell>
            <TableCell>
              <strong>Teléfono</strong>
            </TableCell>
            <TableCell>
              <strong>C.C.</strong>
            </TableCell>
            <TableCell>
              <strong>Acciones</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, key) => (
            <TableRow
              key={key}
            >
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>
                {item.lastName}
              </TableCell>
              <TableCell>
                {item.email}
              </TableCell>
              <TableCell>
                {item.phoneNumber}
              </TableCell>
              <TableCell>
                {item.cc}
              </TableCell>
              <TableCell>
                {item.actions}
                <div style={{ display:'flex', alignItems:'center',alignContent:'center'}}>
                <Button
                  onClick={() => onClickEditRow(item)}>
                  <EditIcon/>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography sx={{ p: 2 }}>¿Estás seguro que deseas eliminar un usuario?</Typography>
                  <Button onClick={() => onClickDeleteRow(item._id, handleClose)}>Si</Button>
                  <Button onClick={handleClose}>No</Button>

                </Popover>
                <Button
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <DeleteOutlineIcon/>
                </Button>
                
                </div>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableData
