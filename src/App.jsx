
import './App.css';
import Header from './Components/Header';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Searchmovie from './Components/Searchmovie';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Searchmovie/>
     <Footer/>
    </div>
  );
}

export default App;
