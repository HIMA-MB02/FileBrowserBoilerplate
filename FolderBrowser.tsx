import React, { useState, useEffect } from 'react';
import FolderNavigator from './FolderNavigator'
import FolderViewer from './FolderViewer'
import { NavigationProvider } from './Context/NavigationContext'


//say props.currentPath = '/Home/ParentFolder/ChildFolder/'
const FolderBrowser = () => {
	return (
		<NavigationProvider>
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<FolderNavigator />
					</div>
					<div className="col-md-8">
						<FolderViewer />
					</div>
				</div>
			</div>
		</NavigationProvider>

	)
}

export default FolderBrowser;