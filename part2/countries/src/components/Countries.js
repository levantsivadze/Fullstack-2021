import React from "react";

const Countries = ({ countries, showInfo }) => {

  return (
    <div>
      {countries.length >= 10 ? (
        <div> Too many matches, specify another filter </div>
      ) : (
        <div>
          {countries.map((country) => (
            <div key = {country.alpha3Code}>
              {country.name}{" "}
              <button onClick={() => showInfo(country.name)}>Show</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
