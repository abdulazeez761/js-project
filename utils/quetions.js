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
    console.log(levelData);
    delete levelData[QID];
    localStorage.setItem(level, JSON.stringify(levelData));
  } else {
    let level = 'level-two';
    let levelData = JSON.parse(localStorage.getItem(level));

    delete levelData[QID];
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

  delete allQuestions[id];

  localStorage.setItem(levelLocalStorage, JSON.stringify(allQuestions));
};
