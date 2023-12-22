export default function Navbar() {
  return (
    <>
      <nav
        className="bg-darkBlue h-[110px] flex justify-between items-center relative
      px-[40px]"
      >
        <a href="https://www.mjc.edu/" target="_blank">
          <img className="w-[135px]" src="images/MJC.png"></img>
        </a>
        <img
          className="absolute left-1/2 top-1/4 transform -translate-x-1/2 w-[150px]"
          src="images/ASMJC.png"
        ></img>
        <ul className="flex items-center gap-10 text-offWhite cursor-pointer">
          <li className="hover:text-orange ease-out duration-200">Home</li>
          <li className="hover:text-orange ease-out duration-200">Technical Support</li>
          <li className="hover:text-orange ease-out duration-200">Contact</li>
          <li className="hover:text-darkBlue hover:bg-orange
           hover:border-orange ease-in-out duration-300 px-[20px] py-[5px] 
           bg-opacity-0 rounded-[20px] border-2 border-white font-[700]">
            Sign In
          </li>
        </ul>
      </nav>
    </>
  );
}
