import { EthProvider } from './contexts/EthContext';

import './App.css';
import Home from './components/home';

function App() {
	return (
		<EthProvider>
			<div id="App">
				<div className="container">
					<Home />
				</div>
			</div>
		</EthProvider>
	);
}

export default App;
