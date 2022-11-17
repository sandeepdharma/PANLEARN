import { React } from "react";
import { useState } from "react";
import "./HomePage.scss";
import PropTypes from "prop-types";

import {
  Typography,
  Button,
  Dropdown,
  Space,
  Input,
  Menu,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import HomePageGridContent from "../../components/HomePageContent/HomePageGridContent/HomePageGridContent";
import HomePageListContent from "../../components/HomePageContent/HomePageListContent/HomePageListContent";
import { Link } from "react-router-dom";

// import { dummydata } from "../../fixtures/dummydata";
// import PagePagination from "../../components/PagePagination/PagePagination";
const { Text } = Typography;




const HomePage = ({getSelectedItem}) => {


  // Menu Item Selection
  const [selectedMenuItem, setSelectedMenuItem] = useState("gridContent");



  // Switching between list and grid contents
  const componentsSwtich = (key) => {
    switch (key) {
      case "gridContent":
        return <HomePageGridContent dataSource={dataSource} getSelectedItem={getSelectedItem} />;
      case "listContent":
        return <HomePageListContent dataSource={dataSource} getSelectedItem={getSelectedItem}/>;
      default:
        break;
    }
  };

  // Getting localstorage data for rendering
  let data = JSON.parse(localStorage.getItem('formdata'))
  // Search specific data
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");
  const searchFuction = (e) => {
    const currValue = e.target.value;
    setValue(currValue);
    const filteredData = data.filter((entry) =>
      entry.title.includes(currValue)
    );
    setDataSource(filteredData);
  };
  // Dropdown Selective Functions
  const sortByAscending = () => {
    let updated_data = dataSource.sort((a, b) => (a.title > b.title ? 1 : -1));
    setDataSource(updated_data);
    console.log("item");
  };
  const sortByDescending = () => {
    let updated_data = dataSource.sort((a, b) => (a.title > b.title ? -1 : 1));
    setDataSource(updated_data);
    console.log("item");
  };
  const dropdownMenuFunction = (
    <Menu
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined onClick={sortByAscending} />,
        },
        {
          label: "2nd menu item",
          key: "2",
          icon: <UserOutlined onClick={sortByDescending} />,
        },
      ]}
    />
  );
  const onclickMenuHandler = (e) =>{
    setSelectedMenuItem(e.key)
  }
  return (
    <>
      <section className="homepage-header-section">
        <section className="homepage-header-title-section">
          <Text>List Of Organisations</Text>
        </section>
        <section className="homepage-header-components-section">
          <Input
            size="small"
            placeholder="Search for a oraganisation"
            value={value}
            prefix={<SearchOutlined />}
            onChange={() => searchFuction()}
          />
          <Menu
            mode="horizontal"
            selectedKeys={selectedMenuItem}
            onClick={(e) => onclickMenuHandler(e)}
          >
            <Menu.Item key="gridContent">
              <AppstoreOutlined />
            </Menu.Item>
            <Menu.Item key="listContent">
              <UnorderedListOutlined />
            </Menu.Item>
          </Menu>
          <Dropdown overlay={dropdownMenuFunction}>
            <Button size="small">
              <Space>
                Sort By
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

        
          <Link to="/addpage">
            <Button type="primary" size="small">
              Add Organisation
            </Button>
          </Link>
        </section>
      </section>
      <section>{componentsSwtich(selectedMenuItem)}</section>
    </>
  );
};
export default HomePage;


HomePage.propTypes = {
  getSelectedItem: PropTypes.func,
};