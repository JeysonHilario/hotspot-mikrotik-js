# 🚀 Custom Hotspot Authentication for Mikrotik

## 🔍 Overview
This project provides a custom authentication system for Mikrotik hotspots, using a **Node.js** server to handle user authentication independently from Mikrotik's native hotspot system. It offers a flexible and scalable approach to managing internet access control.

## 🌟 Features
- ✅ **Independent Authentication**: Does not rely on Mikrotik's built-in hotspot system.
- ⚡ **Node.js Backend**: Handles user validation and session management.
- 🔧 **Customizable Authentication Logic**: Easily integrates with databases or third-party authentication providers.
- 🔒 **Secure Communication**: Supports HTTPS and secure authentication mechanisms.
- 📊 **Logging and Monitoring**: Keeps track of authentication attempts and user sessions.

## 📋 Requirements
- 🖧 **Mikrotik Router** (with proper network configuration)
- 🛠 **Node.js** (latest LTS recommended)
- 🌐 **Express.js** (or another web framework for handling requests)
- 🗄 **Database** (optional, for storing user credentials and session data)

## 🛠 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/custom-hotspot-auth.git
   cd custom-hotspot-auth
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file and set up the necessary configurations (e.g., API keys, database connection, Mikrotik API credentials).

4. **Start the server:**
   ```sh
   npm start
   ```

## ⚙️ Mikrotik Configuration
To redirect users to the authentication system, configure Mikrotik's firewall rules and DHCP settings to ensure requests pass through the Node.js authentication service.

## 📡 API Endpoints
- 🔑 `POST api/validation` – Validates user credentials and grants access.

## 🔐 Security Considerations
- 🔒 Ensure HTTPS is enabled to protect user data.
- 🚨 Implement rate limiting to prevent abuse.
- 🔑 Store credentials securely and avoid hardcoding sensitive data.

## 🤝 Contributions
Feel free to contribute by submitting pull requests or reporting issues.

## 📜 License
This project is licensed under the **MIT License**.

## 📬 Contact
For any inquiries, reach out via **jeysonhilario@gmail.com** or open an issue in the repository.


