import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const EmptyInvoice = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
      <Link to="/create">
        <Button variant="primary">Create Invoice</Button>
      </Link>
    </div>
  );
};
