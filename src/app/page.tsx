"use client";

import ImageModal from "@/components/ImageModal";
import { viewAlbum } from "@/service/aws";

import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { PhotoData } from "@/utils/model";

import useFilter, { areAllNone } from "@/hooks/filter";

import TabPane from "@/components/TabPane";

export default function Home() {
  const {
    allGroupsData,
    setAllGroupsData,
    trainData,
    setTrainData,
    validData,
    setValidData,
    testData,
    setTestData,
    selectedClassFilter,
    selectedMinRange,
    selectedMaxRange,
    trigerRangeFilter,
    refresh,
  } = useStore();

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All Groups", "Train", "Valid", "Test"];
  const [openModal, setOpenModal] = useState<PhotoData | null>(null);

  const [loading, setLoading] = useState(false);
  const data = allGroupsData.data;
  const { handleFilterData, responseData } = useFilter(data);

  const {
    handleFilterData: handleFilterDataTrain,
    responseData: responseDataTrain,
  } = useFilter(trainData.data);

  const {
    handleFilterData: handleFilterDataValid,
    responseData: responseDataValid,
  } = useFilter(validData.data);

  const {
    handleFilterData: handleFilterDataTest,
    responseData: responseDataTest,
  } = useFilter(testData.data);

  const handleFilterAll = (searchText: string[]) => {
    let searchBy = searchText;
    if (searchText.length > 0) {
      searchBy.push("none");
    }
    if (areAllNone(searchBy)) {
      searchBy = [];
    }

    handleFilterData([...allGroupsData.data], searchBy);
    handleFilterDataTrain(trainData.data, searchBy);
    handleFilterDataValid(validData.data, searchBy);
    handleFilterDataTest(testData.data, searchBy);
    searchBy = [];
  };

  const handleRangeFilter = (searchRange: string[]) => {
    handleFilterData([...allGroupsData.data], searchRange);
    handleFilterDataTrain(trainData.data, searchRange);
    handleFilterDataValid(validData.data, searchRange);
    handleFilterDataTest(testData.data, searchRange);
  };

  useEffect(() => {
    handleFilterAll([...selectedClassFilter]);
  }, [selectedClassFilter.length]);

  useEffect(() => {
    handleRangeFilter(trigerRangeFilter);
  }, [trigerRangeFilter]);

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    setLoading(true);
    const resp = await viewAlbum("bone-fracture-detection");
    setLoading(false);

    if (resp.success && resp.data) {
      setAllGroupsData({ canFetch: false, data: resp.data.allGroups });
      setTrainData({ canFetch: false, data: resp.data.trainData });
      setValidData({ canFetch: false, data: resp.data.validData });
      setTestData({ canFetch: false, data: resp.data.testData });
      return;
    }
  };

  const dataList = [
    responseData,
    responseDataTrain,
    responseDataValid,
    responseDataTest,
  ];

  const getCount = () => dataList[activeTab]?.length;

  return (
    <>
      <main className="max-w-[996px] mx-auto p-2 pb-[50px]">
        <div className="flex justify-between mb-7">
          <div className="text-[32px] text-dark font-semibold">
            Bone-fracture-detection
          </div>
          <div className="pt-4 text-[18px] text-gray-500 text-normal">
            {/*   <span className="font-medium">50</span> of{" "} */}
            <span className="font-medium text-[18px] text-dark">
              {getCount()}
            </span>{" "}
            images
          </div>
        </div>

        <div className=" flex border-b-[1px] border-gray-100">
          {tabs.map((text, i) => (
            <Tab
              key={i}
              name={text}
              active={activeTab == i}
              onTabChange={(text) => setActiveTab(i)}
            />
          ))}
        </div>

        <div>
          <TabPane
            data={dataList[activeTab]}
            loading={loading}
            onViewImage={(photoData) => setOpenModal(photoData)}
          />
        </div>
        <ImageModal
          open={openModal ? true : false}
          photoData={openModal}
          onClose={() => setOpenModal(null)}
        />
      </main>
    </>
  );
}

const Tab = ({
  name,
  active,
  onTabChange,
}: {
  name: string;
  active: boolean;
  onTabChange: (name: string) => void;
}) => (
  <div
    className={`pt-1 h-[27px] px-3 text-dark text-[14px] cursor-pointer border-b-[1px] border-b-transparent hover:font-medium ${
      active ? "text-yellow bg-yellow-50 font-medium border-b-yellow" : ""
    }`}
    onClick={() => onTabChange(name)}
  >
    {name}
  </div>
);
