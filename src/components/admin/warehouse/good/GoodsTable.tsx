/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { Table, Form, Button } from "@blueupcode/components";
import { IGood } from "interfaces/admin/responds";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { swal } from "components/sweetalert2/instance";
import apiCall from "utils/apiCall";
import { Admin_Good_Delete } from "utils/adminUrl";

import EditGoodModal from "./EditGoodModal";

interface IGoodsTable {
  warehouseID: string;
  goods: IGood[];
  onChangeSort: (value: { key: string; sort: number }) => void;
  onChangeFilter: (value: { key: string; keyword: string }) => void;
  onEditSuccess: () => void;
}

const ProductsTable: FC<IGoodsTable> = ({
  warehouseID,
  goods,
  onChangeSort,
  onChangeFilter,
  onEditSuccess
}) => {
  const [sortKey, setSortKey] = useState({
    key: "_id",
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

  const handleSort = (key) => {
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

  const handleFilterChange = (e) => {
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

  const handleDeleteGood = (id) => {
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
            await apiCall(`${Admin_Good_Delete}/${id}`, "DELETE", {});
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
            <Form.Group>
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
            <Form.Group>
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("vendorName");
                }}
              >
                Vendor Name
                {sortKey.key === "vendorName" && sortKey.sort === -1 ? (
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
                name="vendorName"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group>
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("warehouse");
                }}
              >
                Warehouse
                {sortKey.key === "warehouse" && sortKey.sort === -1 ? (
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
                name="warehouse"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
          <th scope="col">
            <Form.Group>
              <span
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  handleSort("quantity");
                }}
              >
                Quantity
                {sortKey.key === "quantity" && sortKey.sort === -1 ? (
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
                name="quantity"
                type="text"
                onChange={handleFilterChange}
                size="sm"
              />
            </Form.Group>
          </th>
        </tr>
      </thead>
      <tbody>
        {goods.map((good: any) => (
          <tr key={good._id}>
            <td>{good.name}</td>
            <td>{good.vendorName}</td>
            <td>{good.quantity}</td>
            <td>
              <div style={{ display: "flex" }}>
                <Link href={`/admin/warehouse/good/${good._id}`} passHref>
                  <Button variant="label-secondary" className="ms-2">
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </Link>
                <EditGoodModal
                  onEditSuccess={onEditSuccess}
                  goodId={good._id}
                />
                <Button
                  variant="label-secondary"
                  className="ms-2"
                  onClick={() => {
                    handleDeleteGood(good._id);
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
