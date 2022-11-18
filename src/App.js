import { React, useState } from "react";
import "./App.scss";
import "antd/dist/antd.min.css";
import { Layout } from "antd";
import { Routes, Route,Navigate } from "react-router-dom";
// COMPONENTS AND VIEWS
import FormPage from "./views/FormPage/FormPage";
import HomePage from "./views/HomePage/HomePage";
// import ErrorPage from "./error-handler";

function App() {
  const [selectedData, setSelectedData] = useState(null);
  const getSelectedItem = (item) => {
    setSelectedData(item);
  };
  const { Header, Sider, Content } = Layout;

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <Routes>
              <Route path="homepage" element={<HomePage getSelectedItem={getSelectedItem} />}/>
              <Route path="homepage/addpage" element={<FormPage selectedData={null} />}/>
              <Route path="homepage/editpage" element={<FormPage selectedData={selectedData} />}/>
              <Route path="*" element={<Navigate to="/homepage"/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default App;
