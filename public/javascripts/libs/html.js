function classIf(element, className, condition) {
	if (condition) {
		element.classList.add(className);
	} else {
		element.classList.remove(className);
	}

	return element;
}

function classUnless(element, className, condition) {
	return classIf(element, className, !condition);
}

function select(selector) {
	return [...document.querySelectorAll(selector)];
}

function elements(className) {
	return select(`.${className}`);
}

function element(id) {
	return document.getElementById(id);
}
