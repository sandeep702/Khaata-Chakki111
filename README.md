# 🌾 Khaata-Chakki

**Your Digital Flour Mill Partner — from Chakki to Khaata, all in one place.**

> 📌 A modern, desi-style web application to manage customer orders, wheat processing, and payments at your flour mill.

---

## 🚀 Tech Stack

| 🔧 Category      | 🛠️ Technology         |
|------------------|------------------------|
| Frontend         | React + TypeScript     |
| Styling          | Tailwind CSS           |
| Backend          | Supabase               |
| Build Tool       | Vite                   |
| Package Manager  | Bun / npm              |
| Authentication   | Supabase Auth          |
| Database         | Supabase PostgreSQL    |

---

## 🌟 Features at a Glance

### 👥 Customer Management
- ➕ Add or edit customer details
- 🔍 Smart search for quick lookups
- 📖 Maintain record of permanent or temporary customers
- 🕓 View complete customer order history

### 🏋️ Order Processing
- ⚖️ Enter wheat weight & flour types:
  - Atta, Besan, Multigrain, Others
- 💸 Auto-calculate total at ₹2/kg (fixed)
- 🧮 Instant bill computation

### 💳 Payment System
- 💵 Cash or Credit
- ✅ Track paid & pending status
- 📉 Know who owes what!

### 📦 Order Status
- 🔄 Live status updates
- ✅ Mark orders ready
- 📬 Pickup & completion tracking

---

## ⚙️ Setup & Installation

### 📋 Prerequisites
- Node.js
- Bun or npm
- Supabase account

### 📦 Install & Build

```bash
# Clone the repo
git clone https://github.com/yourusername/khaata-chakki.git
cd khaata-chakki

# Install dependencies
bun install   # or npm install

# Build the project
bun run build # or npm run build
🧱 Project Structure
pgsql
Copy
Edit
src/
├── components/     → UI Components (Buttons, Cards, etc.)
├── contexts/       → App-wide states & Providers
├── hooks/          → Custom React hooks
├── integrations/   → Supabase & other API calls
├── pages/          → Route-based pages
├── types/          → TypeScript type definitions
└── utils/          → Helpers & utilities
🔐 Security
🔐 Supabase Auth integration

🔑 Role-based access (Admin/User)

🛡️ Encrypted & secure data handling

🙌 Contributing
We love contributions!
If you’d like to improve something or add a feature, feel free to fork the repo and send a PR.
Let’s grow Khaata-Chakki together!

📜 License
Licensed under the MIT License.
Use it freely, modify it respectfully. 🙏