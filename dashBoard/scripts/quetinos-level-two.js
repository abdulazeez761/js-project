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
                <button class="delete-button" onclick="deleteQuestion(this)">
                  <i class="fa-solid fa-trash"></i>
                </button>
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
function deleteQuestion(button) {
  const row = button.parentNode.parentNode;
  //getting the question id
  QID = row.cells[0];
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Question!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteLevelQuestion(2, QID.innerText);
      row.parentNode.removeChild(row);
      Swal.fire({
        title: 'Deleted',
        text: 'Question has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Question',
        text: 'Question deletion was cancelled',
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
  });
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
