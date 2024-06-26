let createParticipants = (level, name) => {
  let participantsLevel = level == 1 ? 'level-one' : 'level-two';
  let allParticipants = JSON.parse(localStorage.getItem('participants'));
  const entries = Object.entries(allParticipants);

  let id = entries.length ? +entries[entries.length - 1][0] + 1 : 1;

  let newParticipant = {
    id,
    name,
    level,
    result: 0,
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: {},
    isActive: true,
  };

  allParticipants[id] = newParticipant;

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};

let deleteParticipantFromLocalStorage = (id) => {
  let allParticipants = JSON.parse(localStorage.getItem('participants'));

  if (!allParticipants) {
    console.log('No participants found in local storage.');
    return;
  }

  allParticipants[id].isActive = false;

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};
let restoreParticipantFromLocalStorage = (id) => {
  let allParticipants = JSON.parse(localStorage.getItem('participants'));

  if (!allParticipants) {
    console.log('No participants found in local storage.');
    return;
  }

  allParticipants[id].isActive = true;

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};
function deleteParticipant(button) {
  const id = button.parentNode.parentNode.children[0].textContent;

  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this participant!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteParticipantFromLocalStorage(id);
      // row.parentNode.removeChild(row);

      Swal.fire({
        title: 'Deleted',
        text: 'Participant has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        result.isConfirmed && location.reload();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Participant deletion was cancelled',
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
  });
}
function restoreParticipant(button) {
  const row = button.parentNode.parentNode;
  const id = button.parentNode.parentNode.children[0].textContent;

  Swal.fire({
    title: 'Are you sure?',
    text: 'You will give the user the permition to join the exams!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, restore it!',
    cancelButtonText: 'No, keep it',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) {
      restoreParticipantFromLocalStorage(id);
      // row.parentNode.removeChild(row);
      Swal.fire({
        title: 'Restored',
        text: 'Participant has been Restored.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        result.isConfirmed && location.reload();
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Participant restoring was cancelled',
        icon: 'info',
        confirmButtonColor: '#3085d6',
      });
    }
  });
}
