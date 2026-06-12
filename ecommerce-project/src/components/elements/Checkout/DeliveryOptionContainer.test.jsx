import { describe, it, expect, beforeEach, vi } from "vitest";
import { DeliveryOptionContainer } from "./DeliveryOptionContainer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../../utils/money";

vi.mock("axios");

describe("DeliveryOptionContainer integration test", () => {
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
			},
			{
				id: "2",
				deliveryDays: 3,
				priceCents: 499,
				createdAt: "2026-06-08T07:31:38.996Z",
				updatedAt: "2026-06-08T07:31:38.996Z",
			},
			{
				id: "3",
				deliveryDays: 1,
				priceCents: 999,
				createdAt: "2026-06-08T07:31:38.997Z",
				updatedAt: "2026-06-08T07:31:38.997Z",
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

	it("renders the option correctly", () => {
		render(
			<DeliveryOptionContainer
				option={options[1]}
				item={cartItem}
				loadCart={loadCart}
			/>,
		);

		expect(screen.getByTestId("test-radio-input")).toHaveProperty(
			"checked",
			true,
		);
		expect(screen.getByTestId("option-container")).toHaveProperty(
			"id",
			"1-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-2",
		);
		expect(screen.getByTestId("option-eta")).toHaveTextContent(
			dayjs(options[1].estimatedDeliveryTimeMs).format("dddd, MMMM, D"),
		);
		expect(screen.getByTestId("option-price")).toHaveTextContent(
			formatMoney(options[1].priceCents),
		);
	});

	it("supports option update on click on other option", async () => {
		render(
			<DeliveryOptionContainer
				option={options[0]}
				item={cartItem}
				loadCart={loadCart}
			/>,
		);

		await user.click(screen.getByTestId("test-radio-input"));

		expect(axios.put).toHaveBeenCalledWith(
			`/api/cart-items/${cartItem.product.id}`,
			{ deliveryOptionId: options[0].id },
		);
		expect(axios.put).toHaveBeenCalledTimes(1);
	});

	it("supports click on selected option", async () => {
		render(
			<DeliveryOptionContainer
				option={options[1]}
				item={cartItem}
				loadCart={loadCart}
			/>,
		);

		await user.click(screen.getByTestId("test-radio-input"));
        expect(axios.put).not.toHaveBeenCalled();
        expect(loadCart).not.toHaveBeenCalled();
	});
});
