var textFieldWidth = '80%';
var textFieldLeftOffset = '10%';

var sliderWidth = '80%';

const styles = theme => ({
 formBody: {
  width: '60%',
  height:500,
  position: 'absolute', 
  left: '50%', 
  top: '50%',
  transform: 'translate(-50%, -50%)'
 },

 formTitle:{
  marginLeft:'25%',
  padding: 40,
 },

 textField:{
  marginLeft:textFieldLeftOffset,
  paddingTop:10,
  width:textFieldWidth,
 },

 suggestionsBox:{
  marginLeft:textFieldLeftOffset,
  width:textFieldWidth,
 },

 hideBox:{
  display: 'none',
 },

 maxSlider:{
  marginLeft:textFieldLeftOffset,
  width:sliderWidth,
 },

});

export default styles;