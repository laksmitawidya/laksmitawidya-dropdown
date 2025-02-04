export class DropdownHelpers {
  static getDropdownStyle = (
    dropdownRef: React.RefObject<HTMLDivElement | null>
  ): React.CSSProperties => {
    if (!dropdownRef.current) return {};

    const dropdown = dropdownRef.current.getBoundingClientRect();
    return {
      position: "absolute",
      top: dropdown.bottom,
      left: dropdown.left,
      zIndex: 10000,
    };
  };
}
