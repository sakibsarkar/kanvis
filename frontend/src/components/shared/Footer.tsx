import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="py-5 lg:py-10 layout_container mx-auto flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <span>Logo</span>
          <p className="max-w-60">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            delectus?
          </p>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-3 justify-between">
          <div>
            <h3 className="text-lg font-semibold uppercase mb-2">About</h3>
            <ul className="flex flex-col gap-2 text-slate-700">
              <li>
                <Link href="/">About us</Link>
              </li>
              <li>
                <Link href="/">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase mb-2">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-2 text-slate-700">
              <li>
                <Link href="/">Shop</Link>
              </li>
              <li>
                <Link href="/">Cart</Link>
              </li>
              <li>
                <Link href="/">Terms and Conditions</Link>
              </li>
              <li>
                <Link href="/">Privacy and Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase mb-2">Follow us</h3>
            <ul className="flex flex-col gap-2 text-slate-700">
              <li>
                <Link href="/">Facebook</Link>
              </li>
              <li>
                <Link href="/">Twitter</Link>
              </li>
              <li>
                <Link href="/">Instagram</Link>
              </li>
              <li>
                <Link href="/">Youtube</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase">Subscribe</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
