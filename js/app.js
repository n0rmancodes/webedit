document.getElementById("loaded").style.display = "";
document.getElementById("load").style.display = "none";

function start() {
	document.getElementById("file_preview").src = window.URL.createObjectURL(document.getElementById("file").files[0]);
	document.getElementById("loaded").style.display = "none";
	document.getElementById("export").style.display = "none";
	document.getElementById("editor").style.display = "";
	document.title = "Editor | WebEdit"
}

async function effect(effect) {
	sessionStorage.setItem("lastAction", document.getElementById("file_preview").src);
	document.getElementById("undoBtn").removeAttribute("disabled");
	document.getElementById("undoBtn").classList.remove("disabled");
	if (effect == "bw") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.grey()
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "rotateLeft") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.rotateLeft()
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "rotateRight") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.rotateRight()
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "flipX") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.flipX()
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "flipY") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.flipY()
		document.getElementById("file_preview").src = vfx.toDataURL();
	}
}

function toggle(menu) {
	if (menu == "i") {
		if (document.getElementById("imageTop").style.display == "") {
			document.getElementById("imageTop").style.display = "none";
			document.getElementById("imageBtn").classList.remove("active");
		} else {
			document.getElementById("imageTop").style.display = "";
			document.getElementById("imageBtn").classList.add("active");
		}
	} else if (menu == "rotate") {
		if (document.getElementById("rotate").style.display == "") {
			document.getElementById("rotBtn").classList.remove("active");
			document.getElementById("rotate").style.display = "none";
		} else {
			document.getElementById("rotBtn").classList.add("active");
			document.getElementById("flipBtn").classList.remove("active");
			document.getElementById("adjBtn").classList.remove("active");
			document.getElementById("rotate").style.display = "";
			document.getElementById("flip").style.display = "none";
			document.getElementById("adj").style.display = "none";
		}
	} else if (menu == "flip") {
		if (document.getElementById("flip").style.display == "") {
			document.getElementById("flipBtn").classList.remove("active");
			document.getElementById("flip").style.display = "none";
		} else {
			document.getElementById("flipBtn").classList.add("active");
			document.getElementById("rotBtn").classList.remove("active");
			document.getElementById("adjBtn").classList.remove("active");
			document.getElementById("flip").style.display = "";
			document.getElementById("rotate").style.display = "none";
			document.getElementById("adj").style.display = "none";
		}
	} else if (menu == "adj") {
		if (document.getElementById("adj").style.display == "") {
			document.getElementById("adjBtn").classList.remove("active");
			document.getElementById("adj").style.display = "none";
		} else {
			document.getElementById("adjBtn").classList.add("active");
			document.getElementById("rotBtn").classList.remove("active");
			document.getElementById("flipBtn").classList.remove("active");
			document.getElementById("adj").style.display = "";
			document.getElementById("rotate").style.display = "none";
			document.getElementById("flip").style.display = "none";
		}
	} else if (menu == "adj") {
		if (document.getElementById("resize").style.display == "") {
			document.getElementById("rszBtn").classList.remove("active");
			document.getElementById("resize").style.display = "none";
		} else {
			document.getElementById("rszBtn").classList.add("active");
			document.getElementById("resize").style.display = "";
		}
	}
}

function exportImg() {
	document.getElementById("editor").style.display = "none";
	document.getElementById("export").style.display = "";
	document.title = "Export | WebEdit";
}

function exportAs(type) {
	
}

function undo() {
	if (sessionStorage.getItem("lastAction")) {
		document.getElementById("file_preview").src = sessionStorage.getItem("lastAction");
		document.getElementById("undoBtn").setAttribute("disabled", "true")
		document.getElementById("undoBtn").classList.add("disabled");
	}
}