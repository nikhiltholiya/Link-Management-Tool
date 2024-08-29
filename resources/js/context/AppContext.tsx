import { useMemo, useReducer, createContext, useState, useEffect } from "react";

interface State {
   openSidenav: boolean;
   mobileSidenav: boolean;
   sidenavColor: string;
   sidenavType: string;
   transparentNavbar: boolean;
   fixedNavbar: boolean;
   openConfigurator: boolean;
}

interface Action {
   type: string;
   value: any;
}

export const AppContext = createContext<[State, React.Dispatch<Action>] | null>(
   null
);

function reducer(state: State, action: Action): State {
   switch (action.type) {
      case "OPEN_SIDENAV": {
         return { ...state, openSidenav: action.value };
      }
      case "MOBILE_SIDENAV": {
         return { ...state, mobileSidenav: action.value };
      }
      case "SIDENAV_TYPE": {
         return { ...state, sidenavType: action.value };
      }
      case "SIDENAV_COLOR": {
         return { ...state, sidenavColor: action.value };
      }
      case "TRANSPARENT_NAVBAR": {
         return { ...state, transparentNavbar: action.value };
      }
      case "FIXED_NAVBAR": {
         return { ...state, fixedNavbar: action.value };
      }
      case "OPEN_CONFIGURATOR": {
         return { ...state, openConfigurator: action.value };
      }
      default: {
         throw new Error(`Unhandled action type: ${action.type}`);
      }
   }
}

export function AppContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const initialState: State = {
      openSidenav: true,
      mobileSidenav: false,
      sidenavColor: "blue",
      sidenavType: "dark",
      transparentNavbar: true,
      fixedNavbar: true,
      openConfigurator: false,
   };

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      if (windowWidth < 960) {
         dispatch({ type: "OPEN_SIDENAV", value: false });
      } else {
         dispatch({ type: "OPEN_SIDENAV", value: true });
      }
   }, [windowWidth]);

   const [state, dispatch] = useReducer(reducer, initialState);
   const value = useMemo<[State, React.Dispatch<Action>]>(
      () => [state, dispatch],
      [state, dispatch]
   );

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Predefine functions
export const setOpenSidenav = (
   dispatch: React.Dispatch<Action>,
   value: boolean
) => dispatch({ type: "OPEN_SIDENAV", value });
export const setMobileSidenav = (
   dispatch: React.Dispatch<Action>,
   value: boolean
) => dispatch({ type: "MOBILE_SIDENAV", value });
export const setSidenavType = (
   dispatch: React.Dispatch<Action>,
   value: string
) => dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (
   dispatch: React.Dispatch<Action>,
   value: string
) => dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (
   dispatch: React.Dispatch<Action>,
   value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (
   dispatch: React.Dispatch<Action>,
   value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (
   dispatch: React.Dispatch<Action>,
   value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
