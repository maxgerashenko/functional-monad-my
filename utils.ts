
// Show result
export const showResult = (desc, text) => {
  var node = document.createElement("span");                 
  var textnode = document.createTextNode(`${desc} =  ${text}`);
  node.appendChild(textnode);    
  document.getElementById("results").appendChild(node); 
}