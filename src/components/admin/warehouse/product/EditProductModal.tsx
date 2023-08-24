import React, { useState, useEffect } from "react";
import { IProduct } from "interfaces/admin/entities";
import { Button, Form, Modal } from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import apiCall from "utils/apiCall";
import { Admin_Product_Edit, Admin_Product_GetOne } from "utils/adminUrl";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

const EditProductModal = ({ onEditSuccess, productId }: any) => {
  const [product, setProduct] = useState<IProduct>({
    code: "",
    bin_location: "",
    comment: "",
    initial_stock: 0,
    name: "",
    expiration_date: new Date().toISOString(),
    current_stock: 0,
    last_withdrawal: 0
  });
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    if (openAddModal) {
      (async function () {
        const resp: any = await apiCall(
          `${Admin_Product_GetOne}/${productId}`,
          "GET",
          {}
        );
        setProduct({
          code: resp.code,
          bin_location: resp.bin_location,
          comment: resp.comment,
          initial_stock: resp.initial_stock,
          name: resp.name,
          expiration_date: resp.expiration_date,
          current_stock: resp.current_stock,
          last_withdrawal: resp.last_withdrawal
        });
      })();
    }
  }, [openAddModal]);

  const handleInputChange = (e: any) => {
    setProduct({
      ...product,
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
    await apiCall(`${Admin_Product_Edit}/${productId}`, "PUT", {
      ...product
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
          <Modal.Title>Edit product</Modal.Title>
          <Button icon variant="label-danger" onClick={handleCloseModal}>
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
              value={product.code}
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
              value={product.name}
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
              value={product.bin_location}
            />
            {/* <p style={danger}>{pr_errors.bin_location}</p> */}
          </Form.Group>
          <Form.Group controlId="expiration_data_ID">
            <Form.Label>Expiration date</Form.Label>
            <Form.Control
              type="date"
              name="expiration_date"
              onChange={handleInputChange}
              defaultValue={product.expiration_date ? new Date(product.expiration_date)
                .toISOString()
                .substring(0, 10) : ""}
            />
          </Form.Group>
          <Form.Group controlId="initial_stock_ID">
            <Form.Label>Initial Stock</Form.Label>
            <Form.Control
              type="Number"
              name="initial_stock"
              onChange={handleInputChange}
              value={product.initial_stock}
            />
            {/* <p style={danger}>{pr_errors.initial_stock}</p> */}
          </Form.Group>
          <Form.Group controlId="current_stock_ID">
            <Form.Label>Current Stock</Form.Label>
            <Form.Control
              type="Number"
              name="current_stock"
              onChange={handleInputChange}
              value={product.current_stock}
            />
            {/* <p style={danger}>{pr_errors.initial_stock}</p> */}
          </Form.Group>
          <Form.Group controlId="last_withdrawal_ID">
            <Form.Label>Last Withdrawal</Form.Label>
            <Form.Control
              type="Number"
              name="last_withdrawal"
              onChange={handleInputChange}
              value={product.last_withdrawal}
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
              value={product.comment}
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

export default EditProductModal;
