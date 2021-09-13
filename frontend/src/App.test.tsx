import { screen, render } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";

it("test routing", async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  render(
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );
  const cardlink = await screen.findByText(/Cannon EOS 80D DSLR Camera/i);
  expect(cardlink).toBeInTheDocument();

  userEvent.click(cardlink);
  const goBack = await screen.findByText(/go back/i);
  expect(goBack).toBeInTheDocument();

  userEvent.click(goBack);
  const cardlink2 = await screen.findByText(/Cannon EOS 80D DSLR Camera/i);
  expect(cardlink2).toBeInTheDocument();
});
