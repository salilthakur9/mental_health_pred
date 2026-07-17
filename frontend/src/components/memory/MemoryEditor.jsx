import { useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

export default function MemoryEditor() {
  const [blocks, setBlocks] = useState([
    { id: Date.now(), type: "text", value: "" },
  ]);

  const update = (id, value) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value } : b));
  };

  const insertText = (index) => {
    const arr = [...blocks];
    arr.splice(index + 1, 0, {
      id: Date.now(),
      type: "text",
      value: ""
    });
    setBlocks(arr);
  };

  const insertImage = (index, file) => {
    if (!file) return;
    const arr = [...blocks];
    arr.splice(index + 1, 0, {
      id: Date.now(),
      type: "image",
      value: URL.createObjectURL(file)
    });
    setBlocks(arr);
  };

  const remove = (id) => {
    if (blocks.length === 1) return;
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <div key={block.id}>
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-5">
            {block.type === "text" ? (
              <textarea
                rows={5}
                value={block.value}
                placeholder="Start writing..."
                onChange={(e) => update(block.id, e.target.value)}
                className="w-full bg-transparent resize-none outline-none text-lg text-gray-300"
              />
            ) : (
              <img
                src={block.value}
                className="rounded-xl w-full max-h-[500px] object-cover"
                alt=""
              />
            )}
          </div>

          <div className="flex items-center gap-3 mt-3 ml-2">
            <button
              onClick={() => insertText(index)}
              className="w-10 h-10 rounded-lg bg-[#111827] hover:bg-blue-600 flex items-center justify-center transition"
            >
              <Plus size={18} />
            </button>

            <label className="w-10 h-10 rounded-lg bg-[#111827] hover:bg-blue-600 flex items-center justify-center cursor-pointer transition">
              <ImagePlus size={18} />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  insertImage(index, e.target.files[0])
                }
              />
            </label>

            <button
              onClick={() => remove(block.id)}
              className="w-10 h-10 rounded-lg bg-[#111827] hover:bg-red-600 flex items-center justify-center transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}