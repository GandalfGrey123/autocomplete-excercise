import React, { Component } from 'react';
import {
 withStyles,
 Paper, TextField, Typography,
 List, ListItem, ListItemText, Divider,
 Slider,
} from '@material-ui/core'

import styles from './styles/search-form';
import {getSuggestions} from '../../api/auto-search'

class SearchForm extends Component{

  constructor(props){
   super(props);
   this.state={
    searchValue: '',
    suggestions: [''],
    showSuggestions: false,
    maxResults: 5,
   };
  }

  onFormChange = (e) => {
    //getSuggestions() 2nd argument is max results returned
    getSuggestions(e.target.value, 5, (response)=>{
      this.setState({
        searchValue: e.target.value,
        suggestions: response,        
      })
    });
  }

  onChangeMax = (e,val) => {
    getSuggestions(this.state.searchValue, val, (response)=>{
      this.setState({
        maxResults: val,
        suggestions: response,
      })
    });
  }


  displaySuggestions = () => {
    const { searchValue, suggestions} = this.state;
    const { classes } = this.props;

     //if search input is empty
     if(searchValue === ''){
      return(
        <div></div>
      );
     }

     if(suggestions.length === 0){
      return(
        
        <Paper className={classes.suggestionsBox}>
        <ListItem key={0} button>
          <ListItemText primary="Nothing found.." />                
        </ListItem>
        </Paper>
      );
     }

    //else search box not empty
    return(
         <Paper className= {classes.suggestionsBox}>
         <List 
           component="nav" 
           aria-label="Secondary mailbox folders"
          >
          <React.Fragment>
            {
             suggestions.map(( nextSuggestion , index )=>(
              
               <ListItem 
                 key={index} 
                 button
                 onClick={ ()=>{this.onFormChange({target:{value:nextSuggestion}})} }
                 >
                 <ListItemText primary={nextSuggestion} />                
               </ListItem>

             ))
            }                 
          </React.Fragment>
         </List>
         </Paper>
    );
  }

  render(){
   const { classes } = this.props;
   const { searchValue, suggestions, maxResults} = this.state;

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


      <Typography className={classes.maxSlider} id="continuous-slider" >
         Max Results Returned ({maxResults})
      </Typography>


       <Slider 
        value={maxResults} 
        onChange={this.onChangeMax } 
        aria-labelledby="continuous-slider" 
        className={classes.maxSlider}
        step={1}
        marks
        valueLabelDisplay="auto"
        onClick={this.handleOnClick}
        min={0}
        max={10}
       />


   	    <TextField
           label="Search Field"
           type="search"
           value={searchValue}
           className={classes.textField}     
           variant="outlined"
           onChange={ this.onFormChange }
           onClick={ this.handleOnClick }
         />


      {this.displaySuggestions()}

   	</Paper>
   );
  }
}

export default withStyles(styles)(SearchForm);