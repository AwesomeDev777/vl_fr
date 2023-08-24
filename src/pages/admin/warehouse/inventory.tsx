import React, { useState } from "react";
import withAdminAuth from "components/auth/withAdminAuth";
import { Row, Col } from "@blueupcode/components";
import { ExtendedNextPage } from "@blueupcode/components/types";

import List from "../../../components/admin/warehouse/inventory/list";
import Product from "../../../components/admin/warehouse/product";

const WarehouseInventoryHistoryPage: ExtendedNextPage = () => {
  const [warehouseID, setWarehouseID] = useState<string>("");
  const [warehouseName, setWarehouseName] = useState<string>("");

  const handleWarehouseChange = (id: any) => {
    setWarehouseID(id.warehouse_ID);
    setWarehouseName(id.warehouse_Name);
  };

  return (
    <>
      <Row>
        <Col md="3">
          <List id={handleWarehouseChange} />
        </Col>
        <Col md="9">
          <Product warehouseID={warehouseID} warehouseName={warehouseName} />
        </Col>
      </Row>
    </>
  );
};

WarehouseInventoryHistoryPage.pageTitle = "Warehouse Inventory History";
WarehouseInventoryHistoryPage.activeLink = "warehouseInventoryHistory";

export default withAdminAuth(WarehouseInventoryHistoryPage);
