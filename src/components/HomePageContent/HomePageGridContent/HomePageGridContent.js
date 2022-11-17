import { React } from "react";
import PropTypes from "prop-types";
import { List, Card, Avatar } from "antd";
import { Link } from "react-router-dom";


const HomePageGridContent = ({ dataSource, getSelectedItem }) => {
  const { Meta } = Card;
  

  return (
    <>
      <section className="homepage-grid-content-section">
        <List
          itemLayout="horizontal"
          grid={{ column: 3 }}
          dataSource={dataSource}
          pagination={{
            pageSize: 9,
          }}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                getSelectedItem(item);
              }}
            >
              {/* ?id=${item.id} */}
              {/* Edit Page Link */}
              <Link to="/editpage">
                <Card>
                  {item.status === true ? (
                    <section className="success-status"></section>
                  ) : (
                    <section className="failure-status"></section>
                  )}
                  <Meta
                    avatar={<Avatar src={item.logo} size={100} />}
                    title={item.title}
                    description={[
                      <section key={item.id}>
                        <p>{item.email}</p>
                        <p>{item.domain}</p>
                      </section>,
                    ]}
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </section>
      <section className="homepage-pagination-section"></section>
    </>
  );
};

export default HomePageGridContent;

HomePageGridContent.propTypes = {
  dataSource: PropTypes.object,
  getSelectedItem: PropTypes.func,
};
