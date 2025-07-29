import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_..."); // Public key

const CheckoutForm = ({ amount, policy }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/stripe/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // ✅ Save transaction manually
      await axios.post("http://localhost:5000/transactions", {
        transactionId: result.paymentIntent.id,
        policyName: policy.title,
        email: "user@example.com", // from AuthContext
        amount,
        status: "Success",
        date: new Date(),
      });

      alert("Payment successful!");
    } else {
      alert("Payment failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn mt-4" type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
};

const PaymentPage = ({ policy }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={parseFloat(policy.basePremiumRate)} policy={policy} />
    </Elements>
  );
};

export default PaymentPage;
