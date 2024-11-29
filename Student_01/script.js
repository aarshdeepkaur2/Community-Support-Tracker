// Validation function
function validateDonationForm({ charityName, donationAmount, donationDate }) {
    if (!charityName) {
        return false; // Charity Name is required
    }
    if (isNaN(donationAmount) || donationAmount <= 0) {
        return false; // Donation Amount must be greater than 0
    }
    if (!donationDate) {
        return false; // Date of Donation is required
    }
    return true;
}

// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');

    donationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data
        const donationData = {
            charityName: document.getElementById('charityName').value.trim(),
            donationAmount: parseFloat(document.getElementById('donationAmount').value.trim()),
            donationDate: document.getElementById('donationDate').value.trim(),
            donorMessage: document.getElementById('donorMessage').value.trim(),
        };

        // Validate form data
        if (!validateDonationForm(donationData)) {
            alert("Please provide valid donation details.");
            return;
        }

        console.log("Donation Data:", donationData);

        donationForm.reset();
        alert("Donation recorded successfully!");
    });
});

// Export function for testing
module.exports = { validateDonationForm };
