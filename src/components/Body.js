import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from './Table';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
}));

const Body = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <Table />
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
    </div>
  );
};

export default Body;
