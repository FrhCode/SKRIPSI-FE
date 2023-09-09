import { create } from "zustand";

interface Store {
  isNavOpen: boolean;
  toggleIsNavOpen: (toogle?: boolean) => void;
}

const useStore = create<Store>((set) => ({
  isNavOpen: false,
  toggleIsNavOpen: (toogle) =>
    set((state) => {
      const currentNavState = toogle !== undefined ? toogle : !state.isNavOpen;
      document.body.classList.toggle("overflow-hidden", currentNavState);
      return {
        isNavOpen: currentNavState,
      };
    }),
}));

export default useStore;
