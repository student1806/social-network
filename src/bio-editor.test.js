import React from "react";
import axios from "./axios";
import { render, fireEvent } from "@testing-library/react";
import { JestEnvironment } from "@jest/environment";
import { BioEditor } from "./bio-editor";

test("'Add your bio' should display if no bio is available", () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector("button").innerHTML).toBe("Add your bio");
});

test("'Edit your bio' should display if the user entered a bio", () => {
    const { container } = render(<BioEditor />);

    expect(container.querySelector("button").innerHTML).toBe("Edit your bio");
});
