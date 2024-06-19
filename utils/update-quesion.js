let updateQuestions = (newquestionText, newQuestionAnswer, lvl ,id) => {
    let levelLocalStorage = lvl === 1 ? "level-one" : "level-two";
    let Questions = JSON.parse(localStorage.getItem(levelLocalStorage));
     Questions[id].questionContext=newquestionText;
     Questions[id].correctAnswers=newQuestionAnswer;
   
    localStorage.setItem(levelLocalStorage, JSON.stringify(Questions));
  };
  
  

  