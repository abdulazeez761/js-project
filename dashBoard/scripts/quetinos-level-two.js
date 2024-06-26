const table = document.querySelector('table tbody');
let currentEditButton;
//getting local storage level-one data
let allQuestions = JSON.parse(localStorage.getItem('level-two'));
//loading all questions
document.onload = loadAllQuestios();
function loadAllQuestios() {
  //checking if there are any questions in local storage
  let keys = Object.keys(allQuestions);
  if (keys.length >= 3) {
    for (const q in allQuestions) {
      //skipping the data of "levelID" and "started" keys
      if (q != 'levleID' && q != 'started') {
        let qText = allQuestions[q]['questionContext'];
        let qAnswer = allQuestions[q]['correctAnswers'];
        //creating a new table row and adding new questions to the table
        let row = document.createElement('tr');
        row.innerHTML = `
                    <td>${q}</td>
                    <td>${qText}</td>
                    <td>${qAnswer}</td>
                    
                  
                     <td>
                <button class="edit-button" onclick="openEditModal(this)">
                  <i class="fa-solid fa-user-pen"></i>
                </button>
              </td>
              <td>
                 ${
                   allQuestions[q].isActive
                     ? `<button class="delete-button" onclick="deleteQuestion(this,2)">
                  <i class="fa-solid fa-trash"></i>
                </button>`
                     : `<button class="delete-button" onclick="restoreQuestion(this,2)">
                      <i class="fas fa-trash-restore"></i>`
                 }
              </td>
                `;
        table.appendChild(row);
      }
    }
  }
}

function addQuestion() {
  const questionText = document.getElementById('questionContext').value;
  const questionAnswer = document.getElementById('questionAnswer').value;
  if (questionText && questionAnswer) {
    createQuestions(questionText, questionAnswer, 2);
    location.reload();
  }
}

function openEditModal(button) {
  currentEditButton = button;
  document.getElementById('editModal').style.display = 'block';
  const questionText = button.parentNode.parentNode.children[1].textContent;
  const questionAnswer = button.parentNode.parentNode.children[2].textContent;
  document.getElementById('editText').value = questionText;
  document.getElementById('editAnswer').value = questionAnswer;
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
  const newText = document.getElementById('editText').value;
  const newQuestionAnswer = document.getElementById('editAnswer').value;
  const questionID =
    +currentEditButton.parentNode.parentNode.children[0].textContent;
  if (currentEditButton && newText && newQuestionAnswer) {
    updateQuestions(newText, newQuestionAnswer, 2, questionID);
    location.reload();
    closeEditModal();
  }
}

window.onclick = function (event) {
  if (event.target == document.getElementById('editModal')) {
    closeEditModal();
  }
};
