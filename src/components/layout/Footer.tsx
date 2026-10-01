import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">CampusConnect</span>
            </Link>
            <p className="mt-3 text-xs text-slate-400 font-medium">
              Discover. Register. Participate. Celebrate.
            </p>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Official centralized event management & certification system for collegiate technical symposiums, hackathons, and cultural festivities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/events" className="hover:text-indigo-400 transition-colors">Explore All Events</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/my-registrations" className="hover:text-indigo-400 transition-colors">My Registrations</Link></li>
              <li><Link to="/certificates" className="hover:text-indigo-400 transition-colors">Verified Certificates</Link></li>
              <li><Link to="/admin/login" className="hover:text-indigo-400 transition-colors">Faculty / Admin Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Event Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/events?category=Technology" className="hover:text-indigo-400 transition-colors">Hackathons & Technology</Link></li>
              <li><Link to="/events?category=Cultural" className="hover:text-indigo-400 transition-colors">Cultural & Stage Arts</Link></li>
              <li><Link to="/events?category=Sports" className="hover:text-indigo-400 transition-colors">Inter-College Sports</Link></li>
              <li><Link to="/events?category=Workshop" className="hover:text-indigo-400 transition-colors">Hands-on Workshops</Link></li>
              <li><Link to="/events?category=Competition" className="hover:text-indigo-400 transition-colors">Speed Coding Competitions</Link></li>
            </ul>
          </div>

          {/* College Campus Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Campus Coordination</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Institute of Aeronautical Engineering (IARE), Dundigal, Hyderabad, Telangana 500043</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>events@iare.ac.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 (040) 29705852 / 53</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} CampusConnect Events. Academic B.Tech CSE Project Edition.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for college campuses</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
