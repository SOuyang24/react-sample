import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(console, "log").mockImplementation(() => {});
describe("App", () => {
  it("should renders the form with correct data", () => {
    render(<App />);
    // Verify that the form fields are rendered
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Message:")).toBeInTheDocument();
    expect(screen.getByLabelText("Languages:")).toBeInTheDocument();
    expect(screen.getByLabelText("male")).toBeInTheDocument();
    expect(screen.getByLabelText("female")).toBeInTheDocument();
    expect(screen.getByLabelText("License agreement:")).toBeInTheDocument();
    expect(screen.getByLabelText("submit the form")).toBeInTheDocument();
    expect(screen.getByLabelText("reset the form")).toBeInTheDocument();
  });

  test("submits the form with valid data", () => {
    render(<App />);
    const submittedformData = {
      email: "johndoe@example.com",
      name: "john doe",
      message: "Hello, World!",
      language: "English",
      gender: "male",
      license: true
    };
    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: submittedformData.email }
    });
    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: submittedformData.name }
    });
    fireEvent.change(screen.getByLabelText("Message:"), {
      target: { value: submittedformData.message }
    });
    fireEvent.change(screen.getByLabelText("Languages:"), {
      target: { value: submittedformData.language }
    });
    fireEvent.click(screen.getByLabelText("male"));
    fireEvent.click(screen.getByLabelText("License agreement:"));

    // Submit the form
    fireEvent.click(screen.getByLabelText("submit the form"));
    expect(console.log).toHaveBeenNthCalledWith(1, {});
    expect(console.log).toHaveBeenNthCalledWith(2, submittedformData);
    expect(window.alert).toHaveBeenCalledWith(
      JSON.stringify(submittedformData, null, 2)
    );
  });

  test("resets the form when the reset button is clicked", () => {
    render(<App />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByLabelText("Message:"), {
      target: { value: "Hello, World!" }
    });
    fireEvent.change(screen.getByLabelText("Languages:"), {
      target: { value: "English" }
    });
    fireEvent.click(screen.getByLabelText("male"));
    fireEvent.click(screen.getByLabelText("License agreement:"));

    // Reset the form
    fireEvent.click(screen.getByLabelText("reset the form"));

    // Verify that the form fields are reset
    expect(screen.getByLabelText("Email:")).toHaveValue("");
    expect(screen.getByLabelText("Name:")).toHaveValue("");
    expect(screen.getByLabelText("Message:")).toHaveValue("");
    expect(screen.getByLabelText("Languages:")).toHaveValue("");
    expect(screen.getByLabelText("male")).not.toBeChecked();
    expect(screen.getByLabelText("female")).not.toBeChecked();
    expect(screen.getByLabelText("License agreement:")).not.toBeChecked();
  });
});
