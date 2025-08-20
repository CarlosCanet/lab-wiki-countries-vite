import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomePage() {
  const [countries, setCountries] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/countries`);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!countries) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container overflow-scroll" style={{ maxHeight: "90vh" }}>
      <h1 className="fs-2">WikiCountries: Your Guide to the World</h1>

      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link to={`/${country.alpha3Code}`} key={country._id}>
              <p className="list-group-item list-group-item-action d-flex flex-column justify-content-center align-items-center">
                <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={`${country.name.common} flag`} width={"72px"}/>
                {country.name.common}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default HomePage;
