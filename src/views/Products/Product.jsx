import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/invoicesSlice";
import { AddProduct } from "./AddProduct";
import { useState } from "react";

export const Product = (props) => {
  const { itemDescription, itemId, itemName, itemPrice } = props;
  const [isEditOpen,setEditOpen] = useState(false); 
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <tr>
        <td>{itemId}</td>
        <td className="fw-normal">{itemName}</td>
        <td className="fw-normal">{itemDescription}</td>
        <td className="fw-normal">{itemPrice}</td>
        <td style={{ width: "5%" }}>
          <Button variant="outline-primary" onClick={()=>setEditOpen(true)}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiSolidPencil />
            </div>
          </Button>
        </td>
        <td style={{ width: "5%" }}>
          <Button variant="danger" onClick={() => handleDelete(itemId)}>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <BiTrash />
            </div>
          </Button>
        </td>
      </tr>
      <AddProduct
      show={isEditOpen}
      onHide={()=>setEditOpen(false)}
        defaultValue={{
          itemName,
          itemDescription,
          itemId,
          itemPrice,
        }}
      />
    </>
  );
};
