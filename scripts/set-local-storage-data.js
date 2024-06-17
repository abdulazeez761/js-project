localStorage.setItem(
  'paticipants',
  ` {
  "participants": [
    {
      "id": "1",
      "level": "levelId",
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
    {
      "id": "2",
      "level": "levelId",
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
    {
      "id": "2",
      "level": "1",
      "name": "Bilal",
      "result": 0,
      "totalTime": 0,
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
  ]
}
`
);

localStorage.setItem(
  'level-two',
  ` {
  "id": "2",
  "question1": {
    "id": "1",
    "questionContext": "example of the question text",
    "correctAnswers": "300"
  },
  "question2": {
    "id": "2",
    "questionContext": "example of the question text",
    "correctAnswers": "900"
  },
  "question3": {
    "id": "3",
    "questionContext": "example of the question text",
    "correctAnswers": "100"
  }
}

`
);
localStorage.setItem(
  'level-one',
  ` {
  "id": "1",
  "question1": {
    "id": "1",
    "questionContext": "example of the question text",
    "correctAnswers": "300"
  },
  "question2": {
    "id": "2",
    "questionContext": "example of the question text",
    "correctAnswers": "900"
  },
  "question3": {
    "id": "3",
    "questionContext": "example of the question text",
    "correctAnswers": "100"
  }
}

`
);

localStorage.setItem(
  'admin',
  `
  {
  "admins": {
    "id": 1,
    "name": "abdulaziz",
    "email": "abdulazizharii@gmail.com",
    "password": "1234"
  }
}
`
);
