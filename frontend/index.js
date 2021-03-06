


window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoList = document.getElementById('photo-list');
  const photoThumbnailArea = document.createElement('div');
  photoThumbnailArea.className = 'photo-thumbnail-area';
  photoList.appendChild(photoThumbnailArea);
  const photoDetail = document.getElementById('photo-detail');
  const photoUrl = 'http://localhost:3000/api/v1/photos';
  const allPhotos = [];
  let currentUser

  fetchPhoto();
  displayPhotoDetails();
  detailBtns();
  login();

  
  function fetchPhoto() {
    fetch(`${photoUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((photos) => {
        photos.forEach(photo => {
          allPhotos.push(photo);
          // renderPhoto(photo);
          // deleted so it doesn't show up until signed in
        });

      }); //closes fetch
  } // closes function fetchphotos


  function renderPhoto(photo) {

    const photoImgUrl = document.createElement('img');
    photoImgUrl.className = 'photo-thumbnail';
    photoImgUrl.src = photo.img_url;
    photoImgUrl.dataset.id = photo.id;

    photoThumbnailArea.appendChild(photoImgUrl);
  } // closes function renderphoto


  function showDetails(photo) {
    // console.log(photo);
    photoDetail.dataset.id = photo.id;
    photoDetail.dataset.user_id = photo.user_id;

    photoDetail.innerHTML = `
      <h2>${photo.title}</h2>
      <img class='photo-big' src="${photo.img_url}"/>
      <br>
      <button class='like-btn'>Likes: ${photo.likes}</button>
      <br>
      <br>
      Description:</br>
      <textarea>${photo.description}</textarea><br><Br>
      <button class='save-btn'>Save Description</button><br>
      <button class='delete-btn'>Delete</button>
    `;
  } //end of show details 


  function fetchPhotoDetails(id) {
    fetch(`${photoUrl}/${id}`)
      .then(resp => resp.json())
      .then(photo => {
        showDetails(photo);
        // console.log(photo, 'photoooo')
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
        
        fetch(`${photoUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          }
        })
        .then(resp => resp.json())
        .then(() => {
          photoDetail.innerHTML = "";
          const thumbNail = photoThumbnailArea.querySelector(`[data-id='${id}']`);
          thumbNail.remove();
        }); //closes fetch delete
      } // closes delete if

    });  //end of listener

  } //end of detailbtns


  function addNewPhoto() {
    if(!photoList.querySelector('form')) {
      const form = document.createElement('form');
      form.className = 'new-photo-form';
      form.innerHTML = `
        <input type="text" name="title" placeholder="Photo Title">
        <input type="text" name="img_url" placeholder="Photo Link">
        <input type="textarea" name="description" placeholder="Description">
        <button class="new-photo-btn" value="submit">Add New Photo</button>
        `;
      photoList.prepend(form);
      
        form.addEventListener('submit', function (event) {
          event.preventDefault();
      
          const title = event.target.title.value;
          const imgUrl = event.target.img_url.value;
          const description = event.target.description.value;
          const userId = event.target.dataset.id;
          console.log(userId, 'userid');
      
          fetch('http://localhost:3000/api/v1/photos', {
            method: "POST",
            headers: {
              "content-type": "application/json",
              accept: "application/json"
            },
            body: JSON.stringify({
              "user_id": userId,
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
            form.reset()
        }); //end of new form
  

    }

  } // end of addNewPhoto



  function login() {
    const title = document.querySelector('#title');
    const usernameDiv = document.createElement('div');
    usernameDiv.innerHTML = `
  <input type="text" class='login' name="username" placeholder="Username">
  <button class='login-btn' id='button raise'>Login</button>
  
  
  `;
    usernameDiv.addEventListener('click', function (event) {
      if (event.target.className === 'login-btn') {
        let username = event.target.parentNode.children[0].value;
        currentUser = username



        console.log(currentUser)

        fetch(`http://localhost:3000/api/v1/users/${username}`)
          .then(resp => resp.json())
          .then(user => {
            addNewPhoto();
            let form = document.getElementsByClassName('new-photo-form')[0];
            form.dataset.id = user.id;
            const userPhotos = allPhotos.filter(photo => photo.user_id === user.id);
            photoThumbnailArea.innerHTML = "";
            userPhotos.forEach(photo => renderPhoto(photo));
          });
      }
    });
    title.appendChild(usernameDiv);
    
  } //closes login


}); // closes dom

