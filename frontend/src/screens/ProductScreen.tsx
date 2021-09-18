import { useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { useOneProduct } from "../api/ProductsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const { product, isLoading, isError, errMsg } = useOneProduct(id);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(+e.target.value)}
                        >
                          {/**
                           * Array(10) creates an arr of size 10 with Nan as all values
                           * arr.keys() gives an iterator which is then destructured to form an array of nos 1, 2, 3..
                           */}
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
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
