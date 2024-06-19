let currentEditButton;

document.onload(loadAllParticipants());

function addParticipant() {
  let nameInput = document.getElementById('participantName');
  const name = nameInput.value;
  if (name) {
    createParticipants(1, name);

    location.reload();
  }
}
function loadAllParticipants() {
  let participants = JSON.parse(localStorage.getItem('participants'));
  let levelParticipants = {};
  for (let participant in participants) {
    if (participants[participant].level == 1)
      levelParticipants[participant] = participants[participant];
  }

  for (let participantID in levelParticipants) {
    const table = document.querySelector('table tbody');
    const row = document.createElement('tr');
    let participant = participants[participantID];
    row.innerHTML = `
                      <td>${participantID}</td>
                      <td>${participant.name}</td>
                     
                     
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
  const id = button.parentNode.parentNode.children[0].textContent;
  deleteParticipantFromLocalStorage(id);
  location.reload();
}

function openEditModal(button) {
  currentEditButton = button;
  document.getElementById('editModal').style.display = 'block';

  const name = button.parentNode.parentNode.children[1].textContent;

  document.getElementById('editName').value = name;
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
  const newName = document.getElementById('editName').value;
  if (currentEditButton && newName) {
    let userToUpdateId = +currentEditButton.parentNode.parentNode.children[0].textContent;
    let participant = JSON.parse(localStorage.getItem("participants"));
    participant[userToUpdateId].name = newName;
    localStorage.setItem("participants", JSON.stringify(participant));
    location.reload();

    closeEditModal();

  }
}
window.onclick = function (event) {
  if (event.target == document.getElementById('editModal')) {
    closeEditModal();
  }
};

// function loadMostRecentParticipant() {
//   let participants = JSON.parse(localStorage.getItem('paticipants'));
//   let mostRecentID = Object.keys(participants).length;
//   console.log(participants);
//   let mostRecentParticipant = participants[mostRecentID];

//   const table = document.querySelector('table tbody');
//   const row = document.createElement('tr');
//   row.innerHTML = `
//                       <td>${mostRecentParticipant.id}</td>
//                       <td>${mostRecentParticipant.name}</td>

//                       <td>
//                   <button class="edit-button" onclick="openEditModal(this)">
//                     <i class="fa-solid fa-user-pen"></i>
//                   </button>
//                 </td>
//                 <td>
//                   <button class="delete-button" onclick="deleteParticipant(this)">
//                     <i class="fa-solid fa-trash"></i>
//                   </button>
//                 </td>
//                   `;
//   table.appendChild(row);
// }
