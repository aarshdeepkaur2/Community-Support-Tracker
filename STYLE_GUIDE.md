# Style Guide

## Colors
Primary: #007bff (Used for primary buttons, links, and highlights)  
Hover: #0056b3 (Hover effect for buttons and links)  
Background: #f9f9f9 (Background color for the page)  
Text: #333 (Default text color)  
Borders: #ddd (Border color for inputs, form elements, etc.)

## Fonts
Font: Arial, sans-serif (Used for all text on the site)  
Heading: Bold, centered (Headings such as <h1>)  
Text: Regular, left-aligned (Body text and paragraph elements)

## Layout
Form: The form is centered on the page with a maximum width of 500px.  
Padding: 10px padding for inputs and buttons to ensure sufficient spacing.  
Margin: 20px margin between sections for clear separation.  
Border Radius: 4px border-radius for input fields, buttons, and other elements to create soft edges.

## Buttons
Background: #007bff (Primary button color)  
Text: White (Text color on buttons)  
Hover: #0056b3 (Darker shade of primary color for button hover)

## Inputs and Forms
Width: Inputs and form elements should take the full available width of their container.  
Border: 1px solid #ccc (Subtle gray border for input fields)  
Background: White (Background color for inputs and form elements)

## Media Queries

### Mobile (Up to 767px)
For mobile devices with a screen width of up to 767px:

@media (max-width: 767px) {
  body {
    font-size: 14px;
  }
  .form-container {
    width: 100%;
    padding: 10px;
  }
  .form-container input, .form-container button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }
  h1 {
    font-size: 24px;
  }
}

Font Size: The font size for the body text will be reduced to 14px for better readability on smaller screens.  
Form Container: The form container will take up the full width of the screen and have 10px of padding for mobile devices.  
Inputs and Buttons: Inputs and buttons will have a width of 100%, padding of 12px, and font-size of 16px for better accessibility and ease of use on smaller screens.  
Headings: Heading size will be reduced to 24px for better alignment on smaller devices.
