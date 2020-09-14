import React, { useState, useEffect, useContext } from 'react'
import { NavigationContext, INavigationContext } from './Context/NavigationContext'
import { useQuery, gql } from '@apollo/client';
import { TYPES } from './sampleData'
import { useMatch, useHistory } from 'react-router-dom'
const GET_PATHNAME = () => gql`
query GetPathname {
	userMetadata {
		navigation(pathName: $pathName) {
			folderItemsData
		}
	}
}
`
const FolderViewer = () => {
	const match = useMatch();
	const { state, dispatch } = useContext(NavigationContext)
	const [folderItems, setFolderItems] = useState([])

	/**
	 * By ROUTE-ID
	 */


	useEffect(() => {
		let routePath = match.params.pathId;
		//decrypt route here
		let decryptedRoute = routePath;
		const { loading, error, data } = useQuery(GET_PATHNAME, {
			variables: {
				pathName: decryptedRoute
			},
		  });
		setFolderItems(data.folderItemsData);
	}, [match.params.pathId])

	const querySelectedFolder = (folderItem: any) => {
		if (folderItem.type === TYPES.folder) {
			//perform encryption here
			let encryptedPath = folderItem.path;
			history.push('currentPath', `/${encryptedPath}`)
		}
	}

	useEffect(() => {
		// set pathname to localStorage
		let pathName = state.currentPath;
		if (!pathName) {
			pathName = localStorage.getItem('pathName');
		}
		const { loading, error, data } = useQuery(GET_PATHNAME, {
			variables: {
				userToken: 'asdasdasdasdasd',
				pathName: pathName
			},
		});
		setFolderItems(data.folderItemsData);
	}, [state.currentPath])

	const querySelectedFolder = (folderItem: any) => {
		if (folderItem.type === TYPES.folder) {
			let action = {
				type: 'SET_DATA',
				payload: {
					currentPath: path,
				}
			}
			dispatch(action)
		}
	}
	const renderFolderItems = () => {
		return folderItems.map(folderItem => {
			return (
				<div className="row" onClick={() => { querySelectedFolder(folderItem) }}>
					<div className="col-2">
						{folderItem.index}
					</div>
					<div className="col-2">
						{folderItem.logo}

					</div>
					<div className="col-6">
						{folderItem.name}
					</div>
					<div className="col-2">
						{folderItem.options}
					</div>
				</div>
			)
		})
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="container">
						{renderFolderItems()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FolderViewer