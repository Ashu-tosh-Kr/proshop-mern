import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            {/* ? after id means that id is optional */}
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
