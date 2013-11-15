// Saves options to localStorage.
function save_options () {
	"use strict";

	var cityval,
		langSelect = document.getElementById( "language" ),
		langval = langSelect.children[langSelect.selectedIndex].value,
		typeSelect = document.getElementById( "type" ),
		typeval = typeSelect.children[typeSelect.selectedIndex].value;

	if ( document.getElementById( 'radiocity' ).checked == true ) {
		var citySelect = document.getElementById( "cityselect" );

		cityval = citySelect.children[citySelect.selectedIndex].value;
		localStorage["row0u"] = cityval.match( /\d{2,3}/ );
		localStorage["col0u"] = cityval.match( /,(\d{2,3})/ )[1];
		localStorage["row2n"] = cityval.match( /;(\d{2,3})/ )[1];
		localStorage["col2n"] = cityval.match( /;\d{2,3},(\d{2,3})/ )[1];
		localStorage["city"] = citySelect.children[citySelect.selectedIndex].text;
		localStorage["chosenBy"] = "city";
	} else {
		localStorage["row0u"] = document.getElementById( "rowinput" ).value;
		localStorage["col0u"] = document.getElementById( "colinput" ).value;
		localStorage["chosenBy"] = "coordinates";
	}

	localStorage["lang"] = langval;
	localStorage["type"] = typeval;

	if ( document.getElementById( 'legend' ).checked == true ) {
		localStorage["legend"] = '1';
	} else {
		localStorage["legend"] = '';
	}

	// Update status to let user know options were saved.
	var status = document.getElementById( "status" );
	status.innerHTML = "Saved";
	setTimeout( function () {
		status.innerHTML = "";
	}, 750 );
}

// Restores select box state to saved value from localStorage.
function restore_options () {
	var rowvalue = localStorage["row"],
		colvalue = localStorage["col"],
		langval = localStorage["lang"],
		typeval = localStorage["type"],
		chosenBy = localStorage["chosenBy"],
		city = localStorage["city"],
		legend = localStorage["legend"],
		i = 0,
		child;

	if ( !rowvalue || !colvalue ) {
		document.getElementById( "rowinput" ).value = 400;
		document.getElementById( "colinput" ).value = 180;
	} else {
		document.getElementById( "rowinput" ).value = rowvalue;
		document.getElementById( "colinput" ).value = colvalue;
	}

	var select = document.getElementById( "language" );

	for ( ; i < select.children.length; i++ ) {
		child = select.children[i];

		if ( child.value == langval ) {
			child.selected = "true";
			break;
		}
	}

	select = document.getElementById( "type" );

	for ( i = 0; i < select.children.length; i++ ) {
		child = select.children[i];

		if ( child.value == typeval ) {
			child.selected = "true";
			break;
		}
	}

	if ( chosenBy == "city" || chosenBy === undefined ) {
		document.getElementById( 'radiocity' ).checked = true;
		document.getElementById( 'city' ).style.visibility = "visible";
		document.getElementById( 'coordinates' ).style.visibility = "hidden";
		document.getElementById( 'posdesc' ).innerHTML = 'Choose weather position by city name';

		select = document.getElementById( "cityselect" );
		for ( i = 0; i < select.children.length; i++ ) {
			child = select.children[i];

			if ( child.text == city ) {
				child.selected = "true";
				break;
			}
		}

	} else {
		document.getElementById( 'radiocoordinates' ).checked = true;
		document.getElementById( 'city' ).style.visibility = "hidden";
		document.getElementById( 'coordinates' ).style.visibility = "visible";
		document.getElementById( 'posdesc' ).innerHTML = 'Choose weather position by coordinates';
	}

	document.getElementById( 'legend' ).checked = (legend == "1");
}

function pos ( ) {
	var val = this.value;

	if ( val == "city" ) {
		document.getElementById( 'city' ).style.visibility = "visible";
		document.getElementById( 'coordinates' ).style.visibility = "hidden";
		document.getElementById( 'posdesc' ).innerHTML = 'Choose weather position by city name';
	} else {
		document.getElementById( 'city' ).style.visibility = "hidden";
		document.getElementById( 'coordinates' ).style.visibility = "visible";
		document.getElementById( 'posdesc' ).innerHTML = 'Choose weather position by coordinates';
	}
}

window.addEventListener( 'load', restore_options );
document.getElementById('saveButton').addEventListener('click', save_options);
document.getElementById('radiocity').addEventListener('click', pos);
document.getElementById('radiocoordinates').addEventListener('click', pos);
