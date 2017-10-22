let input = document.querySelector('#field');
let actions = [];
let iteration = [];
actions.push(input.value);

function toUpper() {
	input.value = input.value.toUpperCase();
	save();
}

function toLower() {
	input.value = input.value.toLowerCase();
	save();
}

function wordsToUpper() {
	// let splitStr = input.value.split(' ');
	// let outerStr = '';

	// for (let char of splitStr) {
	// 	outerStr += char[0].toUpperCase() + char.slice(1) + ' ';
	// }

	// input.value = outerStr.slice(0, outerStr.length - 1);
	// save();

	let splitLine = input.value.split('\n');
	let outerStr = '';
	let splitStr = [];

	for (let line of splitLine) {
		if (line.length === 0) continue; 
		splitStr = line.split(' ');
		for (let char of splitStr) {
			if (char.length === 0) continue; 
			outerStr += char[0].toUpperCase() + char.slice(1) + ' ';
		}
		outerStr = outerStr.slice(0, outerStr.length - 1);
		outerStr += '\n';
	}

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function firstLetterToUpper() {
	// input.value = input.value[0].toUpperCase() + input.value.slice(1);
	// save();

	let splitLine = input.value.split('\n');
	let outerStr = '';

	for (let line of splitLine) {
		if (line.length === 0) continue;
		if (line.match(/^\s+.{1}/)) {
			outerStr += line.match(/^\s+.{1}/)[0].toUpperCase() + line.slice(line.match(/^\s+.{1}/)[0].length) + '\n';
		} else {
			outerStr += line[0].toUpperCase() + line.slice(1) + '\n';
		}
		
	}

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();

}

function addPlusToWords() {
	let splitStr = input.value.split(' ');
	let outerStr = '';

	for (let char of splitStr) {
		outerStr += (char[0] === '+' ? char[0] : '+' + char[0]) + char.slice(1) + ' ';
	}

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function deletePlusToWords() {
	let splitStr = input.value.split(' ');
	let outerStr = '';

	for (let char of splitStr) {
		outerStr += (char[0] === '+' ? char[0] = '' : char[0]) + char.slice(1) + ' ';
	}

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function addQuotes() {
	let lastInput = input.value[input.value.length - 1];
	input.value = (input.value[0] ===  '\"' ? '' : '\"') + input.value + (lastInput ===  '\"' ? '' : '\"');
	save();
}

function addBrackets() {
	let lastInput = input.value[input.value.length - 1];
	input.value = (input.value[0] ===  '[' ? '' : '[') + input.value + (lastInput ===  ']' ? '' : ']');
	save();
}

function addDash() {
	let lastInput = input.value[input.value.length - 1];
	input.value = (input.value[0] === '-' ? '' : '-') + input.value;
	save();
}

function addDashAndBrackets() {
	let lastInput = input.value[input.value.length - 1];
	input.value = (input.value[0] ===  '-' && input.value[1] === '[' ? '' : '-[') + input.value + (lastInput ===  ']' ? '' : ']');
	save();
}

function addDashAndQuotes() {
	let lastInput = input.value[input.value.length - 1];
	input.value = (input.value[0] ===  '-' && input.value[1] === '\"' ? '' : '-\"') + input.value + (lastInput ===  '\"' ? '' : '\"');
	save();
}

function deleteExcessSpaces() {
	let lastInput = input.value[input.value.length - 1];
	input.value = input.value.replace(/\s+/g, ' ');
	(lastInput === ' ' ? lastInput = '' : lastInput = lastInput);
	save();
}

function deleteTab() {
	input.value = input.value.replace(/\t/g, '');
	save();
}

function deleteRight() {
	input.value = input.value.replace(/\s-.+/g, '');
	save();
}

function replaceSpaces() {
	input.value = input.value.replace(/\s/g, '_');
	save();
}

function deleteSpecialSymbols() {
	input.value = input.value.replace(/[\(\)\`\~\!\@\#\$\%\^\&\*\_\=\+\[\]\\\{\}\|\;\'\:\"\,\/\<\>\?]/g, '');
	save();
}

function replaceSpecialSymbols() {
	input.value = input.value.replace(/[\(\)\`\~\!\@\#\$\%\^\&\*\_\=\+\[\]\\\{\}\|\;\'\:\"\,\/\<\>\?]/g, ' ');
	save();
}

function searchAdnReplace(serchId, replaceId) {
	let search = document.querySelector(serchId);
	let replace = document.querySelector(replaceId);
	input.value = input.value.replace(search.value, replace.value);
	save();
}

function sortStringStraight() {
	let rows = 	input.value.split(/\n/);
	let outerStr = '';

	rows.sort((a, b) => {
		return (a < b) ? -1 : (a > b) ? 1 : 0;
	});
	
	for (let row of rows) {
		if (row.length === 0) continue;
			outerStr += row + '\n';
	} 

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function sortStringReverse() {
	let rows = 	input.value.split(/\n/);
	let outerStr = '';

	rows.sort((a, b) => {
		return (a > b) ? -1 : (a < b) ? 1 : 0;
	});

	for (let row of rows) {
		if (row.length === 0) continue;
			outerStr += row + '\n';
	} 

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function deleteDuplicates() {
	let rows = 	input.value.split(/\n/);
	let outerStr = '';
  	let elements = {};
  	let arrKeys = [];

	for (let el of rows) {
		if (el.length === 0) continue;
		elements[el] = true;
	}

  	arrKeys = Object.keys(elements);

	for (let key of arrKeys) {
			outerStr += key + '\n';
	} 

	input.value = outerStr.slice(0, outerStr.length - 1);
	save();
}

function clearField() {
	input.value = '';
	save();
}

function save() {
	if (actions[actions.length - 1] !== input.value) {
		actions.push(input.value);
	}
}

function undo() {
	if (actions.length > 1) {
		iteration.push(actions.pop());
		input.value = actions[actions.length - 1];
	} else {
		input.value = actions[0];
	}
}

function next() {
	if (iteration.length >= 1) {
		input.value = iteration.pop();
		actions.push(input.value);
	}
}

function copyToClipboard() {
	input.focus();
	input.select();
	document.execCommand('copy') ? alert('Copied!') : alert('Error copy!');
	input.setSelectionRange(input.value.length, input.value.length);
}