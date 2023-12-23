import Navbar from "./components/navbar";
import Home from "./components/home";
import Title from "./components/title";
import Deadline from "./components/deadline";

export default function LandingPage() {
  return (
    <>
      <img src="images/background.png" className="absolute h-[100svh] top-0 left-0 
      w-full object-cover z-[-1]"></img>
      <Navbar></Navbar>
      <Title></Title>
      <Home></Home>
      <Deadline></Deadline>
    </>
  );
}
