import React from "react";
import { useRouter } from "next/router";
import withAdminAuth from "components/auth/withAdminAuth";
import { Row, Col } from "@blueupcode/components";
import { ExtendedNextPage } from "@blueupcode/components/types";

import GoodDetail from "../../../../components/admin/warehouse/good/GoodDetail";

const WarehouseGoodDetailPage: ExtendedNextPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Row>
        <Col md="12">
          <GoodDetail goodId={query.goodId} />
        </Col>
      </Row>
    </>
  );
};

WarehouseGoodDetailPage.pageTitle = "Warehouse Good Detail";
WarehouseGoodDetailPage.activeLink = "warehouseGoodReceipt";

export default withAdminAuth(WarehouseGoodDetailPage);
