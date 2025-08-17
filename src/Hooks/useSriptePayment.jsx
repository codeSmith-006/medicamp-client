import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useStripePayment = () => {
  return useMutation({
    mutationFn: async (paymentData) => {
      console.log("Payment data: ", paymentData);
      const response = await axios.post(
        `https://medicamp-server-jth3.onrender.com/create-payment-session`, // ✅ Correct backend URL
        paymentData
      );

      console.log("Payment response: ", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url; // ✅ Redirect to Stripe Checkout
      } else {
        toast.error("Failed to get payment URL.");
      }
    },
    onError: (error) => {
      console.error("Stripe Payment Error:", error);
      toast.error("Payment initiation failed.");
    },
  });
};

export default useStripePayment;
