import { screen } from "@testing-library/react";
import { render } from "../test-utils";
import ProductScreen from "./ProductScreen";

it("product details are being fetched", async () => {
  render(<ProductScreen />);
  expect(await screen.findByRole("img")).toBeInTheDocument();
  expect(await screen.findByText("Description:")).toBeInTheDocument();
});
