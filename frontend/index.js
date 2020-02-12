window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoList = document.getElementById('photo-list');
  const photoDetail = document.getElementById('photo-detail');
  const photoUrl = 'http://localhost:3000/api/v1/photos';

  fetchPhoto();
  displayPhotoDetails();
  detailBtns();
  addNewPhoto();
  login();

  function fetchPhoto() {
    fetch(`${photoUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((photos) => {
        photos.forEach(photo =>
          renderPhoto(photo));
      }); //closes fetch
  } // closes function fetchphotos


  function renderPhoto(photo) {

    const photoImgUrl = document.createElement('img');
    photoImgUrl.className = 'photo-thumbnail';
    photoImgUrl.src = photo.img_url;
    photoImgUrl.dataset.id = photo.id;

    
    photoList.appendChild(photoImgUrl);
  } // closes function renderphoto


  function showDetails(photo) {
    console.log(photo);
    photoDetail.dataset.id = photo.id;

    photoDetail.innerHTML = `
      <h2>${photo.title}</h2>
      <img class='photo-big' src="${photo.img_url}"/>
      <br>
      <button class='like-btn'>Likes: ${photo.likes}</button>
      <br>
      <br>
      Description:<textarea>${photo.description}</textarea><br><Br>
      <button class='save-btn'>Save Description</button><br>
      <button class='delete-btn'>Delete</button>
    `;
  } //end of show details 


  function fetchPhotoDetails(id) {
    fetch(`${photoUrl}/${id}`)
      .then(resp => resp.json())
      .then(photo => {
        showDetails(photo);
        console.log(photo, 'photoooo')
      });
  } // closes fetchPhoto Details


  function displayPhotoDetails() {

    photoList.addEventListener('click', function (event) {
      if (event.target.className === 'photo-thumbnail') {
        const photoId = event.target.dataset.id;
        fetchPhotoDetails(photoId);
      }
    }); //closes event listener

  } //end of disphotodetails 


  function detailBtns() {

    photoDetail.addEventListener('click', function (event) {
      const id = photoDetail.dataset.id;

      if (event.target.className === 'like-btn') {
        const likes = event.target.innerText.split(' ')[1];
        const numLikes = parseInt(likes) + 1;
        event.target.innerText = `Likes: ${numLikes}`;

        fetch(`${photoUrl}/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({ likes: numLikes })
        });
      } // closes like if

      if (event.target.className === 'save-btn') {
        const desc = document.querySelector('textarea').value;
        fetch(`${photoUrl}/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({ "description": desc })
        });
      } // closes save if

      if (event.target.className === 'delete-btn') {
        photoDetail.innerHTML= "";
        const photoThumbnails = document.getElementsByClassName('photo-thumbnail');
        Array.from(photoThumbnails).forEach(photo => {
          if (photo.dataset.id === id) {
            photo.remove();
          }
        });
        fetch(`${photoUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          }
        });
      } // closes delete if

    });  //end of listener

  } //end of detailbtns

  // find ul class


  function addNewPhoto() {
    const form = document.createElement('form')
    form.innerHTML = `
      <input type="text" name="title" placeholder="Photo Title">
      <input type=text" name="img_url" placeholder="Photo Link">
      <input type="textarea" name="description" placeholder="Description">
      <button class="new-photo-btn" value="submit">Add New Photo</button>
      `;
    photoList.append(form)

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = event.target.title.value;
      const imgUrl = event.target.img_url.value;
      const description = event.target.description.value;
      // const title = form.title.value

      fetch('http://localhost:3000/api/v1/photos', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({
          "title": title,
          "img_url": imgUrl,
          "description": description,
          "likes": 0
        })
      })
      .then(resp => resp.json())
      .then(photo => {
        renderPhoto(photo);
      }); // pessimistic rendering 


    }); //end of new form
  }

function login() {
  const title = document.querySelector('#title')
  const usernameDiv = document.createElement('div')
  usernameDiv.innerHTML = `
  <input type="text" class='login' name="username" placeholder="Username">
  <button class='login-btn'>Login</button>
  `
  usernameDiv.addEventListener('click', function(event) {
    if (event.target.className === 'login-btn') {
      let username = event.target.parentNode.children[0].value;
      //then we want to show that user's pictures
      console.dir(username, 'username?')
    }
  })
  title.appendChild(usernameDiv)
}









  
}); // closes dom

