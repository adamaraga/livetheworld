import Details from "./pages/Details";
import "./styles/App.scss";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Details />
    </div>
  );
}

export default App;
