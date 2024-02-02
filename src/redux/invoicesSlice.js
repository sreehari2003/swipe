import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    updateProduct: (state, payload) => {
      const { id, updatedProduct } = payload.payload;
      const data = state.products.findIndex((el) => el.itemId === id);
      if (data !== -1) {
        state.products[data] = updatedProduct;
      }
    },
    updateInvoicesTotal: (state, action) => {
      state.invoices = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the async thunk completion
    builder.addCase(
      updateProductAndRecalculateTotal.fulfilled,
      (state, action) => {
        // Do nothing here, as the recalculation is handled in the async thunk
      }
    );
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  addProduct,
  deleteProduct,
  updateProduct,
  updateInvoicesTotal,
} = invoicesSlice.actions;

export const selectInvoiceList = ({ invoices }) => {
  return invoices.invoices;
};

export const selectProductList = ({ invoices }) => {
  return invoices.products;
};

export default invoicesSlice.reducer;

// Helper function to calculate the total price of an invoice
const calculateInvoiceTotal = (items, products, taxRate, discount) => {
  const priceWIthoutTax = items.reduce((total, item) => {
    const product = products.find((p) => p.itemId === item.id);
    if (product) {
      total += parseFloat(product.itemPrice) * item.itemQuantity;
    }
    return total;
  }, 0);

  const taxAmount = (taxRate / 100) * priceWIthoutTax;
  const totalSumWithTax = taxAmount + priceWIthoutTax;
  const discountAmount = (discount / 100) * totalSumWithTax;

  return totalSumWithTax - discountAmount;
};

// Async thunk to update product and recalculate total price
export const updateProductAndRecalculateTotal = createAsyncThunk(
  "invoices/updateProductAndRecalculateTotal",
  async ({ id, updatedProduct }, { dispatch, getState }) => {
    // Dispatch the regular updateProduct action
    dispatch(updateProduct({ id, updatedProduct }));

    // Get the current state
    const state = getState();

    // Recalculate total price
    const updatedInvoice = state.invoices.invoices.map((invoice) => ({
      ...invoice,
      total: calculateInvoiceTotal(
        invoice.items,
        state.invoices.products,
        Number(invoice.taxRate),
        Number(invoice.discountRate)
      ),
    }));
    // Dispatch an action to update the invoices array with new totals
    dispatch(updateInvoicesTotal(updatedInvoice));
  }
);
