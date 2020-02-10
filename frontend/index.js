window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Photo App');

  const photoUrl = 'http://localhost:3000/api/v1/photos';
  // `${photoUrl}/${photo.id}`
  // make sure to cd into backend to run rails s


  fetch(`${photoUrl}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
  }); //closes fetch




});