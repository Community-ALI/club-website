import Navbar from "./components/navbar";
import Home from "./components/home";
import Title from "./components/title";
import Deadline from "./components/deadline";

export default function LandingPage() {
  return (
    <>
      <img src="images/background.png" className="absolute w-[100%] h-[100vh] z-[-1]"></img>
      <Navbar></Navbar>
      <Title></Title>
      <Home></Home>
      <Deadline></Deadline>
    </>
  );
}
