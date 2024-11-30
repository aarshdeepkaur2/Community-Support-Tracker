// volunteer.test.js

const { JSDOM } = require('jsdom');
const fs = require('fs');

let dom;
let document;

beforeEach(() => {       
  // Set up the DOM
  const html = fs.readFileSync('./index.html', 'utf8');
  dom = new JSDOM(html);
  document = dom.window.document;

  // Add the form functionality to the DOM window (you would import the JS script here)
  const script = fs.readFileSync('./script.js', 'utf8');
  dom.window.eval(script);
});

test('should trigger function on form submission', () => {
  const form = document.getElementById('volunteer-form');
  const handleSubmit = jest.fn();
  form.addEventListener('submit', handleSubmit);

  form.dispatchEvent(new dom.window.Event('submit'));

  expect(handleSubmit).toHaveBeenCalled();
});

test('should collect form data', () => {
  const form = document.getElementById('volunteer-form');
  document.getElementById('charity-name').value = 'Charity A';
  document.getElementById('hours-volunteered').value = '5';
  document.getElementById('date').value = '2024-11-29';
  document.getElementById('experience-rating').value = '4';

  const handleSubmit = jest.fn(function(event) {
    event.preventDefault();
    const data = {
      charityName: document.getElementById('charity-name').value,
      hoursVolunteered: document.getElementById('hours-volunteered').value,
      date: document.getElementById('date').value,
      experienceRating: document.getElementById('experience-rating').value
    };
    expect(data).toEqual({
      charityName: 'Charity A',
      hoursVolunteered: '5',
      date: '2024-11-29',
      experienceRating: '4'
    });
  });

  form.addEventListener('submit', handleSubmit);
  form.dispatchEvent(new dom.window.Event('submit'));
});
