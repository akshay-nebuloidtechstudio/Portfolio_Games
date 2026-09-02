import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F4F0E7] mx-auto pt-5 pb-5 px-8">
      {/* Top Main Section */}
      <div className="flex justify-between mx-auto px-4 pt-7 pb-2 max-md:flex-col max-lg:flex-col gap-8 max-md:items-start">
        {/* Column 1: Brand & Description */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-start">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-black leading-none mb-1">
            NEBULOID
          </h2>
          <h3
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold uppercase tracking-tight leading-none mb-6 select-none"
            style={{
              WebkitTextStroke: "1.5px #000000",
              color: "transparent",
            }}
          >
            TECH STUDIO
          </h3>
          <p className="text-[#333333] text-sm sm:text-base leading-relaxed max-w-[420px]">
            Event experience &amp; creative technology — designed, built, and
            delivered as one seamless ecosystem.
          </p>
        </div>

        {/* Column 2: Explore Links */}
        <div className="flex flex-col md:col-span-3 lg:col-span-3">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-black mb-5">
            Explore
          </h4>
          <ul className="flex flex-col space-y-3 text-sm sm:text-base text-[#333333]">
            <li>
              <Link
                href="/our-games"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Games &amp; Modules
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                School Licenses
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Success Stories
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div className="md:col-span-3 lg:col-span-4 flex flex-col">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-black mb-5">
            Contact Us
          </h4>
          <div className="flex flex-col space-y-4 text-sm sm:text-base text-[#333333]">
            {/* Location */}
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-black shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="leading-snug">
                House No. 944, Block - C, Sushant Lok 1<br />
                Gurugram, Haryana, India 122001
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-black shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.251.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="tel:+917303922260"
                className="hover:text-black transition-colors"
              >
                +91 7303922260
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-black shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <a
                href="mailto:nebuloidtechstudio@gmail.com"
                className="hover:text-black transition-colors"
              >
                nebuloidtechstudio@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="w-full pt-4 mt-4 border-t border-[#000000]/40 flex items-center">
        <p className="font-serif text-sm text-[#444444]">
          &copy; 2026 Nebuloid Tech Studio LLP
        </p>
      </div>
    </footer>
  );
};

export default Footer;