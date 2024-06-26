let updateQuestions = (newquestionText, newQuestionAnswer, lvl, id) => {
  let levelLocalStorage = lvl === 1 ? 'level-one' : 'level-two';
  let Questions = JSON.parse(localStorage.getItem(levelLocalStorage));
  Questions[id].questionContext = newquestionText;
  Questions[id].correctAnswers = newQuestionAnswer;

  localStorage.setItem(levelLocalStorage, JSON.stringify(Questions));
};

function deleteLevelQuestion(l, QID) {
  if (l == 1) {
    let level = 'level-one';
    let levelData = JSON.parse(localStorage.getItem(level));
    levelData[QID].isActive = false;

    localStorage.setItem(level, JSON.stringify(levelData));
  } else {
    let level = 'level-two';
    let levelData = JSON.parse(localStorage.getItem(level));

    levelData[QID].isActive = false;
    localStorage.setItem(level, JSON.stringify(levelData));
  }
}

function restoreLevelQuestion(l, QID) {
  if (l == 1) {
    let level = 'level-one';
    let levelData = JSON.parse(localStorage.getItem(level));
    levelData[QID].isActive = true;
    localStorage.setItem(level, JSON.stringify(levelData));
  } else {
    let level = 'level-two';
    let levelData = JSON.parse(localStorage.getItem(level));

    levelData[QID].isActive = true;
    localStorage.setItem(level, JSON.stringify(levelData));
  }
}
let createQuestions = (questionText, answer, lvl) => {
  let levelLocalStorage = lvl === 1 ? 'level-one' : 'level-two';
  let levelOneQuestions = JSON.parse(localStorage.getItem(levelLocalStorage));

  const entries = Object.entries(levelOneQuestions);

  let id = entries.length > 2 ? +entries[entries.length - 3][0] + 1 : 1;

  let newQuestion = {
    questionContext: questionText,
    correctAnswers: answer,
    totalCorrectAnswers: 0,
    isActive: true,
  };
  levelOneQuestions[id] = newQuestion;
  localStorage.setItem(levelLocalStorage, JSON.stringify(levelOneQuestions));
};

let deleteQuestionFromLocalStorage = (id) => {
  let allQuestions = JSON.parse(localStorage.getItem(levelLocalStorage));

  if (!allQuestions) {
    console.log('No Questions found in local storage.');
    return;
  }

  allQuestions[id].isActive = false;

  localStorage.setItem(levelLocalStorage, JSON.stringify(allQuestions));
};

function deleteQuestion(button, lvl) {
  const row = button.parentNode.parentNode;
  //getting the question id
  QID = row.cells[0];
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Question!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteLevelQuestion(lvl, QID.innerText);
      Swal.fire({
        title: 'Deleted',
        text: 'Question has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        location.reload();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Question',
        text: 'Question deletion was cancelled',
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
  });
}
function restoreQuestion(button, lvl) {
  const row = button.parentNode.parentNode;
  //getting the question id
  QID = row.cells[0];
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will recover this Question!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, restore it!',
    cancelButtonText: 'No, keep it',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) {
      restoreLevelQuestion(lvl, QID.innerText);
      Swal.fire({
        title: 'Restored',
        text: 'Question has been restored.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        location.reload();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Question',
        text: 'Question restoring was cancelled',
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
  });
}
