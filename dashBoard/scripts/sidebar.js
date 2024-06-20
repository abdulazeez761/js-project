document.addEventListener('DOMContentLoaded', function () {
  const dropdownButtons = document.querySelectorAll('.dropbtn');
  const contentButtons = document.querySelectorAll('.dropdown-content button');

  dropdownButtons.forEach((button) => {
    button.addEventListener('click', function () {
      this.parentElement.classList.toggle('active');
    });
  });
  let currentActiveButtonID = window.location.href.split('/');
  currentActiveButtonID =
    currentActiveButtonID[currentActiveButtonID.length - 1];

  currentActiveButtonID = currentActiveButtonID.split('.')[0];

  document
    .getElementById(`${currentActiveButtonID}`)
    ?.classList.toggle('active');

  contentButtons.forEach((button) => {
    button.addEventListener('click', function () {
      contentButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      dropdownButtons.forEach((btn) =>
        btn.parentElement.classList.remove('active')
      );
      this.closest('.dropdown').classList.add('active');
    });
  });

  const activeButton = document.querySelector(
    '.dropdown-content button.active'
  );
  if (activeButton) {
    activeButton.closest('.dropdown').classList.add('active');
  }
});

function navigateTo(page) {
  window.location.href = page;
}
