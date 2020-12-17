import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { userRoleDeleteAction } from '../actions/userRoleAction';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DeletePopup = (props) => {
  const { openDeletePopup, setOpenDeletePopup, id, item } = props;

  const handleClose = () => {
    setOpenDeletePopup(false);
  };

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(userRoleDeleteAction(id));
    setOpenDeletePopup(false);
  };

  return (
    <div>
      <Dialog
        open={openDeletePopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>
          {' '}
          <p style={{ fontSize: 14 }}>
            Are you sure you want to delete <strong>{item.role_name}</strong>?
          </p>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'
            size='small'
          >
            Cancel
          </Button>
          <Button
            onClick={deleteHandler}
            color='secondary'
            variant='contained'
            size='small'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletePopup;
