import { FaBrain } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed top-5 w-full flex justify-center z-50">
      
      <nav className="flex items-center justify-between w-[92%] max-w-6xl px-6 py-3
      bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">

        <div className="flex items-center gap-2 text-white font-semibold">
          <FaBrain className="text-blue-400" />
          BurnoutAI
        </div>

        <div className="hidden md:flex gap-6 text-slate-300 text-sm">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#grid" className="hover:text-white transition">Gallery</a>
          <a href="#try" className="hover:text-white transition">Test</a>
        </div>

        <a href="#try">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition">
            Start
          </button>
        </a>

      </nav>
    </div>
  );
};

export default Navbar;