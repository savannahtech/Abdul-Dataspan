"use client";

const Pill = ({
  text,
  className,
  active,
  variant,
  onSelect = (className, active) => {},
}: {
  text: string;
  active: boolean;
  className: string;
  onSelect: (text: string, value: boolean) => void;
  variant: "blue" | "green" | "sea" | "yellow" | "red" | "orange" | "purple";
}) => {
  const color = colors[variant];
  return (
    <div
      className={`flex rounded-full border-[1px] h-[29px] px-3  gap-1 items-center cursor-pointer ${
        color[1]
      } ${active ? color[2] : ""}`}
      onClick={() => {
        onSelect(className, active);
      }}
    >
      <div className={`w-[8px] h-[8px] rounded-full ${color[0]}`}></div>
      <span className={`text-dark text-[12px] font-semibold`}>{text}</span>
    </div>
  );
};

export default Pill;

const colors = {
  blue: ["bg-blue", "border-blue", "bg-blue-50"],
  green: ["bg-green", "border-green", "bg-green-50"],
  sea: ["bg-sea", "border-sea", "bg-sea-50"],
  yellow: ["bg-yellow", "border-yellow", "bg-yellow-50"],
  red: ["bg-red", "border-red", "bg-red-50"],
  orange: ["bg-orange", "border-orange", "bg-orange-50"],
  purple: ["bg-purple", "border-purple", "bg-purple-100"],
};
