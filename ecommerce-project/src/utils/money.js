export function formatMoney(cents) {
	return cents >= 0
		? `$${(cents / 100).toFixed(2)}`
		: `-$${(Math.abs(cents) / 100).toFixed(2)}`;
}
