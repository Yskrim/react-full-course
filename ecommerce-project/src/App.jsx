// import { useState } from 'react'
import { Route, Routes } from "react-router";
import { HomePage } from "./components/pages/HomePage";
import { CheckoutPage } from "./components/pages/CheckoutPage";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="/checkout" element={<CheckoutPage />} />
		</Routes>
	);
}

export default App;
