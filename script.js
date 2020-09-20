"use strict";

let main = document.querySelector(".main");

let input = document.querySelector(".file-input");
let select = document.querySelector(".file-sort-select");

document.addEventListener("keyup", function(e){

	if(e.code == "Enter"){

		document.querySelector(".words-table") ? document.querySelector(".words-table").remove() : false;
		readFile(input, select.value);

	}
	
})

document.onkeydown = function() {

	input.blur();
	select.blur();

}

function readFile(input, sort_type) {

	let file = input.files[0];

	let reader = new FileReader();

	reader.readAsText(file);

	reader.onload = function() {

		let start_time = Date.now();

		let sort_uniq_words = undefined;
		let result = reader.result;

		switch(sort_type){

			case "1":
				sort_uniq_words = sortMapByAscending(getUniqWords(result));
				break;
			case "2":
				sort_uniq_words = sortMapByDescending(getUniqWords(result));
				break;
			case "3":
				sort_uniq_words = sortMapByAlphabetical(getUniqWords(result));
				break;

		}

		buildTableByMap(sort_uniq_words);

		console.log(`Executing time is ${(Date.now() - start_time) /1000} sec.`);
		  
	};

	reader.onerror = function() {
		  
		alert(new Error("Error loading file"));

	};

}

function getUniqWords(result){

	let words = result.replace(/[!?:;,.\-"]/g, "").toLowerCase().split(" ");

	let uniq_words = new Map();

	words.forEach((item) => uniq_words.has(item) ? uniq_words.set(item, uniq_words.get(item) + 1) : uniq_words.set(item, 1));
	uniq_words.delete("");

	return uniq_words;

}

function buildTableByMap(map){

	let table = document.createElement("table");
	table.classList.add("words-table");

	table.insertAdjacentHTML("afterbegin", `<thead><tr><th>The Word</td><th>Count of Word</td></tr></thead><tbody></tbody>`);

	for(let [word, count] of map){

		let tr = document.createElement("tr");

		let td = [
			document.createElement("td"),
			document.createElement("td")
		];

		td[0].textContent = word;
		td[1].textContent = count;

		td.forEach((item) => tr.append(item));
 
		table.querySelector("tbody").append(tr);

	}

	main.append(table);

}

function sortMapByAscending(map){

	let arr = Object.entries(Object.fromEntries(map));
	
	arr.sort(function(a, b){
		return a[1] - b[1];
	});

	return new Map(arr);

}

function sortMapByDescending(map){

	let arr = Object.entries(Object.fromEntries(map));
	
	arr.sort(function(a, b){
		return b[1] - a[1];
	});

	return new Map(arr);

}

function sortMapByAlphabetical(map){

	let arr = Object.entries(Object.fromEntries(map));
	
	arr.sort();

	return new Map(arr);

}