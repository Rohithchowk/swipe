import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: JSON.parse(localStorage.getItem('InvoiceData')) || {},
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateCustomerData(state, action) {
      const { invoiceNumber, customerData } = action.payload;
      if (state.invoices[invoiceNumber]) {
        state.invoices[invoiceNumber].customerData = customerData;
        localStorage.setItem('InvoiceData', JSON.stringify(state.invoices));
      }
    },
    updateProductData(state, action) {
      const { invoiceNumber, productData } = action.payload;
      if (state.invoices[invoiceNumber]) {
        state.invoices[invoiceNumber].productData = productData;
        localStorage.setItem('InvoiceData', JSON.stringify(state.invoices));
      }
    },
  },
});

export const { updateCustomerData, updateProductData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
