## `@laksmitawidya/dropdown` Component for ReactJS

[![NPM Version](https://img.shields.io/npm/v/@laksmitawidya/dropdown)](https://www.npmjs.com/package/@laksmitawidya/dropdown)
[![License](https://img.shields.io/npm/l/@laksmitawidya/dropdown)](https://github.com/laksmitawidya/dropdown/blob/main/LICENSE)

A lightweight and customizable dropdown component for ReactJS, built with ReactJS, Tailwind CSS and TypeScript.

## Installation

### Using npm

```sh
npm install @laksmitawidya/dropdown
```

### Using pnpm

```sh
pnpm install @laksmitawidya/dropdown
```

## Usage

- Import `@import "@laksmitawidya/dropdown/dist/dropdown.css";` to the main css file

```tsx
const App = () => {
  const [value, setValue] = useState<SelectOption | undefined>(optionsList[0]);

  return (
    <div style={{ padding: "20px" }}>
      {value?.label}
      <Dropdown
        outlined={true}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        options={optionsList}
        optionLabel="Test"
      />
    </div>
  );
};

export default App;
```

## Features

- 🎨 **Styled with TailwindCSS** for easy customization.
- ⚡ **Lightweight**
- 🛠️ **Easy integration** with React applications.

## Demo

- [Storybook Live Demo](https://67a21646aad2ce22227b56db-rqhgsszvux.chromatic.com/?path=/story/components-dropdown--single-select-dropdown)

## Links

- [NPM Package](https://www.npmjs.com/package/@laksmitawidya/dropdown)
- [GitHub Repository](https://github.com/laksmitawidya/laksmitawidya-dropdown)
