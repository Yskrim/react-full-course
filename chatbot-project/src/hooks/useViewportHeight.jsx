import { useEffect } from "react";

// Tracks the *visual* viewport (which shrinks when the mobile keyboard opens)
// and exposes it to CSS as custom properties on <html>:
//   --app-height     : usable height above the keyboard
//   --keyboard-inset : height of the keyboard (0 when closed)
export function useViewportHeight() {
	useEffect(() => {
		const viewport = window.visualViewport;
		if (!viewport) return;

		function update() {
			const root = document.documentElement;
			root.style.setProperty("--app-height", `${viewport.height}px`);

			const keyboardInset = window.innerHeight - viewport.height - viewport.offsetTop;
			root.style.setProperty(
				"--keyboard-inset",
				`${Math.max(0, keyboardInset)}px`
			);
		}

		update();
		viewport.addEventListener("resize", update);
		viewport.addEventListener("scroll", update);
		return () => {
			viewport.removeEventListener("resize", update);
			viewport.removeEventListener("scroll", update);
		};
	}, []);
}
