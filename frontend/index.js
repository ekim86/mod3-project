window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoUrl = 'http://localhost:3000/api/v1/photos';
  // `${photoUrl}/${photo.id}`
  // make sure to cd into backend to run rails s

  fetchPhoto();

  function fetchPhoto() {
    fetch(`${photoUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((photos) => {
        // console.log(photos);
        photos.forEach(photo =>
          console.log(photo));
        // renderphoto(photo);
      }); //closes fetch
  } // closes function fetchphotos



  function renderPhoto(photo) {
    const photoList = document.getElementsById('photo-list')
    const photoDiv = document.createElement('div')
    photoDiv.dataset.id = photo.id
    photoDiv.innerHTML = `
    ${photo.title}`
    
// console.log(photo);
  } // closes function renderphoto



});