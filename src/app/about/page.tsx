import React from 'react';
import Link from 'next/link';
import { Shield, Heart, Eye, Users, Github, Globe, Scale } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const missions = [
  {
    icon: Shield,
    title: 'Masjidon Ki Hifazat',
    description: 'Har masjid ki ownership, property, aur legal status ki jankari ek jagah — taaki koi masjid ki zameen na daba sake.',
  },
  {
    icon: Eye,
    title: 'Financial Transparency',
    description: 'Aamdani, kharch, bills, salary — sab kuch public record mein. Donors ko pata rahe ki unka paisa kahan ja raha hai.',
  },
  {
    icon: Scale,
    title: 'Chanda Chori Se Chhutkara',
    description: 'Joh log masjidon ke naam par raseedein chhapwa ke door door jakar chanda karte hain — ab donors seedha masjid ko donate karenge.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Volunteers apne ilaqe ki masjidon ki jankari fill karein aur update karein — ye platform community ka hai, community ke liye hai.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🕌</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MasjidGuard</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Ek open-source platform jo masjidon ki financial transparency, hifazat,
            aur chanda chori se chhutkara dilane ke liye banaya gaya hai.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Hamara Maqsad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission) => {
              const Icon = mission.icon;
              return (
                <div key={mission.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{mission.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{mission.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium mb-6">
            <Github size={18} />
            Open Source Project
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ye Project Sab Ke Liye Hai
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            MasjidGuard ek open-source project hai. Koi bhi developer contribute
            kar sakta hai, issues report kar sakta hai, ya features suggest kar
            sakta hai. Source code GitHub par available hai.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Github size={20} />
              View on GitHub
            </a>
            <Link href="/volunteer/register">
              <Button variant="primary" size="lg">
                <Heart size={18} className="mr-2" />
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Contribute */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Kaise Hissa Daalein?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                👨‍💻
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Developer</h3>
              <p className="text-sm text-gray-500">Code contribute karein, bugs fix karein, naye features add karein.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Volunteer</h3>
              <p className="text-sm text-gray-500">Apne ilaqe ki masjidon ki jankari platform par add karein.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                📢
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Spread the Word</h3>
              <p className="text-sm text-gray-500">Is platform ke baare mein logon ko batayen aur awareness failayein.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Raabta Karein</h2>
          <p className="text-gray-500 mb-6">
            Koi sawaal, mashwara, ya shirakat ka iraada ho to zaroor raabta karein.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-gray-600">
            <span className="flex items-center gap-1">📧 contact@masjidguard.org</span>
            <span className="flex items-center gap-1">
              <Globe size={14} /> masjidguard.org
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
