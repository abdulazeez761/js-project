document.querySelector('.hamburger').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('active');
  document.getElementById('nav-header').classList.toggle('active-header');
});
