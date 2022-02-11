import * as React from "react";
import styles from "../../Api/FixedRate.css";
import FxItem from "../../Api/FixedRateItem";
import { fetchExchangeRates, searchFxRates } from "../../Api/FixedRateService";
import './ExchangeRate.css'

const ExchangeRate = () => {
  const [rates, setRates] = React.useState(null);
  const [ratesBase, setRatesBase] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(null);

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    let componentIsMounted = true;

    const getFxData = () => {
      fetchExchangeRates()
        .then((data) => {
          console.log("fx data:", data);
          if (componentIsMounted) {
            setRates(data.rates);
            setRatesBase(data.base);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // load initially
    getFxData();

    const fetchInterval = setInterval(getFxData, 1000 * 60);

    return () => {
      clearInterval(fetchInterval);
      componentIsMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setSearchResults(searchFxRates(rates, searchTerm));
    } else {
      setSearchResults(rates);
    }
  }, [searchTerm, rates]);

  return (
    <div className="exchange-rate-page">
      <div className={styles.app}>
        <h1 className="exchange-rate-title">Exchange Rates</h1>
        <input
          value={searchTerm}
          className={styles.input}
          placeholder="Search..."
          onChange={onSearch}
          className="exchange-rate-input"
        />
        {searchResults
          ? Object.keys(searchResults).map((key) => (
              <FxItem
                key={key}
                fxSymbol={key}
                fxRate={searchResults[key]}
                ratesBase={ratesBase}
              />
            ))
          : []}
      </div>
    </div>
  );
};

export default ExchangeRate;
