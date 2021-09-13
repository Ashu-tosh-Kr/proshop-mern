import { screen } from "@testing-library/react";
import { render } from "../test-utils";
import HomeScreen from "./HomeScreen";

it("test all products being fetched", async () => {
  render(<HomeScreen />);
  const products = await screen.findAllByRole("img");
  expect(products).toHaveLength(6);
});
