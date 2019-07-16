import React, { Component } from 'react';
import {
 withStyles,
 Paper, TextField, Typography
} from '@material-ui/core'

import styles from './styles/search-form';

class SearchForm extends Component{

  constructor(props){
   super(props);
  }
  render(){
   const { classes } = this.props;

   return (
   	<Paper 
   	  className={ classes.formBody }
   	 >

   	 <Typography 
   	   variant="h3" 
   	   component="h3"
   	   className={classes.formTitle}
   	  >
  		 Autosearch
	 </Typography>

   	 <TextField
        label="Search Field"
        type="search"
        className={classes.textField}        
        variant="outlined"
      />
   	</Paper>
   );
  }
}

export default withStyles(styles)(SearchForm);
