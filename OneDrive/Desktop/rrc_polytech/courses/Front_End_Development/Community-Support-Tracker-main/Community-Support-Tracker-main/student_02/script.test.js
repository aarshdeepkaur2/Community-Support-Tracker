
const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');


beforeEach(() => {
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      clear: () => { store = {}; }
    };
  })();
  global.localStorage = mockLocalStorage;
});

let dom;
let document;

// Mock the handleSubmit function for testing purposes
let handleSubmit = jest.fn();

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  dom = new JSDOM(html);
  document = dom.window.document;
  // Attach the mock to the form submission
  document.getElementById('volunteer-form').addEventListener('submit', handleSubmit);
});

// Test if form submission triggers the correct function
test('should trigger function on form submit', () => {
  document.body.innerHTML = '<form id="volunteer-form"><button type="submit">Submit</button></form>';
  const submitButton = document.querySelector('#volunteer-form button');
  submitButton.click();
  expect(handleSubmit).toHaveBeenCalled();
});

// Test form data collection
test('should collect form data correctly', () => {
  document.body.innerHTML = `
    <form id="volunteer-form">
      <input id="charity-name" value="Charity 1" />
      <input id="hours-volunteered" value="5" />
      <input id="date" value="2024-11-29" />
      <input id="experience-rating" value="4" />
      <button type="submit">Submit</button>
    </form>
  `;
  
  handleSubmit(); // Manually trigger submission logic
  expect(volunteerData.charityName).toBe("Charity 1");
  expect(volunteerData.hoursVolunteered).toBe(5);
  expect(volunteerData.date).toBe("2024-11-29");
  expect(volunteerData.experienceRating).toBe(4);
});

// Test input validation for required fields
test('should flag required fields left empty', () => {
  document.body.innerHTML = '<form id="volunteer-form"><button type="submit">Submit</button></form>';
  handleSubmit();
  expect(alert).toHaveBeenCalledWith('All fields are required.');
});

// Test input validation for invalid hours volunteered
test('should flag invalid hours volunteered', () => {
  document.body.innerHTML = '<form id="volunteer-form"><button type="submit">Submit</button></form>';
  document.getElementById('hours-volunteered').value = -1;
  handleSubmit();
  expect(alert).toHaveBeenCalledWith('Please enter valid hours volunteered.');
});

// Test input validation for invalid experience rating
test('should flag invalid experience rating', () => {
  document.body.innerHTML = '<form id="volunteer-form"><button type="submit">Submit</button></form>';
  document.getElementById('experience-rating').value = 6;
  handleSubmit();
  expect(alert).toHaveBeenCalledWith('Please provide a valid experience rating (1-5).');
});

// Test data stored in localStorage
test('should correctly store data in localStorage', () => {
  const data = { charityName: "Charity 1", hoursVolunteered: 5, date: "2024-11-29", experienceRating: 4 };
  saveDataToLocalStorage(data);
  const storedData = JSON.parse(localStorage.getItem('volunteerData'));
  expect(storedData.length).toBe(1);
});

// Test retrieval and table display
test('should retrieve data from localStorage and display in table', () => {
  const data = [{ charityName: "Charity 1", hoursVolunteered: 5, date: "2024-11-29", experienceRating: 4 }];
  localStorage.setItem('volunteerData', JSON.stringify(data));
  window.onload(); // Simulate page load
  const tableRows = document.querySelectorAll('#volunteer-table tbody tr');
  expect(tableRows.length).toBe(1);
  expect(tableRows[0].cells[0].innerText).toBe('Charity 1');
});

// Test deletion from table and localStorage
test('should delete record from table and localStorage', () => {
  const data = [{ charityName: "Charity 1", hoursVolunteered: 5, date: "2024-11-29", experienceRating: 4 }];
  localStorage.setItem('volunteerData', JSON.stringify(data));
  deleteRecord(0); // Simulate delete
  const storedData = JSON.parse(localStorage.getItem('volunteerData'));
  expect(storedData.length).toBe(0);
});
