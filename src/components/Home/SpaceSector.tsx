 

export default function SpaceSector() {
  return (
    <section className="w-full px-6 md:px-20 py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-blue-500 font-semibold tracking-widest uppercase mb-4 text-sm">
            Space Sector in India
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Hon&apos;ble Prime Minister <br />
            Shri Narendra Modi:
          </h1>

          <p className="text-gray-400 mb-4 leading-relaxed text-sm md:text-base">
            The Government of India, under the visionary leadership of
            Honorable PM Shri Narendra Modi, has initiated groundbreaking
            reforms in the space sector.
          </p>

          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            These initiatives are designed to enhance and promote space
            education, research, and development across the nation. A key
            highlight of these efforts is the celebration of National Space
            Day on August 23 to commemorate the successful landing of
            Chandrayaan-3 on the moon in 2023. This event is organized by the
            Bharat Space Education Research Centre to promote skills in
            academia, research, and industry for Viksit Bharat 2047.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[260px] md:h-[360px] rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Glow effect */}
          <div className="absolute inset-0 z-10" />

          

          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" style={{ zIndex: 0 }}>
            <source src="/video/pm.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}