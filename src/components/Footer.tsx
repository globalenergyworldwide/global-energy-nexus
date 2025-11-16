import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-background border-t border-gold/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-navy">OE</span>
              </div>
              <h3 className="text-lg font-bold">Oil & Energy Corp</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading the global energy industry with innovation, excellence, and sustainable solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/refinery" className="text-sm hover:text-gold transition-colors">Refinery</Link></li>
              <li><Link to="/surveying" className="text-sm hover:text-gold transition-colors">Surveying & Drilling</Link></li>
              <li><Link to="/export-import" className="text-sm hover:text-gold transition-colors">Export & Import</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/p2p-platform" className="text-sm hover:text-gold transition-colors">P2P Trading Platform</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gold transition-colors">Investor Relations</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gold transition-colors">Partner With Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gold transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 text-gold" />
                <span>info@oilenergycorp.com</span>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Phone className="h-4 w-4 mt-0.5 text-gold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-gold" />
                <span>Global Headquarters<br />Energy Plaza, Suite 1000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Oil & Energy Corp. All rights reserved. | Powering the world's energy future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
