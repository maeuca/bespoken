import React from "react";
import { formRowStyle, labelStyle, inputStyle } from "../../styles";

interface SelectListItem {
    id: number | undefined;
    name: string;
}
export const SelectList: React.FC<{
    items: SelectListItem[];
    selectedItem: string | number | undefined;
    label: string;
    onSelect: (item: string | number | undefined) => void;
}> = ({ items, selectedItem, label, onSelect }) => {
    return (
        <div style={formRowStyle}>
            <label style={labelStyle}>{label}</label>
            <select style={inputStyle} value={selectedItem} onChange={(e) => onSelect(Number(e.target.value))}>
                {items.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
        </div>
    );
}