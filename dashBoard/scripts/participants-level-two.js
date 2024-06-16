let currentEditButton;

function addParticipant() {
  const id = document.getElementById('participantId').value;
  const name = document.getElementById('participantName').value;
  if (id && name) {
    const table = document.querySelector('table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>2023-11-15</td>
                    <td>50m</td>
                    <td>0</td>
                    <td>
                <button class="edit-button" onclick="openEditModal(this)">
                  <i class="fa-solid fa-user-pen"></i>
                </button>
              </td>
              <td>
                <button class="delete-button" onclick="deleteParticipant(this)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
                `;
    table.appendChild(row);
  }
}

function deleteParticipant(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function openEditModal(button) {
  currentEditButton = button;
  document.getElementById('editModal').style.display = 'block';
  const id = button.parentNode.parentNode.children[0].textContent;
  const name = button.parentNode.parentNode.children[1].textContent;
  document.getElementById('editId').value = id;
  document.getElementById('editName').value = name;
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
  const newId = document.getElementById('editId').value;
  const newName = document.getElementById('editName').value;
  if (currentEditButton && newId && newName) {
    currentEditButton.parentNode.parentNode.children[0].textContent = newId;
    currentEditButton.parentNode.parentNode.children[1].textContent = newName;
    closeEditModal();
  }
}

window.onclick = function (event) {
  if (event.target == document.getElementById('editModal')) {
    closeEditModal();
  }
};
