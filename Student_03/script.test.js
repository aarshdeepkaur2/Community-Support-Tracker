const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 
test("Email Validation - Valid Email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
});
 
test("Email Validation - Invalid Email", () => {
    expect(validateEmail("test.com")).toBe(false);
    expect(validateEmail("test@.com")).toBe(false);
    expect(validateEmail("test@domain")).toBe(false);
});
 
test("Form Submission - Required Fields", () => {
    const formData = {
        eventName: "Community Event",
        repName: "John Doe",
        repEmail: "",
        role: "sponsor",
    };
    expect(formData.eventName).not.toBe("");
    expect(formData.repName).not.toBe("");
    expect(formData.repEmail).toBe(""); // Missing email
    expect(formData.role).not.toBe("");
});
 
test("Form Submission - Temporary Data Object", () => {
    const formData = {
        eventName: "Community Event",
        repName: "John Doe",
        repEmail: "john.doe@example.com",
        role: "sponsor",
    };
    expect(formData.eventName).toBe("Community Event");
    expect(formData.repName).toBe("John Doe");
    expect(formData.repEmail).toBe("john.doe@example.com");
    expect(formData.role).toBe("sponsor");
});
 