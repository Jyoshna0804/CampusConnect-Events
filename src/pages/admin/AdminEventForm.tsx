import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { AdminNavbar } from '../../components/layout/AdminNavbar';
import { EventCategory } from '../../types';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export const AdminEventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { events, addEvent, updateEvent } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const existingEvent = id ? events.find(e => e.id === id) : undefined;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology' as EventCategory,
    shortDescription: '',
    description: '',
    about: '',
    date: '10 November 2026',
    time: '10:00 AM',
    endTime: '04:00 PM',
    location: 'IARE Campus, Seminar Hall 1',
    organizer: 'Department of Computer Science & Engineering',
    capacity: 100,
    registrationDeadline: '08 November 2026',
    eligibility: 'All B.Tech / M.Tech students with college ID card.',
    rules: 'Bring personal laptops and college ID card.\nArrive 15 minutes prior to start time.\nMaintain academic discipline.',
    image: '/src/assets/images/hackathon_tech_event_1790830918069.jpg',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        title: existingEvent.title,
        category: existingEvent.category,
        shortDescription: existingEvent.shortDescription,
        description: existingEvent.description,
        about: existingEvent.about,
        date: existingEvent.date,
        time: existingEvent.time,
        endTime: existingEvent.endTime,
        location: existingEvent.location,
        organizer: existingEvent.organizer,
        capacity: existingEvent.capacity,
        registrationDeadline: existingEvent.registrationDeadline,
        eligibility: existingEvent.eligibility,
        rules: existingEvent.rules.join('\n'),
        image: existingEvent.image,
        status: existingEvent.status,
      });
    }
  }, [existingEvent]);

  const categories: EventCategory[] = [
    'Technology',
    'Cultural',
    'Sports',
    'Workshop',
    'Seminar',
    'Competition',
    'Club Activity',
  ];

  const imageOptions = [
    { label: 'Hackathon & Tech Lab', path: '/src/assets/images/hackathon_tech_event_1790830918069.jpg' },
    { label: 'Cultural Fest Stage', path: '/src/assets/images/cultural_fest_dance_1790830929308.jpg' },
    { label: 'Campus Athletic Ground', path: '/src/assets/images/sports_meet_stadium_1790830942645.jpg' },
    { label: 'Campus Festival Twilight', path: '/src/assets/images/hero_campus_festival_1790830905441.jpg' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Event Title is required.');
      return;
    }
    if (!formData.shortDescription.trim()) {
      setError('Short Description is required.');
      return;
    }

    const rulesArray = formData.rules.split('\n').map(r => r.trim()).filter(Boolean);

    if (isEditing && id) {
      updateEvent(id, {
        ...formData,
        rules: rulesArray,
      });
      navigate('/admin/events');
    } else {
      const created = addEvent({
        ...formData,
        rules: rulesArray,
        schedule: [
          { time: `${formData.time} - 11:30 AM`, activity: 'Inauguration & Keynote Address' },
          { time: '11:45 AM - 01:30 PM', activity: 'Main Session & Hands-on Work' },
          { time: '02:30 PM - ' + formData.endTime, activity: 'Evaluations & Valedictory Ceremony' },
        ],
        contactEmail: 'events@iare.ac.in',
        contactPhone: '+91 98480 12345',
      });
      navigate(`/events/${created.id}`);
    }
  };

  const applyTemplate = (type: 'hackathon' | 'cultural' | 'sports' | 'workshop' | 'seminar') => {
    switch (type) {
      case 'hackathon':
        setFormData({
          title: 'Smart India AI & Cloud Hackathon 2026',
          category: 'Technology',
          shortDescription: '36-hour inter-college AI & Web3 product sprint solving real-world civic and healthcare challenges.',
          description: 'Join over 300 engineering innovators to build full-stack AI applications, decentralized protocols, and smart IoT devices. Industry mentors from Microsoft, AWS, and Google Cloud on-site.',
          about: 'Includes high-speed campus Wi-Fi, sponsored compute credits, midnight pizza snacks, and cash awards worth INR 1,00,000.',
          date: '14 November 2026',
          time: '09:00 AM',
          endTime: '05:00 PM (Next Day)',
          location: 'Innovation & Incubation Center, Block D, IARE',
          organizer: 'Department of Computer Science & Engineering (CSI Student Chapter)',
          capacity: 150,
          registrationDeadline: '10 November 2026',
          eligibility: 'Open to all undergraduate students (teams of 2-4 members).',
          rules: 'All code must be written during the competition window.\nTeams must submit public GitHub repositories.\nBring personal laptops and chargers.',
          image: '/src/assets/images/hackathon_tech_event_1790830918069.jpg',
          status: 'upcoming',
        });
        break;
      case 'cultural':
        setFormData({
          title: 'Dhwani: Collegiate Battle of the Bands & Dance Fest',
          category: 'Cultural',
          shortDescription: 'Electrifying musical showdown and group dance championship under open-air amphitheatre stage lights.',
          description: 'Showcase your stage flair! Compete across solo acoustic, fusion rock, western group choreography, and classical drama.',
          about: 'Judged by professional choreographers and music producers. Trophies and performance contracts awarded.',
          date: '22 November 2026',
          time: '04:00 PM',
          endTime: '10:00 PM',
          location: 'Central Amphitheatre & Open Air Auditorium, IARE',
          organizer: 'Student Cultural Committee & Fine Arts Guild',
          capacity: 300,
          registrationDeadline: '19 November 2026',
          eligibility: 'All students with valid institute ID card.',
          rules: 'Track audio tracks must be submitted 24 hours prior.\nPerformance duration must not exceed 8 minutes.\nStrict campus decency code applies.',
          image: '/src/assets/images/cultural_fest_dance_1790830929308.jpg',
          status: 'upcoming',
        });
        break;
      case 'sports':
        setFormData({
          title: 'IARE Premier League: Inter-Dept Cricket & Football Tournament',
          category: 'Sports',
          shortDescription: 'High-octane departmental athletic league featuring 10-over cricket cups and 7-a-side football finals.',
          description: 'Cheer for your department branches! Represent CSE, ECE, Mechanical, or Aeronautical in competitive sports matches.',
          about: 'Live commentary, certified referees, high-definition match streaming, and gold championship medals.',
          date: '02 December 2026',
          time: '08:30 AM',
          endTime: '05:30 PM',
          location: 'College Sports Pavilion & Synthetic Athletics Ground',
          organizer: 'Department of Physical Education & Sports Council',
          capacity: 200,
          registrationDeadline: '28 November 2026',
          eligibility: 'Enrolled undergraduate students physically fit to participate.',
          rules: 'Proper sports uniform and safety studs required.\nReferee verdict is absolute and final.\nReporting time is 30 mins prior to match whistle.',
          image: '/src/assets/images/sports_meet_stadium_1790830942645.jpg',
          status: 'upcoming',
        });
        break;
      case 'workshop':
        setFormData({
          title: 'Full-Stack Agentic AI & Next.js Masterclass',
          category: 'Workshop',
          shortDescription: 'Hands-on bootcamp architecting real-time multimodal agents and vector databases with TypeScript.',
          description: 'Step-by-step technical training lab guided by senior software engineers. Build and deploy autonomous agent microservices.',
          about: 'Complimentary cloud compute environments, code templates, and verified course completion certificates.',
          date: '08 December 2026',
          time: '10:00 AM',
          endTime: '04:30 PM',
          location: 'High Performance Computing Lab 4, CSE Block',
          organizer: 'AIML Club & Google Developer Student Club (GDSC)',
          capacity: 80,
          registrationDeadline: '05 December 2026',
          eligibility: '2nd, 3rd, and 4th Year B.Tech students.',
          rules: 'Bring personal laptop with Node.js installed.\nFull session attendance required for certificate.',
          image: '/src/assets/images/hero_campus_festival_1790830905441.jpg',
          status: 'upcoming',
        });
        break;
      case 'seminar':
        setFormData({
          title: 'Industry 5.0 & Autonomous Drone Systems Keynote',
          category: 'Seminar',
          shortDescription: 'Distinguished lecture on next-generation avionics, computer vision, and aerospace robotics.',
          description: 'Keynote discourse by Chief Technology Officer from defense avionics labs. Covers edge perception, hardware telemetry, and engineering careers.',
          about: 'Includes interactive fireside Q&A with speaker, high tea, and research paper publication roadmaps.',
          date: '15 December 2026',
          time: '02:00 PM',
          endTime: '04:30 PM',
          location: 'Main Auditorium, IARE',
          organizer: 'Department of Aeronautical Engineering & IEEE Aerospace Society',
          capacity: 250,
          registrationDeadline: '12 December 2026',
          eligibility: 'All students and faculty members.',
          rules: 'Please occupy seats 15 minutes before inaugural address.\nMaintain silence during lecture.',
          image: '/src/assets/images/hackathon_tech_event_1790830918069.jpg',
          status: 'upcoming',
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={isEditing ? 'Edit Campus Event' : 'Create Campus Event'}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl w-full mx-auto">
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin/events')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Event List</span>
            </button>
          </div>

          {/* Quick Auto-fill Templates (for faster posting) */}
          {!isEditing && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                ⚡ Quick 1-Click Event Templates (Auto-fill sample data)
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => applyTemplate('hackathon')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
                >
                  💡 AI Hackathon 2026
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('cultural')}
                  className="px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200 transition-colors"
                >
                  🎭 Cultural Dance Fest
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('sports')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-semibold border border-cyan-200 transition-colors"
                >
                  ⚽ Sports League
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('workshop')}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200 transition-colors"
                >
                  🤖 Hands-on Workshop
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate('seminar')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
                >
                  🎤 Keynote Tech Talk
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h1 className="text-xl font-black text-slate-900 mb-1">
              {isEditing ? `Edit "${formData.title}"` : 'Post New Campus Event'}
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              Complete the schedule, category, venue, and rules for student enrollment.
            </p>

            {error && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Event Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. CodeSprint Hackathon 2026"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-hidden focus:border-indigo-500 text-sm"
                />
              </div>

              {/* Category, Date, Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as EventCategory })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:bg-white focus:outline-hidden"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 20 October 2026"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Maximum Seats</label>
                  <input
                    type="number"
                    required
                    min={10}
                    max={1000}
                    value={formData.capacity}
                    onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Timings & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    placeholder="10:00 AM"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="05:00 PM"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registration Deadline</label>
                  <input
                    type="text"
                    value={formData.registrationDeadline}
                    onChange={e => setFormData({ ...formData, registrationDeadline: e.target.value })}
                    placeholder="18 October 2026"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / Venue</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="IARE Campus, Auditorium"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organizing Body / Department</label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={e => setFormData({ ...formData, organizer: e.target.value })}
                    placeholder="Department of CSE & CSI Chapter"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Description <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence summary for event cards"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed overview of event activities and objectives"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Rules and Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rules (One per line)</label>
                  <textarea
                    rows={4}
                    value={formData.rules}
                    onChange={e => setFormData({ ...formData, rules: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                  <textarea
                    rows={4}
                    value={formData.eligibility}
                    onChange={e => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Event Visual Poster Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Event Poster / Banner Image</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {imageOptions.map(opt => (
                    <div
                      key={opt.path}
                      onClick={() => setFormData({ ...formData, image: opt.path })}
                      className={`cursor-pointer rounded-2xl border-2 p-1.5 transition-all ${
                        formData.image === opt.path ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={opt.path} alt={opt.label} className="w-full h-18 object-cover rounded-xl" />
                      <p className="text-[11px] font-semibold text-slate-700 mt-1 truncate">{opt.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/events')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Event'}</span>
                </button>
              </div>

            </form>
          </div>

        </main>
      </div>
    </div>
  );
};
