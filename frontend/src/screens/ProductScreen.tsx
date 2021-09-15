import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useOneProduct } from "../api/ProductsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isError, errMsg } = useOneProduct(id);

  return (
    <div>
      <Link to={`/`} className="btn btn-dark my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{errMsg}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block "
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
