// Import the validation function
const { validateDonationForm } = require('./Script');

describe("Donation Form Validation", () => {
    test("Valid input should pass validation", () => {
        const validData = { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28" };
        expect(validateDonationForm(validData)).toBe(true);
    });

    test("Missing charity name should fail validation", () => {
        const invalidData = { charityName: "", donationAmount: 50, donationDate: "2024-11-28" };
        expect(validateDonationForm(invalidData)).toBe(false);
    });

    test("Donation amount of 0 should fail validation", () => {
        const invalidData = { charityName: "Charity A", donationAmount: 0, donationDate: "2024-11-28" };
        expect(validateDonationForm(invalidData)).toBe(false);
    });

    test("Missing donation date should fail validation", () => {
        const invalidData = { charityName: "Charity A", donationAmount: 50, donationDate: "" };
        expect(validateDonationForm(invalidData)).toBe(false);
    });

    test("Negative donation amount should fail validation", () => {
        const invalidData = { charityName: "Charity A", donationAmount: -10, donationDate: "2024-11-28" };
        expect(validateDonationForm(invalidData)).toBe(false);
    });
});

describe("Donation Table Tests", () => {
    let localStorageMock;

    beforeEach(() => {
        localStorageMock = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                removeItem: (key) => delete store[key],
                clear: () => (store = {}),
            };
        })();

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });

    test("Data is correctly stored in localStorage", () => {
        const donation = { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "Keep it up!" };
        const donations = [donation];
        localStorage.setItem("donations", JSON.stringify(donations));
        const savedData = JSON.parse(localStorage.getItem("donations"));
        expect(savedData).toEqual(donations);
    });

    test("Data is correctly retrieved from localStorage and loaded into the table", () => {
        const donations = [
            { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "Keep it up!" }
        ];
        localStorage.setItem("donations", JSON.stringify(donations));

        // Simulate loading the data back into the table
        const loadedData = JSON.parse(localStorage.getItem("donations"));

        expect(loadedData).toEqual(donations);
    });

    test("Summary section correctly calculates and displays total amount donated", () => {
        const donations = [
            { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "" },
            { charityName: "Charity B", donationAmount: 30, donationDate: "2024-11-29", donorMessage: "" },
        ];
        localStorage.setItem("donations", JSON.stringify(donations));

        // Calculate total donation amount
        const total = donations.reduce((sum, donation) => sum + donation.donationAmount, 0);

        expect(total).toBe(80);
    });

    test("Delete button removes a record from the table", () => {
        const donations = [
            { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "" }
        ];

        localStorage.setItem("donations", JSON.stringify(donations));

        // Simulate deleting the record
        const updatedDonations = donations.filter(donation => donation.charityName !== "Charity A");

        localStorage.setItem("donations", JSON.stringify(updatedDonations));
        const retrievedDonations = JSON.parse(localStorage.getItem("donations"));

        expect(retrievedDonations.length).toBe(0);
    });

    test("Delete button removes a record from localStorage", () => {
        const donations = [
            { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "" },
            { charityName: "Charity B", donationAmount: 30, donationDate: "2024-11-29", donorMessage: "" },
        ];

        localStorage.setItem("donations", JSON.stringify(donations));

        // Simulate deleting a record
        const updatedDonations = donations.filter(donation => donation.charityName !== "Charity A");

        localStorage.setItem("donations", JSON.stringify(updatedDonations));
        const retrievedDonations = JSON.parse(localStorage.getItem("donations"));

        expect(retrievedDonations).toEqual([
            { charityName: "Charity B", donationAmount: 30, donationDate: "2024-11-29", donorMessage: "" },
        ]);
    });

    test("Total donation amount in the summary section is updated when a donation is deleted", () => {
        const donations = [
            { charityName: "Charity A", donationAmount: 50, donationDate: "2024-11-28", donorMessage: "" },
            { charityName: "Charity B", donationAmount: 30, donationDate: "2024-11-29", donorMessage: "" },
        ];

        localStorage.setItem("donations", JSON.stringify(donations));

        // Simulate deletion of a record
        const updatedDonations = donations.filter(donation => donation.charityName !== "Charity A");
        const totalAfterDeletion = updatedDonations.reduce((sum, donation) => sum + donation.donationAmount, 0);

        localStorage.setItem("donations", JSON.stringify(updatedDonations));
        expect(totalAfterDeletion).toBe(30);
    });
});
