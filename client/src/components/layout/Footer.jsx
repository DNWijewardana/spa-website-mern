import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-sage-900 text-sage-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-display text-2xl">Serenity<span className="text-sand-500">.</span></p>
          <p className="mt-3 text-sm text-sage-300">
            Your sanctuary for deep rest, radiant skin, and restored calm.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sage-100">Explore</h4>
          <ul className="space-y-2 text-sm text-sage-300">
            <li><Link to="/services" className="hover:text-sand-500">Services</Link></li>
            <li><Link to="/membership" className="hover:text-sand-500">Membership</Link></li>
            <li><Link to="/gift-cards" className="hover:text-sand-500">Gift Cards</Link></li>
            <li><Link to="/blog" className="hover:text-sand-500">Journal</Link></li>
            <li><Link to="/about" className="hover:text-sand-500">About</Link></li>
            <li><Link to="/booking" className="hover:text-sand-500">Book</Link></li>
            <li><Link to="/contact" className="hover:text-sand-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sage-100">Visit</h4>
          <ul className="space-y-2 text-sm text-sage-300">
            <li>12 Blossom Lane, Colombo</li>
            <li>Mon–Sun · 9am–6pm</li>
            <li>hello@serenityspa.com</li>
            <li>+94 11 234 5678</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sage-100">Stay in touch</h4>
          <form className="flex overflow-hidden rounded-full bg-sage-700">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent px-4 py-2 text-sm text-sage-100 placeholder-sage-300 outline-none"
            />
            <button className="bg-sand-500 px-4 text-sm text-white">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-sage-700 py-6 text-center text-xs text-sage-300">
        © {new Date().getFullYear()} Serenity Spa. Crafted with calm.
      </div>
    </footer>
  );
}
