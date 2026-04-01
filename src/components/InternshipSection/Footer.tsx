import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-black text-gray-400 py-8 px-6 md:px-12 border-t border-zinc-800">
          
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <span className="text-white font-bold text-xl tracking-tighter">
            BSERC<span className="text-white">.</span>
          </span>
        </div>

        {/* Center: Copyright */}
        <div className="flex-1 flex justify-center">
          <p className="text-sm whitespace-nowrap">
            &copy; {currentYear} BSERC. All rights reserved.
          </p>
        </div>

        {/* Right: Navigation Links */}
        <nav className="flex-1 flex justify-end">
          <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;