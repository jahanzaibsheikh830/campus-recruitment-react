import './App.css';
import {GlobalStateProvider} from './context/globalState'
import Router from './components/Router'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <GlobalStateProvider>
      <Router/>
    </GlobalStateProvider>
  );
}

export default App;
