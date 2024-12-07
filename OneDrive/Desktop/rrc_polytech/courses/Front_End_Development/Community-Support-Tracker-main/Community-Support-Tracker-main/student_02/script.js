// Event listener for form submission
document.getElementById('volunteer-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const charityName = document.getElementById('charity-name').value;
  const hoursVolunteered = parseFloat(document.getElementById('hours-volunteered').value);
  const date = document.getElementById('date').value;
  const experienceRating = parseInt(document.getElementById('experience-rating').value);

  if (!charityName || !hoursVolunteered || !date || !experienceRating) {
    alert("All fields are required.");
    return;
  }
  
  if (hoursVolunteered <= 0 || isNaN(hoursVolunteered)) {
    alert("Please enter valid hours volunteered.");
    return;
  }

  if (experienceRating < 1 || experienceRating > 5) {
    alert("Please provide a valid experience rating (1-5).");
    return;
  }

  // Temporary data object
  const volunteerData = {
    charityName,
    hoursVolunteered,
    date,
    experienceRating
  };

  // Save data to localStorage
  saveDataToLocalStorage(volunteerData);
  updateTable();
  updateTotalHours();
});

// Save data to localStorage
function saveDataToLocalStorage(volunteerData) {
  const data = JSON.parse(localStorage.getItem('volunteerData')) || [];
  data.push(volunteerData);
  localStorage.setItem('volunteerData', JSON.stringify(data));
}

// Retrieve and display data from localStorage
function updateTable() {
  const data = JSON.parse(localStorage.getItem('volunteerData')) || [];
  const tableBody = document.querySelector('#volunteer-table tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.charityName}</td>
      <td>${entry.hoursVolunteered}</td>
      <td>${entry.date}</td>
      <td>${entry.experienceRating}</td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Update total hours in summary section
function updateTotalHours() {
  const data = JSON.parse(localStorage.getItem('volunteerData')) || [];
  const totalHours = data.reduce((sum, entry) => sum + entry.hoursVolunteered, 0);
  document.getElementById('total-hours').innerText = `Total Hours Volunteered: ${totalHours}`;
}

// Delete record from table and localStorage
function deleteRecord(index) {
  const data = JSON.parse(localStorage.getItem('volunteerData'));
  data.splice(index, 1);
  localStorage.setItem('volunteerData', JSON.stringify(data));
  updateTable();
  updateTotalHours();
}

// On page load, update table and total hours
window.onload = function() {
  updateTable();
  updateTotalHours();
};
