import React from "react";
import { formRowStyle, labelStyle, inputStyle } from "../../styles";

interface TextBoxProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}
export const TextBox: React.FC<TextBoxProps> = ({ value, label, onChange }) => {
  const inputId = React.useId();
  if (label) {
    return (
      <div style={formRowStyle}>
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
        <input 
          id={inputId} 
          type="text" 
          style={inputStyle} 
          value={value} 
          onChange={e => onChange(e.target.value)} />
      </div>
    );
  } else {
    return (
      <div style={formRowStyle}>
        <input 
          type="text" 
          style={inputStyle} 
          value={value} 
          onChange={e => onChange(e.target.value)} />
      </div>
    );
  }
 
};
