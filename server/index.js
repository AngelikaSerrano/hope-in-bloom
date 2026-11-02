require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing Stripe secret key in server/.env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Allow CORS from any local port (fixes port 5173 / 5175 mismatches)
app.use(cors());
app.use(express.json());

// Create PaymentIntent for standard Stripe Elements
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!Number.isInteger(amount) || amount < 50 || amount > 100000) {
      return res.status(400).json({
        error: "Enter a donation between ₱50 and ₱100,000.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in centavos (PHP)
      currency: "php",
      description: "Hope in Bloom Donation",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({
      error: "Unable to create payment intent.",
    });
  }
});

// Endpoint to verify payment status on success page
app.get("/api/session-status", async (req, res) => {
  try {
    const paymentIntentId = req.query.payment_intent;

    if (
      typeof paymentIntentId !== "string" ||
      !paymentIntentId.startsWith("pi_")
    ) {
      return res.status(400).json({
        error: "Invalid PaymentIntent ID.",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status === "succeeded" ? "paid" : "unpaid",
      amountTotal: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error("Verification error:", error.message);
    res.status(500).json({
      error: "Unable to verify payment.",
    });
  }
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});