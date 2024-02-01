import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddProduct } from './AddProduct';

export const EmptyProduct = () => {
    const [modalShow, setModalShow] = useState(false); 

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="fw-bold pb-2 pb-md-4">No Products present</h3>
        <Button variant="primary" onClick={()=>setModalShow(true)}>Create Product</Button>
      <AddProduct show={modalShow}
        onHide={() => setModalShow(false)}/>
    </div>
  );
};
