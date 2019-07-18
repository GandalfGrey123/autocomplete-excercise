const SEARCH_CACHE = 'searchCache';

//determine user's interest by evaluating type usage
function cacheTypeInterest( resultType , value){
 let cache = JSON.parse(localStorage.getItem(SEARCH_CACHE))

 if(resultType in cache){
  cache[resultType] = cache[resultType]+value;
 }else{
  cache[resultType]= value;
 }

 localStorage.setItem(SEARCH_CACHE,JSON.stringify(cache));
}

export const getHighestPriority = () =>{
 let cache = JSON.parse(localStorage.getItem(SEARCH_CACHE))
 return(Object.keys(cache).reduce((a, b) => cache[a] > cache[b] ? a : b))
}

export const intializeCache = () =>{
  localStorage.setItem(SEARCH_CACHE,JSON.stringify({}));
}

export const addPriority = (type, value) =>{
  cacheTypeInterest(type,value);
}