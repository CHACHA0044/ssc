# ◈ Autonomous Supply Chain Orchestrator

A modern, production-grade **Smart Supply Chain Simulation System** built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. This platform visualizes intelligent routing, predictive disruption detection, and real-time logistics optimization.

---

## 🎯 Project Overview

This system simulates a high-stakes logistics environment where disruptions (port delays, weather, bottlenecks) are predicted and neutralized before they impact the network.

### Key Features
- **🔮 Predictive Detection**: ML-powered forecasting that identifies disruptions 24-72 hours in advance.
- **⚡ Real-Time Optimization**: Dynamic rerouting algorithms that find optimal paths in under 200ms.
- **🛡️ Cascading Failure Prevention**: Intelligent load balancing to prevent single-point failures from paralyzing the network.
- **📊 Real-Time Dashboard**: Comprehensive visualization of active shipments, risk scores, and system metrics.
- **⊞ Order Simulation**: Interactive order creation to test system behavior under various loads and priorities.

---

## 🧩 Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons/UI**: Phosphor/Lucide (simulated) & Custom SVGs
- **Data Management**: In-memory Mock DB with event-driven simulation logic

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v9.x or later)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CHACHA0044/ssc.git
   cd ssc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Project Structure

```text
src/
├── app/               # Next.js App Router (Pages & API)
│   ├── api/           # Backend API routes (Orders)
│   ├── dashboard/     # Simulation visualization page
│   ├── demo/          # System explanation for judges
│   └── orders/        # Order creation & simulation page
├── components/        # Reusable UI components (Navbar, Cards, etc.)
├── lib/               # Shared utilities, types, and mock data
└── ...
```

---

## 🤝 For Collaborators

### How to Contribute
1. **Pull the latest changes**: Always run `git pull origin main` before starting.
2. **Create a branch**: Use `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: Ensure you follow the project's coding standards.
4. **Push & PR**: Push your branch and open a Pull Request.

### Development Commands
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

## 🧾 License
This project is for demonstration and simulation purposes.
