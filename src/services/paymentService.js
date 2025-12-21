// Razorpay Payment Service

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const initializePayment = async (amount, onSuccess, userEmail) => {
    // We already added script in index.html, but safety check or just assume it's there.
    // Actually, better to just use window.Razorpay if blocked by CSP or strict mode.

    if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Check internet connection.");
        return;
    }

    const options = {
        key: "rzp_test_RuDkV1ujJGsRZF",
        amount: amount * 100, // Amount in paise (100 INR = 10000 paise)
        currency: "INR",
        name: "Do Or Due",
        description: "Purchase DueCoins",
        image: "https://vitejs.dev/logo.svg", // Placeholder logo
        handler: function (response) {
            // Payment Success!
            // In a real app, you would verify signature on backend.
            // Here we trust the client for the prototype (Test Mode).
            console.log("Payment ID: ", response.razorpay_payment_id);
            onSuccess(response.razorpay_payment_id);
        },
        prefill: {
            email: userEmail || "user@example.com",
            contact: "9999999999" // Dummy contact
        },
        theme: {
            color: "#0F172A" // Clean SaaS Navy
        }
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
    });

    rzp1.open();
};
