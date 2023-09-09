import { create } from "zustand";

interface Store {
  isNavOpen: boolean;
  toggleIsNavOpen: (toogle?: boolean) => void;
}

const useStore = create<Store>((set) => ({
  isNavOpen: false,
  toggleIsNavOpen: (toogle) =>
    set((state) => ({
      isNavOpen: toogle !== undefined ? toogle : !state.isNavOpen,
    })),
}));

export default useStore;
