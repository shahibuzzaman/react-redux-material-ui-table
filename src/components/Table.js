import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
  withStyles,
  useTheme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import indigo from '@material-ui/core/colors/indigo';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Popup from './Popup';
import EditPopup from './EditPopup';
import InputForm from './InputForm';
import DeletePopup from './DeletePopup';
import { userRoleList, userRoleDeleteAction } from '../actions/userRoleAction';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import InfoIcon from '@material-ui/icons/Info';
import TextField from '@material-ui/core/TextField';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const color = indigo[100];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, searchValues) {
  const stabilizedThis = searchValues.fn(array).map((el, id) => [el, id]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 1,
    numeric: false,
    disablePadding: true,
    label: 'Role Name',
  },
  {
    id: 2,
    numeric: true,
    disablePadding: false,
    label: 'Role Description',
  },
  { id: 3, numeric: true, disablePadding: false, label: 'Role Status' },
  // { id: 4, numeric: true, disablePadding: false, label: 'Created By' },
  // { id: 5, numeric: true, disablePadding: false, label: 'Modified By' },
  { id: 4, numeric: true, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            size='small'
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    searchBox,
    SearchClose,
    SearchOpen,
    setOpenPopup,
    handleChange,
    searchValues,
    setSearchValues,
    handleSearch,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div style={{ flexGrow: 1 }}>
          <TextField
            label='Search'
            id='outlined-size-small'
            variant='outlined'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </div>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <Tooltip title='Search'>
            <IconButton aria-label='Search' onClick={SearchOpen}>
              <SearchIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title='Download'>
            <IconButton aria-label='Download'>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Filter list'>
            <IconButton aria-label='filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({
  root: {
    width: '100%',
    fontSize: '0.1em',
  },
  table: {
    minWidth: 750,
  },
  tableCell: {
    fontSize: '0.1em',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  title: {
    flex: '1 1 100%',
  },
});

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const EnhancedTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBox, setSearchBox] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [openEditPopup, setOpenEditPopup] = React.useState(false);
  const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
  const [item, setItem] = React.useState('');
  const [searchValues, setSearchValues] = React.useState({
    fn: (roles) => {
      return roles;
    },
  });

  const [id, setId] = React.useState('');

  console.log('item', item);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.role);

  const { roles } = role;

  console.log(roles);

  useEffect(() => {
    dispatch(userRoleList());
  }, [dispatch]);

  const SearchOpen = () => {
    setSearchBox(true);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setSearchValues({
      fn: (roles) => {
        if (target.value == '') return roles;
        else
          return roles.filter((x) =>
            x.role_name.toLowerCase().includes(target.value),
          );
      },
    });
  };

  const SearchClose = (value) => {
    setSearchBox(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = roles.map((n) => n.id);
      setSelected(newSelecteds);
      setSearchBox(false);
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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setSearchBox(false);
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

  // const handleChange = (prop) => (event) => {
  //   setSearchValues({ ...searchValues, [prop]: event.target.value });
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, roles ? roles.length : null - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
          style={{ padding: 10, flexGrow: 1 }}
        >
          User Role List
        </Typography>
        <Button
          variant='outlined'
          color='primary'
          size='small'
          style={{ width: 100, height: 30, marginTop: 10, fontSize: 12 }}
          startIcon={<AddIcon />}
          onClick={() => setOpenPopup(true)}
        >
          Add New
        </Button>
      </div>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          SearchOpen={SearchOpen}
          SearchClose={SearchClose}
          searchBox={searchBox}
          setOpenPopup={setOpenPopup}
          searchValues={searchValues}
          setSearchValues={setSearchValues}
          handleSearch={handleSearch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
            size='small'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={roles ? roles.length : null}
            />
            <TableBody>
              {stableSort(roles, getComparator(order, orderBy), searchValues)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, id) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${id}`;
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        padding='checkbox'
                        className={classes.tableCell}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          size='small'
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope='row'
                        padding='none'
                        style={{ fontSize: 12 }}
                      >
                        {row.role_name}
                      </TableCell>
                      <TableCell align='right' style={{ fontSize: 12 }}>
                        {row.role_descriotion}
                      </TableCell>
                      <TableCell align='right' style={{ fontSize: 12 }}>
                        {row.role_status == 'A' ? 'Active' : 'Deactivate'}
                      </TableCell>
                      {/* <TableCell align='right' style={{ fontSize: 12 }}>
                        {row.created_by}
                      </TableCell>
                      <TableCell align='right' style={{ fontSize: 12 }}>
                        {row.modified_by}
                      </TableCell> */}
                      <TableCell align='right'>
                        <Tooltip title='Edit'>
                          <IconButton
                            aria-label='delete'
                            size='small'
                            onClick={() => {
                              setOpenEditPopup(true);
                              setItem(row);
                              console.log(row);
                            }}
                          >
                            <EditIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='Delete'>
                          <IconButton
                            aria-label='delete'
                            size='small'
                            onClick={() => {
                              setId(row.id);
                              setOpenDeletePopup(true);
                              setItem(row);
                            }}
                          >
                            <DeleteIcon
                              fontSize='small'
                              style={{ fill: 'red' }}
                            />
                          </IconButton>
                        </Tooltip>

                        <BootstrapTooltip
                          title={
                            <div>
                              <p>Created By : {row.created_by}</p>
                              <p>Created Date : {row.created_date}</p>
                              <p>Modified By : {row.modified_by}</p>
                              <p>Modified Date : {row.modified_date}</p>
                            </div>
                          }
                        >
                          <IconButton aria-label='info' size='small'>
                            <InfoIcon
                              fontSize='small'
                              style={{ fill: '	#ffcc00' }}
                            />
                          </IconButton>
                        </BootstrapTooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component='div'
          count={roles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
      <Popup setOpenPopup={setOpenPopup} openPopup={openPopup}></Popup>
      <EditPopup
        setOpenEditPopup={setOpenEditPopup}
        openEditPopup={openEditPopup}
        item={item}
      />
      <DeletePopup
        setOpenDeletePopup={setOpenDeletePopup}
        openDeletePopup={openDeletePopup}
        id={id}
        item={item}
      />
    </div>
  );
};

export default EnhancedTable;
