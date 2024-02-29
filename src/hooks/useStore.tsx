import { PhotoData } from "@/utils/model";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

//  state interface
export interface ItemListProps<T> {
  canFetch: boolean;
  data: T[];
}
interface State {
  trigerRangeFilter: any;
  setTriggerRangeFilter: (trigerRangeFilter: any) => void;
  selectedClassFilter: string[];
  setSelectedClassFilter: (selectedClassFilter: string[]) => void;
  selectedMinRange: number;
  setSelectedMinRange: (midRange: number) => void;
  selectedMaxRange: number;
  setSelectedMaxRange: (maxRange: number) => void;

  allGroupsData: ItemListProps<PhotoData>;
  trainData: ItemListProps<PhotoData>;
  validData: ItemListProps<PhotoData>;
  testData: ItemListProps<PhotoData>;

  setAllGroupsData: (allGroupsData: ItemListProps<PhotoData>) => void;
  setTrainData: (trainData: ItemListProps<PhotoData>) => void;
  setValidData: (validData: ItemListProps<PhotoData>) => void;
  setTestData: (textData: ItemListProps<PhotoData>) => void;

  refresh: () => void;
}

//  store
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      trigerRangeFilter: true,
      setTriggerRangeFilter: (trigerRangeFilter: any) =>
        set({ trigerRangeFilter }),
      selectedClassFilter: [],
      setSelectedClassFilter: (selectedClassFilter: string[]) =>
        set({ selectedClassFilter }),

      selectedMinRange: 0,
      setSelectedMinRange: (selectedMinRange) => set({ selectedMinRange }),

      selectedMaxRange: 0,
      setSelectedMaxRange: (selectedMaxRange) => set({ selectedMaxRange }),

      allGroupsData: { canFetch: true, data: [] },
      setAllGroupsData: (allGroupsData: ItemListProps<PhotoData>) =>
        set({ allGroupsData: allGroupsData }),

      trainData: { canFetch: true, data: [] },
      setTrainData: (trainData: ItemListProps<PhotoData>) =>
        set({ trainData: trainData }),

      validData: { canFetch: true, data: [] },
      setValidData: (validData: ItemListProps<PhotoData>) =>
        set({ validData: validData }),

      testData: { canFetch: true, data: [] },
      setTestData: (testData: ItemListProps<PhotoData>) =>
        set({ testData: testData }),

      refresh: () => {
        // clear other states
        // useStore.getState().clear();
        // reset user and auth token
        set({
          trainData: { canFetch: true, data: [] },
          validData: { canFetch: true, data: [] },
          testData: { canFetch: true, data: [] },
        });
      },
    }),
    {
      name: "dai",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
