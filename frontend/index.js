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
          // console.log(photo));
        renderPhoto(photo));
      }); //closes fetch
  } // closes function fetchphotos



  function renderPhoto(photo) {
    const photoList = document.getElementById('photo-list')
    const photoDiv = document.createElement('div')
    photoDiv.className = 'photo-thumbnail'
    photoDiv.id = 'card'
    photoDiv.dataset.id = photo.id
    photoDiv.innerHTML = `
    ${photo.title}<br>
    <img src="${photo.img_url}">`
    photoList.appendChild(photoDiv)

    
// console.log(photo);
  } // closes function renderphoto

//add event listener to photo list

});