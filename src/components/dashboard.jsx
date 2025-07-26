import Footer from "../pages/footer"
import Sidebar from "../pages/sidedash"
import { TbDeviceIpadMinus } from "react-icons/tb";


export default function Dashboard() {

  return (

    <>
      <div>


        <nav class="navbar">
          <div class="brand">Admin <TbDeviceIpadMinus />Dashboard</div>

          
        </nav>


      </div>

      <Sidebar />


      <Footer />
    </>
  )
}


