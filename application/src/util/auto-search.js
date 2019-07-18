import products from './products.json';

//validate the string searchTerm incase of special characters
function escapeRegExp(searchTerm) {
   return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function doesNotInclude(value,results){
  return !results.some(elem => elem.name === value);
}

export const getSuggestions = (searchTerm , maxSuggestions, handleResults) => {
   let results = []	   
  //regex to check "if string starts with searchTerm"
   let regexPrefix =  new RegExp('^' + escapeRegExp(searchTerm), 'i')
   let nextProduct =''

   for(nextProduct of products.products){

     if(nextProduct.name.match(regexPrefix)) {       

      
       if( doesNotInclude(nextProduct.name, results )){
       	results.push({
          'name': nextProduct.name,
          'url':nextProduct.url,
          'type':nextProduct.type,
        });        
       }
     }
    
     if(maxSuggestions === results.length){ break; }
   }

 handleResults(results);
}