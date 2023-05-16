import Typography from "@mui/material/Typography";
import "./stock.scss";

interface StocksProps {
  text?: string;
  type?: any;
  stockImg?: any;
  stvalue?: number | undefined | any;
  classname?: any;
  handleStockFilter?: any;
  filter?: any;
}

function Index(props: StocksProps) {
  const {
    text,
    filter,
    type,
    stockImg,
    stvalue,
    classname,
    handleStockFilter,
  } = props;

  return (
    <div
      className={`stocks ${
        type === "outOfStock" ? "outOfStock" : "lowStock"
      } ${classname} 
        ${filter ? 'applyShadow': ''}
      `}
      onClick={handleStockFilter}
      // style={filter ? { boxShadow: '0px 0px' } : {}}
    >
      <figure>
        <img src={stockImg} alt="Stock" />
      </figure>
      <div className="lt Dflex sp-bt al-cnt">
      <Typography variant="subtitle2" className="txt">{text}</Typography>
        <div className="rt">{stvalue}</div>
      </div>
    </div>
  );
}

export default Index;
