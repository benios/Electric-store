import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
require('dotenv').config();


let autoComplete;

const loadScript = (url, callback) => {
	let script = document.createElement("script");
	script.type = "text/javascript";

	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState === "loaded" || script.readyState === "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		script.onload = () => callback();
	}

	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
	autoComplete = new window.google.maps.places.Autocomplete(
		autoCompleteRef.current
	);
	autoComplete.setFields(["address_components", "formatted_address"]);
	autoComplete.addListener("place_changed", () =>
		handlePlaceSelect(updateQuery)
	);
}

async function handlePlaceSelect(updateQuery) {
	const addressObject = autoComplete.getPlace();
	const query = addressObject.formatted_address;
	updateQuery(query);
	console.log(addressObject);
}

function SearchLocationInput(props) {
	const [query, setQuery] = useState("");
	const autoCompleteRef = useRef(null);

	useEffect(() => {
		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
			() => handleScriptLoad(setQuery, autoCompleteRef)
		);
	}, []);

	return (
		<div className="search-location-input">
			<input
        {...props}
				ref={autoCompleteRef}
				onChange={(event) => setQuery(event.target.value)}
				value={query}
			/>

		</div>
	);
}

export default SearchLocationInput;