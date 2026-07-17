import { X, ImagePlus, Smile, Minus, Type, Save } from "lucide-react";
import { useState } from "react";
import MemoryEditor from "./MemoryEditor";

export default function CreateMemoryModal({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-5">
      <div className="w-full max-w-6xl h-[90vh] rounded-3xl border border-blue-500/20 bg-[#0B1120] shadow-[0_0_60px_rgba(37,99,235,.18)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Create Memory</h2>
            <p className="text-gray-400 mt-1">Write your thoughts, moments and emotions.</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-11 h-11 rounded-xl border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition"
          >
            <X size={22} className="text-white" />
          </button>
        </div>

        <div className="px-8 py-5 border-b border-white/10 flex items-center gap-3">
          <button className="w-11 h-11 rounded-xl bg-[#111827] hover:bg-blue-600 transition flex items-center justify-center">
            <Type size={20} className="text-white" />
          </button>
          <button className="w-11 h-11 rounded-xl bg-[#111827] hover:bg-blue-600 transition flex items-center justify-center">
            <ImagePlus size={20} className="text-white" />
          </button>
          <button className="w-11 h-11 rounded-xl bg-[#111827] hover:bg-blue-600 transition flex items-center justify-center">
            <Smile size={20} className="text-white" />
          </button>
          <button className="w-11 h-11 rounded-xl bg-[#111827] hover:bg-blue-600 transition flex items-center justify-center">
            <Minus size={20} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memory title..."
            className="w-full bg-transparent text-4xl font-bold text-white outline-none placeholder:text-gray-500"
          />

          <MemoryEditor />
        </div>

        <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Your memories stay private unless you choose to share them.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-red-500 hover:text-red-400 transition text-white"
            >
              Cancel
            </button>

            <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 font-medium">
              <Save size={18} />
              Save Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}