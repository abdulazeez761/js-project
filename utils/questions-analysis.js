function analyzeQuestions() {
  // Retrieve the participants data from localStorage and parse it
  let participants = JSON.parse(localStorage.getItem('participants'));

  // Objects to count wrong and correct answers for level 1 and level 2 questions
  let questionWrongCountsLevel1 = {};
  let questionCorrectCountsLevel1 = {};
  let questionWrongCountsLevel2 = {};
  let questionCorrectCountsLevel2 = {};

  // Iterate over each participant
  for (let participantId in participants) {
    let participant = participants[participantId];

    // Only consider participants at level 1 or 2
    if (participant.level == 1 || participant.level == 2) {
      let questions = participant.questions;

      // Iterate over each question answered by the participant
      for (let questionId in questions) {
        let questionData = questions[questionId];

        // Count wrong and correct answers for level 1 participants
        if (participant.level == 1) {
          if (questionData.correct === false) {
            if (!questionWrongCountsLevel1[questionId]) {
              questionWrongCountsLevel1[questionId] = 0;
            }
            questionWrongCountsLevel1[questionId]++;
          } else if (questionData.correct === true) {
            if (!questionCorrectCountsLevel1[questionId]) {
              questionCorrectCountsLevel1[questionId] = 0;
            }
            questionCorrectCountsLevel1[questionId]++;
          }
        }

        // Count wrong and correct answers for level 2 participants
        if (participant.level == 2) {
          if (questionData.correct === false) {
            if (!questionWrongCountsLevel2[questionId]) {
              questionWrongCountsLevel2[questionId] = 0;
            }
            questionWrongCountsLevel2[questionId]++;
          } else if (questionData.correct === true) {
            if (!questionCorrectCountsLevel2[questionId]) {
              questionCorrectCountsLevel2[questionId] = 0;
            }
            questionCorrectCountsLevel2[questionId]++;
          }
        }
      }
    }
  }

  // Determine the most wrong and correct question for level 1
  let mostWrongQuestionIdLevel1 = null;
  let maxWrongCountLevel1 = 0;
  let mostCorrectQuestionIdLevel1 = null;
  let maxCorrectCountLevel1 = 0;

  for (let questionId in questionWrongCountsLevel1) {
    if (questionWrongCountsLevel1[questionId] > maxWrongCountLevel1) {
      maxWrongCountLevel1 = questionWrongCountsLevel1[questionId];
      mostWrongQuestionIdLevel1 = questionId;
    }
  }

  for (let questionId in questionCorrectCountsLevel1) {
    if (questionCorrectCountsLevel1[questionId] > maxCorrectCountLevel1) {
      maxCorrectCountLevel1 = questionCorrectCountsLevel1[questionId];
      mostCorrectQuestionIdLevel1 = questionId;
    }
  }

  // Determine the most wrong and correct question for level 2
  let mostWrongQuestionIdLevel2 = null;
  let maxWrongCountLevel2 = 0;
  let mostCorrectQuestionIdLevel2 = null;
  let maxCorrectCountLevel2 = 0;

  for (let questionId in questionWrongCountsLevel2) {
    if (questionWrongCountsLevel2[questionId] > maxWrongCountLevel2) {
      maxWrongCountLevel2 = questionWrongCountsLevel2[questionId];
      mostWrongQuestionIdLevel2 = questionId;
    }
  }

  for (let questionId in questionCorrectCountsLevel2) {
    if (questionCorrectCountsLevel2[questionId] > maxCorrectCountLevel2) {
      maxCorrectCountLevel2 = questionCorrectCountsLevel2[questionId];
      mostCorrectQuestionIdLevel2 = questionId;
    }
  }

  return {
    questionWrongCountsLevel1,
    mostWrongQuestionIdLevel1,
    maxWrongCountLevel1,
    questionCorrectCountsLevel1,
    mostCorrectQuestionIdLevel1,
    maxCorrectCountLevel1,
    questionWrongCountsLevel2,
    mostWrongQuestionIdLevel2,
    maxWrongCountLevel2,
    questionCorrectCountsLevel2,
    mostCorrectQuestionIdLevel2,
    maxCorrectCountLevel2,
  };
}

// Call the function

function numberOfCorrectAnswerForEachQuestion(level) {
  // Determine the level key based on the input level
  let localStorageLevel = level == 1 ? 'level-one' : 'level-two';

  // Initialize the result object
  let questionsAndNumberOfCorrectAnswers = {};

  // Retrieve questions and participants data from localStorage
  let questions = JSON.parse(localStorage.getItem(localStorageLevel));
  let participants = JSON.parse(localStorage.getItem('participants'));

  // Make sure that we have questions and participants data before calculating
  if (questions && participants && Object.keys(questions).length > 2) {
    // Initialize each question in the result object
    for (const question in questions) {
      if (question != 'levleID' && question != 'started') {
        questionsAndNumberOfCorrectAnswers[question] = {
          correct: 0,
          wrong: 0,
        };
      }
    }

    // Iterate through each participant to count the correct and wrong answers
    for (const participantId in participants) {
      let participantAnswers = participants[participantId].questions;
      for (const question in participantAnswers) {
        if (participants[participantId].level == level) {
          // Ensure the question exists in the questionsAndNumberOfCorrectAnswers object
          if (questionsAndNumberOfCorrectAnswers.hasOwnProperty(question)) {
            if (participantAnswers[question].correct) {
              questionsAndNumberOfCorrectAnswers[question].correct++;
            } else {
              questionsAndNumberOfCorrectAnswers[question].wrong++;
            }
          }
        }
      }
    }
  }

  return questionsAndNumberOfCorrectAnswers;
}

function logestQuestion(lvl) {
  function formatTimeTaken(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes}m `;
    }
    if (seconds > 0 || formattedTime === '') {
      formattedTime += `${seconds}s`;
    }
    return formattedTime.trim();
  }
  // Fetch participants from localStorage
  const jsonData = localStorage.getItem('participants');
  const participants = JSON.parse(jsonData) || {}; // Default to an empty object if jsonData is null

  function parseTime(timeStr) {
    if (timeStr.endsWith('s')) {
      return parseInt(timeStr.replace('s', ''), 10);
    }
    if (timeStr.endsWith('m')) {
      return parseInt(timeStr.replace('m', ''), 10) * 60;
    }
    if (timeStr.endsWith('h')) {
      return parseInt(timeStr.replace('h', ''), 10) * 3600;
    }
    return 0; // Default to 0 if no valid unit is found
  }

  let questionTimes = {};

  // Aggregate time taken for each question
  for (let participantId in participants) {
    if (participants[participantId].level == lvl) {
      for (let questionId in participants[participantId].questions) {
        let questionData = participants[participantId].questions[questionId];
        let timeTaken = parseTime(questionData.timeTaken);

        if (!questionTimes[questionId]) {
          questionTimes[questionId] = { totalTime: 0, count: 0 };
        }

        questionTimes[questionId].totalTime += timeTaken;
        questionTimes[questionId].count++;
      }
    }
  }

  // Calculate average time for each question and determine the highest average
  let highestAverageQuestion = { averageTime: 0, id: 0 };

  for (let questionId in questionTimes) {
    let averageTime =
      questionTimes[questionId].totalTime / questionTimes[questionId].count;

    if (averageTime > highestAverageQuestion.averageTime) {
      highestAverageQuestion.averageTime = averageTime;
      highestAverageQuestion.id = questionId;
    }
  }

  return {
    longestTime: formatTimeTaken(highestAverageQuestion.averageTime),
    longestQuestionId: highestAverageQuestion.id,
  };
}
