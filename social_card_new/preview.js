
window.addEventListener("DOMContentLoaded", (event) => {
    // Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the name and email from the URL
let name = urlParams.get('name');
let email = urlParams.get('email');
let interest = urlParams.get('interest');
let facebook = urlParams.get("facebook");
let twitter = urlParams.get("twitter");
let linkedin = urlParams.get("linkedin");
let instagram = urlParams.get("instagram");
let imageUrl = urlParams.get("imageUrl");

update_field(event,name,email,interest,facebook,twitter,linkedin,instagram,imageUrl);
      
});
function update_field(event,name,email,interest,facebook,twitter,linkedin,instagram,imageUrl){
  event.preventDefault()
  
document.getElementById("card_name").innerHTML=`${name}@<span>${interest}</span>`
document.getElementById("card_email").innerText=email;
document.getElementById("imageElement").src=imageUrl;
links=document.getElementById("social_icons")
  links.innerHTML=""
  if(facebook){
    let li=document.createElement("li")
    let a = document.createElement("a")
    a.setAttribute("href",facebook)
    a.innerHTML = '<i class="fab fa-facebook"> </i>'
    li.appendChild(a)
    links.appendChild(li)
  }
  if(twitter){
    let li=document.createElement("li")
    let a = document.createElement("a")
    a.setAttribute("href",twitter)
    a.innerHTML = '<i class="fab fa-twitter"> </i>'
    li.appendChild(a)
    links.appendChild(li)
  }
  if(linkedin){
    let li=document.createElement("li")
    let a = document.createElement("a")
    a.setAttribute("href",linkedin)
    a.innerHTML = '<i class="fab fa-linkedin"> </i>'
    li.appendChild(a)
    links.appendChild(li)
  }
  if(instagram){
    let li=document.createElement("li")
    let a = document.createElement("a")
    a.setAttribute("href",instagram)
    a.innerHTML = '<i class="fab fa-instagram"> </i>'
    li.appendChild(a)
    links.appendChild(li)
  }
  

}
