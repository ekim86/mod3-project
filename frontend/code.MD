# CODE WITH COMMENTS

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoList = document.getElementById('photo-list');
  const photoDetail = document.getElementById('photo-detail');
  const photoUrl = 'http://localhost:3000/api/v1/photos';
  // `${photoUrl}/${photo.id}`
  // make sure to cd into backend to run rails s

  fetchPhoto();
  displayPhotoDetails();
  detailBtns();
  addNewPhoto();

  function fetchPhoto() {
    fetch(`${photoUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((photos) => {
        // console.log(photos);
        photos.forEach(photo =>
          // console.log(photo));
          renderPhoto(photo));
      }); //closes fetch
  } // closes function fetchphotos


  function renderPhoto(photo) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo-thumbnail';
    photoDiv.dataset.id = photo.id;
    photoDiv.innerHTML = `
    <img class='photo-thumbnail' src="${photo.img_url}"/>
    <br><br>`;
    photoList.appendChild(photoDiv);
  } // closes function renderphoto


  function showDetails(photo) {
    console.log(photo);
    photoDetail.dataset.id = photo.id;
    // console.log(photoDetail, "PHOTO DETAILS?")
    photoDetail.innerHTML = `
      <h2>${photo.title}</h2>
      <img src="${photo.img_url}"/>
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
      });
  } // closes fetchPhoto Details


  function displayPhotoDetails() {

    photoList.addEventListener('click', function (event) {
      if (event.target.className === 'photo-thumbnail') {
        const photoId = event.target.parentNode.dataset.id;
        fetchPhotoDetails(photoId);
      }
    }); //closes event listener

  } //end of disphotodetails 


  function detailBtns() {

    photoDetail.addEventListener('click', function (event) {
      const id = photoDetail.dataset.id;
      // can get the id without having to always do event.target
      if (event.target.className === 'like-btn') {
        const likes = event.target.innerText.split(' ')[1];
        // we got the number that isn't yet a number
        const numLikes = parseInt(likes) + 1;
        // changed it to a number and added one
        event.target.innerText = `Likes: ${numLikes}`;
        // making the numLikes equal the innerText of the likes but making sure it is in a string
        // should use event.target.innerText because we are changing the text.
        // cannot just do likes = numLikes
        // alternative if we just have a string vv
        // let likes = parseInt(event.target.innerText) + 1
        // event.target.innerText = likes
        // when it's like this => <button class='like-btn'>${photo.likes}</button>
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
        // console.log(desc, "description") WORKS!
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
  // create a form element to be able to add new photo
  // input includes description, title and url, submit button 
  //post to api

  function addNewPhoto() {
    const form = document.createElement('form')
    form.innerHTML = `
<input type="text" name="title" placeholder="Photo Title">
<input type=text" name="img_url" placeholder="Photo Link">
<input type="textarea" name="description" placeholder="Description">
<button class="new-photo-btn" value="submit">Add New Photo</button>
`
    photoList.append(form)

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = event.target.title.value
      const imgUrl = event.target.img_url.value
      const description = event.target.description.value
      // let title = form.title.value
      // const newPhotoObj = { title, imgUrl, description}
      // console.log(newPhotoObj, 'does this create a new obj?')

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
      }) // pessimistic rendering 


    }); //end of new form
  }











  
}); // closes dom

