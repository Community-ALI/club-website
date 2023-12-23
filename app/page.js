import Navbar from "./components/navbar";
import Home from "./components/home";

export default function LandingPage() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-darkBlue text-[55px] xlg:text-[50px] 
      lg:text-[40px] md:text-[35px] sm:text-[30px]
        text-center mt-[40px]">Modesto Junior College</h1>
      <Home></Home>
    </>
  );
}
