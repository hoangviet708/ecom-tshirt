import "./RadioCustom.css";
import { IconCheck } from "../../assets/img/IconCheck";
import { useState, useEffect } from "react";

export const RadioCustom = ({ color1, color2, getColorSelected }) => {
  const [color, setColor] = useState("color1");
  const handleOnChangeColor = (e) => {
    setColor(e.target.value);
  };

  useEffect(() => {
    getColorSelected(color);
  }, [color, getColorSelected]);

  return (
    <div className="custom-radios">
      <div className="radio-item">
        <input
          type="radio"
          id="color-1"
          name="color"
          value="color1"
          checked={color === "color1"}
          onChange={handleOnChangeColor}
        />
        <label htmlFor="color-1">
          <span style={{ backgroundColor: color1 }}>
            <IconCheck />
          </span>
        </label>
      </div>

      <div className="radio-item">
        <input
          type="radio"
          id="color-2"
          name="color"
          value="color2"
          checked={color === "color2"}
          onChange={handleOnChangeColor}
        />
        <label htmlFor="color-2">
          <span style={{ backgroundColor: color2 }}>
            <IconCheck />
          </span>
        </label>
      </div>
    </div>
  );
};
