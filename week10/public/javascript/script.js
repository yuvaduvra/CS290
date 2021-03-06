//When page is loaded, builds table
document.addEventListener("DOMContentLoaded", function (event) {
	var req = new XMLHttpRequest();
	req.open("POST", "/", true);
	req.addEventListener("load", function() {
		var response = JSON.parse(req.responseText);
		buildTable(response);
	});
	req.send(null);
});

//When entry form is sumitted, sends POST request, reloads table
document.getElementById("createEntryForm").addEventListener("submit", function (event) {
	var req = new XMLHttpRequest();
	payload = {
		"createEntry": "createEntry",
		name: document.getElementById("name").value,
		reps: document.getElementById("reps").value,
		weight: document.getElementById("weight").value,
		date: document.getElementById("date").value,
		lbs: document.getElementById("lbs").checked
	};
	req.open("POST", "/", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load", function() {
		var response = JSON.parse(req.responseText);
		buildTable(response);
	});
	req.send(JSON.stringify(payload));
	document.getElementById("createEntryForm").reset();
	event.preventDefault();
});

//Sends a request to the server to delete row by id, reloads table
function deleteRow(event) {
	var req = new XMLHttpRequest();
	payload = {
		"delete": "delete",
		"id": event.target.parentNode.firstElementChild.value
	};
	req.open("POST", "/", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load", function() {
		var response = JSON.parse(req.responseText);
		buildTable(response);
	});
	req.send(JSON.stringify(payload));
	event.preventDefault();
}

//Uses response from database to build table using the DOM
function buildTable(response) {
	var tbody = document.getElementById("tableBody");
	tbody.textContent = "";
	response.forEach(function(entry) {
		var name = document.createElement("td");
		name.textContent = entry.name;
		var reps = document.createElement("td");
		reps.textContent = entry.reps;
		var weight = document.createElement("td");
		weight.textContent = entry.weight;
		var date = document.createElement("td");
		date.textContent = entry.date.substring(0, 10);
		var lbs = document.createElement("td");
		if (entry.lbs) lbs.textContent = "Pounds";
		else lbs.textContent = "Kilograms";

		var hidden = document.createElement("input");
		hidden.setAttribute("type", "hidden");
		hidden.setAttribute("name", "id");
		hidden.setAttribute("value", entry.id);

		var edit = document.createElement("input");
		edit.setAttribute("type", "submit");
		edit.setAttribute("name", "edit");
		edit.setAttribute("value", "Edit");

		var del = document.createElement("input");
		del.setAttribute("type", "submit");
		del.setAttribute("name", "delete");
		del.setAttribute("value", "Delete");
		del.addEventListener("click", deleteRow);

		var tableForm = document.createElement("form");
		tableForm.setAttribute("method", "post");
		tableForm.appendChild(hidden);
		tableForm.appendChild(edit);
		tableForm.appendChild(del);
		var tableButtons = document.createElement("td");
		tableButtons.appendChild(tableForm);

		var row = document.createElement("tr");
		row.appendChild(name);
		row.appendChild(reps);
		row.appendChild(weight);
		row.appendChild(date);
		row.appendChild(lbs);
		row.appendChild(tableButtons);

		tbody.appendChild(row);
	});

	var status = document.getElementById("status");
	if (response.length == 0) {
		status.textContent = "There is no data to display.";
	} else {
		status.textContent = "";
	}
}