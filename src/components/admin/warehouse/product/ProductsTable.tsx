/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { Table, Form, Button } from "@blueupcode/components";
import { IProduct } from "interfaces/admin/responds";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { swal } from "components/sweetalert2/instance";
import apiCall from "utils/apiCall";
import { Admin_Product_Delete } from "utils/adminUrl";

import EditProductModal from "./EditProductModal";

interface IProductTable {
  warehouseID: string;
  products: IProduct[];
  onChangeSort: (value: { key: string; sort: number }) => void;
  onChangeFilter: (value: { key: string; keyword: string }) => void;
  onEditSuccess: () => void;
}

const ProductsTable: FC<IProductTable> = ({
  warehouseID,
  products,
  onChangeSort,
  onChangeFilter,
  onEditSuccess
}) => {
  const [sortKey, setSortKey] = useState({
    key: "unique_id",
    sort: 1
  });
  const [filter, setFilter] = useState({
    key: "",
    keyword: ""
  });

  useEffect(() => {
    onChangeSort(sortKey);
  }, [sortKey]);

  useEffect(() => {
    onChangeFilter(filter);
  }, [filter]);

  const handleSort = (key: any) => {
    let sort = 1;
    if (key === sortKey.key) {
      if (sortKey.sort === -1) {
        sort = 1;
      } else {
        sort = -1;
      }
    } else {
      sort = -1;
    }
    setSortKey({
      key,
      sort
    });
  };

  const handleFilterChange = (e: any) => {
    if (e.target.value === "") {
      setFilter({
        key: "",
        keyword: ""
      });
    } else {
      setFilter({
        key: e.target.name,
        keyword: e.target.value
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await apiCall(`${Admin_Product_Delete}/${id}`, "DELETE", {});
            swal.fire("Deleted!", "Successfully deleted.", "success");
            onEditSuccess();
          } catch (error) {
            swal.fire(
              "Failure!",
              "Deleting Product is failure, Try again.",
              "error"
            );
          }
        }
      });
  };

  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">
            <Form.Group controlId="th_unique_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("unique_id");
                }}
              >
                Product ID
                {sortKey.key === "unique_id" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="unique_id"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_code_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("code");
                }}
              >
                Code
                {sortKey.key === "code" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="code"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_name_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("name");
                }}
              >
                Name
                {sortKey.key === "name" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="name"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_bin_location_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("bin_location");
                }}
              >
                Bin location
                {sortKey.key === "bin_location" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="bin_location"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_expiration_date_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("expiration_date");
                }}
              >
                Expiration date
                {sortKey.key === "expiration_date" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="expiration_date"
                type="Date"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_initial_stock_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("initial_stock");
                }}
              >
                Initial stock
                {sortKey.key === "initial_stock" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="initial_stock"
                type="Number"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_current_stock_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("current_stock");
                }}
              >
                Current stock
                {sortKey.key === "current_stock" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                name="current_stock"
                type="Number"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_last_withdrawal_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("last_withdrawal");
                }}
              >
                Last withdrawal
                {sortKey.key === "last_withdrawal" && sortKey.sort === -1 ? (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleUp}
                    className="me-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={SolidIcon.faAngleDown}
                    className="me-2"
                  />
                )}
              </span>
              <Form.Control
                type="Number"
                name="last_withdrawal"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_comment_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
              >
                Comment
              </span>
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group controlId="th_action_ID">
              <span
                style={{
                  cursor: "pointer"
                }}
              >
                Action
              </span>
            </Form.Group>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product._id}>
            <td>{product.unique_id}</td>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.bin_location}</td>
            <td>{new Date(product.expiration_date).toLocaleDateString()}</td>
            <td>{product.initial_stock}</td>
            <td>{product.current_stock}</td>
            <td>{product.last_withdrawal}</td>
            <td>{product.comment}</td>
            <td>
              <div style={{ display: "flex" }}>
                <EditProductModal
                  onEditSuccess={onEditSuccess}
                  productId={product._id}
                />
                <Button
                  variant="label-secondary"
                  className="ms-2"
                  onClick={() => {
                    handleDeleteProduct(product._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductsTable;
