const table = document.querySelector("table tbody");
let currentEditButton;
//getting local storage level-one data
let allQuestions = JSON.parse(localStorage.getItem("level-two"));
//loading all questions
onload = loadAllQuestios();
function loadAllQuestios() {
  //checking if there are any questions in local storage
  let keys = Object.keys(allQuestions);
  if (keys.length >= 3) {
    for (const q in allQuestions) {
      //skipping the data of "levelID" and "started" keys
      if (q != "levleID" && q != "started") {
        let qText = allQuestions[q]["questionContext"];
        let qAnswer = allQuestions[q]["correctAnswers"];
        //creating a new table row and adding new questions to the table
        let row = document.createElement("tr");
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

        console.log(allQuestions[q]["questionContext"]);
      }
    }
  }
}

function addQuestion() {
  const questionText = document.getElementById("questionContext").value;
  const questionAnswer = document.getElementById("questionAnswer").value;
  if (questionText && questionAnswer) {
    createQuestions(questionText, questionAnswer, 2);
    location.reload();
  }
}
function deleteQuestion(button) {
  const row = button.parentNode.parentNode;
  //getting the question id
  QID = row.cells[0];
  `1`;
  console.log(QID.innerText);
  deleteLevelQuestion(2, QID.innerText);
  row.parentNode.removeChild(row);
}

function openEditModal(button) {
  currentEditButton = button;
  document.getElementById("editModal").style.display = "block";
  const questionText = button.parentNode.parentNode.children[1].textContent;
  const questionAnswer = button.parentNode.parentNode.children[2].textContent;
  document.getElementById("editText").value = questionText;
  document.getElementById("editAnswer").value = questionAnswer;
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

function saveEdit() {
  const newText = document.getElementById("editText").value;
  const newQuestionAnswer = document.getElementById("editAnswer").value;
  if (currentEditButton && newText && newQuestionAnswer) {
    currentEditButton.parentNode.parentNode.children[1].textContent = newText;
    currentEditButton.parentNode.parentNode.children[2].textContent =
      newQuestionAnswer;
    closeEditModal();
  }
}

window.onclick = function (event) {
  if (event.target == document.getElementById("editModal")) {
    closeEditModal();
  }
};
