import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Linkedin, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react';
import { SITE_NAME, LOGO_USE_IMAGE, LOGO_IMAGE, LOGO_ALT, CONTACT, SOCIAL, NAV_ITEMS } from '@/config/site';

function Logo() {
  if (LOGO_USE_IMAGE) {
    return <img src={LOGO_IMAGE} alt={LOGO_ALT} className="h-9 w-auto" />;
  }
  return (
    <>
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">{SITE_NAME}</span>
    </>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  const socialLinks = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { key: 'twitter',  icon: Twitter,  label: 'Twitter'  },
    { key: 'github',   icon: Github,   label: 'GitHub'   },
  ].filter(s => SOCIAL[s.key]);

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Transforming data into actionable insights for better business decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-sm font-semibold mb-4 block">Quick links</span>
            <ul className="space-y-2">
              {NAV_ITEMS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-sm font-semibold mb-4 block">Contact</span>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-foreground transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.addressShort}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          {socialLinks.length > 0 && (
            <div>
              <span className="text-sm font-semibold mb-4 block">Connect</span>
              <div className="flex gap-3">
                {socialLinks.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={SOCIAL[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
