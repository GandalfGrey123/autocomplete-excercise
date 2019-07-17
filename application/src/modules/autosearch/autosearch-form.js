import React, { Component } from 'react';

import {
 withStyles,
 Paper, TextField, Typography,
 List, ListItem, ListItemText, Divider,
} from '@material-ui/core'

import styles from './styles/search-form';
import { getSuggestions } from '../../api/auto-search'

class AutoSearchForm extends Component{

  constructor(props){
   super(props);
   this.state={

    searchValue: '',
    predictedSearchValue: '',

    suggestions: [''],
    showSuggestions: false,

    maxSuggestions: this.props.maxResults,
    highlightIndex: -1,    

   };

  this.offsetKey = this.offsetKey.bind(this);
  this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  onFormChange = (e) => {
    let {maxSuggestions} = this.state;
    //getSuggestions() 2nd argument is max results returned
    getSuggestions(e.target.value,maxSuggestions, (response)=>{
      this.setState({
        searchValue: e.target.value,
        suggestions: response,
        highlightIndex: 0,        
      })
    });
  }

  displayByIndex = (index) =>{
   let {suggestions} = this.state;
   this.setState({
     searchValue: suggestions[index],
     highlightIndex: index,           
   })
  }

 //support key navigation
  offsetKey = (offset) =>{
   let {highlightIndex} = this.state;  
    this.setState({ 
       highlightIndex: highlightIndex+offset
    });
  }

  onKeyPressed = (e) =>{    
  let {highlightIndex} = this.state; 
   if (e.keyCode == '38') {  
     this.offsetKey(-1);
   }
   else if (e.keyCode == '40') {
     this.offsetKey(1);
   }

   else if (e.keyCode == '13') {
     this.displayByIndex(highlightIndex)
   }
  }

  displaySuggestions = () => {
    const { searchValue, suggestions, highlightIndex} = this.state;
    const { classes } = this.props;

    for(let i=0; i < suggestions.length; i++){
       console.log(i === highlightIndex)
    }

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
                 onClick={ ()=>{ this.displayByIndex(index) }}
                 selected={highlightIndex === index}
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
   const { searchValue } = this.state;

   return (
   	<Paper 
   	  className={ classes.formBody }
      onKeyDown={ this.onKeyPressed }
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
           onClick={ this.handleOnClick }
         />


      {this.displaySuggestions()}

   	</Paper>
   );
  }
}

export default withStyles(styles)(AutoSearchForm);