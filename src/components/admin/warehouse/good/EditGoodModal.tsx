import React, { useState, useEffect } from "react";
import { IGood } from "interfaces/admin/entities";
import { Button, Form, Modal } from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import apiCall from "utils/apiCall";
import {
  Admin_Good_Edit,
  Admin_Good_GetOne,
  Admin_Warehouse_GetAll
} from "utils/adminUrl";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const EditGoodModal = ({ onEditSuccess, goodId }: any) => {
  const [good, setGood] = useState<IGood>({
    vendorName: "",
    deliveryDate: "",
    purchaseOrderNumber: "",
    invoiceNumber: "",
    warehouseId: {},
    name: "",
    description: "",
    purchasePrice: 0,
    expirationDate: "",
    quantity: 0,
    totalAmount: 0
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  useEffect(() => {
    if (openAddModal) {
      (async function () {
        const resp: any = await apiCall(`${Admin_Good_GetOne}/${goodId}`, "GET", {});
        setGood({
          vendorName: resp.vendorName,
          deliveryDate: resp.deliveryDate,
          purchaseOrderNumber: resp.purchaseOrderNumber,
          invoiceNumber: resp.invoiceNumber,
          warehouseId: resp.warehouseId,
          name: resp.name,
          description: resp.description,
          purchasePrice: resp.purchasePrice,
          expirationDate: resp.expirationDate,
          quantity: resp.quantity,
          totalAmount: resp.totalAmount
        });
      })();
    }
  }, [openAddModal]);

  useEffect(() => {
    (async function () {
      const data: any = await apiCall(Admin_Warehouse_GetAll, "GET", {});
      setWarehouses(data.all);
    })();
  }, []);

  const handleInputChange = (e: any) => {
    setGood({
      ...good,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
  };

  const handleUpdateProduct = async () => {
    await apiCall(`${Admin_Good_Edit}/${goodId}`, "PUT", {
      ...good
    });
    handleCloseModal();
    onEditSuccess();
  };

  return (
    <>
      <Button
        variant="label-secondary"
        className="ms-2"
        onClick={handleOpenModal}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Modal show={openAddModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Edit good</Modal.Title>
          <Button icon variant="label-danger" onClick={handleCloseModal}>
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
              value={good.name}
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
              value={good.vendorName}
            />
            {/* <p style={danger}>{pr_errors.name}</p> */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Warehouse</Form.Label>
            <Form.Select
              onChange={handleInputChange}
              name="warehouseId"
              size="lg"
              value={good.warehouseId._id}
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
              defaultValue={
                good.deliveryDate
                  ? new Date(good.deliveryDate).toISOString().substring(0, 10)
                  : ""
              }
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
              value={good.purchaseOrderNumber}
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
              value={good.invoiceNumber}
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
              value={good.purchasePrice}
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
              value={good.quantity}
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
              value={good.totalAmount}
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
              defaultValue={
                good.expirationDate
                  ? new Date(good.expirationDate).toISOString().substring(0, 10)
                  : ""
              }
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
              value={good.description}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateProduct}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditGoodModal;
