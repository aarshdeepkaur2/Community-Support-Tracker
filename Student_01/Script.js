// Validation function to check if the donation form data is correct
function validateDonationForm({ charityName, donationAmount, donationDate }) {
    if (!charityName) {
        return false; // Charity Name is required
    }
    if (isNaN(donationAmount) || donationAmount <= 0) {
        return false; // Donation Amount must be greater than 0 or if it is not a number 
    }
    if (!donationDate) {
        return false; // Date of Donation is required
    }
    return true; // Returns true if all fields are valid
}

// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select HTML elements for the form, table body, and total donation display
    const donationForm = document.getElementById('donationForm');
    const tableBody = document.getElementById('donationTable').querySelector('tbody');
    const totalDonationsElement = document.getElementById('totalDonations');

    // Load existing donations from localStorage and display them
    loadDonations();

    // Form submission handler when the donation form is submitted
    donationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the form from submitting and reloading the page

        // Collect form data from input fields
        const donationData = {
            charityName: document.getElementById('charityName').value.trim(),
            donationAmount: parseFloat(document.getElementById('donationAmount').value.trim()),
            donationDate: document.getElementById('donationDate').value.trim(),
            donorMessage: document.getElementById('donorMessage').value.trim(),
        };

        // check the collected form data before proceeding
        if (!validateDonationForm(donationData)) {
            alert("Please provide valid donation details.");
            return; // Stops the function if the data is invalid
        }

        // If data is valid, add donation to the table and save it in localStorage
        addDonation(donationData);
        saveDonation(donationData);
        updateTotalDonations(); // Update the total donations displayed

        donationForm.reset(); // Reset the form fields after successful submission
        alert("Donation recorded successfully!"); // Alert the user or can use the console log to handle and error message.
    });

    // Function to load existing donations from localStorage and populate the table
    function loadDonations() {
        const donations = JSON.parse(localStorage.getItem('donations')) || []; // Retrieve donations or an empty array
        donations.forEach(addDonation); // Add each donation to the table
        updateTotalDonations(); // Update the total donations summary
    }

    // Function to save a donation to localStorage
    function saveDonation(donation) {
        const donations = JSON.parse(localStorage.getItem('donations')) || []; // Retrieve existing donations
        donations.push(donation); // Add the new donation to the list
        localStorage.setItem('donations', JSON.stringify(donations)); // Save updated donations back to localStorage
    }

    // Function to add a donation to the table
    function addDonation({ charityName, donationAmount, donationDate, donorMessage }) {
        const row = document.createElement('tr'); // Create a new table row

        // Set the HTML content for the new row
        row.innerHTML = `
            <td>${charityName}</td>
            <td>${donationAmount.toFixed(2)}</td>
            <td>${donationDate}</td>
            <td>${donorMessage}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        // Add delete button functionality to remove the donation from the table and localStorage
        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove(); // Remove the row from the table
            deleteDonation(charityName, donationAmount, donationDate); // Delete the donation from localStorage
            updateTotalDonations(); // Update the total donations after removal
        });

        tableBody.appendChild(row); // Append the new row to the table body
    }

    // Function to delete a donation from localStorage
    function deleteDonation(charityName, donationAmount, donationDate) {
        const donations = JSON.parse(localStorage.getItem('donations')) || []; // Retrieve existing donations
        const updatedDonations = donations.filter(
            donation =>
                donation.charityName !== charityName ||
                donation.donationAmount !== donationAmount ||
                donation.donationDate !== donationDate
        ); // Remove the deleted donation
        localStorage.setItem('donations', JSON.stringify(updatedDonations)); // Save the updated donations list to localStorage
    }

    // Function to update the total donations displayed on the page
    function updateTotalDonations() {
        const donations = JSON.parse(localStorage.getItem('donations')) || []; // Retrieve donations from localStorage
        const total = donations.reduce((sum, donation) => sum + donation.donationAmount, 0); // Calculate the total donation amount
        totalDonationsElement.textContent = total.toFixed(2); // Display the total in the specified element
    }
});

// Export function for testing purposes 
module.exports = { validateDonationForm };
