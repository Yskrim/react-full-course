import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ProductsGrid } from "./ProductsGrid";

vi.mock("axios");

describe("ProductsGrid test suite", () => {
	let products;
	let loadCart;

	beforeEach(() => {
		products = [
			{
				id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
				image: "images/products/athletic-cotton-socks-6-pairs.jpg",
				name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
				rating: {
					stars: 4.5,
					count: 87,
				},
				priceCents: 1090,
				keywords: ["socks", "sports", "apparel"],
			},
			{
				id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
				image: "images/products/intermediate-composite-basketball.jpg",
				name: "Intermediate Size Basketball",
				rating: {
					stars: 4,
					count: 127,
				},
				priceCents: 2095,
				keywords: ["sports", "basketballs"],
			},
		];

		loadCart = vi.fn();
	});

	it("renders products correctly with no search parameters", async () => {
		const search = "";

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		const productContainers = await screen.findAllByTestId("product-container");

		expect(productContainers.length).toBe(2);

		expect(
			within(productContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(productContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();

		expect(
			within(productContainers[0]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-45.png");
		expect(
			within(productContainers[1]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-40.png");

		expect(loadCart).toHaveBeenCalledTimes(0);
	});

	it("renders products correctly with search params by name", async () => {
		const search = "black";

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		const productContainers = await screen.findAllByTestId("product-container");

		expect(productContainers.length).toBe(1);

		expect(
			within(productContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(productContainers[0]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-45.png");

		expect(loadCart).toHaveBeenCalledTimes(0);
	});

	it("renders products correctly with search params by full keyword", async () => {
		const search = "sports";

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		const productContainers = await screen.findAllByTestId("product-container");

		expect(productContainers.length).toBe(2);

		expect(
			within(productContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(productContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();

		expect(
			within(productContainers[0]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-45.png");
		expect(
			within(productContainers[1]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-40.png");

		expect(loadCart).toHaveBeenCalledTimes(0);
	});

	it("renders products correctly with search params by partial keyword", async () => {
		const search = "sport";

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		const productContainers = await screen.findAllByTestId("product-container");

		expect(productContainers.length).toBe(2);

		expect(
			within(productContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(productContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();

		expect(
			within(productContainers[0]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-45.png");
		expect(
			within(productContainers[1]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-40.png");

		expect(loadCart).toHaveBeenCalledTimes(0);
	});

	it("treats wrong type as no search params", async () => {
		const search = 1;

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		const productContainers = await screen.findAllByTestId("product-container");

		expect(productContainers.length).toBe(2);

		expect(
			within(productContainers[0]).getByText(
				"Black and Gray Athletic Cotton Socks - 6 Pairs",
			),
		).toBeInTheDocument();
		expect(
			within(productContainers[1]).getByText("Intermediate Size Basketball"),
		).toBeInTheDocument();

		expect(
			within(productContainers[0]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-45.png");
		expect(
			within(productContainers[1]).getByTestId("product-rating-stars-image"),
		).toHaveAttribute("src", "images/ratings/rating-40.png");

		expect(loadCart).toHaveBeenCalledTimes(0);
	});

	it("Does not render anything if products is empty", () => {
		const search = "";
		const array = [];

		render(
			<ProductsGrid products={array} loadCart={loadCart} search={search} />,
		);

		expect(screen.queryByTestId("product-container")).not.toBeInTheDocument();
		expect(screen.getByText("No products available")).toBeInTheDocument();
	});

	it("Does not render anything if search doesn't find products", () => {
		const search = "beauty";

		render(
			<ProductsGrid products={products} loadCart={loadCart} search={search} />,
		);

		expect(screen.queryByTestId("product-container")).not.toBeInTheDocument();
	});
});
