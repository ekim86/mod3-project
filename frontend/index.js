window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoList = document.getElementById('photo-list')
  const photoDetail = document.getElementById('photo-detail')
  const photoUrl = 'http://localhost:3000/api/v1/photos';
  // `${photoUrl}/${photo.id}`
  // make sure to cd into backend to run rails s

  fetchPhoto();
  displayPhotoDetails();
  detailBtns();

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
   console.log(photo)
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
      <button class='edit-btn'>Edit Description</button><br>
      <button class='delete-btn'>Delete</button>
    `;

  } //end of show details 


  function fetchPhotoDetails(id) {
    fetch(`${photoUrl}/${id}`)
        .then(resp => resp.json())
        .then(photo => {
          showDetails(photo);
        });
  }


function displayPhotoDetails() {
  photoList.addEventListener('click', function (event) {
    if (event.target.className === 'photo-thumbnail') {
      let photoId = event.target.parentNode.dataset.id;
      fetchPhotoDetails(photoId)
    }
  }); //closes event listener
} //end of disphotodetails 


function detailBtns() {
  photoDetail.addEventListener('click', function(event) {
    let id = photoDetail.dataset.id
    if (event.target.className === 'like-btn') {

      let likes = event.target.innerText.split(' ')[1]
      let numLikes = parseInt(likes) +1
      likes.innerText = `Likes: ${numLikes}`


    }
  })  //end of listener
} //end of detailbtns


});