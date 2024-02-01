import { useSelector } from "react-redux";
import { selectInvoiceList, selectProductList } from "./invoicesSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProducts = () => {
  const products = useSelector(selectProductList);
  const productSize = products.length;

  const getProductById = (id) => {
    return products.find((el) => el.itemId === Number(id));
  };

  return { products, productSize, getProductById };
};
