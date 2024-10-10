// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../App";
import { page, userEvent } from "@vitest/browser/context";

test("Input rendered", async () => {
	const { getByRole } = render(<App />);
	await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("Input focused", async () => {
	const { getByRole } = render(<App />);
	await getByRole("textbox").click();
	await expect.element(getByRole("textbox")).toHaveFocus();
});

test("Writing text in input", async () => {
	const { getByRole } = render(<App />);
	await getByRole("textbox").click();
	await getByRole("textbox").fill("Todo 1");
	await expect.element(getByRole("textbox")).toHaveValue("Todo 1");
});

test("Todo showed by click on send button", async () => {
	const { getByRole, getByText, getByTestId } = render(<App />);
	await getByRole("textbox").click();
	await getByRole("textbox").fill("Todo 1");
	await getByTestId("addBtn").click();
	await expect.element(getByText("Todo 1")).toBeInTheDocument();
});

test("Todo showed by press on Enter", async () => {
	const { getByRole, getByText } = render(<App />);
	await getByRole("textbox").click();
	await getByRole("textbox").fill("Todo 1");
	await userEvent.keyboard("{Enter}");
	await expect.element(getByText("Todo 1")).toBeInTheDocument();
});

test("Input cleared after add todo", async () => {
	const { getByRole } = render(<App />);
	await page.getByRole("textbox").click();
	await page.getByRole("textbox").fill("Todo 1");
	await userEvent.keyboard("{Enter}");
	await expect.element(getByRole("textbox")).toHaveValue("");
});

test("Empty values don't pass", async () => {
	render(<App />);
	await page.getByRole("textbox").click();
	await page.getByRole("textbox").fill("");
	await userEvent.keyboard("{Enter}");
	const todos = page.getByTestId("todo").elements();
	expect(todos.length).to.equal(0);
});
