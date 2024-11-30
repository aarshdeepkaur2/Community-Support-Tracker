// Event listener for form submission
document.getElementById("volunteer-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Collect form data
  const charityName = document.getElementById("charity-name").value;
  const hoursVolunteered = parseFloat(document.getElementById("hours-volunteered").value);
  const date = document.getElementById("date").value;
  const experienceRating = parseInt(document.getElementById("experience-rating").value);

  
  if (!charityName || !hoursVolunteered || !date || !experienceRating) {
    alert("Please fill out all fields.");
    return;
  }

  if (hoursVolunteered <= 0 || isNaN(hoursVolunteered)) {
    alert("Please enter a valid number for hours volunteered.");
    return;
  }

  if (experienceRating < 1 || experienceRating > 5 || isNaN(experienceRating)) {
    alert("Please rate your experience between 1 and 5.");
    return;
  }

  // Create a data object for the new entry
  const volunteerData = {
    charityName,
    hoursVolunteered,
    date,
    experienceRating
  };

  // Add data to the table
  addToTable(volunteerData);

  // Store data in localStorage
  storeInLocalStorage(volunteerData);

  // Clear the form
  document.getElementById("volunteer-form").reset();
});

// Add new volunteer data to the table
function addToTable(data) {
  const table = document.getElementById("volunteer-table").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  
  newRow.insertCell(0).innerText = data.charityName;
  newRow.insertCell(1).innerText = data.hoursVolunteered;
  newRow.insertCell(2).innerText = data.date;
  newRow.insertCell(3).innerText = data.experienceRating;

  // Add delete button to each row
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function() {
    deleteRow(newRow, data);
  });
  newRow.insertCell(4).appendChild(deleteButton);

  // Update total hours
  updateTotalHours();
}

// Store data in localStorage
function storeInLocalStorage(data) {
  let storedData = JSON.parse(localStorage.getItem('volunteerData')) || [];
  storedData.push(data);
  localStorage.setItem('volunteerData', JSON.stringify(storedData));
}

// Load data from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  const storedData = JSON.parse(localStorage.getItem('volunteerData')) || [];
  storedData.forEach(data => addToTable(data));
  updateTotalHours();
});

// Update the total hours display
function updateTotalHours() {
  const table = document.getElementById("volunteer-table").getElementsByTagName('tbody')[0];
  let totalHours = 0;

  for (let row of table.rows) {
    totalHours += parseFloat(row.cells[1].innerText);
  }

  document.getElementById("total-hours-count").innerText = totalHours;
}

// Delete row from table and localStorage
function deleteRow(row, data) {
  const table = document.getElementById("volunteer-table").getElementsByTagName('tbody')[0];
  table.deleteRow(row.rowIndex);

  // Remove from localStorage
  let storedData = JSON.parse(localStorage.getItem('volunteerData'));
  storedData = storedData.filter(item => JSON.stringify(item) !== JSON.stringify(data));
  localStorage.setItem('volunteerData', JSON.stringify(storedData));

  // Update total hours
  updateTotalHours();
}
