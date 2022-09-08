import { colorTheme } from "./styledComponent/color";

const Loader = ({ color, margin, size }) => {
  const borderSize = size ? size : "4px";
  const colorMain = color ? color : "white";

  return (
    <div style={{ margin: margin }} className="lds-ring">
      <div
        style={{
          border: borderSize + " solid " + colorMain,
          borderColor: colorMain + " transparent transparent transparent",
        }}
        className=""
      ></div>
      <div
        style={{
          border: borderSize + " solid " + colorMain,
          borderColor: colorMain + " transparent transparent transparent",
        }}
        className=""
      ></div>
      <div
        style={{
          border: borderSize + " solid " + colorMain,
          borderColor: colorMain + " transparent transparent transparent",
        }}
        className=""
      ></div>
    </div>
  );
};

export default Loader;
