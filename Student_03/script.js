document.getElementById("event-signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        eventName: document.getElementById("event-name").value.trim(),
        representativeName: document.getElementById("representative-name").value.trim(),
        representativeEmail: document.getElementById("representative-email").value.trim(),
        role: document.getElementById("role-selection").value
    };

    // Validate form data
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert(`Please fix the following errors:\n\n${errors.join("\n")}`);
        return;
    }

    // Temporarily store the data object
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
});

function validateForm(data) {
    const errors = [];

    if (!data.eventName) errors.push("Event Name is required.");
    if (!data.representativeName) errors.push("Representative Name is required.");
    if (!data.representativeEmail) {
        errors.push("Representative Email is required.");
    } else if (!validateEmail(data.representativeEmail)) {
        errors.push("Representative Email format is invalid.");
    }
    if (!data.role) errors.push("Role must be selected.");

    return errors;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
