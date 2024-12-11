import React from "react";
import { render, screen } from "@testing-library/react";
//having trouble getting this one:
import "@testing-library/jest-dom";

test("renders a sample element", () => {
  render(<div data-testid="sample">Hello World</div>);

  const element = screen.getByTestId("sample");
  expect(element).toBeInTheDocument();
  expect(element.textContent).toBe("Hello World");
});
