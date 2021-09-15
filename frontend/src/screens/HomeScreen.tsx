import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useAllProducts } from "../api/ProductsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { products, isError, isLoading, errMsg } = useAllProducts();

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{errMsg}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
