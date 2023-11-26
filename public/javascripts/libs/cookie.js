function setCookie(name, value, cookieLifetimeDays = 365) {
	const date = new Date(
		Date.now() + cookieLifetimeDays * 24 * 60 * 60 * 1000
	);
	const expires = "; expires=" + date.toUTCString();

	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name, defaultIfNoCookie = null) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}

	return defaultIfNoCookie;
}

function eraseCookie(name) {
	document.cookie =
		name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
