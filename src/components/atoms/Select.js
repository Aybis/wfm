/** @format */

import React, { Children, useState, useRef, useEffect } from "react";
import propTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";

export default function Select({
  labelName,
  id,
  name,
  value,
  className,
  children,
  onClick,
  fallbackText,
  border = true,
}) {
  const [toggle, settoggle] = useState(() => false);
  const selectWrapper = useRef(null);

  const items = Children.toArray(children);

  function toggleSelect() {
    settoggle(() => !toggle);
  }

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target))
      settoggle(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const selected = items.find((item) => item.props.value === value);

  return (
    <div className="flex flex-col mb-2">
      {labelName && (
        <label
          htmlFor=""
          className="show text-sm mb-2 text-apps-text text-opacity-70 font-semibold">
          {labelName}
        </label>
      )}
      <div className="relative" ref={selectWrapper} onClick={toggleSelect}>
        <div
          className={[
            "flex justify-between cursor-pointer bg-white focus:outline-none transition-all duration-200 border p-3 pr-4 w-full rounded text-apps-text",
            toggle
              ? "border-apps-primary"
              : `${
                  border
                    ? "border-transparent"
                    : "border-apps-gray border-opacity-40"
                }`,
            className,
          ].join(" ")}>
          <span className={value === "" ? "text-gray-600" : "text-apps-text"}>
            {selected?.props.children ?? fallbackText}
          </span>
          <div className="transition-all duration-200 border-apps-gray border-opacity-40 border-b-2 border-r-2 transform rotate-45 translate-y-1 w-2 h-2 "></div>
        </div>
        <div
          className={[
            "absolute left-0 bg-white border border-apps-gray border-opacity-40 py-3 w-full rounded-md mt-2 max-h-48 overflow-auto hidden-scroll shadow-lg",
            toggle ? "" : "hidden",
          ].join(" ")}>
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between cursor-pointer px-4 py-2 bg-white transition-all duration-200 hover:bg-apps-primary mx-1 hover:text-white ${
                  selected.props.value === item.props.value
                    ? "text-apps-text font-medium"
                    : "text-apps-text text-opacity-40"
                }`}
                onClick={() =>
                  onClick({ target: { name: name, value: item.props.value } })
                }>
                {item.props.children}{" "}
                {selected.props.value === item.props.value && (
                  <CheckIcon className="text-apps-primary h-5 w-5" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Select.propTypes = {
  onClick: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  name: propTypes.string.isRequired,
  fallbackText: propTypes.string,

  labelName: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
};
