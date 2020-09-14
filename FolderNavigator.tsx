import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext, INavigationAction } from './Context/NavigationContext'
import { useMatch, useHistory } from 'react-router-dom'


const FolderNavigator = () => {
	const match = useMatch();
	const history = useHistory();
	const [currentOpenFolders, setCurrentOpenFolders] = useState([])
	const { state, dispatch } = useContext(NavigationContext)

	/**
	 * By ROUTE-ID
	 */

	// useEffect(() => {
	// 	let routePath = match.params.pathId;
	// 	setCurrentOpenFolders(routePath.split('/'));
	// }, [match.params.pathId])
	// const querySelectedFolder = (index: number) => {
	// 	let path = ''
	// 	for(let i = 0; i <= index; i++) {
	// 		path += `${currentOpenFolders[i]}/`;
	// 	}
	// 	//perform encryption here
	// 	let encryptedPath = path;
	// 	history.push('currentPath', `/${encryptedPath}`)
	// }

	/**
	 * BY CONTEXT
	 */
	useEffect(() => {
		let arrayFolders = state.currentPath.split('/');
		setCurrentOpenFolders(arrayFolders)
	}, [state.currentPath])

	const querySelectedFolder = (index: number) => {
		let path = ''
		for(let i = 0; i <= index; i++) {
			path += `${currentOpenFolders[i]}/`;
		}
		let action = {
			type: 'SET_DATA',
			payload: {
				currentPath: path,
			}
		}
		dispatch(action)
	}

	const renderNavigatorFolders = () => {
		return currentOpenFolders.map((folderName, index) => {
			return (
				<div className="row" onClick={() => { querySelectedFolder(index) }}>
					<div className={`col ${index ? `style-navigator` : `style-top-folder`}`}>
						{folderName.name}
					</div>
				</div>
			)
		})
	}
	return (
		<div className="container">
			{renderNavigatorFolders()}
		</div>
	)
}

export default FolderNavigator;