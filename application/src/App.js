import React , { Component } from 'react';
import { Paper } from '@material-ui/core'

//custom Components
import AutoSearchForm from './modules/autosearch/autosearch-form'

class App extends Component{
  render(){
   return(
   	<Paper>
   		<AutoSearchForm
   		  maxResults={10}
   		/>
   	</Paper>
   );
  }
}

export default App;