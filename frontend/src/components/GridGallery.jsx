const images = [
  "/img1.jpeg",
  "/img2.jpeg",
  "/img3.jpeg",
  "/img4.jpeg",
  "/img5.jpeg",
  "/img6.jpeg"
];

const GridGallery = () => {
  return (
    <div id="grid" className="bg-black text-white py-20 px-6 flex flex-col items-center">

      <h2 className="text-4xl font-bold mb-2 text-center">
        Life in <span className="text-blue-400">Grid</span>
      </h2>

      <p className="text-slate-400 mb-10 text-center">
        // Snapshots of happy journey
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="h-56 rounded-xl overflow-hidden border border-white/10 
            hover:scale-[1.03] hover:shadow-blue-500/20 hover:shadow-lg transition duration-300"
          >
            <img
              src={src}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default GridGallery;