import React from 'react'
import FolderBrowser from './FolderBrowser'
const App = () => {
	return (
		<ApolloProvider client={client}>
			<FolderBrowser />
		</ApolloProvider>
	)
}

export default App