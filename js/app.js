document.getElementById("loaded").style.display = "";
document.getElementById("load").style.display = "none";
if (sessionStorage.getItem("lastAction") && !sessionStorage.getItem("lastAction").includes("blob:")) {
	document.getElementById("restore").style.display = "";
} else {
	document.getElementById("restore").style.display = "none";
}

function start(r) {
	if (!r) {
		document.getElementById("file_preview").src = window.URL.createObjectURL(document.getElementById("file").files[0]);
		document.getElementById("undoBtn").setAttribute("disabled", "true");
		document.getElementById("undoBtn").classList.add("disabled");
		document.getElementById("loaded").style.display = "none";
		document.getElementById("export").style.display = "none";
		document.getElementById("editor").style.display = "";
		document.title = "Editor | WebEdit";
		sessionStorage.setItem("startedFrom", "import");
		sessionStorage.setItem("original", window.URL.createObjectURL(document.getElementById("file").files[0]));
	} else if (r == "restored") {
		document.getElementById("file_preview").src = sessionStorage.getItem("lastAction");
		document.getElementById("undoBtn").setAttribute("disabled", "true");
		document.getElementById("undoBtn").classList.add("disabled");
		document.getElementById("loaded").style.display = "none";
		document.getElementById("export").style.display = "none";
		document.getElementById("editor").style.display = "";
		document.title = "Editor | WebEdit";
		sessionStorage.setItem("startedFrom", "restoration");
		sessionStorage.setItem("original", sessionStorage.getItem("lastAction"));
	} else if (r == "reset") {
		if (!sessionStorage.getItem("original")) {
			if (sessionStorage.getItem("lastAction")) {
				start("restored");
			} else {
				randomImg();
			}
		} else {
			document.getElementById("file_preview").src = sessionStorage.getItem("lastAction");
			document.getElementById("undoBtn").setAttribute("disabled", "true");
			document.getElementById("undoBtn").classList.add("disabled");
			document.getElementById("loaded").style.display = "none";
			document.getElementById("export").style.display = "none";
			document.getElementById("editor").style.display = "";
			document.title = "Editor | WebEdit";
			sessionStorage.setItem("startedFrom", "reset");
		}
	}
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
	} else if (effect == "blur") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.gaussianFilter(1)
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "blur5x") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.gaussianFilter(4)
		document.getElementById("file_preview").src = vfx.toDataURL();
	} else if (effect == "scharr") {
		let img = await IJS.Image.load(document.getElementById("file_preview").src);
		let vfx = img.scharrFilter()
		document.getElementById("file_preview").src = vfx.toDataURL();
	}
}

async function info(detail) {
	if (detail == "w") {
		var img = await IJS.Image.load(document.getElementById("file_preview").src);
		return img.width;
	} else if (detail == "h") {
		var img = await IJS.Image.load(document.getElementById("file_preview").src);
		return img.height;
	}
}

async function toggle(menu) {
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
	} else if (menu == "rsz") {
		if (document.getElementById("resize").style.display == "") {
			document.getElementById("rszBtn").classList.remove("active");
			document.getElementById("resize").style.display = "none";
		} else {
			document.getElementById("rszBtn").classList.add("active");
			document.getElementById("resize").style.display = "";
			document.getElementById("w").value = await info("w");
			document.getElementById("h").value = await info("h");
		}
	} else if (menu == "really") {
		if (document.getElementById("really").style.display == "") {
			document.getElementById("really").style.display = "none";
		} else {
			document.getElementById("really").style.display = "";
		}
	}
}

function exportImg() {
	document.getElementById("editor").style.display = "none";
	document.getElementById("export").style.display = "";
	document.title = "Export | WebEdit";
	document.getElementById("dlBtn").href = document.getElementById("file_preview").src;
	document.getElementById("really").style.display = "none";
}

function undo() {
	if (sessionStorage.getItem("lastAction")) {
		document.getElementById("file_preview").src = sessionStorage.getItem("lastAction");
		document.getElementById("undoBtn").setAttribute("disabled", "true")
		document.getElementById("undoBtn").classList.add("disabled");
	}
}

function randomImg() {
	document.getElementById("url").value = "https://picsum.photos/500/400"
	dwnload();
}

function dwnload() {
	document.getElementById("originalImg").src = "https://corsanywhere.herokuapp.com/" + document.getElementById("url").value;
	document.getElementById("dlImg").style.display = "";
	document.getElementById("loaded").style.display = "none";
	document.getElementById("export").style.display = "none";
	document.getElementById("editor").style.display = "none";
	document.getElementById("dinfo").innerHTML = "downloading image to computer...";
	document.getElementById("originalImg").onload = function() {
		document.getElementById("dinfo").innerHTML = "converting..."
		document.getElementById("canv").width = document.getElementById("originalImg").width;
		document.getElementById("canv").height = document.getElementById("originalImg").height;
		var w = document.getElementById("canv").getContext("2d");
		w.drawImage(document.getElementById("originalImg"),0,0);
		document.getElementById("file_preview").src = document.getElementById("canv").toDataURL("image/png");;
		document.getElementById("editor").style.display = "";
		document.getElementById("dlImg").style.display = "none";
		document.title = "Editor | WebEdit";
		sessionStorage.setItem("startedFrom", "url");
	}
}