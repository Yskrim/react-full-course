import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PaymentSummaryContainer } from "./PaymentSummaryContainer";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("PaymentSummaryContainer integration test", () => {
	let loadCart;
	let paymentSummary;
	let user;

	beforeEach(() => {
		loadCart = vi.fn();

		paymentSummary = {
			totalItems: 3,
			productCostCents: 4275,
			shippingCostCents: 499,
			totalCostBeforeTaxCents: 4774,
			taxCents: 477,
			totalCostCents: 5251,
		};

		user = userEvent.setup();
	});

	it("displays the summary correctly", () => {
		render(
			<MemoryRouter>
				<PaymentSummaryContainer paymentSummary={paymentSummary} loadCart={loadCart} />
			</MemoryRouter>,
		);

		expect(screen.getByTestId("product-cost")).toHaveTextContent("$42.75");
		expect(screen.getByTestId("shipping-cost")).toHaveTextContent("$4.99");
		expect(screen.getByTestId("total-before-tax")).toHaveTextContent("$47.74");
		expect(screen.getByTestId("tax-cost")).toHaveTextContent("$4.77");
		expect(screen.getByTestId("total-cost")).toHaveTextContent("$52.51");

	});

	it("place order button navigates to orders page", async () => {
		render(
			<MemoryRouter>
				<PaymentSummaryContainer paymentSummary={paymentSummary} loadCart={loadCart} />
			</MemoryRouter>
		);

		const placeOrderButton = await screen.findByTestId("place-order-button");
		await user.click(placeOrderButton);

		expect(axios.post).toHaveBeenCalledWith("/api/orders");
        expect(loadCart).toHaveBeenCalled();
        expect(loadCart).toHaveBeenCalledTimes(1);
	});
});
