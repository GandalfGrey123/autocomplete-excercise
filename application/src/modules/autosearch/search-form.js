import React, { Component } from 'react';
import {
 withStyles,
 Paper, TextField, Typography,
 List, ListItem, ListItemText, Divider,
} from '@material-ui/core'

import styles from './styles/search-form';
import {getSuggestions} from '../../api/auto-search'

class SearchForm extends Component{

  constructor(props){
   super(props);
   this.state={
    searchValue: '',
    suggestions: [],
   };
  }

  onFormChange = (e) => {

    getSuggestions(e.target.value,5, (response)=>{
      this.setState({
        searchValue: e.target.value,
        suggestions: response,
      })
    });
  }

  displaySuggestions(){
    const { suggestions } = this.state;

    return(
      
         <List 
           component="nav" 
           aria-label="Secondary mailbox folders"
          >
          <React.Fragment>
            {
             suggestions.map(( nextSuggestion , index )=>(
               <ListItem key={index} button>
                 <ListItemText primary={nextSuggestion} />
               </ListItem>
             ))
            }                 
          </React.Fragment>
         </List>
      
    );
  }

  render(){
   const { classes } = this.props;
   const { searchValue, suggestions} = this.state;

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
        value={searchValue}
        className={classes.textField}     
        variant="outlined"
        onChange={ this.onFormChange }
      />

      <Paper className={classes.suggestions}>
        {this.displaySuggestions()}
      </Paper>
   	</Paper>
   );
  }
}

export default withStyles(styles)(SearchForm);