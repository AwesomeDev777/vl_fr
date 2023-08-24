import React from "react";
import {
  Portlet,
  Table,
  Form,
  Row,
  Col,
  Button,
  Modal
} from "@blueupcode/components";
import axios from "axios";
import { swal, toast } from "components/sweetalert2/instance";
import { useRouter } from "next/router";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Pagination from "utils/Pagination";
import { parseCookies } from "nookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faEdit } from "@fortawesome/free-regular-svg-icons";
import {
  Admin_Product_ADD,
  Admin_Product_Delete,
  Admin_Product_Edit,
  Admin_Product_GetAll,
  Admin_Product_GetOne
} from "utils/adminUrl";
import isEmpty from "utils/is-empty";

const ProductComponent = ({ warehouseName, warehouseID }) => {
  const [warehouse_ID, setWarehouse_ID] = React.useState<String>(warehouseID);
  const [warehouse_Name, setWarehouse_Name] =
    React.useState<String>(warehouseName);

  React.useEffect(() => {
    setWarehouse_ID(warehouseID);
    setWarehouse_Name(warehouseName);
  }, [warehouseID]);

  const router = useRouter();

  const cookies = parseCookies();
  const headers = { Authorization: cookies.admintoken };

  const [size, setSize] = React.useState(10);
  const [activeLinkNumber, setActiveLinkNumber] = React.useState(1);
  const [paginationLength, setPaginationLength] = React.useState(10);

  const [success, setSuccess] = React.useState(0.001);

  const [search, setSearch] = React.useState("code");
  const [value, setValue] = React.useState("");
  const [sort, setSort] = React.useState(1);

  React.useEffect(() => {
    setSearch("code");
    setValue("");
    setSort(1);
  }, [warehouse_ID]);

  // search field
  const [searchCode, setSearchCode] = React.useState("");
  React.useEffect(() => {
    if (searchCode != "") {
      setSearch("code");
      setValue(searchCode);
    }
  }, [searchCode]);
  const [searchName, setSearchName] = React.useState("");
  React.useEffect(() => {
    if (searchName != "") {
      setSearch("name");
      setValue(searchName);
    }
  }, [searchName]);
  const [searchBin, setSearchBin] = React.useState("");
  React.useEffect(() => {
    if (searchBin != "") {
      setSearch("bin_location");
      setValue(searchBin);
    }
  }, [searchBin]);
  const [searchDate, setSearchDate] = React.useState<Date>();
  React.useEffect(() => {
    if (searchDate != null) {
      setSearch("expiration_date");
      setValue(String(searchDate));
    }
  }, [searchDate]);
  const [searchInit, setSearchInit] = React.useState<Number>();
  React.useEffect(() => {
    if (searchInit != null && !Number.isNaN(searchInit)) {
      setSearch("initial_stock");
      setValue(String(searchInit));
    }
  }, [searchInit]);
  const [searchCurr, setSearchCurr] = React.useState<Number>();
  React.useEffect(() => {
    if (searchCurr != null && !Number.isNaN(searchCurr)) {
      setSearch("current_stock");
      setValue(String(searchCurr));
    }
  }, [searchCurr]);
  const [searchLast, setSearchLast] = React.useState<Number>();
  React.useEffect(() => {
    if (searchLast != null && !Number.isNaN(searchLast)) {
      setSearch("last_withdrawal");
      setValue(String(searchLast));
    }
  }, [searchLast]);

  const [products, setProducts] = React.useState([]);

  const danger = { color: "red" };

  const successAlert = () => {
    toast.fire({
      icon: "success",
      title: "Success!"
    });
  };

  React.useEffect(() => {
    if (warehouse_ID != "") {
      axios
        .get(
          Admin_Product_GetAll +
            `/${activeLinkNumber}/${size}/warehouse:${warehouse_ID}/search:${search}/value:${value}/sort:${sort}`,
          { headers }
        )
        .then((res) => {
          setProducts(res.data.all);
          if (size == 0) {
            setPaginationLength(1);
          } else {
            if (res.data.length == 0) {
              setPaginationLength(1);
            } else {
              setPaginationLength(Math.ceil(res.data.length / size));
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [size, warehouse_ID, search, value, activeLinkNumber, sort, success]);

  const chooseActiveLinkNumber = (
    activeLinkNumber: React.SetStateAction<number>
  ) => {
    setActiveLinkNumber(activeLinkNumber);
  };

  const pagination = {
    activeLinkNumber,
    paginationLength,
    chooseActiveLinkNumber
  };

  const Ac_delete = (id: any) => {
    const handleDelete = () => {
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
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(Admin_Product_Delete + `/${id.id}`, { headers })
              .then((res) => {
                setSuccess(Math.random());
                swal.fire(
                  "Deleted!",
                  "That Product has been deleted.",
                  "success"
                );
              })
              .catch((err) => console.log(err));
            swal.fire("Deleted!", "Successfully deleted.", "success");
          }
        });
    };

    return (
      <Button variant="label-secondary" className="ms-2" onClick={handleDelete}>
        <FontAwesomeIcon icon={faRemove} />
      </Button>
    );
  };

  const Modal_Add_Product = () => {
    const [show_ADD_Product, setShow_ADD_Product] = React.useState(false);

    const [newOne, setNewOne] = React.useState({});

    interface Pr_Errors {
      name: any;
      code: any;
      bin_location: any;
      initial_stock: any;
    }
    const [pr_errors, setPr_errors] = React.useState<Pr_Errors>({
      name: "",
      code: "",
      bin_location: "",
      initial_stock: ""
    });

    const [code, setCode] = React.useState("");
    const [name, setName] = React.useState("");
    const [bin_location, setBin_location] = React.useState("");
    const [expiration_date, setExpiration_date] = React.useState<Date>();
    const [initial_stock, setInitial_stock] = React.useState<Number>();
    const [comment, setComment] = React.useState("");

    React.useEffect(() => {
      setNewOne({
        code,
        name,
        bin_location,
        warehouse_ID,
        expiration_date,
        initial_stock,
        comment
      });
    }, [
      code,
      name,
      bin_location,
      warehouse_ID,
      expiration_date,
      initial_stock,
      comment
    ]);

    const handle_ADD_Product_Hide = () => setShow_ADD_Product(false);
    const handle_ADD_Product_Show = () => setShow_ADD_Product(true);

    const handle_ADD_Product = async () => {
      if (warehouse_ID != "") {
        await axios
          .post(Admin_Product_ADD, newOne, { headers })
          .then((res) => {
            successAlert();
            setPr_errors({
              name: "",
              code: "",
              bin_location: "",
              initial_stock: ""
            });
            setSuccess(Math.random());
          })
          .catch((err) => {
            let error: Pr_Errors = {
              name: "",
              code: "",
              bin_location: "",
              initial_stock: ""
            };
            !isEmpty(err.response.data.code)
              ? (error.code = err.response.data.code)
              : "";
            !isEmpty(err.response.data.name)
              ? (error.name = err.response.data.name)
              : "";
            !isEmpty(err.response.data.bin_location)
              ? (error.bin_location = err.response.data.bin_location)
              : "";
            !isEmpty(err.response.data.initial_stock)
              ? (error.initial_stock = err.response.data.initial_stock)
              : "";
            setPr_errors(error);
          });
      }
    };

    return (
      <>
        <Button
          variant="label-secondary"
          className="me-2"
          onClick={handle_ADD_Product_Show}
        >
          <FontAwesomeIcon icon={faAdd} className="me-2" />
          Add new product
        </Button>
        {/* BEGIN Modal */}
        <Modal show={show_ADD_Product} onHide={handle_ADD_Product_Hide}>
          <Modal.Header>
            <Modal.Title>Add new product</Modal.Title>
            <Button
              icon
              variant="label-danger"
              onClick={handle_ADD_Product_Hide}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="code_ID">
              <Form.Control
                type="text"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
              />
              <p style={danger}>{pr_errors.code}</p>
            </Form.Group>
            <Form.Group controlId="name_ID">
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <p style={danger}>{pr_errors.name}</p>
            </Form.Group>
            <Form.Group controlId="bin_location_ID">
              <Form.Control
                type="text"
                onChange={(e) => setBin_location(e.target.value)}
                placeholder="Bin location"
              />
              <p style={danger}>{pr_errors.bin_location}</p>
            </Form.Group>
            <Form.Group controlId="expiration_data_ID">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setExpiration_date(new Date(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="initial_stock_ID">
              <Form.Label>Initial Stock</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setInitial_stock(parseInt(e.target.value))}
              />
              <p style={danger}>{pr_errors.initial_stock}</p>
            </Form.Group>
            <Form.Group controlId="comment_ID">
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handle_ADD_Product}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </>
    );
  };

  const handleSort = () => {
    if (sort == -1) {
      setSort(1);
    } else {
      setSort(-1);
    }
  };

  const FontSort = (props: any) => {
    if (props.icon == 1) {
      return <FontAwesomeIcon icon={SolidIcon.faAngleUp} className="me-2" />;
    } else {
      return <FontAwesomeIcon icon={SolidIcon.faAngleDown} className="me-2" />;
    }
  };

  const Modal_Edit_Product = (id: any) => {
    const [show_Edit_Product, setShow_Edit_Product] = React.useState(false);

    const [newEdit, setNewEdit] = React.useState({});

    interface Pr_Errors {
      name: any;
      code: any;
      bin_location: any;
      initial_stock: any;
    }
    const [pr_errors, setPr_errors] = React.useState<Pr_Errors>({
      name: "",
      code: "",
      bin_location: "",
      initial_stock: ""
    });

    const [code, setCode] = React.useState("");
    const [name, setName] = React.useState("");
    const [bin_location, setBin_location] = React.useState("");
    const [expiration_date, setExpiration_date] = React.useState<Date>();
    const [initial_stock, setInitial_stock] = React.useState<Number>();
    const [current_stock, setCurrent_stock] = React.useState<Number>();
    const [last_withdrawal, setLast_withdrawal] = React.useState<Number>();
    const [comment, setComment] = React.useState("");

    React.useEffect(() => {
      if (show_Edit_Product == true) {
        axios
          .get(Admin_Product_GetOne + `/${id.id}`, { headers })
          .then((res) => {
            setCode(res.data.code);
            setName(res.data.name);
            setBin_location(res.data.bin_location);
            setExpiration_date(res.data.expiration_date);
            setInitial_stock(res.data.initial_stock);
            setCurrent_stock(res.data.current_stock);
            setLast_withdrawal(res.data.last_withdrawal);
            setComment(res.data.comment);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [show_Edit_Product]);

    React.useEffect(() => {
      setNewEdit({
        code,
        name,
        bin_location,
        current_stock,
        last_withdrawal,
        expiration_date,
        initial_stock,
        comment
      });
    }, [
      code,
      name,
      bin_location,
      current_stock,
      last_withdrawal,
      expiration_date,
      initial_stock,
      comment
    ]);

    const handle_Edit_Product_Hide = () => setShow_Edit_Product(false);
    const handle_Edit_Product_Show = () => setShow_Edit_Product(true);

    const handle_Edit_Product = async () => {
      await axios
        .put(Admin_Product_Edit + `/${id.id}`, newEdit, { headers })
        .then((res) => {
          successAlert();
          setPr_errors({
            name: "",
            code: "",
            bin_location: "",
            initial_stock: ""
          });
          setSuccess(Math.random());
        })
        .catch((err) => {
          let error: Pr_Errors = {
            name: "",
            code: "",
            bin_location: "",
            initial_stock: ""
          };
          !isEmpty(err.response.data.code)
            ? (error.code = err.response.data.code)
            : "";
          !isEmpty(err.response.data.name)
            ? (error.name = err.response.data.name)
            : "";
          !isEmpty(err.response.data.bin_location)
            ? (error.bin_location = err.response.data.bin_location)
            : "";
          !isEmpty(err.response.data.initial_stock)
            ? (error.initial_stock = err.response.data.initial_stock)
            : "";
          setPr_errors(error);
        });
    };

    const handleDate = (expiration_date: any) => {
      if (expiration_date != undefined) {
        return expiration_date.toString();
      }
      return "";
    };

    return (
      <>
        <Button
          variant="label-secondary"
          className="ms-2"
          onClick={handle_Edit_Product_Show}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        {/* BEGIN Modal */}
        <Modal show={show_Edit_Product} onHide={handle_Edit_Product_Hide}>
          <Modal.Header>
            <Modal.Title>Edit product</Modal.Title>
            <Button
              icon
              variant="label-danger"
              onClick={handle_Edit_Product_Hide}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="code_ID">
              <Form.Control
                type="text"
                defaultValue={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
              />
              <p style={danger}>{pr_errors.code}</p>
            </Form.Group>
            <Form.Group controlId="name_ID">
              <Form.Control
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <p style={danger}>{pr_errors.name}</p>
            </Form.Group>
            <Form.Group controlId="bin_location_ID">
              <Form.Control
                type="text"
                defaultValue={bin_location}
                onChange={(e) => setBin_location(e.target.value)}
                placeholder="Bin location"
              />
              <p style={danger}>{pr_errors.bin_location}</p>
            </Form.Group>
            <Form.Group controlId="expiration_data_ID">
              <Form.Label>
                Expiration date: {handleDate(expiration_date)}
              </Form.Label>
              <Form.Control
                type="Date"
                onChange={(e) => setExpiration_date(new Date(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="initial_stock_ID">
              <Form.Label>Initial Stock: {initial_stock}</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setInitial_stock(parseInt(e.target.value))}
              />
              <p style={danger}>{pr_errors.initial_stock}</p>
            </Form.Group>
            <Form.Group controlId="current_stock_ID">
              <Form.Label>Current Stock: {current_stock}</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setCurrent_stock(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="last_withDrawal_ID">
              <Form.Label>Last WithDrawal: {last_withdrawal}</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setLast_withdrawal(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="comment_ID">
              <Form.Control
                as="textarea"
                defaultValue={comment}
                rows={3}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handle_Edit_Product}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </>
    );
  };

  return (
    <Portlet>
      <Portlet.Header bordered>
        <Portlet.Title>{warehouse_Name}</Portlet.Title>
        <Portlet.Addon>
          <Modal_Add_Product />
          <Button variant="label-secondary" className="me-2">
            <FontAwesomeIcon icon={faClipboard} className="me-2" />
            Book new product
          </Button>
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
              onChange={(e) => setSize(parseInt(e.target.value))}
              defaultValue="10"
              size="lg"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="0">All</option>
            </Form.Select>
          </Col>
          <Col md={5}></Col>
          <Col md={3}>
            <Pagination pagination={pagination} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p></p>
          </Col>
        </Row>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th scope="col">
                <Form.Group controlId="th_code_ID">
                  <Form.Label onClick={handleSort}>
                    Code <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSearchCode(e.target.value)}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_name_ID">
                  <Form.Label onClick={handleSort}>
                    Name <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSearchName(e.target.value)}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_bin_location_ID">
                  <Form.Label onClick={handleSort}>
                    Bin location <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSearchBin(e.target.value)}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_expiration_date_ID">
                  <Form.Label onClick={handleSort}>
                    Expiration date <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="Date"
                    onChange={(e) => setSearchDate(new Date(e.target.value))}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_initial_stock_ID">
                  <Form.Label onClick={handleSort}>
                    Initial stock <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    onChange={(e) => setSearchInit(parseInt(e.target.value))}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_current_stock_ID">
                  <Form.Label onClick={handleSort}>
                    Current stock <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    onChange={(e) => setSearchCurr(parseInt(e.target.value))}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_last_withdrawal_ID">
                  <Form.Label onClick={handleSort}>
                    Last withdrawal <FontSort icon={sort} />
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    onChange={(e) => setSearchLast(parseInt(e.target.value))}
                    size="sm"
                  />
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_comment_ID">
                  <Form.Label>Comment</Form.Label>
                </Form.Group>
              </th>
              <th scope="col">
                <Form.Group controlId="th_action_ID">
                  <Form.Label>Action</Form.Label>
                </Form.Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.bin_location}</td>
                <td>{product.expiration_date}</td>
                <td>{product.initial_stock}</td>
                <td>{product.current_stock}</td>
                <td>{product.last_withdrawal}</td>
                <td>{product.comment}</td>
                <td>
                  <div>
                    <Modal_Edit_Product id={product._id} />
                    <Ac_delete id={product._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Portlet.Body>
      <Portlet.Footer>
        <Row>
          <Col md={7}></Col>
          <Col md={5}>
            <Pagination pagination={pagination} />
          </Col>
        </Row>
      </Portlet.Footer>
    </Portlet>
  );
};

export default ProductComponent;
