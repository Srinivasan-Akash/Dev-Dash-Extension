
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64666a86e7d116b4dea2');
  const storage = new Storage(client);



window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('form');
    if (el) {
        el.addEventListener("submit", myFunction)
    }
    const cl= document.getElementById('copy_link');
    if(cl){
      cl.addEventListener('click',url)
    }
    document.getElementById("copy_link").disabled = true;
});

let name =""
let interest= ""
let email= ""
let facebook= ""
let twitter=""
let linkedin= ""
let instagram= ""
let imageUrl=""
let file_id=""



 function url(event){
  // const parameterValue = 'example'; // Replace with your parameter value
  let baseUrl = window.location.href.split('?')[0]; // Get the base URL without existing query parameters
  console.log(baseUrl)
  if(!baseUrl.includes("index.html")){
    baseUrl+="preview.html"
  }
  else{
    baseUrl=baseUrl.replace("index.html","preview.html");
  }
  
  const result = storage.getFilePreview('6474e1296c5edf89503a', file_id);
 
  const updatedUrl = `${baseUrl}?name=${name.split(" ").join("+")}&interest=${interest}&email=${email}&facebook=${facebook}&twitter=${twitter}&linkedin=${linkedin}&instagram=${instagram}&imageUrl=${result.href}`; // Append the parameter to the URL

  // Navigate to the updated URL
  // window.location.href = updatedUrl;
  console.log(updatedUrl)
  console.log(result.href)
  navigator.clipboard.writeText(updatedUrl).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    alert("link copied to clipboard")
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}



function myFunction(event) {
  event.preventDefault()  
  console.log("got clicked..")

  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  interest = document.getElementById("interest").value;
  facebook = document.getElementById("facebook").value;
  twitter = document.getElementById("twitter").value;
  linkedin = document.getElementById("linkedin").value;
  instagram = document.getElementById("instagram").value;

  const fileInput = document.getElementById('imageInput');
      file_id=Date.now()
      console.log("file_id  -->  "+file_id)
      const file = fileInput.files[0];
      const promise = storage.createFile('6474e1296c5edf89503a',file_id, file);
      promise.then(function (response) {
          console.log(response); // Success
      }, function (error) {
          console.log(error); // Failure
      });

      if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
          const imageData = e.target.result;
          const blob = new Blob([imageData], { type: file.type });

          // Do something with the Blob, such as sending it to the server

          console.log('Image converted to Blob:', blob);
          imageUrl = URL.createObjectURL(blob);

          const imgElement = document.getElementById('imageElement');
          imgElement.src = imageUrl;

        };

        reader.readAsArrayBuffer(file);
      }



  
  document.getElementById("card_name").innerHTML=`${name}@<span>${interest}</span>`
  document.getElementById("card_email").innerText=email;
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
  document.getElementById("copy_link").disabled = false;  
}