import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const InvoiceTab = () => {
  const invoices = useSelector((state) => state.invoice.invoices);

  return (
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
          {Object.keys(invoices).map((invoiceNumber) => (
            <React.Fragment key={invoiceNumber}>
              {invoices[invoiceNumber].productData.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderBottom: '2px solid orange',
                  }}
                >
                  {/* Display Invoice Number and Customer Data only once per invoice */}
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
  );
};

export default InvoiceTab;
