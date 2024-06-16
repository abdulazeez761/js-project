let currentEditButton;

function addQuestion() {
  const questionText = document.getElementById('questionContext').value;
  const questionAnswer = document.getElementById('questionAnswer').value;
  if (questionText && questionAnswer) {
    const table = document.querySelector('table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
                    <td>1</td>
                    <td>${questionText}</td>
                    <td>${questionAnswer}</td>
                    <td>0</td>
                  
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

function deleteQuestion(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
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
  if (currentEditButton && newText && newQuestionAnswer) {
    currentEditButton.parentNode.parentNode.children[1].textContent = newText;
    currentEditButton.parentNode.parentNode.children[2].textContent =
      newQuestionAnswer;
    closeEditModal();
  }
}

window.onclick = function (event) {
  if (event.target == document.getElementById('editModal')) {
    closeEditModal();
  }
};
