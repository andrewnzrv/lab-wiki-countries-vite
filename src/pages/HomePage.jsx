import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://ih-countries-api.herokuapp.com/countries";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const getAllCountries = () => {
    axios
      .get(`${API_URL}`)
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="container" style={{ maxHeight: "90vh", overflow: scroll }}>
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>

      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link
              to={`/${country.alpha3Code}`}
              className="list-group-item list-group-item-action"
              key={country._id}
            >
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              />{" "}
              <br />
              {country.name.common}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
