import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage";


test("user can change provider text and click sign in", async () => {

    const { getAllByRole, getByTestId } = render(<BrowserRouter><Provider store={store}><LoginPage/></Provider></BrowserRouter>);

    const providerTextField = getByTestId("provider");

    expect(providerTextField).toBeInTheDocument();

    const signInButton = getAllByRole("button", { name: "Sign In" }).find((element) => element.className.includes("MuiButton"));

    expect(signInButton).toBeInTheDocument();

    const button = getByTestId("button");

    fireEvent.click(button);
});
