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
@media (max-width: 768px) {
  nav ul li {
      display: block;
      text-align: center;
      margin: 10px 0;
  }

  #donation-tracker {
      padding: 15px;
  }

  form {
      width: 100%;
  }

  button {
      font-size: 14px;
  }

  table {
      font-size: 14px;
  }
}

@media (max-width: 480px) {
  h1, h2, h3 {
      font-size: 18px;
  }

  button {
      padding: 10px;
      font-size: 12px;
  }

  label, input, textarea {
      font-size: 14px;
  }
}

