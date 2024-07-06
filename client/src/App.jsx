import { useState} from "react";
import Login from "./components/Login"
import Register from "./components/register";
import Mainfile from "./Provider/Mainfile";

function App() {

  const [register,setRegister] = useState(false);
   
  return (
    <>

<Mainfile>
{
  register?(<Register setRegister={setRegister} />):<Login setRegister={setRegister}/>
}

</Mainfile>


    </>
  )
}

export default App
