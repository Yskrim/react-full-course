import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMoney } from "../../../utils/money";

vi.mock("axios");

describe("DeliveryOptions integraiton test", () => {
	let options;
	let cartItem;
	let loadCart;
	let user;

	beforeEach(() => {
		vi.clearAllMocks();

		options = [
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
		];

		cartItem = {
			id: 1,
			productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			quantity: 2,
			deliveryOptionId: "2",
			createdAt: "2026-06-08T07:31:38.995Z",
			updatedAt: "2026-06-08T07:31:38.995Z",
			product: {
				id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			},
		};

		loadCart = vi.fn();
		user = userEvent.setup();
	});

	it("renders the options correctly", async () => {
		render(
			<DeliveryOptions
				deliveryOptions={options}
				item={cartItem}
				loadCart={loadCart}
			/>,
		);

		const optionContainers = await screen.findAllByTestId("option-container");

        // current option selected
        expect(
			within(optionContainers[1]).getByTestId("option-price"),
		).toHaveTextContent(`${formatMoney(options[1].priceCents)} - Shipping`);
		expect(
			within(optionContainers[1]).getByTestId("test-radio-input"),
		).toHaveProperty("checked", true);
        await user.click(within(optionContainers[1]).getByTestId("test-radio-input"));
        expect(axios.put).not.toHaveBeenCalled();


        // free option
		expect(
			within(optionContainers[0]).getByTestId("option-price"),
		).toHaveTextContent("FREE Shipping");
		expect(
			within(optionContainers[0]).getByTestId("test-radio-input"),
		).toHaveProperty("checked", false);
		
        await user.click(within(optionContainers[0]).getByTestId("test-radio-input"));
        
        expect(axios.put).toHaveBeenCalledWith(
			`/api/cart-items/${cartItem.product.id}`,
			{ deliveryOptionId: options[0].id },
		);
        expect(axios.put).toHaveBeenCalledTimes(1);
		

        // other option
		expect(
			within(optionContainers[2]).getByTestId("option-price"),
		).toHaveTextContent(`${formatMoney(options[2].priceCents)} - Shipping`);
		expect(
			within(optionContainers[2]).getByTestId("test-radio-input"),
		).toHaveProperty("checked", false);

        await user.click(within(optionContainers[2]).getByTestId("test-radio-input"));
        
        expect(axios.put).toHaveBeenCalledWith(
			`/api/cart-items/${cartItem.product.id}`,
			{ deliveryOptionId: options[2].id },
		);
        expect(axios.put).toHaveBeenCalledTimes(2);

	});
});
