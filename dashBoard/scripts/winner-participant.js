// const jsonData = localStorage.getItem('participants');
// const participants = JSON.parse(jsonData);
// function findTopParticipant(participants) {
//   let topParticipant = null;

//   for (const key in participants) {
//     const participant = participants[key];
//     if (!participant.totalTime) continue; // Skip participants with no total time

//     if (
//       !topParticipant ||
//       participant.correctAnswers > topParticipant.correctAnswers ||
//       (participant.correctAnswers === topParticipant.correctAnswers &&
//         participant.totalTime < topParticipant.totalTime)
//     ) {
//       topParticipant = participant;
//     }
//   }

//   return topParticipant;
// }

// // Find and log the top participant
// const topParticipant = findTopParticipant(participants);
// console.log('Top Participant:', topParticipant);
const jsonData = localStorage.getItem('participants');
const participants = JSON.parse(jsonData);

function calculateTotalTime(questions) {
  let totalTime = 0;

  for (const key in questions) {
    const timeStr = questions[key].timeTaken;
    const timeInSeconds = parseTime(timeStr);
    totalTime += timeInSeconds;
  }

  return totalTime;
}

function parseTime(timeStr) {
  if (timeStr.endsWith('s')) {
    return parseInt(timeStr.replace('s', ''));
  }
  if (timeStr.endsWith('m')) {
    return parseInt(timeStr.replace('m', '')) * 60;
  }
  if (timeStr.endsWith('h')) {
    return parseInt(timeStr.replace('h', '')) * 3600;
  }
  return 0; // Default to 0 if no valid unit is found
}

function sortParticipants(participants) {
  const validParticipants = Object.values(participants).filter(
    (participant) => {
      if (!participant.totalTime || participant.totalTime == '') {
        participant.totalTime =
          calculateTotalTime(participant.questions).toString() + 's';
      }
      return participant.totalTime != '' && participant.level == '2';
    }
  );

  validParticipants.sort((a, b) => {
    if (a.correctAnswers > b.correctAnswers) {
      return -1;
    }
    if (a.correctAnswers < b.correctAnswers) {
      return 1;
    }
    if (parseTime(a.totalTime) < parseTime(b.totalTime)) {
      return -1;
    }
    if (parseTime(a.totalTime) > parseTime(b.totalTime)) {
      return 1;
    }
    return 0;
  });

  return validParticipants;
}

// Sort participants and log them
const sortedParticipants = sortParticipants(participants);
console.log('Sorted Participants:', sortedParticipants);
