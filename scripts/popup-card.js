function enterIDPopUp(Level) {
  // Display a popup using Swal.fire with a title, input field, and buttons
  Swal.fire({
    title: `Enter ID for level ${Level}`, // Set the title to include the level
    input: 'text', // Input type is text
    inputAttributes: {
      autocapitalize: 'off', // Disable auto-capitalization
    },
    showCancelButton: true, // Show the cancel button
    confirmButtonText: 'Attempt', // Text for the confirm button
    showLoaderOnConfirm: true, // Show loader when confirm is clicked
    confirmButtonColor: '#3085d6', // Color of the confirm button
  }).then((result) => {
    // Handle the promise result
    if (result.isConfirmed) {
      // Check if the confirm button was clicked
      const userID = result.value; // Get the input value (user ID)

      // Determine the local storage key based on the level
      let selectedLevelLocal = Level == 1 ? 'level-one' : 'level-two';
      // Retrieve the stored level data from local storage
      const storedLevel = JSON.parse(
        localStorage.getItem(`${selectedLevelLocal}`)
      );

      if (storedLevel?.started == 1) {
        // Check if the level has started
        // Retrieve the stored users data from local storage
        const storedUsers = JSON.parse(localStorage.getItem('participants'));

        if (
          !userID || // Check if userID is not provided
          !storedUsers[userID] || // Check if userID does not exist in stored users
          storedUsers[userID].level != Level // Check if the user's level does not match the current level
        ) {
          // Display an info popup if the ID is not valid
          Swal.fire({
            title: 'Valid ID', // Title of the info popup
            text: 'pleas enter a valid id', // Text of the info popup
            icon: 'info', // Icon type
            confirmButtonColor: '#3085d6', // Color of the confirm button
          });
        } else {
          // If the ID is valid, proceed with storing user information
          const started = storedLevel.started; // Get the started status
          localStorage.setItem('loged-in-userID', userID); // Store the logged-in user ID
          localStorage.setItem('loged-in-user-level', Level); // Store the logged-in user level
          // Determine the dashboard URL based on the started status
          const dashboardURL = started == 1 && `../pages/question-page.html`;

          window.location.href = dashboardURL; // Redirect to the dashboard URL
        }
      } else {
        // Redirect to the exam-not-started page if the level has not started
        // window.location.href = '../pages/exam-not-started.html';
        Swal.fire({
          title: 'exam has not started', // Title of the info popup
          text: 'try again later', // Text of the info popup
          icon: 'error', // Icon type
          confirmButtonColor: '#3085d6', // Color of the confirm button
        });
      }
    }
  });
}
