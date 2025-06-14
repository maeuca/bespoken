import React from "react";
import { formRowStyle, labelStyle, inputStyle } from "../../styles";

interface DateBoxProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
}
export const DateBox: React.FC<DateBoxProps> = ({ value, label, onChange }) => {
  return (
    <div style={formRowStyle}>
        <label style={labelStyle}>{label}</label>
        <input 
        type="date" 
        style={inputStyle} 
        value={value} 
        onChange={e => onChange(e.target.value)} />
    </div>
   
  );
};
