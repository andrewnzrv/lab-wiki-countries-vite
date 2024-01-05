import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://ih-countries-api.herokuapp.com/countries/";

function CountryDetails() {
  const { countryId } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const getCountryDetails = () => {
    axios
      .get(`${API_URL}/${countryId}`)
      .then((response) => setCountryDetails(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCountryDetails();
  }, [countryId]);

  return (
    <div className="container">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>

      {!countryDetails && <p>Loading...</p>}

      {countryDetails && (
        <>
          <h1>{countryDetails.name.common}</h1>

          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>Capital</td>
                <td>{countryDetails.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {countryDetails.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {countryDetails.borders.map((border) => {
                      return (
                        <li key={border}>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CountryDetails;
