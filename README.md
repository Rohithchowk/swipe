## NOTE : Run the backend file(Flask+Gemini) locally, as i havent deployed it. 

# Automated Data Extraction and Invoice Management Application

This is a React-based web application that I developed for Swipe. The application automates the extraction, processing, and management of invoice data from various file formats, organizing it into structured sections: **Invoices**, **Products**, and **Customers**. It ensures real-time synchronization of data across tabs using Redux.

## Features I Implemented

### 1. AI-Powered Data Extraction
I integrated AI-based data extraction to handle various file formats, including:

- **PDFs and Images**: Processes invoice details, such as customer data, item details, totals, and taxes.

### 2.Excel Sheet Data Extraction
- **Excel files**: Extracts transaction details like serial numbers, amounts, and customer information.
### 3.Data Organization
The extracted data is organized into three main tabs:
- **Invoices Tab**: Displays comprehensive invoice details, including serial numbers, customer names, products, quantities, taxes, total amounts, and dates.
- ![Invoices Tab]([path/to/image-invoices-tab.png](https://github.com/Rohithchowk/swipe/blob/main/Screenshot%20(489).png?raw=true))
- **Products Tab**: Lists product details such as names, quantities, unit prices, taxes, and prices (with and without tax). Optional fields like discounts are also included.
- ![Products Tab](Screenshot (488).png)
- **Customers Tab**: Shows customer information like names, phone numbers, and total purchase amounts.
- ![Customers Tab](https://github.com/Rohithchowk/swipe/blob/main/Screenshot%20(487).png?raw=true)

### 2. Real-Time Data Synchronization
I used Redux for centralized state management to ensure real-time updates:
- Changes made in one tab are instantly reflected in all related tabs.
-  Updating a details in the **Products Tab** **Customer Tab** automatically updates the corresponding product in the **Invoices Tab**.

### 3. Data Validation and Error Handling
To enhance usability, I added:
- I have crossed checked the data extracted with original data for accuracy, The accuracy is almost 90% above.
  

### 5. Test Cases Implemented
I tested the application against various cases:
1. Invoice PDFs.
2. Invoice PDFs + Images.
3. Excel Files (single and multiple files).
4. Mixed file types (Excel, PDFs, and Images).

The application dynamically handles missing data, highlighting fields that require user input for correction.

## Tools and Technologies
- **Frontend**: React.js, MUI, Redux for state management.
- **Backend**: Flask (for the AI model integration).
- **AI Integration**: Developed a generic AI solution for data extraction.
- **Deployment**: Hosted the app on [Vercel](https://swipe-gray.vercel.app) for easy access.
- **Version Control**: All code is versioned on GitHub.

## Deployment
The application is live and can be accessed at: [https://swipe-gray.vercel.app/](#)


