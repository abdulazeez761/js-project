function difficultQuestion(){
    let participants = JSON.parse(localStorage.getItem('participants'));

    let questionWrongCountsLevel1 = {};
    let questionWrongCountsLevel2 = {};
    
    for (let participantId in participants) {
        let participant = participants[participantId];
    
        if (participant.level == 1 || participant.level == 2) {
            let questions = participant.questions;
    
            for (let questionId in questions) {
                let questionData = questions[questionId];
                
                if (participant.level == 1 && questionData.correct === false) {
                    if (!questionWrongCountsLevel1[questionId]) {
                        questionWrongCountsLevel1[questionId] = 0;
                    }
                    questionWrongCountsLevel1[questionId]++;
                }
    
                if (participant.level == 2 && questionData.correct === false) {
                    if (!questionWrongCountsLevel2[questionId]) {
                        questionWrongCountsLevel2[questionId] = 0;
                    }
                    questionWrongCountsLevel2[questionId]++;
                }
            }
        }
    }
    
    let mostWrongQuestionIdLevel1 = null;
    let maxWrongCountLevel1 = 0;
    
    for (let questionId in questionWrongCountsLevel1) {
        // console.log(`    ${questionWrongCountsLevel1[questionId]}  ${questionId}`);
        if (questionWrongCountsLevel1[questionId] > maxWrongCountLevel1) {
            maxWrongCountLevel1 = questionWrongCountsLevel1[questionId];
            mostWrongQuestionIdLevel1 = questionId;
        }
    }
    
    let mostWrongQuestionIdLevel2 = null;
    let maxWrongCountLevel2 = 0;
    
    for (let questionId in questionWrongCountsLevel2) {
        if (questionWrongCountsLevel2[questionId] > maxWrongCountLevel2) {
            maxWrongCountLevel2 = questionWrongCountsLevel2[questionId];
            mostWrongQuestionIdLevel2 = questionId;
        }
    }
    
    console.log(`Most wrong question ID for Level 1: ${mostWrongQuestionIdLevel1} with ${maxWrongCountLevel1} wrong answers`);
    console.log(`Most wrong question ID for Level 2: ${mostWrongQuestionIdLevel2} with ${maxWrongCountLevel2} wrong answers`);
    
}
 difficultQuestion();