

const jsonData = localStorage.getItem('participants');
const participants = JSON.parse(jsonData);
function findTopParticipant(participants) {
    let topParticipant = null;

    for (const key in participants) {
        const participant = participants[key];
        if (!participant.totalTime) continue; // Skip participants with no total time

        if (
            !topParticipant ||
            participant.correctAnswers > topParticipant.correctAnswers ||
            (
                participant.correctAnswers === topParticipant.correctAnswers &&
                participant.totalTime < topParticipant.totalTime
            )
        ) {
            topParticipant = participant;
        }
    }

    return topParticipant;
}

// Find and log the top participant
const topParticipant = findTopParticipant(participants);
console.log('Top Participant:', topParticipant);