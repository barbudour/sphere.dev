/* eslint-disable no-extend-native */
/* eslint-disable func-names */
// Удаление элемента из массива.
// String value: значение, которое необходимо найти и удалить.
// return: массив без удаленного элемента; false в противном случае.
Array.prototype.remove = function (value) {
	let idx = this.indexOf(value);

	if (idx !== -1) {
		// Второй параметр - число элементов, которые необходимо удалить
		return this.splice(idx, 1);
	}

	return false;
};
