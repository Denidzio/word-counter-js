"use strict";

let main = document.querySelector(".main");
let input = document.querySelector(".file-input");

input.addEventListener("change", function(){
	readFile(this);
});

function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
  	buildTableByMap(getUniqWords(reader.result));
  };

  reader.onerror = function() {
    document.body.append(reader.error);
  };

}

function getUniqWords(result){

	let words = result.replace(/[!?:;,."]/g, "").toLowerCase().trim().split(" ");

	let uniq_words = new Map();

	words.forEach(function(item){

		if(!uniq_words.has(item))
			uniq_words.set(item, 1);
		else
			uniq_words.set(item, uniq_words.get(item) + 1);

	});

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
