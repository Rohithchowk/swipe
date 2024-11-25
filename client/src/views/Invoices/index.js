import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const InvoiceTab = () => {
  const invoices = useSelector((state) => state.invoice.invoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredInvoices = Object.keys(invoices).filter((invoiceNumber) => {
    const customerData = invoices[invoiceNumber]?.customerData?.[0];
    return customerData && customerData["Customer Name"]
      ? customerData["Customer Name"].toLowerCase().includes(searchTerm)
      : false;
  });
  
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortOrder === "default") return 0; // Maintain original order
    
    const customerDataA = invoices[a]?.customerData?.[0];
    const customerDataB = invoices[b]?.customerData?.[0];
  
    // Check if customerData exists for both invoices
    if (!customerDataA || !customerDataB) return 0;
  
    const nameA = customerDataA["Customer Name"]?.toLowerCase() || "";
    const nameB = customerDataB["Customer Name"]?.toLowerCase() || "";
  
    if (sortOrder === "asc") {
      return nameA > nameB ? 1 : -1;
    } else if (sortOrder === "desc") {
      return nameA < nameB ? 1 : -1;
    }
    return 0;
  });
  

  return (
    <>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <TextField
          label="Search Customer"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl variant="outlined" size="small">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price With Tax</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedInvoices.map((invoiceNumber) => (
              <React.Fragment key={invoiceNumber}>
                {invoices[invoiceNumber].productData.map((product, index) => (
                  <TableRow key={index} sx={{
                    borderBottom: '2px solid orange', 
                  }}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={invoices[invoiceNumber].productData.length}>
                          {invoices[invoiceNumber].invoiceNumber}
                        </TableCell>
                        <TableCell rowSpan={invoices[invoiceNumber].productData.length}>
                          {invoices[invoiceNumber].customerData[0]["Customer Name"]}
                        </TableCell>
                        <TableCell rowSpan={invoices[invoiceNumber].productData.length}>
                          {invoices[invoiceNumber].customerData[0]["Phone Number"]}
                        </TableCell>
                      </>
                    )}
                    {/* Display Product Data */}
                    <TableCell>{product["ProductName"]}</TableCell>
                    <TableCell>{product["UnitPrice"]}</TableCell>
                    <TableCell>{product["Quantity"]}</TableCell>
                    <TableCell>{product["PriceWithTax"]}</TableCell>
                    <TableCell>{product["Tax"]}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" color="primary">
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceTab;
