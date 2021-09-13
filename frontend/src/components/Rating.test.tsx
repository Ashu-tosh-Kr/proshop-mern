import { render } from "../test-utils";
import Rating from "./Rating";

it("stars printed properly", () => {
  const { container } = render(<Rating value={3.5} text="15 reviews" />);

  expect(container.getElementsByClassName("fas fa-star").length).toBe(3);
  expect(container.getElementsByClassName("fas fa-star-half-alt").length).toBe(
    1
  );
  expect(container.getElementsByClassName("far fa-star")).toHaveLength(1);
});
