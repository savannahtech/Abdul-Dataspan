"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Pill from "./Pill";
import BinIcon from "./Bin";
import { useStore } from "@/hooks/useStore";
import RangeInput from "./RangeInput";
export default function SideBar({ show, setter }: any) {
  const [selectType, setSelectType] = useState("Select All");
  const [range, setRange] = useState(0);

  const {
    selectedClassFilter,
    setSelectedClassFilter,
    selectedMinRange,
    setSelectedMinRange,
    selectedMaxRange,
    setSelectedMaxRange,
    trigerRangeFilter,
    setTriggerRangeFilter,
  } = useStore();

  const isActive = (className: string) =>
    selectedClassFilter?.find((opt) => opt == className) ? true : false;

  const onSelect = (className: string, value: boolean) => {
    let newList = [];
    if (value) {
      newList = selectedClassFilter.filter((opt) => opt != className) || [];
      setSelectedClassFilter([...newList]);
    } else {
      newList = [...selectedClassFilter];
      newList.push(`${className}`);
      setSelectedClassFilter([...newList]);
    }
  };

  const clearAll = () => {
    setSelectedClassFilter([]);
    setSelectType("Select All");
    //handleSearchAll([]);
    setSelectedMinRange(0);
    setSelectedMaxRange(2);
  };

  const options = [
    { label: "Elbow positive", className: "elbow_positive" },
    { label: "Fingers positive", className: "fingers_positive" },
    { label: "Humerus", className: "humerus" },
    { label: "Forearm fracture", className: "forearm_fracture" },
    { label: "Humerus fracture", className: "humerus_fracture" },
    { label: "Shoulder fracture", className: "shoulder_fracture" },
    { label: "Wrist positive", className: "wrist_positive" },
  ];

  let variant = [
    _variants.blue,
    _variants.green,
    _variants.sea,
    _variants.yellow,
    _variants.red,
    _variants.orange,
    _variants.purple,
  ];

  // Append class based on state of sidebar visiblity
  const appendClass = show
    ? " fixed z-50 max-sm:ml-[0px] max-md:ml-[0px] transform-none"
    : "  ";

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed md:sticky z-20  max-sm:ml-[0px] max-md:ml-[-352px]  p-4 min-w-[200px] max-w-[352px] min-w-[352px]  top-0  bottom-0  h-screen  transition-transform -translate-x-full  sm:translate-x-0  md:translate-x-0   ${appendClass}`}
        aria-label="Sidebar"
      >
        <div className="h-full w-full mx-auto  py-[15px] px-[20px]  rounded-[10px] border-[1px] border-gray-300  overflow-y-auto">
          <Logo />
          <div>
            <div className="text-dark font-medium mt-5">Classes filter</div>
            <div className="flex gap-2 mt-3">
              {["Select All", "Deselect All"].map((text, i) => (
                <div
                  key={i}
                  className={`text-[12px] cursor-pointer ${
                    selectType == text ? "text-blue" : "text-gray-400"
                  }`}
                  onClick={() => {
                    if (text == "Select All") {
                      setSelectedClassFilter([
                        ...options?.map((opt) => opt.className),
                      ]);
                    } else {
                      setSelectedClassFilter([]);
                    }
                    setSelectType(text);
                  }}
                >
                  {text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap py-2 gap-2">
              {options.map((opt, i) => (
                <Pill
                  key={i}
                  text={opt.label}
                  className={opt.className}
                  active={isActive(opt.className)}
                  variant={variant[i]}
                  onSelect={(className, active) => onSelect(className, active)}
                />
              ))}
            </div>
            <RangeInput
              rangeMin={selectedMinRange}
              rangeMax={selectedMaxRange}
              handleOnChangeSearch={(range) => {
                setTriggerRangeFilter(range);
              }}
              setSelectedMaxRange={(maxRange) => {
                setSelectedMaxRange(maxRange);
              }}
              setSelectedMinRange={(minRange) => {
                setSelectedMinRange(minRange);
              }}
            />
            {/* <div className="text-[16px] text-dark font-semibold mt-3 mb-2">
              Poligon range
            </div>
            <div className="flex justify-between text-[12px] text-dark">
              <div>
                <span>min</span>
                <span className="pl-1 font-semibold">{0}</span>
              </div>
              <div>
                <span>max</span>
                <span className="pl-1 font-semibold">{4}</span>
              </div>
            </div>
            <div>
              <div className="text-center text-dark">{range}</div>
              <input
                type="range"
                className="h-2 bg-yellow-200  rounded-md appearance-none focus:outline-none focus:bg-yellow-300 w-full"
                step={1}
                max={4}
                value={range}
                onChange={(ev) => {
                  setRange(parseInt(ev.target.value));
                }}
              />
            </div> */}

            <div className="flex justify-between items-center mt-3 ">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  clearAll();
                }}
              >
                <BinIcon />
                <span className="text-[12px] mt-[5px] text-dark font-semibold">
                  Clear Filters
                </span>
              </div>
              <div className="text-[12px] text-gray-400 cursor-pointer">
                Need help?
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/**overlay */}
      {show ? (
        <div
          className={`flex lg:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-40`}
          onClick={() => {
            setter((oldVal: any) => !oldVal);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

enum _variants {
  "blue" = "blue",
  "green" = "green",
  "sea" = "sea",
  "yellow" = "yellow",
  "red" = "red",
  "orange" = "orange",
  "purple" = "purple",
}
