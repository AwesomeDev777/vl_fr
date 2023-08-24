import React, { FC, useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Portlet, Button, Row, Col, Form } from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Pagination from "utils/Pagination";
import { IGood } from "interfaces/admin/responds";
import apiCall from "utils/apiCall";
import { Admin_Good_GetAll } from "utils/adminUrl";
import GoodsTable from "./GoodsTable";
import AddGoodModal from "./AddGoodModal";
import { any } from "prop-types";

interface IGoods {
  warehouseID: string;
}

const Goods: FC<IGoods> = ({ warehouseID }) => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [activeLinkNumber, setActiveLinkNumber] = useState(1);
  const [paginationLength, setPaginationLength] = useState(10);
  const [goods, setGoods] = useState<IGood[]>([]);
  const [sortKey, setSortKey] = useState({
    key: "_id",
    sort: 1
  });
  const [filter, setFilter] = useState({
    key: "",
    keyword: ""
  });
  const [pageSize, setPageSize] = useState(10);
  const [productsLength, setProductsLength] = useState(0);

  const chooseActiveLinkNumber = (activeLinkNumber: number) => {
    setActiveLinkNumber(activeLinkNumber);
  };

  const handleClickOpenAddGoodModal = () => {
    setOpenAddModal(true);
  };

  const handleClickCloseAddGoodModal = () => {
    setOpenAddModal(false);
  };

  const handleChangeSort = (s: any) => {
    setSortKey(s);
  };

  const handleChangeFilter = (f: any) => {
    setFilter(f);
  };

  const handleChangePageSize = (e: any) => {
    setPageSize(e.target.value);
  };

  const handleGetProducts = async () => {
    const resp: any = await apiCall(
      `${Admin_Good_GetAll}/${activeLinkNumber}/${pageSize}/filterKey:${filter.key}/filterValue:${filter.keyword}/sortKey:${sortKey.key}/sort:${sortKey.sort}`,
      "GET",
      {}
    );
    setGoods(resp.all);
    setProductsLength(resp.length);
  };

  const handleAddProductSuccess = () => {
    handleClickCloseAddGoodModal();
    handleGetProducts();
  };

  useEffect(() => {
    setPaginationLength(productsLength / pageSize + 1);
  }, [productsLength, pageSize]);

  useEffect(() => {
    handleGetProducts();
  }, [activeLinkNumber, pageSize, sortKey, filter]);

  const pagination = {
    activeLinkNumber,
    paginationLength,
    chooseActiveLinkNumber
  };

  return (
    <>
      <Portlet>
        <Portlet.Header bordered>
          <Portlet.Addon>
            <Button
              variant="label-secondary"
              className="me-2"
              onClick={handleClickOpenAddGoodModal}
            >
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add new good
            </Button>
            <CSVLink data={goods} filename="products.csv">
              <Button variant="label-secondary" className="me-2">
                <FontAwesomeIcon icon={faClipboard} className="me-2" />
                Export CSV
              </Button>
            </CSVLink>
            <Button variant="label-secondary" className="me-2">
              ...
            </Button>
          </Portlet.Addon>
        </Portlet.Header>
        <Portlet.Body className="pb-0">
          <Row>
            <Col md={2}>
              <Form.Select
                id="sizeID"
                onChange={handleChangePageSize}
                value={pageSize}
                size="lg"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="0">All</option>
              </Form.Select>
            </Col>
            <Col md={3} />
            <Col md={5}>
              <Pagination pagination={pagination} />
            </Col>
          </Row>
          <Row>
            <Col md={12} />
          </Row>
          <GoodsTable
            warehouseID={warehouseID}
            onChangeFilter={handleChangeFilter}
            onChangeSort={handleChangeSort}
            goods={goods}
            onEditSuccess={handleAddProductSuccess}
          />
        </Portlet.Body>
        <Portlet.Footer>
          <Row>
            <Col md={5} />
            <Col md={5}>
              <Pagination pagination={pagination} />
            </Col>
            <Col md={5} />
          </Row>
        </Portlet.Footer>
      </Portlet>
      <AddGoodModal
        open={openAddModal}
        onClose={handleClickCloseAddGoodModal}
        onAddSuccess={handleAddProductSuccess}
      />
    </>
  );
};

export default Goods;
