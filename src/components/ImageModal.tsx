"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhotoData } from "@/utils/model";

import Image from "next/image";
import Polygon from "./Polygon";
import { Suspense } from "react";

const ImageModal = ({
  open,
  photoData,
  onClose,
}: {
  open: boolean;
  photoData: PhotoData | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/*  <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[14px] font-normal"></DialogTitle>
        </DialogHeader>
        {photoData && (
          <div className="h-[447px]">
            <Image
              src={photoData?.image}
              width={800}
              height={600}
              alt=""
              className="relative h-full"
            />

            <Polygon photo={photoData} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
