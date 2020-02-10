window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoUrl = 'http://localhost:3000/api/v1/photos';
  // `${photoUrl}/${photo.id}`
  // make sure to cd into backend to run rails s

  fetchImage();

  function fetchImage() {
    fetch(`${photoUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((images) => {
        // console.log(images);
        images.forEach(image =>
          console.log(image));
        // renderImage(image);
      }); //closes fetch
  } // closes function fetchImages



  function renderImage(image) {
    const imageList = document.getElementsById('image-list')
    const imageDiv = document.createElement('div')
    imageDiv.dataset.id = image.id
    imageDiv.innerHTML = `
    ${image.title}`
    )
// console.log(image);
  } // closes function renderimage



});