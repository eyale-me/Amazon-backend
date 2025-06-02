

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "success !",
  });
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

app.listen(8000,(err)=>{
    if(err)throw err;
    console.log("Amazon server running successfully on PORT:8000,http://localhost:8000")
})
















// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Success!",
//   });
// });

// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.query.total);

//   if (isNaN(total) || total <= 0) {
//     return res.status(400).json({
//       message: "Total must be a number greater than 0",
//     });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//     });

//     console.log("PaymentIntent created:", paymentIntent.id);

//     res.status(201).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating PaymentIntent:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
