import products from './products.json';

export const getSuggestions = (searchTerm , maxSuggestions, handleResults) => {
 let results = []	
 
//regex to check "if string starts with searchTerm"
 let regexPrefix =  new RegExp('^' + searchTerm, 'i')

 for (var i=0; i < products.products.length; i++) {

 	//if product name begins with searchTerm push to results
    if(products.products[i].name.match(regexPrefix)) {
      results.push(products.products[i].name);

      if(maxSuggestions == results.length){
      	break;
      }
    }
 }

 handleResults(results);
}