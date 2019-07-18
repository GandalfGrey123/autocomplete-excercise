import React, { Component } from 'react';

import {
 withStyles,
 Paper, TextField, Typography,
 List, ListItem, ListItemText,
} from '@material-ui/core'

import styles from './styles/search-form';

import { getSuggestions } from '../../util/auto-search'

class AutoSearchForm extends Component{

  constructor(props){
   super(props);
   this.state={

    searchValue: '',
    suggestions: [''],
    showSuggestions: false,
    
    maxSuggestions: this.props.maxResults,
    highlightIndex: -1,    
   };

  this.offsetKey = this.offsetKey.bind(this);
  this.onKeyPressed = this.onKeyPressed.bind(this);
  }


  onFormChange = (e) => {
    let { maxSuggestions } = this.state;
    //getSuggestions() 2nd argument is max results returned
    getSuggestions(e.target.value, maxSuggestions, (response)=>{
      this.setState({
        searchValue: e.target.value ,
        suggestions: response,
        highlightIndex: 0,
      })
    });
  }

  displayByIndex = (index) =>{
   let {suggestions} = this.state;
   
   this.setState({
     searchValue: suggestions[index].name,
     highlightIndex: index,
     suggestions:[suggestions[index]],     
   })
  }

 //support key navigation
  offsetKey = (offset) =>{
    let {highlightIndex , suggestions} = this.state;  

    if( offset < 0  && highlightIndex == 0){return;}
    if( offset > 0  && highlightIndex == suggestions.length-1){return;}

    this.setState({ 
      highlightIndex: highlightIndex+offset,
    });
  }

  onKeyPressed = (e) =>{    
  let { highlightIndex } = this.state;

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

  //return difference => (searchResult - searchTerm)
  stringDifference = ( searchTerm, searchResult )=>{      
   searchResult = searchResult.toLowerCase()
   return searchResult.substring(
            searchResult.indexOf(searchTerm.toLowerCase())+searchTerm.length)
  }


  displaySuggestions = () => {
    let { searchValue, suggestions } = this.state;
    let { classes } = this.props;

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

    // else search box not empty generate a meaningful suggestion list
    return(
       <Paper className= {classes.suggestionsBox}>
         <List 
           component="nav" 
           aria-label="Secondary mailbox folders"          
          >
            { this.generateListItems() }
         </List>
       </Paper>
    );
  }

  generateListItems = () => {
    let {searchValue , suggestions, highlightIndex} = this.state;
    let { classes } = this.props;

    let items = [];
    let nextItemText = '';

    for(let i=0; i < suggestions.length; i++){

      nextItemText = this.stringDifference(searchValue,suggestions[i].name);

      if(nextItemText === suggestions[i].name.toLowerCase()){
        items.push(

        <ListItem 
          key={i} 
          button
          onClick={()=> { this.displayByIndex(i) }}
          selected = { highlightIndex === i}
         >
           <ListItemText primary={ suggestions[i].name }/>                
         </ListItem>
        );
      }

      else{
        items.push(

         <ListItem 
          key={i} 
          button
          onClick={()=> { this.displayByIndex(i) }}
          selected = { highlightIndex === i}
         >
              <ListItemText primary={
                <Typography> 
                   { searchValue } 
  
                   <Typography 
                    className={classes.highlightDifference} 
                    variant="secondary">
                     { nextItemText.split('-')[0] }               
  
                     <Typography 
                    className={classes.highlightCategory} 
                    variant="secondary">
                    in { suggestions[i].type }
                    </Typography> 
  
                   </Typography> 
                </Typography> 
               }             
               />                 
           
         </ListItem>

        );
      }     
    }

    return items;
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
  		 Autocomplete
	    </Typography>

   	  <TextField
         label="Search Field"
         type="search"
         value={ searchValue }
         className={ classes.textField }     
         variant="outlined"
         onChange={ this.onFormChange }
         onClick={ this.handleOnClick }
       />

      { this.displaySuggestions() }

   	</Paper>
   );
  }
}

export default withStyles(styles)(AutoSearchForm);