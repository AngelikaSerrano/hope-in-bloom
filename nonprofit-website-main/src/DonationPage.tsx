
import { useState, type FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation-success`,
        },
      });

      if (error) {
        setErrorMessage(
          error.message || "Your payment could not be completed."
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Payment could not be completed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <h2>Complete Your Donation</h2>

      <PaymentElement />

      {errorMessage && (
        <p role="alert" className="payment-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Pay Donation"}
      </button>
    </form>
  );
}

export default function DonationPage() {
  const [amount, setAmount] = useState(500);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startCheckout = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4242/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start payment.");
      }

      if (!data.clientSecret) {
        throw new Error("Stripe did not return a payment client secret.");
      }

      setClientSecret(data.clientSecret);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="donation-payment">
      <div className="donation-payment-content">
        <p className="eyebrow">HOPE IN BLOOM</p>
        <h1>Help Hope Grow</h1>

        <p>
          Your support can bring comfort, care, and encouragement
          to individuals and families affected by cancer.
        </p>

        {!clientSecret ? (
          <>
            <h2>Choose Your Donation Amount</h2>

            <div className="donation-amounts">
              {[100, 250, 500, 1000, 2000].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={amount === value ? "selected" : ""}
                  onClick={() => setAmount(value)}
                >
                  ₱{value.toLocaleString("en-PH")}
                </button>
              ))}
            </div>

            <label htmlFor="custom-amount">
              Custom amount (₱)
            </label>

            <input
              id="custom-amount"
              type="number"
              min="50"
              max="100000"
              step="1"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />

            {errorMessage && (
              <p role="alert" className="payment-error">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={startCheckout}
              disabled={
                isLoading ||
                !Number.isInteger(amount) ||
                amount < 50 ||
                amount > 100000
              }
            >
              {isLoading ? "Preparing Payment..." : "Continue to Payment"}
            </button>
          </>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
}
