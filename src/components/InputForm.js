import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontSize: 12,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InputForm = (props) => {
  const classes = useStyles();

  const {
    role_status,
    setRoleStatus,
    role_name,
    setRoleName,
    role_descriotion,
    setRoleDescription,
    item,
  } = props;

  console.log('edit data', item);

  const handleChange = (event) => {
    setRoleStatus(event.target.value);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='role name'
              variant='outlined'
              required
              fullWidth
              id='role_name'
              label='Role Name'
              autoFocus
              size='small'
              defaultValue={item ? item.role_name : null}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='role_description'
              label='Role Description'
              multiline
              required
              fullWidth
              rows={4}
              variant='outlined'
              defaultValue={item ? item.role_descriotion : null}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Role Status</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender1'
                defaultValue={item ? item.role_status : null}
                onChange={handleChange}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value='A'
                  control={<Radio size='small' />}
                  label={
                    <Typography style={{ fontSize: 14 }}>Active</Typography>
                  }
                />
                <FormControlLabel
                  value='D'
                  control={<Radio size='small' />}
                  label={
                    <Typography style={{ fontSize: 14 }}>Deactivate</Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default InputForm;
