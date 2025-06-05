# Khaata-Chakki

## Overview
Khaata-Chakki is a modern web application for managing flour mill operations. It streamlines customer order tracking, wheat processing, and payment management.

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend | Supabase |
| Build Tool | Vite |
| Package Manager | Bun/npm |
| Authentication | Supabase Auth |
| Database | Supabase PostgreSQL |

## Features

### Customer Management
- Add/Edit customer records
- Track regular and temporary customers
- Quick customer search functionality
- Customer history tracking

### Order Processing
- Wheat weight recording
- Multiple flour types:
  - Atta
  - Besan
  - Multigrain
  - Other
- Fixed rate (₹2/kg) calculation
- Automatic total computation

### Payment System
- Cash and credit options
- Payment status tracking
- Outstanding payment monitoring

### Order Status
- Real-time processing status
- Ready-for-pickup notifications
- Order completion tracking

## Setup

### Prerequisites
- Node.js
- npm or bun package manager
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd khaata-chakki

2. Install dependencies:
bun install
# or
npm install

3. Build the project:
bun run build
# or
npm run build

## Project Structure
The project is structured as follows:
- `src/`: Contains the source code for the application.
- `public/`: Static assets and the HTML template.

src/
├── components/     # UI components
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── integrations/   # External services
├── pages/          # Route pages
├── types/          # TypeScript types
└── utils/          # Utility functions
#### Security
- User authentication required
- Secure data management
- Role-based access
## Contributing
Contributions welcome! Please feel free to submit pull requests.

## License
MIT License
