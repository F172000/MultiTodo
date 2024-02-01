import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    console.log(props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow >
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell >  
        <IconButton ><i className="fa-solid fa-trash"></i></IconButton>
        <IconButton ><i className="fas fa-pen-to-square"></i></IconButton></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Todo's</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.list.map((historyRow,i) => (
                    <TableRow 
                    key={i}
                    >
                      <TableCell >
                        {historyRow.name}
                      </TableCell>
                    </TableRow>
                 ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({listings}) {
  return (
    <div >
    {/* <TableContainer> */}
      <Table >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Task Titlee</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((row,index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    {/* </TableContainer> */}
    </div>
  );
}
