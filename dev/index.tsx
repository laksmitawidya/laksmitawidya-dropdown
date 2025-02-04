import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { SelectOption } from "../dist/Dropdown";
import { Dropdown } from "../src";

const optionsList = [
  { value: 1, label: "Apple 1" },
  { value: 2, label: "Banana 2" },
  { value: 3, label: "Cherry 3" },
  { value: 4, label: "Date 4" },
  { value: 5, label: "Elderberry  berry berry" },
  { value: 6, label: "Moon" },
  { value: 7, label: "Sun" },
  { value: 8, label: "Berry  berry berry berry berry" },
  { value: 9, label: "Strawberry berry berry" },
  {
    value: 10,
    label: "BlueBerry  berry berry berry berry berry berry berry berry",
  },
  { value: 11, label: "sunshine" },
  { value: 12, label: "miaw" },
  { value: 13, label: "ok" },
  { value: 14, label: "test" },
];

const App = () => {
  const [value, setValue] = useState<SelectOption | undefined>(optionsList[0]);
  const [multiValue, setMultiValue] = useState<SelectOption[]>([]);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Testing Dropdown Component</h1>
      {value?.label}
      {multiValue.map((val) => val.label).join(",")}
      <Dropdown
        outlined={true}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        options={optionsList}
        optionLabel="Test Long Label"
      />
      <div style={{ padding: "20px" }}></div>
      <Dropdown
        value={value}
        withSearch
        onChange={(value) => {
          setValue(value);
        }}
        withPortal
        options={optionsList}
        optionLabel="Test Super long long long long long label"
        customOption={(option) => {
          return (
            <span className="bg-pink-100 p-2" aria-label={option.label}>
              {option.label}
            </span>
          );
        }}
      />
      <div style={{ padding: "20px" }}></div>
      <Dropdown
        multiple={true}
        value={multiValue}
        onChange={(value) => {
          setMultiValue(value);
        }}
        options={optionsList}
        optionLabel="Test"
      />
    </div>
  );
};

createRoot(document.getElementById("app")!).render(<App />);
