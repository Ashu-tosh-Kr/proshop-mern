import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useAllProducts } from "../api/ProductsApi";
const HomeScreen = () => {
  const { products, isError, isLoading } = useAllProducts();
  if (isLoading) return <div className="">Loading</div>;
  if (isError) return <div className="">Error</div>;
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
