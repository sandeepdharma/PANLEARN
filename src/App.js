import { React, useState } from "react";
import "./App.scss";
import "antd/dist/antd.min.css";
import { Layout } from "antd";

// COMPONENTS AND VIEWS
import FormPage from "./views/FormPage/FormPage";
import HomePage from "./views/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
// import { useRouteMatch } from "react-router-dom";
function App() {
  const [selectedData, setSelectedData] = useState(null);
  const getSelectedItem = (item) => {
    setSelectedData(item);
  };
  const { Header, Sider, Content } = Layout;
  // let { path } = useRouteMatch();
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <Routes>
              <Route
                path="/homepage"
                element={<HomePage getSelectedItem={getSelectedItem} />}
              ></Route>
              <Route
                path="/addpage"
                element={<FormPage selectedData={null} />}
              />

              <Route
                exact
                path="/editpage"
                element={<FormPage selectedData={selectedData} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default App;
