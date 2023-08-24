import {
  Portlet,
  Button,
  Timeline,
  RichList,
  Modal,
  Form
} from "@blueupcode/components";
import {
  faRemove,
  faTimes,
  faWarehouse
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import {
  Admin_Warehouse_ADD,
  Admin_Warehouse_Delete,
  Admin_Warehouse_Edit,
  Admin_Warehouse_GetAll,
  Admin_Warehouse_GetOne
} from "utils/adminUrl";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { swal, toast } from "components/sweetalert2/instance";
const isEmpty = require("utils/is-empty");

const List = (props: any) => {
  const router = useRouter();
  const cookies = parseCookies();
  const headers = { Authorization: cookies.admintoken };
  const danger = { color: "red" };

  const [wa_change, setWa_change] = React.useState(0.000001);
  const [warehouse_ID, setWarehouse_ID] = React.useState<String>("");
  const [warehouse_Name, setWarehouse_Name] = React.useState<String>("");

  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    if (lists.length > 0 && warehouse_ID === "") {
      setWarehouse_ID(lists[0]?._id);
      setWarehouse_Name(lists[0]?.warehouse_name);
    }
  }, [lists]);

  React.useEffect(() => {
    props.id({ warehouse_ID, warehouse_Name });
  }, [warehouse_ID, warehouse_Name]);

  const successAlert = () => {
    toast.fire({
      icon: "success",
      title: "Success!"
    });
  };

  const Wa_Delete = (id: any) => {
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
              .delete(Admin_Warehouse_Delete + `/${id.id}`, { headers })
              .then((res) => {
                setWa_change(Math.random());
                swal.fire(
                  "Deleted!",
                  "That Warehouse has been deleted.",
                  "success"
                );
              })
              .catch((err) => console.log(err));
          }
        });
    };

    return (
      <Button variant="label-secondary" className="ms-2" onClick={handleDelete}>
        <FontAwesomeIcon icon={faRemove} />
      </Button>
    );
  };

  React.useEffect(() => {
    axios
      .get(Admin_Warehouse_GetAll, { headers })
      .then((res) => {
        setLists(res.data.all);
      })
      .catch((err) => console.log(err));
  }, [wa_change]);

  const handleList = (e: any) => {
    setWarehouse_ID(e[0]);
    setWarehouse_Name(e[1]);
  };

  const Modal_Add_Warehouse = () => {
    const [show_ADD_Warehouse, setShow_ADD_Warehouse] = React.useState(false);

    const [newOne, setNewOne] = React.useState({});

    interface Wa_Errors {
      name: any;
      code: any;
    }
    const [wa_errors, setWa_errors] = React.useState<Wa_Errors>({
      name: "",
      code: ""
    });

    const [warehouse_code, setWarehouse_code] = React.useState("");
    const [warehouse_name, setWarehouse_name] = React.useState("");
    const [warehouse_address, setWarehouse_address] = React.useState("");

    React.useEffect(() => {
      setNewOne({ warehouse_code, warehouse_name, warehouse_address });
    }, [warehouse_code, warehouse_name, warehouse_address]);

    const handle_ADD_Warehouse_Hide = () => setShow_ADD_Warehouse(false);
    const handle_ADD_Warehouse_Show = () => setShow_ADD_Warehouse(true);

    const handle_ADD_Warehouse = async () => {
      await axios
        .post(Admin_Warehouse_ADD, newOne, { headers })
        .then((res) => {
          successAlert();
          setWa_errors({ name: "", code: "" });
          setWa_change(Math.random());
        })
        .catch((err) => {
          let error: Wa_Errors = { name: "", code: "" };
          !isEmpty(err.response.data.warehouse_code)
            ? (error.code = err.response.data.warehouse_code)
            : "";
          !isEmpty(err.response.data.warehouse_name)
            ? (error.name = err.response.data.warehouse_name)
            : "";
          setWa_errors(error);
        });
    };

    return (
      <>
        <Button
          variant="label-secondary"
          size="lg"
          onClick={handle_ADD_Warehouse_Show}
        >
          <FontAwesomeIcon icon={faWarehouse} className="me-2" />
          Warehouse +
        </Button>
        {/* BEGIN Modal */}
        <Modal show={show_ADD_Warehouse} onHide={handle_ADD_Warehouse_Hide}>
          <Modal.Header>
            <Modal.Title>Add a Warehouse</Modal.Title>
            <Button
              icon
              variant="label-danger"
              onClick={handle_ADD_Warehouse_Hide}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="warehouse_code_ID">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWarehouse_code(e.target.value)}
                placeholder="123456"
              />
              <p style={danger}>{wa_errors.code}</p>
            </Form.Group>
            <Form.Group controlId="warehouse_name_ID">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWarehouse_name(e.target.value)}
                placeholder="warehouse 1"
              />
              <p style={danger}>{wa_errors.name}</p>
            </Form.Group>
            <Form.Group controlId="warehouse_address_ID">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setWarehouse_address(e.target.value)}
                placeholder="Address. 1, Hlazunova Street Kyiv - 42, Ukraine, 01601."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handle_ADD_Warehouse}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </>
    );
  };

  const Modal_Edit_Warehouse = (id: any) => {
    const [show_Edit_Warehouse, setShow_Edit_Warehouse] = React.useState(false);

    const [newEdit, setNewEdit] = React.useState({});

    interface Wa_Errors {
      name: any;
      code: any;
    }
    const [wa_edit_errors, setWa_edit_errors] = React.useState<Wa_Errors>({
      name: "",
      code: ""
    });

    const [warehouse_code, setWarehouse_code] = React.useState("");
    const [warehouse_name, setWarehouse_name] = React.useState("");
    const [warehouse_address, setWarehouse_address] = React.useState("");

    const handle_Edit_Warehouse_Hide = () => setShow_Edit_Warehouse(false);
    const handle_Edit_Warehouse_Show = () => setShow_Edit_Warehouse(true);

    React.useEffect(() => {
      if (show_Edit_Warehouse == true) {
        axios
          .get(Admin_Warehouse_GetOne + `/${id.id}`, { headers })
          .then((res) => {
            setWarehouse_name(res.data.warehouse_name);
            setWarehouse_code(res.data.warehouse_code);
            setWarehouse_address(res.data.warehouse_address);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [show_Edit_Warehouse]);

    React.useEffect(() => {
      setNewEdit({ warehouse_code, warehouse_name, warehouse_address });
    }, [warehouse_code, warehouse_name, warehouse_address]);

    const handle_Edit_Warehouse = async () => {
      await axios
        .put(Admin_Warehouse_Edit + `/${id.id}`, newEdit, { headers })
        .then((res) => {
          successAlert();
          setWa_edit_errors({ name: "", code: "" });
          setWa_change(Math.random());
        })
        .catch((err) => {
          let error: Wa_Errors = { name: "", code: "" };
          !isEmpty(err.response.data.warehouse_code)
            ? (error.code = err.response.data.warehouse_code)
            : "";
          !isEmpty(err.response.data.warehouse_name)
            ? (error.name = err.response.data.warehouse_name)
            : "";
          setWa_edit_errors(error);
        });
    };

    return (
      <>
        <Button
          variant="label-secondary"
          className="ms-2"
          onClick={handle_Edit_Warehouse_Show}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        {/* BEGIN Modal */}
        <Modal show={show_Edit_Warehouse} onHide={handle_Edit_Warehouse_Hide}>
          <Modal.Header>
            <Modal.Title>{warehouse_name}</Modal.Title>
            <Button
              icon
              variant="label-danger"
              onClick={handle_Edit_Warehouse_Hide}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="warehouse_code_ID">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                defaultValue={warehouse_code}
                onChange={(e) => setWarehouse_code(e.target.value)}
              />
              <p style={danger}>{wa_edit_errors.code}</p>
            </Form.Group>
            <Form.Group controlId="warehouse_name_ID">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={warehouse_name}
                onChange={(e) => setWarehouse_name(e.target.value)}
              />
              <p style={danger}>{wa_edit_errors.name}</p>
            </Form.Group>
            <Form.Group controlId="warehouse_address_ID">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={warehouse_address}
                onChange={(e) => setWarehouse_address(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handle_Edit_Warehouse}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* END Modal */}
      </>
    );
  };

  return (
    <Portlet noMargin>
      <Portlet.Header>
        <Portlet.Title>
          <div className="d-grid gap-2">
            <Modal_Add_Warehouse />
          </div>
        </Portlet.Title>
      </Portlet.Header>
      <Portlet.Body>
        <Timeline>
          {lists.map((list: any) => (
            <Timeline.Item key={list._id} as={RichList} bordered>
              <RichList.Item>
                <RichList.Content
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={() => handleList([list._id, list.warehouse_name])}
                >
                  <RichList.Paragraph>{list.warehouse_name}</RichList.Paragraph>
                </RichList.Content>
                <RichList.Addon addonType="append">
                  <Modal_Edit_Warehouse id={list._id} />
                  <Wa_Delete id={list._id} />
                </RichList.Addon>
              </RichList.Item>
            </Timeline.Item>
          ))}
        </Timeline>
      </Portlet.Body>
    </Portlet>
  );
};

export default List;
