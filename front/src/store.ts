// store.ts
import { create } from 'zustand';

export interface BucketList {
  id: string;
  state: boolean;
  title: string;
  description: string;
  date: string;
}

interface State {
  bucketLists: BucketList[];
  setBucketLists: (bucketLists: BucketList[]) => void;
}

export const useStore = create<State>((set) => ({
  bucketLists: [],
  setBucketLists: (bucketLists) => set({ bucketLists }),
}));
