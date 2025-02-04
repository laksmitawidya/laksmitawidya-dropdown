import {
  CloseCircleFilled,
  DownOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DropdownHelpers } from "./helpers/dropdown-helpers";
import "./styles.css";

const NO_DATA_FOUND = "no_data_found";

export type SelectOption = {
  value: any;
  label: string;
};

export type MultipleSelectDropdown = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export type SingleSelectDropdown = {
  multiple?: false;
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

export type DropdownProps = {
  options: SelectOption[];
  withSearch?: boolean;
  outlined?: boolean;
  optionLabel: string;
  withPortal?: boolean;
  customOption?: (option: SelectOption) => ReactElement<any>;
  className?: string;
} & (SingleSelectDropdown | MultipleSelectDropdown);

export const Dropdown: React.FC<DropdownProps> = ({
  multiple,
  withSearch = false,
  outlined = false,
  onChange,
  options,
  optionLabel,
  value,
  customOption,
  withPortal,
  className,
}: DropdownProps): React.ReactNode => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
  const dropdownMenuContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  if (!filteredOptions.length) {
    filteredOptions.push({
      label: "No data found",
      value: NO_DATA_FOUND,
    });
  }

  useEffect(() => {
    const updateWidth = () => {
      if (dropdownRef.current && dropdownMenuContainerRef.current) {
        const { width } = dropdownRef.current.getBoundingClientRect();
        dropdownMenuContainerRef.current.style.width = `${width}px`;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);
    window.addEventListener("click", handleMouseDown);

    return () => {
      window.removeEventListener("click", handleMouseDown);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const highlightText = (option: SelectOption) => {
    const { label } = option;
    if (!query) return label;
    const regex = new RegExp(`(${query})`, "gi");
    const matches = label.split(regex);

    return matches.map((match, index) =>
      match.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-teal-300">
          {match}
        </span>
      ) : (
        match
      )
    );
  };

  const dropdownList = (
    <div
      ref={dropdownMenuRef}
      className={classNames(
        "dropdownList",
        "absolute z-[10000] max-h-[200px] m-0 p-0 list-none rounded border-gray-700 w-full left-0",
        isDropdownOpen ? "inline" : "hidden"
      )}
    >
      {withSearch && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="searchList cursor-pointer h-full flex items-center relative w-full"
        >
          <SearchOutlined className="absolute px-2 icon" />
          <input
            value={query}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="outline-0 h-full p-2 pl-8 border border-gray-200 w-full bg-white"
            onChange={(e) => {
              const { value } = e.target;
              const newVal = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              setQuery(newVal);
            }}
          />
          <CloseCircleFilled
            className={`absolute right-0 px-2 icon ${
              query ? "!inline-flex" : "!hidden"
            }`}
            onClick={() => {
              setQuery("");
            }}
          />
        </div>
      )}
      <div className="bg-gray-50 overflow-y-auto max-h-[200px] shadow-md border border-gray-200 border-t-0 bg-grey-200 py-1 px-1 flex flex-col gap-y-1">
        {filteredOptions.map((option) => {
          if (customOption) {
            const customElement = customOption(option);
            return React.cloneElement(
              customElement,
              {
                key: option.value,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                  e.stopPropagation();
                  if (option.value !== NO_DATA_FOUND) {
                    if (multiple) {
                      if (value.includes(option)) return;
                      onChange([...value, option]);
                    } else {
                      if (option !== value) {
                        onChange(option);
                      }
                      setIsDropdownOpen(false);
                    }

                    setQuery("");
                  }
                },
              },
              highlightText(option)
            );
          }

          return (
            <div
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                if (option.value !== NO_DATA_FOUND) {
                  if (multiple) {
                    if (value.includes(option)) return;
                    onChange([...value, option]);
                  } else {
                    if (option !== value) {
                      onChange(option);
                    }
                    setIsDropdownOpen(false);
                  }
                  setQuery("");
                }
              }}
              className={classNames(
                "py-1 px-2 rounded",
                ((multiple && value.includes(option)) || option === value) &&
                  "bg-teal-200",
                option.value !== NO_DATA_FOUND &&
                  "hover:bg-teal-100 cursor-pointer"
              )}
            >
              {highlightText(option)}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={classNames("flex", className)}>
      {optionLabel}
      <div
        ref={dropdownRef}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        tabIndex={0}
        className={classNames(
          "container cursor-pointer shadow-sm w-full relative min-h-8 flex items-center gap-3 px-2 outline-none rounded",
          outlined
            ? "border border-gray-300"
            : "bg-gray-200 border border-gray-300"
        )}
      >
        {multiple ? (
          <div className="flex gap-1 flex-wrap grow py-2">
            {value.map((val) => (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((opt) => opt !== val));
                }}
                className="p-1 rounded-xl px-3 bg-gray-100 flex gap-1"
              >
                {val.label}
                <CloseCircleFilled className="icon" />
              </span>
            ))}
          </div>
        ) : (
          <span className="grow">{value?.label}</span>
        )}

        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (multiple) {
              onChange([]);
            } else {
              onChange(undefined);
            }
          }}
        />

        {isDropdownOpen ? (
          <UpOutlined className="icon" />
        ) : (
          <DownOutlined className="icon" />
        )}

        {withPortal
          ? createPortal(
              <div
                ref={dropdownMenuContainerRef}
                style={DropdownHelpers.getDropdownStyle(dropdownRef)}
              >
                {dropdownList}
              </div>,
              document.body
            )
          : dropdownList}
      </div>
    </div>
  );
};
