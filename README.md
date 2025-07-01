# PropertyGuard React Application

This is the main React application for PropertyGuard, a comprehensive property management platform that helps homeowners track warranties, compliance certificates, maintenance schedules, and insurance requirements.

## Features

- **Property Management**: Add and manage multiple properties with different types (residential, commercial, sectional title)
- **Document Management**: Upload and organize property documents, warranties, and certificates
- **Compliance Tracking**: Monitor compliance certificates and renewal dates
- **Warranty Management**: Track warranties and maintenance requirements
- **Insurance Integration**: Manage insurance policies and coverage requirements
- **Subscription Management**: Handle different subscription tiers and features
- **AI Chatbot**: Integrated support chatbot for user assistance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and context
- **Routing**: React Router
- **UI Components**: Custom component library with shadcn/ui
- **Icons**: Lucide React
- **HTTP Client**: Axios for API communication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/PropertyGuard01/React-App.git
cd React-App
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Build for production:
```bash
npm run build
# or
pnpm build
```

## Environment Variables

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key for payments

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── ChatBot.jsx     # AI chatbot component
│   ├── LiabilityDashboard.jsx
│   └── SubscriptionManager.jsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
└── App.jsx             # Main application component
```

## Deployment

This application is configured for deployment on Vercel with automatic builds from the main branch.

## License

Proprietary - PropertyGuard by AirCapital

