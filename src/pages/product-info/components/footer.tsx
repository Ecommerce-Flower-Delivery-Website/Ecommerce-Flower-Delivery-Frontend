import { Facebook, Instagram, PaintRoller, Send, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { contactImgs } from "../../components/ContactUs/data/contact.imgs";

export function Footer() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-black">
      {/* Newsletter Section */}
      <div className="py-10 px-4 md:px-10 border-b sm:border-r border-black sm:border-b-0">
        <h3 className="mb-4">Remember to offer beautiful flowers</h3>
        <p className="text-sm text-gray-600 mb-4">
          from Kyiv LuxeBouquets Valentines Day, Mothers Day, Christmas...
          Reminds you 7 days before. No spam or sharing your address
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border h-[47px] border-black focus:outline-none"
          />
          <button className="w-full bg-black text-white p-3 hover:bg-gray-900">
            REMIND
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-10 px-4 md:px-10 border-b md:border-r border-black md:border-b-0">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-muted-foreground">
            Contact Us
          </h3>

          <div className="space-y-2">
            <div>
              <p className="text-sm ">Address:</p>
              <p className="text-sm">15/4 Khreshchatyk Street, Kyiv</p>
            </div>

            <div>
              <p className="text-sm ">Phone:</p>
              <p className="text-sm">+380980099777</p>
            </div>

            <div>
              <p className="text-sm ">General Enquiry:</p>
              <p className="text-sm">Kiev.Florist.Studio@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-muted-foreground">
            Follow Us
          </h2>
          <div className="flex gap-6">
            {contactImgs.map((icon, index) => {
              return (
                <Link
                  key={index}
                  to="#"
                  className=" hover:text-foreground transition-colors"
                >
                  <img src={icon} className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              );
            })}

            <Link to="#" className=" hover:text-foreground transition-colors">
              <Send className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Shop Links */}
      <div className="py-10 px-4 md:px-10 space-y-4 border-b sm:border-r md:border-r border-black sm:border-b-0">
        <h3 className="text-lg font-medium text-muted-foreground">Shop</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              All Products
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Fresh Flowers
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Dried Flowers
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Live Plants
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Designer Vases
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Aroma Candles
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Freshener Diffuser
            </a>
          </li>
        </ul>
        <h3 className="mt-6 mb-4">Service</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Flower Subscription
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Wedding & Event Decor
            </a>
          </li>
        </ul>
      </div>

      {/* About Links */}
      <div className="py-10 px-4 md:px-10 space-y-4">
        <h2 className="text-lg font-medium text-muted-foreground">About Us</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Our story
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Shipping & returns
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Terms & conditions
            </a>
          </li>
          <li>
            <a href="#" className="text-sm hover:text-gray-600">
              Privacy policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
