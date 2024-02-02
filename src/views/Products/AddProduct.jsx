import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import generateRandomId from "../../utils/generateRandomId";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../redux/invoicesSlice";

export const AddProduct = ({ show, onHide, defaultValue }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    itemId: defaultValue?.itemId || 0,
    itemName: defaultValue?.itemName || "",
    itemDescription: defaultValue?.itemDescription || "",
    itemPrice: defaultValue?.itemPrice || "1.00",
    itemQuantity: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // when new product is added;
    if (!defaultValue) {
      formData.itemId = generateRandomId();
      dispatch(addProduct(formData));
      window.alert("New product added successfuly");
    } else {
      // when we update the product
      dispatch(
        updateProduct({
          id: formData.itemId,
          updatedProduct: formData,
        })
      );
      window.alert("Product updated successfuly");
    }
   
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Product Name"
              name="itemName"
              onChange={handleInputChange}
              value={formData.itemName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom02" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="itemDescription"
              onChange={handleInputChange}
              value={formData.itemDescription}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="validationCustom02" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              name="itemPrice"
              onChange={handleInputChange}
              value={formData.itemPrice}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} type="submit">
            {defaultValue ? "Update product" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
