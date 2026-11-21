# PRADHAN PROPERTIES – REAL ESTATE WEBSITE & MANAGEMENT SYSTEM

A complete, production-ready real estate public website and private internal property management CRM designed for **PRADHAN PROPERTIES**, operating across West Delhi and Delhi NCR (Uttam Nagar, Nawada, Dwarka Mor, Matiala, Bindapur, Nanhe Park, Mohan Garden).

---

## 🌟 Key Features

### A. Public Website (Client & Visitor Facing)
- **Home Page**:
  - High-impact hero section with search by location, budget, BHK and property type (Jad Se, Builder Floor, Commercial).
  - Quick category pathways (Buy, Rent, Jad Se Independent Houses, Sell).
  - Featured properties showcase with high-res photography and amenities.
  - "Why Choose Us" & West Delhi coverage hub.
  - WhatsApp enquiry buttons with pre-filled property reference text.
- **Buy Property**: Filterable by Location, Budget range, BHK, Floor, and Jad Se construction.
- **Rent Property**: Rental homes with monthly rent rates, configurations, and instant WhatsApp booking.
- **Sell Your Property**: Interactive submission form for owners that securely feeds new leads directly into the CRM.
- **Contact Us**: Helplines (`+91 93195 39206`, `+91 98184 19845`), WhatsApp chat, office location, and message inbox.
- **Privacy Guarantee**: Customer phone numbers, private addresses, customer requirements, agent contacts and internal notes are **NEVER visible on the public website**.

### B. Private Admin CRM & Management System
- **1. Executive Overview**: 8 dynamic KPIs calculated directly from actual records (Total Customers, Active Buyer Reqs, Active Seller Reqs, Available Properties, Properties for Rent, Total Co-Agents, Active Deals, Pending Follow-ups).
- **2. Customer CRM**:
  - Full CRUD operations with auto-generated IDs (`CUST-1001` to `CUST-1013+`).
  - Search by name or phone (phone numbers stored strictly as text).
  - Filters by Deal Type (Buy, Sell, Rent, Invest), Budget, BHK, and Floor.
  - "Needs Review" badges highlighting ambiguous or incomplete raw sheet entries.
  - One-click **"Find Matching Properties"** from customer row or drawer.
  - Direct click-to-call (`tel:`) and click-to-WhatsApp (`wa.me`).
- **3. Property Inventory**:
  - Tracks both Internal Pradhan Properties stock and Co-Agent listings.
  - Full support for Jad Se (Roof rights), Builder Floors, and Commercial Shops.
  - Public visibility toggle (`isPublic`) allowing internal-only staging.
- **4. Property Matching Engine**:
  - Automatically matches buyer requirements against inventory.
  - Categorizes results into **Exact Matches**, **Partial Matches**, and **Alternative Properties**.
  - Strict guard: Never claims an exact match if critical criteria are missing.
  - One-click WhatsApp message generator formatting a complete Hindi/English property brochure.
- **5. Co-Agent Network**:
  - External broker directory (Vikas Agg., Chahar Manu, Jai Prakash, Narendra Panchal).
  - Shared inventory tracking and direct call/WhatsApp buttons.
- **6. Deals Pipeline**: Kanban board and list view tracking deal stages (`New Lead` → `Contacted` → `Interested` → `Site Visit` → `Negotiation` → `Deal Closed / Lost`) with estimated commission totals.
- **7. Follow-ups Manager**: Filter tabs for Today's, Upcoming, Overdue, and Completed follow-ups.
- **8. Enquiries Inbox**: Leads submitted via public website forms with one-click conversion to CRM customers.
- **9. Reports & Analytics**: Market demand breakdowns and CSV spreadsheet export buttons.
- **10. Settings & Storage**:
  - Local Demo Mode with persistent browser LocalStorage.
  - Complete JSON backup download and restore snapshot tools.
  - "Reset to Initial Data" button to restore default demo records anytime.
  - Ready-to-connect Supabase cloud credentials integration.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready build in the `dist/` directory.

---

## 🔐 Admin CRM Access

1. On the website, click the **"Admin CRM"** button in the top navigation bar or footer.
2. When prompted for the admin passcode, enter:
   - **Passcode:** `admin` (or `pradhan2025`)
3. You can lock the CRM or switch back to the public website at any time using the sidebar buttons.

---

## 📂 Project Architecture

```
├── index.html                 # Main HTML root with Pradhan Properties branding & fonts
├── vite.config.js             # Vite configuration with React & Tailwind plugins
├── package.json               # Dependencies and scripts (dev, build, preview)
├── src/
│   ├── main.jsx               # Application entry point mounting DataProvider
│   ├── App.jsx                # Coordinates Public Portal and Admin CRM views
│   ├── index.css              # Pradhan brand styles (Navy #101D35, Gold #D4A853)
│   ├── data/
│   │   └── initialData.js     # Exact raw data import (13 customers, 11 co-agent/props)
│   ├── context/
│   │   └── DataContext.jsx    # Central state, CRUD methods, LocalStorage, matching engine
│   ├── components/
│   │   ├── public/
│   │   │   ├── Navbar.jsx     # Public navigation bar with WhatsApp & call actions
│   │   │   ├── Footer.jsx     # Public footer with West Delhi location hubs
│   │   │   ├── PropertyCard.jsx # Property listing card with privacy protection
│   │   │   └── PropertyModal.jsx# Property detail modal & callback form
│   │   └── admin/
│   │       ├── AdminLayout.jsx# Sidebar navigation & header
│   │       ├── CustomerModal.jsx # Add/Edit customer modal with review flags
│   │       ├── CustomerDetailDrawer.jsx # Complete customer profile drawer
│   │       ├── PropertyModal.jsx # Add/Edit property inventory modal
│   │       ├── CoAgentModal.jsx # Add/Edit co-agent modal
│   │       ├── FollowupModal.jsx# Follow-up scheduler modal
│   │       ├── DealModal.jsx  # Sales deal pipeline modal
│   │       └── AdminLoginModal.jsx # Passcode security gate
│   └── pages/
│       ├── public/
│       │   ├── HomePage.jsx   # Hero search, categories, featured listings, trust badges
│       │   ├── BuyPage.jsx    # Verified sale properties with advanced filters
│       │   ├── RentPage.jsx   # Rental flats with monthly rates
│       │   ├── SellPage.jsx   # Owner listing form (auto-flows into CRM)
│       │   └── ContactPage.jsx# Contact info, service areas, and enquiry form
│       └── admin/
│           ├── OverviewDashboard.jsx # 8 dynamic stats, alerts, and quick actions
│           ├── CustomerCRM.jsx # Searchable customer CRM table with filters
│           ├── PropertyInventory.jsx # Inventory manager with public/internal toggle
│           ├── PropertyMatching.jsx # Exact/Partial/Alternative matching + WhatsApp
│           ├── CoAgentManagement.jsx # Co-agent directory and shared properties
│           ├── DealsPipeline.jsx # Kanban pipeline and commission tracking
│           ├── FollowupsManager.jsx # Today's, upcoming, and overdue follow-ups
│           ├── EnquiriesInbox.jsx # Inbound lead inbox with 1-click CRM conversion
│           ├── ReportsAnalytics.jsx # Business analytics & CSV export
│           └── SettingsPage.jsx # Local storage backup, JSON restore, and Supabase
```

---

## 📊 Initial Data Imported

### Initial Customers (13 Records Preserved Verbatim)
1. **Ajay Sharma** (Phone: `9319539206`, Jad se, Upper Ground)
2. **Nitu** (Phone: `9953848565`, Buy, 1 BHK, Upper Ground, For grandmother)
3. **Bhupindra Mehra** (Phone: `8851996601`, 101 - B/1 registry, Sell, 2 BHK, 62 Gaj, 56 registry, Top Floor)
4. **Sujeet Kumar** (Phone: `9308652447`, Invest)
5. **Raj Kumar** (Phone: `9899067497`, Budget: 20–21 Lakhs)
6. **Naresh Kumar** (Phone: `9818419845`, Buy, 3 BHK, Budget: 25 Lakhs)
7. **Vinay** (Phone: `9818530665`, Budget: 25–30 Lakhs, Upper Ground)
8. **Yashpal** (Phone: `8130873613`, Budget: 25 Lakhs)
9. **Pawan** (Phone: `9625658794`, Budget: 40 Lakhs, Jad Se)
10. **Vishal** (Phone: `8766212679`, Budget: 20–25 Lakhs)
11. **Bhavana Kumari** (Phone: `9310208630`, Gali No. 3, Nanhe Park, B-Block, Budget: 27 Lakhs, Flagged review note)
12. **Jaspal Singh** (Phone: `9810647037`, Budget: 1–1.25 Crore, Jad Se)
13. **Parkash** (Phone: `9910437704`)

### Co-Agent & Internal Inventory (11 Records Preserved Verbatim)
- **Pradhan Properties (Internal)**: 50 Gaj, 72 Lakhs
- **Pradhan Properties (Internal)**: Floor, 3 BHK, 75 Gaj, 42 Lakhs Net
- **Pradhan Properties (Internal)**: Jad Se, 45 Gaj, 42 Lakhs
- **Pradhan Properties (Internal)**: 32 Gaj, 50 Lakhs
- **Vikas Agg.**: 50 Gaj, 2 Side Ground Floor, 15 Lakhs
- **Vikas Agg.**: Dukan Ke Liye, 9/6 Hai, L-Type, 12 Lakhs
- **Vikas Agg.**: 42 Gaj, 18 Lakhs, L-Type
- **Jai Prakash**: 25 Gaj Jad Se
- **Chahar Manu**: 117 Gaj, 1.60 Crore, 3 Side, 3 Manjile
- **Chahar Manu**: 40 Gaj, 18 Lakhs, 2 Side, Parking
- **Narendra Panchal**: 21 Lakhs, New T, Som Bazar Road

---

## 🛡️ License
Private business software built exclusively for **Pradhan Properties**, West Delhi.
