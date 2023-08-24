import React, { useState } from "react";
import { IProduct } from "interfaces/admin/entities";
import { Button, Form, Modal } from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import apiCall from "utils/apiCall";
import { Admin_Product_ADD } from "utils/adminUrl";

const AddProductModal = ({ open, onClose, warehouseID, onAddSuccess }: any) => {
  const [newProduct, setNewProduct] = useState<IProduct>({
    code: "",
    bin_location: "",
    comment: "",
    initial_stock: 0,
    name: ""
  });

  const handleInputChange = (e: any) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async () => {
    const resp = await apiCall(Admin_Product_ADD, "POST", {
      warehouse_ID: warehouseID,
      ...newProduct
    });
    onAddSuccess();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Add new product</Modal.Title>
        <Button icon variant="label-danger" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="code_ID">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            placeholder="Code"
            onChange={handleInputChange}
          />
          {/* <p style={danger}>{pr_errors.code}</p> */}
        </Form.Group>
        <Form.Group controlId="name_ID">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder="Name"
          />
          {/* <p style={danger}>{pr_errors.name}</p> */}
        </Form.Group>
        <Form.Group controlId="bin_location_ID">
          <Form.Label>Bin Location</Form.Label>
          <Form.Control
            type="text"
            name="bin_location"
            onChange={handleInputChange}
            placeholder="Bin location"
          />
          {/* <p style={danger}>{pr_errors.bin_location}</p> */}
        </Form.Group>
        <Form.Group controlId="expiration_data_ID">
          <Form.Label>Expiration date</Form.Label>
          <Form.Control
            type="date"
            name="expiration_date"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="initial_stock_ID">
          <Form.Label>Initial Stock</Form.Label>
          <Form.Control
            type="Number"
            name="initial_stock"
            onChange={handleInputChange}
          />
          {/* <p style={danger}>{pr_errors.initial_stock}</p> */}
        </Form.Group>
        <Form.Group controlId="comment_ID">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            name="comment"
            as="textarea"
            rows={3}
            onChange={handleInputChange}
            placeholder="Comment"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddProduct}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
