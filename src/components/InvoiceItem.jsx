import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import Form from "react-bootstrap/Form";
import { useProducts } from "../redux/hooks";
import { useState } from "react";
import { useEffect } from "react";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item,index) => (
            <ItemRow
              index={index}
              item={item}
              onDelEvent={onRowDel}
              onItemizedItemEdit={onItemizedItemEdit}
              currency={currency}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const { products,getProductById } = useProducts();

  useEffect(()=>{
    // triggerd when edit mode is activated
     if(props.item.id){
      const data = getProductById(props.item.id);
      setInfo(data)
     }
  },[props])

  const [info,setInfo] = useState();
  const [qty,setQty] = useState(1);


  const onDelEvent = () => {
    props.onDelEvent(props.index);
  };
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <Form.Select aria-label="Default select example" defaultValue={props?.item?.id} onChange={(e)=>{
           props.onItemizedItemEdit({
            id:e.target.value,
           },props.index)
           const data = getProductById(e.target?.value)
           if(!data) return
           setInfo(data)
        }}>
          <option value={-1}>Open this to select Item</option>
          {products.map((el) => (
            <option value={el.itemId}>{el.itemName}</option>
          ))}
        </Form.Select>

        <EditableField
          disabled={true}
          onItemizedItemEdit={() =>
            props.onItemizedItemEdit(props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: info?.itemDescription,
            id: info?.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>{   
            setQty(evt.target.value)
            props.onItemizedItemEdit({
              qty:evt.target.value
            }, props.index)
          }}
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: qty,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          disabled
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value:info?.itemPrice,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
