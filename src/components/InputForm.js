import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    flexGrow: 1,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InputForm = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState('female');

  const [curTime, setCurTime] = React.useState({
    curTime: new Date().toLocaleString(),
  });

  const handleChange = (event) => {
    setValue(event.target.value);
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Role Status</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender1'
                value={value}
                onChange={handleChange}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <FormControlLabel
                  value='active'
                  control={<Radio />}
                  label='Active'
                />
                <FormControlLabel
                  value='deactivate'
                  control={<Radio />}
                  label='Deactivate'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name='role name'
              variant='outlined'
              required
              fullWidth
              id='role_name'
              label='Created By'
              autoFocus
              size='small'
              defaultValue='User Name'
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='datetime-local'
              label='Created Date'
              type='datetime-local'
              defaultValue={curTime.curTime}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
              size='small'
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default InputForm;
