import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CheckoutPage } from "./CheckoutPage";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

describe("Checkout page test suite", () => {
	let loadCart;
	let user;
	let cart;

	beforeEach(() => {
		loadCart = vi.fn();

		cart = [
			{
				id: 1,
				productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
				quantity: 4,
				deliveryOptionId: "2",
				createdAt: "2026-06-08T07:31:38.995Z",
				updatedAt: "2026-06-12T06:30:18.308Z",
				product: {
					keywords: ["socks", "sports", "apparel"],
					id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
					image: "images/products/athletic-cotton-socks-6-pairs.jpg",
					name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
					rating: {
						stars: 4.5,
						count: 87,
					},
					priceCents: 1090,
					createdAt: "2026-06-08T07:31:38.995Z",
					updatedAt: "2026-06-08T07:31:38.995Z",
				},
			},
			{
				id: 2,
				productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
				quantity: 1,
				deliveryOptionId: "2",
				createdAt: "2026-06-08T07:31:38.996Z",
				updatedAt: "2026-06-12T06:30:22.874Z",
				product: {
					keywords: ["sports", "basketballs"],
					id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
					image: "images/products/intermediate-composite-basketball.jpg",
					name: "Intermediate Size Basketball",
					rating: {
						stars: 4,
						count: 127,
					},
					priceCents: 2095,
					createdAt: "2026-06-08T07:31:38.996Z",
					updatedAt: "2026-06-08T07:31:38.996Z",
				},
			},
		];

		axios.get.mockImplementation(async (urlPath) => {
			if (urlPath === "/api/payment-summary") {
				return {
					data: {
						totalItems: 5,
						productCostCents: 6455,
						shippingCostCents: 998,
						totalCostBeforeTaxCents: 7453,
						taxCents: 745,
						totalCostCents: 8198,
					},
				};
			}

			if (urlPath.startsWith("/api/delivery-options")) {
				return {
					data: [
						{
							id: "1",
							deliveryDays: 7,
							priceCents: 0,
							createdAt: "2026-06-08T07:31:38.995Z",
							updatedAt: "2026-06-08T07:31:38.995Z",
							estimatedDeliveryTimeMs: 1781850819132,
						},
						{
							id: "2",
							deliveryDays: 3,
							priceCents: 499,
							createdAt: "2026-06-08T07:31:38.996Z",
							updatedAt: "2026-06-08T07:31:38.996Z",
							estimatedDeliveryTimeMs: 1781505219132,
						},
						{
							id: "3",
							deliveryDays: 1,
							priceCents: 999,
							createdAt: "2026-06-08T07:31:38.997Z",
							updatedAt: "2026-06-08T07:31:38.997Z",
							estimatedDeliveryTimeMs: 1781332419132,
						},
					],
				};
			}
		});

		user = userEvent.setup();
	});

	it("displays the cart items correctly", async () => {
		render(
			<MemoryRouter>
				<CheckoutPage cart={cart} loadCart={loadCart} />
			</MemoryRouter>,
		);

		const cartItemContainers = await screen.findAllByTestId(
			"cart-item-container",
		);

		expect(cartItemContainers.length).toBe(2);
		expect(
			within(cartItemContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(cartItemContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();
	});

	it("allows update quantity on items", async () => {
		render(
			<MemoryRouter>
				<CheckoutPage cart={cart} loadCart={loadCart} />
			</MemoryRouter>,
		);

		const cartItemContainers = await screen.findAllByTestId(
			"cart-item-container",
		);

		await user.click(within(cartItemContainers[0]).getByTestId("update-btn"));
		const inputElement = within(cartItemContainers[0]).getByTestId("qty-input");
		await user.clear(inputElement);
		await user.type(inputElement, "5");
		await user.click(within(cartItemContainers[0]).getByTestId("save-btn"));

		expect(axios.put).toHaveBeenCalled();
		expect(axios.put).toHaveBeenCalledWith(
			`/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
			{ quantity: 5 },
		);

		expect(
			within(cartItemContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();
		await user.click(within(cartItemContainers[0]).getByTestId("update-btn"));
		const inputElement2 = within(cartItemContainers[0]).getByTestId(
			"qty-input",
		);
		await user.clear(inputElement2);
		await user.type(inputElement2, "6");
		await user.click(within(cartItemContainers[0]).getByTestId("save-btn"));

		expect(axios.put).toHaveBeenCalled();
		expect(axios.put).toHaveBeenCalledWith(
			`/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
			{ quantity: 6 },
		);
	});

	it("renders delivery options", async () => {
		render(
			<MemoryRouter>
				<CheckoutPage cart={cart} loadCart={loadCart} />
			</MemoryRouter>,
		);

		const cartItemContainers = await screen.findAllByTestId(
			"cart-item-container",
		);

		const optionContainers1 = within(cartItemContainers[0]).getAllByTestId(
			"option-container",
		);
		expect(optionContainers1.length).toBe(3);
		const optionContainers2 = within(cartItemContainers[1]).getAllByTestId(
			"option-container",
		);
		expect(optionContainers2.length).toBe(3);
	});
});
