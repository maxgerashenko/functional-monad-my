
// Show result
export const showResult = (desc, text) => {
  var node = document.createElement("li");                 
  var textnode = document.createTextNode(`${desc} =  ${text}`);
  node.appendChild(textnode);    
  document.getElementById("results").appendChild(node); 
}