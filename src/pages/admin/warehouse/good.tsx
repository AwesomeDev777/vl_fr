import React, { useState } from "react";
import withAdminAuth from "components/auth/withAdminAuth";
import { Row, Col } from "@blueupcode/components";
import { ExtendedNextPage } from "@blueupcode/components/types";

import Product from "../../../components/admin/warehouse/good";

const WarehouseGoodReceiptPage: ExtendedNextPage = () => {
  const [warehouseID, setWarehouseID] = useState<string>("");
  const [warehouseName, setWarehouseName] = useState<string>("");

  return (
    <>
      <Row>
        <Col md="12">
          <Product warehouseID={warehouseID} warehouseName={warehouseName} />
        </Col>
      </Row>
    </>
  );
};

WarehouseGoodReceiptPage.pageTitle = "Warehouse Good Receipt";
WarehouseGoodReceiptPage.activeLink = "warehouseGoodReceipt";

export default withAdminAuth(WarehouseGoodReceiptPage);
