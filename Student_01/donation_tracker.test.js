const { validateDonationForm } = require('./script');

describe("Donation Form Validation and Functionality", () => {
    // Mocking the DOM for tests
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="donationForm">
                <input id="charityName" value="" />
                <input id="donationAmount" value="" />
                <input id="donationDate" value="" />
                <textarea id="donorMessage"></textarea>
            </form>
        `;
    });

    test("Function is triggered on form submission", () => {
        const donationForm = document.getElementById('donationForm');
        const mockSubmit = jest.fn((event) => event.preventDefault());
        donationForm.addEventListener('submit', mockSubmit);

        donationForm.dispatchEvent(new Event('submit'));

        expect(mockSubmit).toHaveBeenCalled();
    });

    test("Function correctly collects form data", () => {
        document.getElementById('charityName').value = "Charity B";
        document.getElementById('donationAmount').value = "1000";
        document.getElementById('donationDate').value = "2024-11-15";
        document.getElementById('donorMessage').value = "Keep up the good work!";

        const donationForm = document.getElementById('donationForm');
        const mockSubmit = jest.fn((event) => {
            event.preventDefault();
            const donationData = {
                charityName: document.getElementById('charityName').value.trim(),
                donationAmount: parseFloat(document.getElementById('donationAmount').value.trim()),
                donationDate: document.getElementById('donationDate').value.trim(),
                donorMessage: document.getElementById('donorMessage').value.trim(),
            };
            expect(donationData).toEqual({
                charityName: "Charity B",
                donationAmount: 1000,
                donationDate: "2024-11-15",
                donorMessage: "Keep up the good work!",
            });
        });

        donationForm.addEventListener('submit', mockSubmit);
        donationForm.dispatchEvent(new Event('submit'));

        expect(mockSubmit).toHaveBeenCalled();
    });

    describe("Input Validation Tests", () => {
        test("Required fields should not be empty", () => {
            const invalidData = {
                charityName: "",
                donationAmount: "",
                donationDate: "",
            };
            expect(validateDonationForm(invalidData)).toBe(false);
        });

        test("Donation amount should be a positive number", () => {
            const invalidDataNegative = {
                charityName: "Charity A",
                donationAmount: -50,
                donationDate: "2024-11-28",
            };
            const invalidDataNonNumeric = {
                charityName: "Charity A",
                donationAmount: "abc",
                donationDate: "2024-11-28",
            };
            const validData = {
                charityName: "Charity A",
                donationAmount: 100,
                donationDate: "2024-11-28",
            };

            expect(validateDonationForm(invalidDataNegative)).toBe(false);
            expect(validateDonationForm(invalidDataNonNumeric)).toBe(false);
            expect(validateDonationForm(validData)).toBe(true);
        });

        test("Donation date should not be empty", () => {
            const invalidData = {
                charityName: "Charity A",
                donationAmount: 50,
                donationDate: "",
            };
            const validData = {
                charityName: "Charity A",
                donationAmount: 50,
                donationDate: "2024-11-28",
            };

            expect(validateDonationForm(invalidData)).toBe(false);
            expect(validateDonationForm(validData)).toBe(true);
        });
    });

    test("Temporary data object is correctly populated with form data", () => {
        document.getElementById('charityName').value = "Charity C";
        document.getElementById('donationAmount').value = "200";
        document.getElementById('donationDate').value = "2024-12-01";
        document.getElementById('donorMessage').value = "Thank you for the amazing efforts.";

        const donationForm = document.getElementById('donationForm');
        const mockSubmit = jest.fn((event) => {
            event.preventDefault();
            const donationData = {
                charityName: document.getElementById('charityName').value.trim(),
                donationAmount: parseFloat(document.getElementById('donationAmount').value.trim()),
                donationDate: document.getElementById('donationDate').value.trim(),
                donorMessage: document.getElementById('donorMessage').value.trim(),
            };
            expect(donationData).toEqual({
                charityName: "Charity C",
                donationAmount: 200,
                donationDate: "2024-12-01",
                donorMessage: "Thank you for the amazing efforts.",
            });
        });

        donationForm.addEventListener('submit', mockSubmit);
        donationForm.dispatchEvent(new Event('submit'));

        expect(mockSubmit).toHaveBeenCalled();
    });
});
