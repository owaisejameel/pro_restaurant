import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function Payment({ value }) {
  const Razorpay = useRazorpay();

  const handlePayment = () => {
    // const order = createOrder(params);

    const options = {
      key: "rzp_test_EdEbmtYymvGMIQ",
      amount: value * 100,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      // order_id: 12,
      handler: (res) => {
        console.log("sdjkfhkf", res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  };

  return (
    <div className="App">
      <button onClick={handlePayment}>Place order</button>
    </div>
  );
}
