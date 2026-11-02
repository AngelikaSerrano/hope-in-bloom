import { useEffect, useState } from "react";

export default function DonationSuccess() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const paymentIntentId = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (!paymentIntentId) {
      setStatus("invalid");
      return;
    }

    fetch(
      `http://localhost:4242/api/session-status?payment_intent=${encodeURIComponent(
        paymentIntentId
      )}`
    )
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setStatus(data.status);
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "checking") {
    return (
      <main className="donation-payment">
        <div className="donation-payment-content">
          <h1>Verifying your donation...</h1>
        </div>
      </main>
    );
  }

  if (status === "paid") {
    return (
      <main className="donation-payment">
        <div className="donation-payment-content">
          <h1>Thank You for Your Kindness!</h1>
          <p>
            Your test donation to Hope in Bloom was successful. Thank you for
            helping us share hope and encouragement.
          </p>
        </div>
      </main>
    );
  }

  return (
  <main className="donation-payment">
    <div className="donation-payment-content">
      <h1>Payment Not Verified</h1>
      <p>
        We couldn't confirm your donation. Your payment may not have
        been completed. Please check your payment details or return
        to the donation page to try again.
      </p>

      <a href="/donate" className="primary-button">
        Return to Donation Page
      </a>
    </div>
  </main>
)
}