import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col"

export const AddProduct = ({ show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Product Name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
    
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Add Product</Button>
      </Modal.Footer>
    </Modal>
  );
};
