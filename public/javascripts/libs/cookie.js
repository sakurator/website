/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
function getCookie(name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) 
		return parts.pop().split(';').shift();
	else
		return 0
}

/**
 * Sets the value of cookie with 1 year lifetime
 * @param {String} name   The name of cookie
 * @param {String} value  The cookie value  
 */
function setCookie(name, value) {
	document.cookie = `${name}=${value}; max-age=${60 * 60 * 24 * 365}`;
}