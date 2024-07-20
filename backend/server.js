const express = require("express");
const cors = require("cors");
require("./db/config"); // Ensure this file connects to your MongoDB
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm";
require("dotenv").config();


// [---const authroute = require("./routes/auth");---]

const server = express();
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT" ,"DELETE"],
    credentials: true,
  })
);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Make Route for singUp
server.post("/register", async (req, resp) => {
  try {
    const doc = await User.findOne({ email: req.body.email }); // Change to findOne
    if (doc) {
      return resp.status(202).json({ message: "User already registered" });
    } else {
      let user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;

      Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return resp.status(500).send({ message: "Something went wrong" });
        }
        resp.send({ result, auth: token });
      });
    }
  } catch (error) {
    console.log("Error while finding data", error.message);
    resp.status(500).send({ message: "Internal server error" });
  }
});


// Make Route for Login
// server.post("/login", async (req, res) => {
//   const { email } = req.body; 

//   try {
//     let user = await User.findOne({ email }).select("-password");

//     if (user) {
//       res.status(200).json({ message: "user already register", user });

//     } else {
//       res.status(200).json({ message: "user not register" });
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// });


// Make Route for Login
server.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email }).select("-password");

    if (user) {
      Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return res.status(500).send({ message: "Something went wrong" });
        }
        return res.status(200).send({ message: "User already registered", user, auth: token });
      });
    } else {
      return res.status(404).json({ message: "User not registered" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



// make route for add product
server.post("/add-product",verifyToken, async (req, resp) => {
  console.log("Received Data: ", req.body);
  try {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
  } catch (error) {
    resp.status(500).send(error);
  }
});

// make route for product list get karne ke liye
 server.get("/products",verifyToken, async (req,resp)=> {

  let products = await Product.find();
  if(products.length>0){
    resp.send(products)
  }
  else{
    resp.send({result:"No Product found"})
  }
 })

//  make Route for delete api
 server.delete("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// make Route for get single product 
server.get('/product/:id',verifyToken, async (req, res) => {
  try {
      const result = await Product.findOne({ _id: req.params.id });
       if (result) {
          res.send(result);
      } else {
          res.send({ result: 'No Record Found' });
      }
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send({ error: 'Server error' });
  }
});

// Make Route for Update product
server.put("/product/:id",verifyToken, async (req, resp)  => {
  const result  = await Product.updateOne(
    { _id: req.params.id }, 
    {
      $set : req.body
    })
  resp.send(result)
})

// Make Route for Search Product
server.get("/search/:key", verifyToken, async (req, resp) => {
  const result = await Product.find({
    "$or" :[
      { name :{ $regex : req.params.key }},
      { company :{ $regex : req.params.key }},
      { category :{ $regex : req.params.key }}
    ]
  })
  resp.send(result);
})

 function verifyToken(req ,resp, next){
  let token = req.headers['authorization'];

  if(token){
    token = token.split(' ')[1];
    console.log("middlware called", token);

    Jwt.verify(token, JwtKey, (err, valid)=>{
      if(err){
        resp.status(401).send({result : "please provide valid token"})

      }else{
        next();

      }
    })
  }else{

    resp.status(403).send({result : "please add token with header"})
   }
   }

// [---server.use("/",authroute);---]

// Start the server and log a message when it starts successfully
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined

server
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Failed to start server on port ${PORT}`, err);
  });
