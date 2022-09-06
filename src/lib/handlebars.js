import { format } from 'timeago.js';

const helpers = {};

helpers.timeago = (time) => {
   
      return format(time);
};

helpers.trimString = (passedString) =>{
    
    var theString = passedString.length>100?passedString.substring(0,100) + '...': passedString;
    
    return theString;
};

helpers.log= (message)=>{
    console.log(message);
}; 


module.exports= helpers;