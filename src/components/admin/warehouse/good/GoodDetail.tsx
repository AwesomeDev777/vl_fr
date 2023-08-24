import React, { useEffect, useState } from "react";
import {
  Portlet,
  Row,
  Col,
  Button,
  Form,
  Timeline,
  RichList
} from "@blueupcode/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCircleCheck,
  faAdd,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import apiCall from "utils/apiCall";
import {
  Admin_Good_GetOne,
  Admin_GoodQuality_GetAll,
  Admin_GoodQuality_ADD
} from "utils/adminUrl";

const GoodDetail = ({ goodId }) => {
  const [good, setGood] = useState({});
  const [reports, setReports] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [qualityReport, setQualityReport] = useState({
    date: new Date().toISOString(),
    description: ""
  });

  const getAllReports = async () => {
    const reportsResp = await apiCall(
      `${Admin_GoodQuality_GetAll}/${goodId}`,
      "GET",
      {}
    );
    setReports(reportsResp.all);
  };

  useEffect(() => {
    (async function () {
      const resp = await apiCall(`${Admin_Good_GetOne}/${goodId}`, "GET", {});
      setGood(resp);
      getAllReports();
    })();
  }, [goodId]);

  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (e) => {
    setQualityReport({
      ...qualityReport,
      [e.target.name]: e.target.value
    });
  };

  const handleAddReport = async () => {
    await apiCall(Admin_GoodQuality_ADD, "POST", {
      ...qualityReport,
      goodId
    });
    setQualityReport({
      date: new Date().toISOString(),
      description: ""
    });
    handleShowAddForm();
    getAllReports();
  };

  return (
    <Portlet>
      <Portlet.Header>
        <Portlet.Icon>
          <FontAwesomeIcon icon={faFileCircleCheck} />
        </Portlet.Icon>
        <Portlet.Title>Good Details</Portlet.Title>
      </Portlet.Header>
      <Portlet.Body>
        <Row>
          <Col md={6} sm={12}>
            <h4>Name: {good.name || ""}</h4>
            <h4>Vendor Name: {good.vendorName || ""}</h4>
            <h4>
              Warehouse:{" "}
              {good.warehouseId ? good.warehouseId.warehouse_name : ""}
            </h4>
            <h4>
              Delivery Datae:{" "}
              {new Date(good.deliveryDate).toLocaleDateString() || ""}
            </h4>
            <h4>Purchase Order Number: {good.purchaseOrderNumber || ""}</h4>
            <h4>Invoice Number: {good.invoiceNumber || ""}</h4>
            <h4>Purchase Price: {good.purchasePrice || ""}</h4>
            <h4>
              Expiration Datae:{" "}
              {good.expirationDate
                ? new Date(good.expirationDate).toLocaleDateString()
                : ""}
            </h4>
            <h4>Quantity: {good.quantity || ""}</h4>
            <h4>Total Amount: {good.totalAmount || ""}</h4>
            <h4>Description: </h4>
            <h4>{good.description || ""}</h4>
          </Col>
          <Col md={6} sm={12}>
            <div
              style={{
                display: "flex"
              }}
            >
              <h4>Manage Quality</h4>
              <Button
                variant="label-secondary"
                className="ms-4"
                onClick={handleShowAddForm}
              >
                <FontAwesomeIcon icon={showAddForm ? faClose : faAdd} />
              </Button>
            </div>
            {showAddForm && (
              <>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={handleInputChange}
                    placeholder="Date"
                    defaultValue={
                      qualityReport.date
                        ? new Date(qualityReport.date)
                            .toISOString()
                            .substring(0, 10)
                        : ""
                    }
                  />
                  {/* <p style={danger}>{pr_errors.bin_location}</p> */}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    onChange={handleInputChange}
                    placeholder="Description"
                    value={qualityReport.description}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={handleAddReport}
                  className="my-2"
                >
                  Submit
                </Button>
              </>
            )}
            <div className="my-4">
              {reports.map((re, index) => (
                <>
                  <Timeline.Item key={re._id} as={RichList} bordered>
                    <RichList.Item>
                      <RichList.Content
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <h3>Report {index + 1}</h3>
                        <h3>Report {index + 1}</h3>
                        <h4>
                          Reported Date:{" "}
                          {new Date(re.date).toLocaleDateString()}
                        </h4>
                        <h4>Description:</h4>
                        <h4>{re.description}</h4>
                      </RichList.Content>
                    </RichList.Item>
                  </Timeline.Item>
                </>
              ))}
            </div>
          </Col>
        </Row>
      </Portlet.Body>
    </Portlet>
  );
};

export default GoodDetail;
