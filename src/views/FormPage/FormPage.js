import { React, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./FormPage.scss";
import {
  Form,
  Input,
  Select,
  TreeSelect,
  Button,
  // Upload,
  Modal,
  // message,
} from "antd";
import {
  formAdminData,
  formDomainData,
  treeData,
  formStateDate,
} from "../../fixtures/dummydata";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const FormPage = ({ selectedData }) => {

  // Mode of Operation EDIT / ADD
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (selectedData === null) {
      // For Add Form
      setEditMode(false);
    } else {
      //  For Edit Form
      setEditMode(true);
      // console.log("id of selected data", selectedData.id);
      // console.log("selected data", selectedData);
    }
  }, [selectedData]);

  // UUID Methods & Functions
  const unq_id = uuid();
  const id = unq_id.slice(0, 7);

  // Upload Image Functions & methods :
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };
  // const [state, setState] = useState({
  //   loading: false,
  // });
  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };
  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, (imageUrl) => {
  //       setState({
  //         imageUrl,
  //         loading: false,
  //       });
  //     });
  //   }
  // };
  // const { imageUrl } = state;
  // const uploadButton = (
  //   <div>
  //     {imageUrl ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </div>
  // );

  // Form Rules
  const rules = {
    logo: {
      required: true,
      message: "Invalid",
    },
    title: {
      required: true,
      message: "Please input Organization Name",
    },
    phoneNumber: {
      required: true,
      number: true,
      message: "Invalid Phone Number",
    },
    city: {
      required: true,
      message: "Invalid city name",
    },
    admin: {
      required: true,
      // message: "Admin required",
    },
    domain: {
      required: true,
      // message: "Domain required",
    },
    service: {
      required: true,
      // message: "Service required",
    },
    email: {
      required: true,
      type: "email",
      message: "The input is not valid E-mail!",
    },
    state: {
      required: true,
      // message: "State required",
    },
    address: {
      required: true,
      message: "Address required",
    },
    password: {
      required: true,
      message: "Please enter new password!",
    },
    confirmPassword: {
      required: true,
      message: "Please enter correct password!",
    },
  };

  // Form Admin Selection Method
  const adminOptions = [];
  for (let i = 0; i <= formAdminData.length; i++) {
    adminOptions.push({
      value: formAdminData[i],
      label: formAdminData[i],
    });
  }
  // Form Domain Selection Method
  const domainOptions = [];
  for (let i = 0; i <= formDomainData.length; i++) {
    domainOptions.push({
      value: formDomainData[i],
      label: formDomainData[i],
    });
  }
  const stateOptions = [];
  for (let i = 0; i <= formStateDate.length; i++) {
    stateOptions.push({
      value: formStateDate[i],
      // label: formStateDate[i],
    });
  }
  // Form Tree Selection Method
  const { SHOW_PARENT } = TreeSelect;
  // const [value, setValue] = useState();
  // const onChange = (newValue) => {
  //   console.log("onChange ", value);
  //   setValue(newValue);
  // };
  const tProps = {
    treeData,
    // onChange,
    // value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
  };

  // Modal Methods & Functions
  // Model---1---Reset Password
  const [resetModal, setResetModal] = useState(false);
  const [button, setButton] = useState(false);
  const [form] = Form.useForm();
  const onFinish = () => {
    // console.log("Reset form value: ", values);
    setResetModal(false);
  };
  // Model---2---Sucess Page
  const [successModal, setSuccessModal] = useState(false);

  // Form Validations and LOCAL STORAGE mthods
  const formSubmitHandler = (formdata) => {
    let formData = formdata;
    formData["id"] = id;
    let oldData = JSON.parse(localStorage.getItem("formdata"));
    let formDataObject;
    if (oldData === null) {
      formDataObject = [];
    } else {
      formDataObject = oldData;
    }
    const formObj = {
      id: formData.id,
      logo: formData.logo,
      title: formData.title,
      phoneNumber: formData.phoneNumber,
      admin: formData.admin,
      domain: formData.domain,
      city: formData.city,
      service: formData.service,
      email: formData.email,
      state: formData.state,
      address: formData.address,
    };

    //  Method to delete old form item,place at a specific index after EDIT.
    if (editMode) {
      var localstorageData = JSON.parse(localStorage.getItem("formdata"));
      const index = localstorageData.findIndex(
        (item) => item.id === selectedData.id
      );
      localstorageData[index] = formData;
      localstorageData = JSON.stringify(localstorageData);
      localStorage.setItem("formdata", localstorageData);
    } else {
      formDataObject.push(formObj);
      localStorage.setItem("formdata", JSON.stringify(formDataObject));
    }
    navigate('/homepage')
  };

  // Cancle Navigation
  const navigate = useNavigate();
  const cancelSubmission = () => {
    selectedData = null;
    navigate('/homepage')
  };

  return (
    <>
      <section className="formpage-section">
        <section className="formpage-title-section">
          {editMode ? "Edit Organization" : "Add Organization"}
        </section>
        <Form
          key={editMode ? selectedData.id : id}
          layout="vertical"
          autoComplete="on"
          onFinish={(formdata) => {
            formSubmitHandler(formdata);
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <section className="formpage-forms-section">
            <section className="formpage-image-section">
              {/* <Form.Item
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // The ANTD Upload component must make a POST request to upload the file. It either makes that POST request to the current url, which results in the 405, or to the url specified by the action prop. https://www.mocky.io/v2/5cc8019d300000980a055e76 works as this url.
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item> */}
              <Form.Item name="logo" label="Image URL" rules={[rules.logo]}>
                <Input
                  type="url"
                  placeholder="Image URL"
                  className="input"
                  defaultValue={editMode ? selectedData.logo : null}
                />
              </Form.Item>
              {editMode ? (
                <section className="reset-password-section">
                  <Button
                    className="reset-button"
                    onClick={() => setResetModal(true)}
                  >
                    Reset Password
                  </Button>
                  <Modal
                    title="Reset Password"
                    centered
                    closable={false}
                    footer={null}
                    visible={resetModal}
                    onOk={() => setResetModal(false)}
                    onCancel={() => setResetModal(false)}
                  >
                    <Form form={form} name="reset" onFinish={onFinish}>
                      <Form.Item
                        name="password"
                        rules={[rules.password]}
                        hasFeedback
                      >
                        <Input.Password
                          placeholder="New Password"
                          className="input"
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          rules.confirmPassword,
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                setButton(true);
                                setButton(!button);
                               
                              }
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder="Confirm Password" />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={!button}
                          onClick={() => setSuccessModal(true)}
                        >
                          Register
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Modal
                    title="Success Page"
                    centered
                    closable={false}
                    footer={null}
                    visible={successModal}
                    onOk={() => setSuccessModal(false)}
                    onCancel={() => setSuccessModal(false)}
                  >
                    <div className="success-container">
                      <div className="tick-icon-container">
                        <img src="./images/tick.png" alt="tick icon" />
                      </div>
                      <h1>Password Changed</h1>
                      <p>New password link has been sent to the</p>
                    </div>
                  </Modal>
                </section>
              ) : null}
            </section>
            <section className="formpage-inputs-section">
              <Form.Item
                name="title"
                label="Organization name"
                rules={[rules.title]}
              >
                <Input
                  size="medium"
                  placeholder="Organisation name"
                  allowClear={true}
                  defaultValue={editMode ? selectedData.title : null}
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[rules.phoneNumber]}
              >
                <Input
                  minLength={9}
                  maxLength={10}
                  size="medium"
                  placeholder="Phone number"
                  allowClear={true}
                  defaultValue={editMode ? selectedData.phoneNumber : null}
                />
              </Form.Item>
              <Form.Item name="city" label="City" rules={[rules.city]}>
                <Input
                  size="medium"
                  placeholder="City"
                  allowClear={true}
                  defaultValue={editMode ? selectedData.city : null}
                />
              </Form.Item>
              <Form.Item name="admin" label="Admin" rules={[rules.admin]}>
                <Select
                  placeholder="Admin"
                  size="medium"
                  showSearch
                  options={adminOptions}
                  defaultValue={editMode ? selectedData.admin : null}
                ></Select>
              </Form.Item>
              <Form.Item name="domain" label="Domain" rules={[rules.domain]}>
                <Select
                  placeholder="Domain"
                  size="medium"
                  showSearch
                  options={domainOptions}
                  defaultValue={editMode ? selectedData.domain : null}
                ></Select>
              </Form.Item>
            </section>
            <section className="formpage-inputs-section">
              <Form.Item
                name="service"
                label="Services"
                rules={[rules.service]}
              >
                <TreeSelect
                  {...tProps}
                  defaultValue={editMode ? selectedData.service : null}
                  size="medium"
                />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[rules.email]}>
                <Input
                  size="medium"
                  placeholder="Email"
                  defaultValue={editMode ? selectedData.email : null}
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item name="state" label="State" rules={[rules.state]}>
                <Select
                  placeholder="State"
                  size="medium"
                  showSearch
                  options={stateOptions}
                  defaultValue={editMode ? selectedData.state : null}
                ></Select>
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[rules.address]}
                allowClear={true}
              >
                <Input
                  size="medium"
                  placeholder="Address"
                  defaultValue={editMode ? selectedData.address : null}
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item>
                <section className="form-submit-section">
                  <Button
                    size="medium"
                    type="submit"
                    onClick={cancelSubmission}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </section>
              </Form.Item>
            </section>
          </section>
        </Form>
      </section>
    </>
  );
};
export default FormPage;
FormPage.propTypes = {
  selectedData: PropTypes.string,
};
