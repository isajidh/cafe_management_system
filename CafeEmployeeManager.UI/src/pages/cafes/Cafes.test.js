import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Cafes from "./Cafes";

// Create a mock store
const mockStore = configureStore([]);

describe("CafePage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cafes: {
        cafesList: [
          {
            id: "1",
            name: "Cafe One",
            description: "A great place to relax",
            logo: "logo1.png",
            location: "Location One",
            employees: 5,
          },
          {
            id: "2",
            name: "Cafe Two",
            description: "A nice place to have coffee",
            logo: "logo2.png",
            location: "Location Two",
            employees: 3,
          },
        ],
      },
    });
  });

  test("renders cafes page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cafes />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/cafes/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafe One/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafe Two/i)).toBeInTheDocument();
  });
});
