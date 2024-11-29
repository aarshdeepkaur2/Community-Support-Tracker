# Style Guide

## Colors
- Primary: #007bff
- Hover: #0056b3
- Background: #f9f9f9
- Text: #333
- Borders: #ddd

## Fonts
- Font: Arial, sans-serif
- Heading: Bold, centered
- Text: Regular, left-aligned

## Layout
- Form: Centered, max width 500px
- Padding: 10px for inputs and buttons
- Margin: 20px between sections
- Border radius: 4px

## Buttons
- Background: Primary (#007bff)
- Text: White
- Hover: Darker Primary (#0056b3)

## Inputs and Forms
- Full width
- Border: 1px solid #ccc
- Background: White

## Media Queries

### Mobile (Up to 767px)
#### Css 
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
