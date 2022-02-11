import styles from './FixedRate.css';

const FxItem = ({ fxSymbol, fxRate, ratesBase }) => {
  return (
    <div className={styles.fixedRateCard}>
      <strong style={{color: 'white', fontSize: 20}}>
        {fxSymbol}/{ratesBase}
      </strong>{"    "}
      <span style={{color: 'white', fontSize: 25}}>:-</span>{"   "}
      <span style={{color: 'white', fontSize: 20}} className={styles.rate}>{fxRate}</span>
    </div>
  );
};

export default FxItem;
