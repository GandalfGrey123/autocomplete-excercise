import React , { Component } from 'react';
import { Paper } from '@material-ui/core'

//custom Components
import SearchForm from './modules/autosearch/search-form'

class App extends Component{
  render(){
   return(
   	<Paper>
   		<SearchForm/>
   	</Paper>
   );
  }
}

export default App;