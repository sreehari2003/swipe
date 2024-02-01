import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    products: [],
  },
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      const invoiceIdToDelete = action.payload;
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== invoiceIdToDelete
      );
    },
    updateInvoice: (state, action) => {
      const { id, updatedInvoice } = action.payload;
      const index = state.invoices.findIndex((invoice) => invoice.id === id);
      if (index !== -1) {
        state.invoices[index] = updatedInvoice;
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((el) => el.itemId !== productId);
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  addProduct,
  deleteProduct,
} = invoicesSlice.actions;

export const selectInvoiceList = ({ invoices }) => {
  return invoices.invoices;
};

export const selectProductList = ({ invoices }) => {
  return invoices.products;
};

export default invoicesSlice.reducer;
