let addParticipants = (level, id, name) => {
  let participantsLevel = level == 1 ? 'level-one' : 'level-two';

  let allParticipants = JSON.parse(localStorage.getItem('paticipants'));
  let newParticipants = {
    id,
    name,
    level,
    result: 0,
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: {
      1: { timeTaken: 0, status: 0 },
      2: { timeTaken: 0, status: 0 },
      3: { timeTaken: 0, status: 0 },
      4: { timeTaken: 0, status: 0 },
      5: { timeTaken: 0, status: 0 },
      6: { timeTaken: 0, status: 0 },
    },
  };

  allParticipants['participants'].push(newParticipants);
  console.log(allParticipants);
  localStorage.setItem('paticipants', JSON.stringify(allParticipants));
};
addParticipants(34234, 2, 'adfad23424234');
