// import { useState } from 'react'
import { Route, Routes } from "react-router";
import { HomePage } from "./components/pages/Home/HomePage";
import { CheckoutPage } from "./components/pages/Checkout/CheckoutPage";
import { OrdersPage } from "./components/pages/Orders/OrdersPage";
import { TrackingPage } from "./components/pages/Tracking/TrackingPage";
import { NotFoundPage } from "./components/pages/NotFound/NotFoundPage";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="/checkout" element={<CheckoutPage />} />
			<Route path="/orders" element={<OrdersPage />} />
			<Route path="/tracking" element={<TrackingPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
