import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full bg-[#F4F0E7] border-x border-b border-black mx-auto flex flex-col flex-1">
      {/* Main Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 items-center relative overflow-hidden min-h-0">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:pl-16 xl:pl-20 py-10 lg:py-0 z-10">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-[64px] font-black tracking-tight text-[#000000] uppercase leading-[1.08] mb-4">
            NEBULOID GAMES
          </h1>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-[32px] font-bold text-[#000000] leading-snug mb-5">
            Play. Think. Challenge Yourself.
          </h2>

          <p className="text-[#333333] text-sm sm:text-base md:text-[17px] font-normal leading-relaxed max-w-[490px] mb-8">
            A collection of interactive games designed and crafted by Nebuloid
            to challenge your logic, speed, memory, and creativity.
          </p>

          <div>
            <Link
              href="/our-games"
              className="inline-flex items-center justify-center px-7 py-3 bg-[#FEF6E4] hover:bg-[#FAEDD0] text-[#000000] border border-[#E6DCC3] rounded-[14px] font-serif text-[15px] sm:text-[16px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:shadow-sm active:scale-95 cursor-pointer select-none"
            >
              EXPLORE NOW
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Illustration */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end px-6 sm:px-10 lg:pr-12 xl:pr-16 py-8 lg:py-0 relative w-full h-full">
          <div className="relative w-full max-w-[580px] xl:max-w-[640px] aspect-[1.3/1] flex items-center justify-center">
            <Image
              src="/hero-img.png"
              alt="Nebuloid 3D Math and Logic Games Illustration"
              fill
              priority
              className="object-contain object-center lg:object-right"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <div className="w-full border-t border-black grid grid-cols-3 bg-[#F4F0E7] shrink-0">
        {/* Item 1 */}
        <div className="flex items-center justify-center px-6 py-5 border-r border-black">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            14+ UNIQUE GAMES
          </span>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-center px-6 py-5 border-r border-black">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            CRAFTED BY NEBULOID
          </span>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-center px-6 py-5">
          <span className="font-serif text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-bold text-black uppercase tracking-tight text-center">
            PLAY <span className="italic font-serif font-normal">&amp;</span>{" "}
            GROW
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
