import Link from 'next/link';
import {
  Search,
  BarChart3,
  Wallet,
  Handshake,
  Shield,
  Users,
  Building2,
  BadgeCheck,
  Heart,
  Eye,
  UserPlus,
  TrendingUp,
  MapPin,
  ChevronRight,
} from 'lucide-react';

// Stats data
const stats = [
  { label: 'Mosques Registered', value: '2,450+', icon: Building2, color: 'bg-emerald-500' },
  { label: 'Total Donations', value: '₹8.5 Cr+', icon: Wallet, color: 'bg-blue-500' },
  { label: 'Active Volunteers', value: '1,200+', icon: Users, color: 'bg-purple-500' },
  { label: 'Cities Covered', value: '180+', icon: MapPin, color: 'bg-orange-500' },
];

// How it works steps
const steps = [
  {
    icon: Search,
    title: 'Search',
    titleUrdu: 'تلاش کریں',
    description: 'Apne ilaqe ki masjid talash karein aur uski mukammal jankari dekhein.',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    icon: Eye,
    title: 'Verify',
    titleUrdu: 'تصدیق کریں',
    description: 'Masjid ki aamdani, kharch, bills, aur staff salary records check karein.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    icon: Heart,
    title: 'Donate',
    titleUrdu: 'عطیہ دیں',
    description: 'Tasalli ke saath seedha masjid ke bank account mein donate karein.',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    icon: Handshake,
    title: 'Volunteer',
    titleUrdu: 'خدمت کریں',
    description: 'Apne ilaqe ki masjid ki jankari update karein aur community ki madad karein.',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
];

// Features
const features = [
  {
    icon: BarChart3,
    title: 'Financial Transparency',
    description: 'Har masjid ki aamdani aur kharch ki mukammal report — bills, salary, maintenance sab kuch.',
  },
  {
    icon: Users,
    title: 'Imam & Staff Details',
    description: 'Imam, Muazzin ki profile, qualification, salary amount aur payment history — paid ya unpaid.',
  },
  {
    icon: Building2,
    title: 'Property Information',
    description: 'Masjid se judi zameen, dukaan, hall ki jankari aur unse hone wali aamdani.',
  },
  {
    icon: Shield,
    title: 'Secure Donations',
    description: 'Direct bank transfer ya UPI se donate karein — beech mein koi bichauliya nahi.',
  },
  {
    icon: UserPlus,
    title: 'Volunteer System',
    description: 'Apne ilaqe ki masjid ki jankari add aur update karein — community driven platform.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparency Score',
    description: 'Har masjid ko 0-100 score mile — kitni transparent hai, kitne regular updates hain.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-30" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
              <span className="text-xl">🕌</span>
              <span>Open Source Mosque Transparency Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Masjidon Ki Hifazat,
              <br />
              <span className="text-emerald-200">Shafafiyat Ka Safar</span>
            </h1>

            <p className="text-lg md:text-xl text-emerald-100 mb-4 font-light">
              Protecting Mosques Through Transparency
            </p>

            <p className="text-emerald-200/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Har masjid ki financial transparency ensure karein. Aamdani, kharch,
              staff salary, property details — sab kuch ek jagah. Chanda chori se
              chhutkara aur donors ko bharosa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/search"
                className="flex items-center space-x-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3.5 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl"
              >
                <Search size={20} />
                <span>Search Mosques</span>
              </Link>
              <Link
                href="/volunteer/register"
                className="flex items-center space-x-2 bg-emerald-600 text-white hover:bg-emerald-500 border-2 border-emerald-400 px-8 py-3.5 rounded-xl text-lg font-bold transition-all"
              >
                <UserPlus size={20} />
                <span>Become a Volunteer</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 card-hover"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.color} text-white mb-3`}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Kaise Kaam Karta Hai?
            </h2>
            <p className="text-gray-500 text-lg">
              Sirf 4 aasan qadam mein masjidon ki madad karein
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300" />
                  )}

                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl border-2 ${step.color} mb-4 relative`}
                  >
                    <Icon size={32} />
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-emerald-600 font-medium mb-2">
                    {step.titleUrdu}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              App Ki Khaas Features
            </h2>
            <p className="text-gray-500 text-lg">
              Masjidon ki shafafiyat ke liye zaroori sab kuch ek jagah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apne Ilaqe Ki Masjid Register Karein
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Agar aap apni masjid ki transparency ensure karna chahte hain ya
            volunteer ban kar masjidon ki madad karna chahte hain, to abhi shuru
            karein.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/masjid/register"
              className="flex items-center space-x-2 bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-3.5 rounded-xl text-lg font-bold transition-all shadow-lg"
            >
              <Building2 size={20} />
              <span>Register Mosque</span>
              <ChevronRight size={20} />
            </Link>
            <Link
              href="/volunteer/register"
              className="flex items-center space-x-2 border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-xl text-lg font-bold transition-all"
            >
              <UserPlus size={20} />
              <span>Join as Volunteer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
