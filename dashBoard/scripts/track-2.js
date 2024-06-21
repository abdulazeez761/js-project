document.addEventListener('DOMContentLoaded', () => {
  let questionsData = JSON.parse(localStorage.getItem('level-two') || '{}');
  let participantsData = JSON.parse(
    localStorage.getItem('participants') || '{}'
  );

  function populateTableHeaders(questions) {
    const headersRow = document.getElementById('table-headers');
    const existingHeaders = Array.from(headersRow.children).map(
      (header) => header.textContent
    );

    const newHeaders = [];
    let questionIndex = 1; // for counting number of quesionts and show them as 1 ->n insted of showing the id
    for (const questionId in questions) {
      if (questionId != 'levleID' && questionId != 'started') {
        newHeaders.push(`Q${questionIndex}`, `Time Q${questionIndex}`);
      }
      questionIndex++;
    }

    // Check if headers need to be updated
    if (existingHeaders.slice(1, -2).join() !== newHeaders.join()) {
      // Clear existing headers except the first and last two
      while (headersRow.children.length > 3) {
        headersRow.removeChild(
          headersRow.children[headersRow.children.length - 3]
        );
      }

      // Add dynamic question headers
      newHeaders.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headersRow.insertBefore(
          th,
          headersRow.children[headersRow.children.length - 2]
        );
      });
    }
  }

  function populateTable(data, questions) {
    const tableBody = document.getElementById('participant-results');
    tableBody.innerHTML = ''; // Clear any existing rows

    for (const key in data) {
      const participant = data[key];
      if (participant.level != '2') continue;
      const row = document.createElement('tr');

      // Create table cells
      const nameCell = document.createElement('td');
      nameCell.textContent = participant.name;
      row.appendChild(nameCell);

      for (const questionId in questions) {
        if (questionId !== 'levleID' && questionId !== 'started') {
          const questionCell = document.createElement('td');
          const timeCell = document.createElement('td');
          const question = participant.questions[questionId];

          questionCell.textContent = question ? question.answer : 'N/A';
          questionCell.className = question
            ? question.correct
              ? 'right-answer'
              : 'wrong-answer'
            : 'not-solved';
          timeCell.textContent = question ? question.timeTaken : 'N/A';

          row.appendChild(questionCell);
          row.appendChild(timeCell);
        }
      }

      const totalTimeCell = document.createElement('td');
      totalTimeCell.textContent = participant.totalTime;
      row.appendChild(totalTimeCell);

      const markCell = document.createElement('td');
      markCell.textContent = `${participant.result}`;
      row.appendChild(markCell);

      tableBody.appendChild(row);
    }
  }

  // Ensure data is available before populating the table
  if (
    Object.keys(questionsData).length > 0 &&
    Object.keys(participantsData).length > 0
  ) {
    populateTableHeaders(questionsData);
    populateTable(participantsData, questionsData);
  }

  setInterval(function () {
    // get the latest version of localStorage to implement live tracking
    let questionsData = JSON.parse(localStorage.getItem('level-two'));
    let participantsData = JSON.parse(localStorage.getItem('participants'));

    if (questionsData && participantsData) {
      populateTableHeaders(questionsData);
      populateTable(participantsData, questionsData);
    }
  }, 1000);
});

function startComp() {
  document.querySelector('.track-text').innerHTML = `
  Competition has
  <span style="color: green">Started</span>
`;
  const questionsData = JSON.parse(localStorage.getItem('level-two') || '{}');
  questionsData.started = 1;
  localStorage.setItem('level-two', JSON.stringify(questionsData));
  
    
 
}

function stopComp() {
  document.querySelector('.track-text').innerHTML = `
  Competition has been
  <span style="color: red">Stopped</span> 
`;
  const questionsData = JSON.parse(localStorage.getItem('level-two') || '{}');
  questionsData.started = 0;
  localStorage.setItem('level-two', JSON.stringify(questionsData));
}
