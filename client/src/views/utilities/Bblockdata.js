import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerData } from '../../store/invoiceSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const CustomerTab = () => {
  const invoices = useSelector((state) => state.invoice.invoices);
  const dispatch = useDispatch();

  const [editedData, setEditedData] = useState({});
  const [editMode, setEditMode] = useState({}); // To track edit mode for each invoice row
  
  const handleEdit = (invoiceNumber, field, value) => {
    if (editMode[invoiceNumber]) { // Allow editing only if the row is in edit mode
      setEditedData({
        ...editedData,
        [invoiceNumber]: {
          ...editedData[invoiceNumber],
          [field]: value,
        },
      });
    }
  };

  const handleSave = (invoiceNumber) => {
    const updatedCustomerData = invoices[invoiceNumber].customerData.map((customer) => {
      const editedCustomer = editedData[invoiceNumber] || {};
      return {
        ...customer,
        "Customer Name": editedCustomer["Customer Name"] || customer["Customer Name"],
        "Phone Number": editedCustomer["Phone Number"] || customer["Phone Number"],
        "Total Amount": editedCustomer["Total Amount"] || customer["Total Amount"],
      };
    });

    dispatch(updateCustomerData({ invoiceNumber, customerData: updatedCustomerData }));

    // Disable edit mode after saving
    setEditMode({
      ...editMode,
      [invoiceNumber]: false,
    });
  };

  const handleEditModeToggle = (invoiceNumber) => {
    // Toggle edit mode
    setEditMode({
      ...editMode,
      [invoiceNumber]: !editMode[invoiceNumber],
    });

    // If switching from edit to save, clear any previous edits
    if (editMode[invoiceNumber]) {
      setEditedData({
        ...editedData,
        [invoiceNumber]: {}, // Reset the edited data when switching to view mode
      });
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {Object.keys(invoices).map((invoiceNumber) => (
    <TableRow key={invoiceNumber}>
      <TableCell>{invoices[invoiceNumber].invoiceNumber}</TableCell>
      <TableCell>
        {editMode[invoiceNumber] ? (
          <TextField
            value={editedData[invoiceNumber]?.["Customer Name"] || (invoices[invoiceNumber].customerData[0] ? invoices[invoiceNumber].customerData[0]["Customer Name"] : "")}
            onChange={(e) => handleEdit(invoiceNumber, "Customer Name", e.target.value)}
          />
        ) : (
          invoices[invoiceNumber].customerData[0]?.["Customer Name"] || ""
        )}
      </TableCell>
      <TableCell>
        {editMode[invoiceNumber] ? (
          <TextField
            value={editedData[invoiceNumber]?.["Phone Number"] || (invoices[invoiceNumber].customerData[0] ? invoices[invoiceNumber].customerData[0]["Phone Number"] : "")}
            onChange={(e) => handleEdit(invoiceNumber, "Phone Number", e.target.value)}
          />
        ) : (
          invoices[invoiceNumber].customerData[0]?.["Phone Number"] || ""
        )}
      </TableCell>
      <TableCell>
        {editMode[invoiceNumber] ? (
          <TextField
            value={editedData[invoiceNumber]?.["Total Amount"] || (invoices[invoiceNumber].customerData[0] ? invoices[invoiceNumber].customerData[0]["Total Amount"] : "")}
            onChange={(e) => handleEdit(invoiceNumber, "Total Amount", e.target.value)}
          />
        ) : (
          invoices[invoiceNumber].customerData[0]?.["Total Amount"] || ""
        )}
      </TableCell>
      <TableCell>
        <Button 
          onClick={() => editMode[invoiceNumber] ? handleSave(invoiceNumber) : handleEditModeToggle(invoiceNumber)} 
          variant="contained">
          {editMode[invoiceNumber] ? 'Save' : 'Update'}
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default CustomerTab;
