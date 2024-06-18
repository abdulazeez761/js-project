const levelButtons = document.querySelectorAll('.selection-btn');
levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById('screen-blur').style.display = 'block';
    const selectedLevel = button.getAttribute('data-level');
    document
      .getElementById('Confirm-btn')
      .setAttribute('data-level', selectedLevel);
  });
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('screen-blur').style.display = 'none';
});

document.getElementById('Confirm-btn').addEventListener('click', () => {
  const userID = document.getElementById('user-id').value;
  let selectedLevel = document
    .getElementById('Confirm-btn')
    .getAttribute('data-level');
  selectedLevel = selectedLevel == 1 ? 'level-one' : 'level-two';
  const storedLevel = JSON.parse(localStorage.getItem(`${selectedLevel}`));
  const checkCompetitionStarted = JSON.parse(
    localStorage.getItem(`${storedLevel}`)
  );
  if (checkCompetitionStarted?.started == 1) {
    const storedUsers = JSON.parse(localStorage.getItem('participants'));

    if (
      !userID ||
      !storedUsers[userID] ||
      storedUsers[userID].level !== selectedLevel
    ) {
      alert('Invalid User ID or Level');
    } else {
      const started = storedLevel.started;
      localStorage.setItem('loged-in-userID', userID);
      localStorage.setItem('loged-in-user-level', selectedLevel);
      const dashboardURL =
        started == 1
          ? `../pages/question-page.html`
          : `../pages/question-page.html`;
      window.location.href = dashboardURL;
    }
  } else {
    alert('The competition has not started');
  }
});
