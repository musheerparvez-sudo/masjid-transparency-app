# 🕌 MasjidGuard — Mosque Transparency App

> **Masjidon Ki Hifazat, Shafafiyat Ka Safar**
> Protecting Mosques Through Transparency

MasjidGuard is an open-source platform designed to bring **financial transparency** to mosques. Every mosque can register, show their income, expenses, staff salaries, property details, and bank accounts — so donors can contribute with confidence and chanda (donation) fraud is eliminated.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.15-teal?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Features

### 🕌 Mosque Registration & Profile
- Complete mosque details: name, address, GPS location, type (Trust/Waqf/Private/Committee)
- Photo gallery, capacity, construction year
- Mutawalli (trustee) information
- Verification system with transparency score

### 💰 Financial Transparency
- **Expenses**: Staff salaries, utility bills, maintenance, events — all with receipt uploads
- **Income**: Donations, rental income, land income, government aid
- **Bills**: Electricity, water, gas — paid/unpaid/overdue status
- Monthly and yearly financial reports

### 👨‍🏫 Imam & Staff Management
- Staff profiles: Imam, Muazzin, Khadim, Naib Imam
- Qualification, experience, appointment date
- **Salary Tracking**: Monthly salary amount, paid/unpaid status, payment proof
- Salary payment history visible to donors

### 🏠 Property & Land Information
- Mosque-owned lands, shops, halls
- Area, location, legal status
- Monthly income from each property
- Document uploads

### 🏦 Secure Donations
- Bank account details (verified)
- UPI ID with copy button
- QR code for quick payment
- Anonymous donation option
- Donation tracking with donor history

### 🔍 Search & Discover
- Search by city, name, pin code
- Filter by mosque type
- Grid and Map view
- Transparency score ranking

### 👤 Volunteer System
- Register with mobile, email, area
- Add and update mosque information
- Verification levels: New → Verified → Trusted
- Activity tracking dashboard

### 📊 Transparency Score
- Auto-calculated 0-100 score
- Based on update frequency, receipt uploads, verification

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | Full-stack React framework (App Router) |
| **TypeScript** | Type safety |
| **Prisma** | Database ORM (PostgreSQL) |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |
| **Recharts** | Charts & data visualization |
| **Leaflet** | Interactive maps |
| **NextAuth.js** | Authentication |
| **Zod** | Schema validation |
| **React Hook Form** | Form handling |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use [Neon](https://neon.tech) / [Supabase](https://supabase.com) for free)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/masjid-transparency-app.git
cd masjid-transparency-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# 4. Set up the database
npx prisma db push
npx prisma generate

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Description |
|--------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

---

## 📂 Project Structure

```
masjid-transparency-app/
├── prisma/
│   └── schema.prisma          # Database schema (12 models)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── search/            # Search mosques
│   │   ├── masjid/
│   │   │   ├── [id]/          # Mosque profile (5 tabs)
│   │   │   └── register/      # Multi-step registration
│   │   ├── volunteer/
│   │   │   ├── register/      # Volunteer registration
│   │   │   └── dashboard/     # Volunteer dashboard
│   │   ├── auth/login/        # Login page
│   │   ├── about/             # About page
│   │   └── api/               # API routes
│   │       ├── masjid/        # Mosque CRUD
│   │       └── volunteer/     # Volunteer registration
│   ├── components/
│   │   ├── ui/                # Reusable UI (Button, Card, Badge, Input)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MasjidCard.tsx
│   │   ├── StaffCard.tsx      # Staff with salary history
│   │   └── FinancialSummary.tsx
│   ├── lib/
│   │   ├── prisma.ts          # DB client singleton
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── index.ts           # TypeScript types & enums
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🗃️ Database Schema

The app uses **12 database models**:

| Model | Description |
|-------|------------|
| User | Admins, volunteers, donors |
| Mosque | Core mosque entity |
| MosqueStaff | Imam, Muazzin, Khadim profiles |
| SalaryPayment | Monthly salary records |
| Expense | Operational expenses |
| Bill | Utility bills (electricity, water, gas) |
| Income | Revenue sources |
| Property | Mosque-owned lands & buildings |
| Donation | Donor contributions |
| BankAccount | Mosque bank details |
| Mutawalli | Trustee information |
| AuditLog | Change tracking |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🌐 Add translations (Urdu, Hindi, Arabic)
- 🧪 Write tests
- 🎨 Improve UI/UX

---

## 📄 License

This project is licensed under the **MIT License** — free and open source for the Ummah.

---

## 📞 Contact

- 📧 Email: contact@masjidguard.org
- 🌐 Website: masjidguard.org
- 🐙 GitHub: [MasjidGuard](https://github.com)

---

<p align="center">
  Made with ❤️ for Masjidon Ki Hifazat
</p>
