const images = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg",
  "/img6.jpg"
];

const GridGallery = () => {
  return (
    <div id="grid" className="bg-black text-white py-20 px-6">

      <h2 className="text-4xl font-bold mb-2">
        Life in <span className="text-blue-400">Grid</span>
      </h2>

      <p className="text-slate-400 mb-10">
        // Snapshots of my journey
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-white/10 hover:scale-[1.03] transition duration-300"
          >
            <img src={src} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default GridGallery;