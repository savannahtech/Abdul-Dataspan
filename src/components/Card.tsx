"use client";
import Image from "next/image";
import PolygonCanvas from "./Polygon";
import { PhotoData } from "@/utils/model";

const Card = ({
  text,
  image,
  photoData,
  onView = () => {},
}: {
  text?: string;
  image?: string;
  photoData: PhotoData;
  onView: () => void;
}) => {
  return (
    <div className="w-[100px] cursor-pointer" onClick={() => onView()}>
      <div className="relative w-[100px] h-[100px] bg-gray-100 ">
        <Image
          src={photoData.thumbnail}
          width={600}
          height={600}
          alt=""
          className="relative object-cover h-full w-full"
        />
        <PolygonCanvas photo={photoData} />
      </div>
      <div className="text-[12px] w-[100px] text-dark font-light text-ellipsis whitespace-nowrap overflow-hidden ... ">
        {photoData.name}
      </div>
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="w-[100px] cursor-pointer">
      <div className="w-[100px] h-[100px] bg-gray-300 animate-pulse  "></div>
      <div className="text-[12px] w-[100px] h-4 mt-1 bg-gray-300 animate-pulse text-dark font-light text-ellipsis whitespace-nowrap overflow-hidden ... "></div>
    </div>
  );
};

export { Card, CardSkeleton };
