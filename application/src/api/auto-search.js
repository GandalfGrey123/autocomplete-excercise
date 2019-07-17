import products from './products.json';

//validate the string searchTerm incase of special characters
function escapeRegExp(searchTerm) {
   return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const getSuggestions = (searchTerm , maxSuggestions, handleResults) => {
   let results = []	
   
  //regex to check "if string starts with searchTerm"
   let regexPrefix =  new RegExp('^' + escapeRegExp(searchTerm), 'i')
   let nextProduct =''

   for(nextProduct of products.products){

     if(nextProduct.name.match(regexPrefix)) {       
       if(!results.includes(nextProduct.name)){
       	results.push(nextProduct.name);
       }
     }
 
     if(maxSuggestions == results.length){       
       handleResults(results);
       return;
     }
   }

 handleResults(results);
}