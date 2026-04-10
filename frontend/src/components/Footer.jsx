import { SiLinkedin, SiFacebook, SiX, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300">

      <button
        type="button"
        aria-label="Back to top"
        className="w-full bg-gray-700 text-center py-3 text-sm hover:bg-[#2f3f55] cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>


      <nav className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Footer">
        <div>
          <h3 className="text-white font-semibold mb-3">Get to know us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press Releases</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Connect with us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Facebook</li>
            <li className="hover:underline cursor-pointer">X (Twitter)</li>
            <li className="hover:underline cursor-pointer">Instagram</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Make money with us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Sell on Our Platform</li>
            <li className="hover:underline cursor-pointer">Affiliate Program</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Let us help you</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Returns Centre</li>
            <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>
      </nav>

      <div className="border-t border-gray-700" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white font-bold text-lg">ShopEase</div>

        <div className="flex gap-4">
          <a aria-label="Facebook" className="hover:text-white" href="#">
            <SiFacebook className="w-5 h-5" />
          </a>
          <a aria-label="X" className="hover:text-white" href="#">
            <SiX className="w-5 h-5" />
          </a>
          <a aria-label="Instagram" className="hover:text-white" href="#">
            <SiInstagram className="w-5 h-5" />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/sai-teja-vadagam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <SiLinkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
