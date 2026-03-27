# NextBoard

A modern, responsive admin dashboard built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Radix UI**. Featuring 27+ pages, 47+ reusable UI components, dark/light theme, and a clean professional design.

If you find this project useful, please give it a star! This project is **open source** and contributions are welcome.

## Preview

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light](public/placeholder.svg) | ![Dark](public/placeholder.svg) |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI + shadcn/ui
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Theme:** next-themes (Dark/Light)

## Features

- 27+ fully designed pages
- 47+ reusable UI components
- Dark / Light theme toggle
- Responsive sidebar navigation
- Authentication pages (Login, Register, Forgot Password)
- Dashboard with charts and analytics
- Financial management (Transactions, Invoices, Reports)
- User management & profiles
- Product & order management
- Settings & security pages
- Toast notifications (Sonner)
- Form validation with Zod
- Loading skeletons

## Pages

| Category | Pages |
|----------|-------|
| **Auth** | Login, Register, Forgot Password |
| **Dashboard** | Overview, Analytics, Activities |
| **Financial** | Transactions, Invoices, Financial Reports |
| **Management** | Products, Orders, Projects, Categories |
| **Content** | Articles, FAQ, Support |
| **Users** | Users List, Profile |
| **System** | Settings, Security, Notifications, Alerts, Tools |
| **Reports** | General Reports, Error Reports |

## Folder Structure

```
nextboard/
├── app/                    # Next.js App Router (27 pages)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home (redirects to /dashboard)
│   ├── dashboard/          # Main dashboard
│   ├── login/              # Authentication
│   ├── register/
│   ├── forgot-password/
│   ├── analytics/          # Data & charts
│   ├── activities/
│   ├── transactions/       # Financial
│   ├── invoices/
│   ├── products/           # Management
│   ├── orders/
│   ├── projects/
│   ├── categories/
│   ├── users/              # User management
│   ├── profile/
│   ├── articles/           # Content
│   ├── faq/
│   ├── support/
│   ├── notifications/      # System
│   ├── alerts/
│   ├── settings/
│   │   └── change-password/
│   ├── security/
│   ├── tools/
│   └── reports/
│       ├── errors/
│       └── financial/
├── components/
│   ├── dashboard-layout.tsx   # Main layout wrapper
│   ├── sidebar.tsx            # Sidebar navigation
│   ├── page-header.tsx        # Page header component
│   └── ui/                    # 47+ shadcn/ui components
├── contexts/
│   ├── auth-context.tsx       # Authentication state
│   └── theme-context.tsx      # Theme state
├── hooks/
│   ├── use-mobile.ts          # Mobile detection
│   └── use-toast.ts           # Toast notifications
├── lib/
│   ├── data.ts                # Mock data
│   └── utils.ts               # Utility functions
├── styles/
│   └── globals.css
└── public/                    # Static assets
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/MiladJoodi/NextBoard.git

# Navigate to the project
cd NextBoard

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Author

**Milad Joodi**
- GitHub: [@MiladJoodi](https://github.com/MiladJoodi)
- LinkedIn: [joodi](https://www.linkedin.com/in/joodi/)

## License

This project is open source and available under the [MIT License](LICENSE).

---

If you found this project helpful, please consider giving it a star on GitHub! Your support helps keep this project going.
