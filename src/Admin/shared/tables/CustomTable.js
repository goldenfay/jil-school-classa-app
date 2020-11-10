import React from "react";
import {  makeStyles, ThemeProvider,useTheme  } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  MuiThemeProvider,
} from "@material-ui/core";
import {
  Button,
  IconButton,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Checkbox,
  Chip,
} from "@material-ui/core";



// components
import EnhancedTableHead from './CustomTableHead'
import EnhancedTableToolbar from './CustomTableToolbar'
// utils
import {getInitials} from '../../../utils/functions'
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary
  },
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
  table: {
    minWidth: 750,
  },
  tableRow: {
    cursor: "pointer"

  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  tableTitle,
  rows,
  headCells,
  indexName,
  handleRowSelected,
  withStartCheckbox = true,
  withFiltering,
  withActions = false,
  actionButtons,
  customtheme,
  ...props
}) {
  const classes = useStyles();
  const inheritTheme=useTheme ();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  const hasAvatar = (columnName) => {
    return (
      typeof headCells.find(
        (column) => column.id === columnName && column.withAvatar === true
      ) !== "undefined"
    );
  };
  return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={tableTitle}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                headCells={headCells}
                withStartCheckbox={withStartCheckbox}
                withActions={withActions}
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row[indexName]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        className={classes.tableRow}
                        onClick={(event) => {if (props.rowClickHandler) props.rowClickHandler(row[indexName]); else if(handleRowSelected) handleRowSelected(event, row[indexName],handleClick); else handleClick(event, row[indexName])}}
                        // onClick={(event) => {if(handleRowSelected) handleRowSelected(event, row[indexName],handleClick); else handleClick(event, row[indexName])}}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[indexName]}
                        selected={isItemSelected}
                      >
                        {withStartCheckbox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                        )}
                        {/* Data Rows */}
                        {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row[indexName]}
                      </TableCell> */}
                        {headCells.map((column, idx) => {
                          const key = column.id;
                          return (
                            <TableCell align="left" key={`${column.id}-${idx}`}>
                              <Box display="flex" alignItems="center">
                                {hasAvatar(key) ? (
                                  <Box display="flex" alignItems="center" >
                                    <Avatar
                                    className={classes.avatar}
                                    src={row.avatarUrl}
                                  >
                                    {getInitials(row[key])}
                                  </Avatar>
                                  </Box>
                                ) : null}
                               
                                  {column.withChip &&
                                    (() => {
                                      var vals = row[key];
                                      if (!(vals instanceof Array)) {
                                        vals = [vals];
                                      }

                                      if (column.usesInnerTheme)
                                        return (
                                          <MuiThemeProvider theme={props.innerTheme}>
                                            {vals.map((el,index) => (
                                              <Chip
                                                key={index}
                                                className={classes.chip}
                                                {...el}
                                                color={el.color || (index%3===0?"primary":index%3===1?"secondary":"default")}
                                                label={el.label}
                                                size="small"
                                              />
                                            ))}
                                          </MuiThemeProvider>
                                        );
                                      else
                                        return <MuiThemeProvider theme={inheritTheme}>
                                        {vals.map((el,index) => (
                                          <Chip
                                          key={index}
                                            className={`${classes.chip}`}
                                            {...el}
                                            color={el.color || (index%3===0?"primary":index%3===1?"secondary":"default")}
                                            style={{color:el.variant!=="outlined"?"white":"inherit"}}
                                            label={el.label}
                                            size="small"
                                          />
                                        ))}
                                      </MuiThemeProvider>
                                    })()}
                                  {column.withChildComponent && (
                                    <>{row[key]}</>
                                  )

                                  }  
                                  {!column.withChip && !column.withChildComponent && (
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                      className="mx-2"
                                    >
                                      {row[key]}
                                    </Typography>
                                  )}
                                  {}
                               
                              </Box>
                            </TableCell>
                          );
                        })}
                        {/* Actions cells */}
                        {withActions && (
                          <TableCell align="center">
                            {withActions &&
                              actionButtons &&
                              actionButtons.map((btn, idx) => {
                                if (!customtheme)
                                  return (
                                    <Button
                                    key={idx}
                                      fullWidth={btn.fullWidth ? btn.fullWidth: true}
                                      color={btn.color || "success"}
                                      className={`px-2 ${classes.button}`}
                                      variant={btn.variant || "contained"}
                                      startIcon={<btn.startIcon />}
                                      onClick={() =>
                                        btn.clickHandler(row[indexName])
                                      }
                                    >
                                      {btn.label}
                                    </Button>
                                  );
                                else
                                  return (
                                    <Grid
                                      container
                                      justify="center"
                                      spacing={3}
                                    >
                                      <ThemeProvider theme={customtheme}>
                                        <Grid item xs={12} md={10}>
                                          {" "}
                                          <Button
                                            fullWidth
                                            color={btn.color || "primary"}
                                            className="px-2"
                                            variant="contained"
                                            startIcon={<btn.startIcon />}
                                            onClick={() =>
                                              btn.clickHandler(row[indexName])
                                            }
                                          >
                                            {btn.label}
                                          </Button>
                                        </Grid>
                                      </ThemeProvider>
                                    </Grid>
                                  );
                              })}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={dense?"Condensé":"Condenser"}
        />
      </div>
  );
}
