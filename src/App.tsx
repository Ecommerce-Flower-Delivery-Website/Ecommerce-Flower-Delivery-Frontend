import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link className="text-3xl font-bold underline" to={"/dashboard"}>
        dashboard
      </Link>
    </>
  );
}

export default App;
