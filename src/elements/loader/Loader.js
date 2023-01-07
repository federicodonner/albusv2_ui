import "./loader.css";
import loaderImage from "../../images/loader.svg";
import loaderSmallImage from "../../images/loaderSmall.svg";

export default function Loader(props) {
  return (
    <div className="loaderContainer flexContainer vertical">
      <div className="loader centered">
        {props.small && (
          <img className="small" src={loaderSmallImage} alt="loader" />
        )}
        {!props.small && <img src={loaderImage} alt="loader" />}
        {props.children && (
          <div className="loaderText centered">{props.children}</div>
        )}
      </div>
    </div>
  );
}
