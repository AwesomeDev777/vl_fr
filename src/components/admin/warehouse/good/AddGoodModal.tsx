import React, { useState, useEffect } from "react";
import { IGood } from "interfaces/admin/entities";
import { Button, Form, Modal } from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import apiCall from "utils/apiCall";
import { Admin_Good_ADD, Admin_Warehouse_GetAll } from "utils/adminUrl";

const AddGoodModal = ({ open, onClose, onAddSuccess }: any) => {
  const [newGood, setNewGood] = useState<IGood>({
    vendorName: "",
    deliveryDate: new Date().toISOString(),
    purchaseOrderNumber: "",
    invoiceNumber: "",
    warehouseId: "",
    name: "",
    description: "",
    purchasePrice: 0,
    expirationDate: new Date().toISOString(),
    quantity: 0,
    totalAmount: 0
  });
  const [warehouses, setWarehouses] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const data: any = await apiCall(Admin_Warehouse_GetAll, "GET", {});
      setWarehouses(data.all);
    })();
  }, []);

  const handleInputChange = (e: any) => {
    setNewGood({
      ...newGood,
      [e.target.name]: e.target.value
    });
  };

  const handleAddGood = async () => {
    await apiCall(Admin_Good_ADD, "POST", {
      ...newGood
    });
    onAddSuccess();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Add new good</Modal.Title>
        <Button icon variant="label-danger" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
          {/* <p style={danger}>{pr_errors.code}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Vendor Name</Form.Label>
          <Form.Control
            type="text"
            name="vendorName"
            onChange={handleInputChange}
            placeholder="Vendor Name"
          />
          {/* <p style={danger}>{pr_errors.name}</p> */}
        </Form.Group>

        <Form.Group>
          <Form.Label>Warehouse</Form.Label>
          <Form.Select
            onChange={handleInputChange}
            name="warehouseId"
            size="lg"
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((w) => (
              <option key={w._id} value={w._id}>
                {w.warehouse_name}
              </option>
            ))}
          </Form.Select>
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Delivery Date</Form.Label>
          <Form.Control
            type="date"
            name="deliveryDate"
            onChange={handleInputChange}
            placeholder="Delivery Date"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Purchase Order Number</Form.Label>
          <Form.Control
            type="text"
            name="purchaseOrderNumber"
            onChange={handleInputChange}
            placeholder="Purchase Order Number"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Invoice Number</Form.Label>
          <Form.Control
            type="text"
            name="invoiceNumber"
            onChange={handleInputChange}
            placeholder="Invoice Number"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Purchase Price</Form.Label>
          <Form.Control
            type="number"
            name="purchasePrice"
            onChange={handleInputChange}
            placeholder="Purchase Price"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            onChange={handleInputChange}
            placeholder="Quantity"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="number"
            name="totalAmount"
            onChange={handleInputChange}
            placeholder="Total Amount"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Expiration date</Form.Label>
          <Form.Control
            type="date"
            name="expirationDate"
            onChange={handleInputChange}
            placeholder="Expiration date"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddGood}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGoodModal;
