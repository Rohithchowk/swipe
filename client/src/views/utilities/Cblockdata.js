import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductData } from '../../store/invoiceSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const ProductTab = () => {
  const invoices = useSelector((state) => state.invoice.invoices);
  const dispatch = useDispatch();

  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState({}); // Track editing state for each product
  
  const handleEdit = (invoiceNumber, index, field, value) => {
    setEditedData({
      ...editedData,
      [invoiceNumber]: {
        ...editedData[invoiceNumber],
        products: {
          ...(editedData[invoiceNumber]?.products || {}),
          [index]: {
            ...((editedData[invoiceNumber]?.products || [])[index] || {}),
            [field]: value,
          },
        },
      },
    });
  };

  const handleStartEditing = (invoiceNumber, index) => {
    setIsEditing({
      ...isEditing,
      [invoiceNumber]: {
        ...isEditing[invoiceNumber],
        [index]: true,
      },
    });
  };

  const handleSave = (invoiceNumber, index) => {
    const updatedProductData = invoices[invoiceNumber].productData.map((product, i) => {
      if (i === index) {
        const editedProduct = editedData[invoiceNumber]?.products?.[index] || {};
        return {
          ...product,
          ProductName: editedProduct.ProductName || product.ProductName,
          UnitPrice: editedProduct.UnitPrice || product.UnitPrice,
          PriceWithTax: editedProduct.PriceWithTax || product.PriceWithTax,
          Quantity: editedProduct.Quantity || product.Quantity,
          Tax: editedProduct.Tax || product.Tax,
        };
      }
      return product;
    });

    dispatch(updateProductData({ invoiceNumber, productData: updatedProductData }));
    setIsEditing({
      ...isEditing,
      [invoiceNumber]: {
        ...isEditing[invoiceNumber],
        [index]: false,
      },
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price With Tax</TableCell>
            <TableCell>Tax</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(invoices).map((invoiceNumber) =>
            invoices[invoiceNumber].productData.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{invoices[invoiceNumber].invoiceNumber}</TableCell>
                <TableCell>
                  <TextField
                    value={editedData[invoiceNumber]?.products?.[index]?.ProductName || product.ProductName}
                    onChange={(e) => handleEdit(invoiceNumber, index, 'ProductName', e.target.value)}
                    disabled={!isEditing[invoiceNumber]?.[index]} // Disable until "Update" is clicked
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={editedData[invoiceNumber]?.products?.[index]?.UnitPrice || product.UnitPrice}
                    onChange={(e) => handleEdit(invoiceNumber, index, 'UnitPrice', e.target.value)}
                    disabled={!isEditing[invoiceNumber]?.[index]}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={editedData[invoiceNumber]?.products?.[index]?.Quantity || product.Quantity}
                    onChange={(e) => handleEdit(invoiceNumber, index, 'Quantity', e.target.value)}
                    disabled={!isEditing[invoiceNumber]?.[index]}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={editedData[invoiceNumber]?.products?.[index]?.PriceWithTax || product.PriceWithTax}
                    onChange={(e) => handleEdit(invoiceNumber, index, 'PriceWithTax', e.target.value)}
                    disabled={!isEditing[invoiceNumber]?.[index]}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={editedData[invoiceNumber]?.products?.[index]?.Tax || product.Tax}
                    onChange={(e) => handleEdit(invoiceNumber, index, 'Tax', e.target.value)}
                    disabled={!isEditing[invoiceNumber]?.[index]}
                  />
                </TableCell>
                <TableCell>
                  {isEditing[invoiceNumber]?.[index] ? (
                    <Button onClick={() => handleSave(invoiceNumber, index)} variant="contained">Save</Button>
                  ) : (
                    <Button onClick={() => handleStartEditing(invoiceNumber, index)} variant="contained">Update</Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTab;
