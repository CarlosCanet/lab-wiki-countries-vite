import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function CountryDetailsPage() {
  const [country, setCountry] = useState(null);
  const { countryId } = useParams();
  useEffect(() => {
    getData();
  }, [countryId]);

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries/${countryId}`);
      setCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!country) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container">
      <p className="fw-bold fs-3">Country Details</p>
      
      <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={`${country.name.common} flag`} width={"72px"}/>
      <h1>{country.name.common}</h1>

      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td className="w-25">Capital</td>
            <td>{country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul className="list-group list-group-flush">
                {country.borders.map(border => <li className="list-group-item" key={border}><Link to={`/${border}`}>{border}</Link></li>)}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default CountryDetailsPage;
