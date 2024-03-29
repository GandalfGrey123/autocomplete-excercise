var textFieldWidth = '80%';
var textFieldLeftOffset = '10%';

const styles = theme => ({
 formBody: {
  width: '90%',
  height:500,
  position: 'absolute', 
  left: '50%', 
  top: '50%',
  transform: 'translate(-50%, -50%)'
 },

 formTitle:{
  paddingTop:50,
  paddingLeft:20,
  paddingBottom: 50,
 },

 textField:{
  marginLeft:textFieldLeftOffset,
  paddingTop:10,  
  width:textFieldWidth,
   cursor: 'none' ,
 },

 suggestionsBox:{
  marginLeft:textFieldLeftOffset,
  width:textFieldWidth,
 },

 highlightDifference:{
  marginLeft:2,
  fontWeight: 'bold',
 },

 highlightCategory:{
  marginLeft:5,
  color:'#3B5998',
 }

});

export default styles;