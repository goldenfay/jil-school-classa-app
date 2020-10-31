import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  head: {
    fontWeight: "bold",
    fontSize: "1.0rem"

  },
  rowHead:{
      fontWeight: "bold",
      fontSize: "0.9rem"
  }
});



function Row(props) {
  const { row,headLabels,subHeadersTitle,subHeaderLabels } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell width={10}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell> */}
        
        {headLabels.map((label)=>(
        <TableCell className={classes.rowHead} key={`${label.key}-value`} align="left">{row[label.key]}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {subHeadersTitle}
              </Typography>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    
                    {subHeaderLabels.map((label,idx)=>(<TableCell key={`${idx}-${label.label}`}align="left">{label.label}</TableCell>))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((subRow) => (
                    <TableRow >
                     
                      {subHeaderLabels.map((label)=>(<TableCell>{subRow[label.key]}</TableCell>))}
                      
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
Row.prototype={
    row:PropTypes.object.isRequired,
    headLabels:PropTypes.array.isRequired,
    subHeadersTitle:PropTypes.array.isRequired,
    subHeaderLabels: PropTypes.array.isRequired
}

export default function CollapsibleTable(
   { headLabels,
    subHeaderLabels,
    subHeadersTitle,
    rows,
    ...props}
) {
    const classes = useRowStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={10}/>
            
            {headLabels.map((label)=>(
            <TableCell className={classes.head} align="left" key={label.key}>{label.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,idx) => (
            <Row key={idx} row={row} subHeaderLabels={subHeaderLabels} subHeadersTitle={subHeadersTitle} headLabels={headLabels}   />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.prototype={
    rows:PropTypes.array.isRequired,
    headLabels:PropTypes.array.isRequired,
    subHeadersTitle:PropTypes.array.isRequired,
    subHeaderLabels: PropTypes.array.isRequired
}
