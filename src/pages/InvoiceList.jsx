import { useState } from 'react';
import { Button, Card, Col, Row, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useInvoiceListData ,useProducts} from '../redux/hooks';
import { EmptyInvoice } from '../views/Invoice/EmptyInvoice';
import { InvoiceRow } from '../views/Invoice/InvoiceRow';
import { EmptyProduct } from '../views/Products/EmptyProduct';
import { ProductList } from '../views/Products/ProductList';

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();

  const { products, productSize } = useProducts()

  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState('');
  const navigate = useNavigate();
  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert('Please enter the valid invoice id.');
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
        <Tabs defaultActiveKey="Invoices" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="Invoices" title="Invoices">
            <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
              {isListEmpty ? (
                <EmptyInvoice />
              ) : (
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>
                    <Link to="/create">
                      <Button variant="primary mb-2 mb-md-4">Create Invoice</Button>
                    </Link>

                    <div className="d-flex gap-2">
                      <Button variant="dark mb-2 mb-md-4" onClick={handleCopyClick}>
                        Copy Invoice
                      </Button>

                      <input
                        type="text"
                        value={copyId}
                        onChange={(e) => setCopyId(e.target.value)}
                        placeholder="Enter Invoice ID to copy"
                        className="bg-white border"
                        style={{
                          height: '50px'
                        }}
                      />
                    </div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Invoice No.</th>
                        <th>Bill To</th>
                        <th>Due Date</th>
                        <th>Total Amt.</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceList.map((invoice) => (
                        <InvoiceRow key={invoice.id} invoice={invoice} navigate={navigate} />
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Tab>
          <Tab eventKey="Products" title="Products">
            <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
              {productSize === 0 && <EmptyProduct />}
              {productSize > 0 && <ProductList data={products}/>}
            </Card>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default InvoiceList;
