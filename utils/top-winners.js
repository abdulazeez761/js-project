function leaderboard(lvl) {
  // Fetch participants from localStorage
  const jsonData = localStorage.getItem('participants');
  const participants = JSON.parse(jsonData) || {}; // Default to an empty object if jsonData is null
  // console.log("local storage participants", participants);
  // Calculate the total time taken for all questions
  function calculateTotalTime(questions) {
    let totalTime = 0;
    for (const key in questions) {
      const timeStr = questions[key].timeTaken;
      const timeInSeconds = parseTime(timeStr);
      totalTime += timeInSeconds;
    }
    return totalTime;
  }

  // Parse a time string (e.g., "2h", "30m", "45s") into seconds
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
    console.log('invalid time');
    return 0; // Default to 0 if no valid unit is found
  }

  // Sort participants based on criteria
  function sortParticipants(participants) {
    const validParticipants = Object.values(participants).filter(
      (participant) => {
        if (!participant.totalTime || participant.totalTime == '') {
          const totalTimeInSeconds = calculateTotalTime(participant.questions);
          participant.totalTime = totalTimeInSeconds.toString() + 's';
        }
        return participant.totalTime != '' && participant.level == lvl;
      }
    );

    validParticipants.sort((a, b) => {
      if (a.correctAnswers != b.correctAnswers) {
        return b.correctAnswers - a.correctAnswers; // Higher correct answers first
      }
      return parseTime(a.totalTime) - parseTime(b.totalTime); // Lower total time first
    });

    return validParticipants;
  }

  // Sort participants and log them
  const sortedParticipants = sortParticipants(participants);
  return sortedParticipants;
  // console.log("Sorted Participants:", sortParticipants(participants));
}
