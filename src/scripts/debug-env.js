// src/scripts/debug-env.js
import dotenv from "dotenv";
dotenv.config();

console.log("🔍 Checking Firebase Environment Variables:\n");

const envVars = {
  FIREBASE_TYPE: process.env.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  FIREBASE_CLIENT_CERT_URL: process.env.FIREBASE_CLIENT_CERT_URL,
  FIREBASE_UNIVERSE_DOMAIN: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

Object.entries(envVars).forEach(([key, value]) => {
  if (key === "FIREBASE_PRIVATE_KEY") {
    console.log(
      `${key}: ${value ? "✅ Present (Hidden for security)" : "❌ Missing"}`
    );
  } else {
    console.log(`${key}: ${value || "❌ Missing"}`);
  }
});

console.log("\n🔑 Private Key Format Check:");
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  console.log(
    "Starts with BEGIN PRIVATE KEY:",
    privateKey.startsWith("-----BEGIN PRIVATE KEY-----")
  );
  console.log(
    "Ends with END PRIVATE KEY:",
    privateKey.includes("-----END PRIVATE KEY-----")
  );
  console.log("Contains newlines:", privateKey.includes("\n"));
} else {
  console.log("❌ Private key not found");
}
