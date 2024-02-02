import Table from "react-bootstrap/Table";
import { Product } from "./Product";
import Button from "react-bootstrap/Button";
import { AddProduct } from "./AddProduct";
import { useState } from "react";

export const ProductList = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <AddProduct show={isOpen} onHide={() => setOpen(false)} />
      <Button className="mb-5" onClick={() => setOpen(true)}>
        Add Product
      </Button>
      <Table responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <Product
              key={el.itemId}
              itemDescription={el.itemDescription}
              itemId={el.itemId}
              itemName={el.itemName}
              itemPrice={el.itemPrice}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
