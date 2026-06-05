import axios from "axios";
import "./ResetButton.css"
import "../../index.css"
import binIcon from "../../assets/images/icons/bin.png"

export function ResetButton({ loadCart }) {
	const resetApp = async () => {
		await axios.post("/api/reset");
		await loadCart();
	};

	return (
        <button className="reset-button button-primary" onClick={resetApp}>
            <img src={binIcon} />
            <span>Reset</span>
        </button>);
}
