import React, {  useReducer } from 'react'

interface INavigationProvider {
	children?: any
}
export interface INavigationState {
	currentPath: string, 
}
export interface INavigationAction {
	type: string,
	payload: {
		currentPath: string,
	}
}
export interface INavigationContext {
	state: INavigationState,
	dispatch(): any 
}
let navigationReducer = (state, action: INavigationAction) => {
	switch (action.type) {
		case "SET_DATA":
		  return { 
			  currentPath: action.payload.currentPath,
		  };
		default:
		  return;
	  }
}

const initialNavigationState = {
	currentPath: '',
}
const NavigationContext = React.createContext<INavigationState>(initialNavigationState);


const NavigationProvider = (props: INavigationProvider) => {
	const [state, dispatch] = useReducer(navigationReducer, initialNavigationState);

 return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NavigationContext.Provider>
  );
}
export { NavigationContext, NavigationProvider };