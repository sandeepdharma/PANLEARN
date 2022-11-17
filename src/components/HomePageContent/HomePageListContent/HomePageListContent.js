import { React } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
const tabelColumns = [
  {
    title: "Name",
    key: "title",
    dataIndex: "title",
    render: (text, record) => {
      return (
        <section className="list-logo-container">
          <img alt="/" className="list-logo-style" src={record.logo} />
          <p>{record.title}</p>
        </section>
      );
    },
    width: "25%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "25%",
  },
  {
    title: "Domain",
    dataIndex: "domain",
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "state",
    render: (data) => (
      <div
        style={{
          height: "12px",
          width: "12px",
          background: data ? "red" : "green",
          borderRadius: "50%",
        }}
      ></div>
    ),
  },
];
const HomePageListContent = ({ dataSource, getSelectedItem }) => {
  const navigate = useNavigate();
  const selectedRow = (item) => {
    getSelectedItem(item);
    navigate("/editpage");
  };
  return (
    <>
      <section className="homepage-list-content-section">
        <Table
          columns={tabelColumns}
          dataSource={dataSource}
          pagination={{
            pageSize: 7,
          }}
          onRow={(item) => ({
            onClick: () => selectedRow(item),
          })}
        />
      </section>
      <section className="homepage-pagination-section"></section>
    </>
  );
};

export default HomePageListContent;

HomePageListContent.propTypes = {
  dataSource: PropTypes.object,
  getSelectedItem: PropTypes.func,
};
