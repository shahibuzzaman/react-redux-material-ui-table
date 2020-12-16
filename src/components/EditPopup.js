import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InputForm from './InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { userRoleUpdateAction } from '../actions/userRoleAction';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <PersonAddIcon style={{ fontSize: 25 }} />
      <Typography
        variant='h6'
        style={{ marginLeft: 20, fontSize: 16, fontWeight: '500' }}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon style={{ color: 'red' }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Popup = (props) => {
  const { openEditPopup, setOpenEditPopup, item } = props;
  const [role_status, setRoleStatus] = React.useState(item.role_status);
  const [role_name, setRoleName] = React.useState(item.role_name);
  const [role_descriotion, setRoleDescription] = React.useState(
    item.role_descriotion,
  );
  const id = item.id;

  const created_by = 'Shahibuzzaman';
  const modified_by = 'Shahibuzzaman2';

  useEffect(() => {
    setRoleStatus(item.role_status);
    setRoleName(item.role_name);
    setRoleDescription(item.role_descriotion);
  }, [item]);

  const dispatch = useDispatch();
  const roleUpdate = useSelector((state) => state.roleUpdate);
  const { roleUpdates } = roleUpdate;

  console.log(
    'role data',
    id,
    role_name,
    role_descriotion,
    role_status,
    created_by,
    modified_by,
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userRoleUpdateAction(
        item.id,
        role_name,
        role_descriotion,
        role_status,
        created_by,
        modified_by,
      ),
    );
    setOpenEditPopup(false);
  };

  const handleClose = () => {
    setOpenEditPopup(false);
  };

  return (
    <Dialog
      aria-labelledby='customized-dialog-title'
      open={openEditPopup}
      onClose={handleClose}
    >
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        Role Edit
      </DialogTitle>
      <DialogContent dividers>
        <InputForm
          role_status={role_status}
          setRoleStatus={setRoleStatus}
          role_name={role_name}
          setRoleName={setRoleName}
          role_descriotion={role_descriotion}
          setRoleDescription={setRoleDescription}
          item={item}
        />
      </DialogContent>
      <DialogActions style={{ padding: 20 }}>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          autoFocus
          onClick={handleClose}
          style={{ marginRight: 10 }}
        >
          Cancel
        </Button>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={submitHandler}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
