import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { ICartItem } from "../types";

const CartScreen = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { search } = useLocation();
  const qty = search ? +search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const cart: { cartItems: ICartItem[] } = useSelector(
    (state: RootStateOrAny) => state.cart
  );
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    // If they're not logged in then login eldse shipping
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {/**
                       * Array(10) creates an arr of size 10 with Nan as all values
                       * arr.keys() gives an iterator which is then destructured to form an array of nos 1, 2, 3..
                       */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                {/* Using reduce to calc total items */}
                Subtotal (
                {cart.cartItems.reduce((acc, itm) => acc + itm.qty, 0)}) items
              </h2>
              $
              {Math.ceil(
                cart.cartItems.reduce(
                  (acc, itm) => acc + itm.price * itm.qty,
                  0
                )
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                disabled={cart.cartItems.length === 0}
                className="btn-block"
                onClick={() => checkoutHandler()}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
