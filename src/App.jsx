import "./App.css";
import Wrapper from "./components/layout/Wrapper/Wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Wrapper></Wrapper>
    </>
  );
}

export default App;
