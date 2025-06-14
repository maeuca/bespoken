import React from "react";
import { formRowStyle, labelStyle, inputStyle } from "../../styles";

interface TextBoxProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}
export const TextBox: React.FC<TextBoxProps> = ({ value, label, onChange }) => {
  return (
    <div style={formRowStyle}>
        <label style={labelStyle}>{label}</label>
        <input 
        type="text" 
        style={inputStyle} 
        value={value} 
        onChange={e => onChange(e.target.value)} />
    </div>
   
  );
};
