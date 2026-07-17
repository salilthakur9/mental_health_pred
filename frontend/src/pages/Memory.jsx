import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  Image,
  Brain,
  Smile,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateMemoryModal from "../components/memory/CreateMemoryModal";

const dummyMemories = [
  {
    id: 1,
    title: "My Placement Interview",
    date: "17 July 2026",
    mood: "Confident",
    stress: "22%",
    summary:
      "Today was one of the biggest days of my college life. I felt nervous but excited...",
  },
  {
    id: 2,
    title: "Trip With Friends",
    date: "10 July 2026",
    mood: "Happy",
    stress: "8%",
    summary:
      "Finally went on a trip after months. It felt refreshing and peaceful...",
  },
  {
    id: 3,
    title: "Exam Week",
    date: "4 July 2026",
    mood: "Anxious",
    stress: "74%",
    summary:
      "Lots of assignments and exams. I couldn't sleep properly for two days...",
  },
];

export default function Memory() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = dummyMemories.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm">
            <BookOpen size={18} />
            PERSONAL MEMORY JOURNAL
          </div>

          <h1 className="mt-6 text-5xl font-bold">
            Memory <span className="text-blue-500">Lane</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-gray-400 leading-8">
            Preserve your memories, reflect on your journey, and let AI
            understand your emotions through every story.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-10 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl flex items-center gap-2 mx-auto transition"
          >
            <Plus size={20} />
            Create Memory
          </button>
        </div>

        <div className="mt-16">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-gray-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your memories..."
              className="w-full bg-[#0b1220] border border-gray-800 rounded-xl pl-12 pr-5 py-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {filtered.map((memory) => (
            <div
              key={memory.id}
              className="bg-[#0b1220] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar size={17} />
                  <span className="text-sm">{memory.date}</span>
                </div>

                <ArrowRight size={18} className="text-gray-500" />
              </div>

              <h2 className="text-2xl font-semibold mt-5">{memory.title}</h2>

              <p className="text-gray-400 mt-4 line-clamp-4">
                {memory.summary}
              </p>

              <div className="flex justify-between mt-8">
                <div className="flex items-center gap-2">
                  <Smile size={18} className="text-green-400" />
                  <span>{memory.mood}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Brain size={18} className="text-pink-400" />
                  <span>{memory.stress}</span>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <Image size={18} />
                  <span>2 Images</span>
                </div>

                <button className="text-blue-400 hover:text-blue-300">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full flex justify-center items-center shadow-2xl"
      >
        <Plus size={28} />
      </button>

      <CreateMemoryModal open={open} setOpen={setOpen} />

      <Footer />
    </div>
  );
}
