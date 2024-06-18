
// Data and Level objects
var dataMeberobj = {
  "1": {
    "id": "1",
    "level": "1",
    "name": "Abdulaziz",
    "result": 85,
    "totalTime": 120,
    "correctAnswers": 2,
    "wrongAnswers": 1,
    "questions": {
      "1": { "timeTaken": 0, "status": "" },
      "2": { "timeTaken": 0, "status": "" },
      "3": { "timeTaken": 0, "status": "" },
      "4": { "timeTaken": 0, "status": "" },
      "5": { "timeTaken": 0, "status": "" },
      "6": { "timeTaken": 0, "status": "" }
    }
  },
  "2": {
    "id": "2",
    "level": "2",
    "name": "Bilal",
    "result": 90,
    "totalTime": 110,
    "correctAnswers": 3,
    "wrongAnswers": 0,
    "questions": {
      "1": { "timeTaken": 0, "status": "" },
      "2": { "timeTaken": 0, "status": "" },
      "3": { "timeTaken": 0, "status": "" },
      "4": { "timeTaken": 0, "status": "" },
      "5": { "timeTaken": 0, "status": "" },
      "6": { "timeTaken": 0, "status": "" }
    }
  },
  "3": {
    "id": "3",
    "level": "1",
    "name": "Bilal",
    "result": 0,
    "totalTime": "",
    "correctAnswers": 0,
    "wrongAnswers": 0,
    "questions": {
      "1": { "timeTaken": 0, "status": "" },
      "2": { "timeTaken": 0, "status": "" },
      "3": { "timeTaken": 0, "status": "" },
      "4": { "timeTaken": 0, "status": "" },
      "5": { "timeTaken": 0, "status": "" },
      "6": { "timeTaken": 0, "status": "" }
    }
  }
}

var level1 = {
  "levleID": "1",
  "started": "1",
  "1": {
    "questionContext": "example of the question text",
    "correctAnswers": "300",
    "totalCorrectAnswers": 0
  },
  "2": {
    "questionContext": "example of the question text",
    "correctAnswers": "900",
    "totalCorrectAnswers": 0
  },
  "3": {
    "questionContext": "example of the question text",
    "correctAnswers": "100",
    "totalCorrectAnswers": 0
  }
}

const level2Obj = {
  "levleID": "2",
  "started": "0",
  "1": {
    "questionContext": "example of the question text",
    "correctAnswers": "300",
    "totalCorrectAnswers": ""
  },
  "2": {
    "questionContext": "example of the question text",
    "correctAnswers": "900",
    "totalCorrectAnswers": ""
  },
  "3": {
    "questionContext": "example of the question text",
    "correctAnswers": "100",
    "totalCorrectAnswers": ""
  },
  "participants": [
    {
      "id": "1",
      "name": "Abdulaziz"
    },
    {
      "id": "2",
      "name": "Bilal"
    },
    {
      "id": "2",
      "level": "1",
      "name": "Bilal"
    }
  ]
}

localStorage.setItem('level1', JSON.stringify(level1));
localStorage.setItem('level2', JSON.stringify(level2Obj));
localStorage.setItem('dataMember', JSON.stringify(dataMeberobj));

const levelButtons = document.querySelectorAll('.selection-btn');
levelButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('screen-blur').style.display = 'block';
    const selectedLevel = button.getAttribute('data-level');
    document.getElementById('Confirm-btn').setAttribute('data-level', selectedLevel);
  });
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('screen-blur').style.display = 'none';
});

document.getElementById('Confirm-btn').addEventListener('click', () => {
  const userID = document.getElementById('user-id').value;
  const selectedLevel = document.getElementById('Confirm-btn').getAttribute('data-level');
  const storedLevel = JSON.parse(localStorage.getItem(`level${selectedLevel}`));
  const checkCompetitionStarted = JSON.parse(localStorage.getItem(`level1`));
  if(checkCompetitionStarted.started=="1"){
    const storedUsers = JSON.parse(localStorage.getItem('dataMember'));
    debugger;
    if (!userID || !storedUsers[userID] || storedUsers[userID].level !== selectedLevel) {
      alert('Invalid User ID or Level');
    } else {
      const started = storedLevel.started;
      localStorage.setItem('userID', userID);
      localStorage.setItem('levelId', selectedLevel);
      const dashboardURL = started == 1 ? `../pages/question-page.html` : `../pages/question-page.html`;
      window.location.href = dashboardURL;
    }
  }else{
    alert('The competition has not started')
  }


});
