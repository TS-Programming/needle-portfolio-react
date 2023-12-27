import "./register_types.ts"

export const needle_exported_files = new Array();
globalThis["needle:codegen_files"] = needle_exported_files;
needle_exported_files.push("assets/floatingChest.glb?v=1703635752210");

document.addEventListener("DOMContentLoaded", () =>
{
	const needleEngine = document.querySelector("needle-engine");
	if(needleEngine && needleEngine.getAttribute("src") === null)
	{
		needleEngine.setAttribute("hash", "1703635752210");
		needleEngine.setAttribute("src", JSON.stringify(needle_exported_files));
	}
});

console.log("Made\ with\ ♥\ by\ 🌵\ Needle\ -\ https://needle\.tools\ —\ Version\ 3\.23\.0");
