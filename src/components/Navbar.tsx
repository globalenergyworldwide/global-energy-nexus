import { NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <nav className="fixed w-full top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-gold">
            Global Energy
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <RouterNavLink to="/" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.home')}</RouterNavLink>
            <RouterNavLink to="/about" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.about')}</RouterNavLink>
            <RouterNavLink to="/refinery" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.refinery')}</RouterNavLink>
            <RouterNavLink to="/surveying" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.surveying')}</RouterNavLink>
            <RouterNavLink to="/export-import" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.export')}</RouterNavLink>
            <RouterNavLink to="/p2p-platform" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.p2p')}</RouterNavLink>
            <RouterNavLink to="/shop" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.shop')}</RouterNavLink>
            <RouterNavLink to="/investors" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.investors')}</RouterNavLink>
            <RouterNavLink to="/contact" className={({ isActive }) => isActive ? "text-gold" : "text-background hover:text-gold"}>{t('nav.contact')}</RouterNavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.dashboard')}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={signOut}
                  className="border-gold text-gold hover:bg-gold/10"
                >
                  {t('nav.signout')}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-gold hover:bg-gold-light text-navy font-semibold">
                  {t('nav.signin')}
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <RouterNavLink to="/" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.home')}</RouterNavLink>
            <RouterNavLink to="/about" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.about')}</RouterNavLink>
            <RouterNavLink to="/refinery" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.refinery')}</RouterNavLink>
            <RouterNavLink to="/surveying" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.surveying')}</RouterNavLink>
            <RouterNavLink to="/export-import" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.export')}</RouterNavLink>
            <RouterNavLink to="/p2p-platform" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.p2p')}</RouterNavLink>
            <RouterNavLink to="/shop" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.shop')}</RouterNavLink>
            <RouterNavLink to="/investors" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.investors')}</RouterNavLink>
            <RouterNavLink to="/contact" onClick={() => setIsOpen(false)} className="block text-background hover:text-gold">{t('nav.contact')}</RouterNavLink>
            
            <div className="pt-4 border-t border-gold/20">
              <LanguageSwitcher />
            </div>
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mb-2" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.dashboard')}
                  </Button>
                </Link>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  {t('nav.signout')}
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gold hover:bg-gold-light text-navy font-semibold">
                  {t('nav.signin')}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
