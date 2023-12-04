require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user defined middlewares
const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization)
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6nmlwzx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const districtsCollection = client
      .db("bloodDonation")
      .collection("districts");
    const upazilasCollection = client
      .db("bloodDonation")
      .collection("upazilas");
    const usersCollection = client.db("bloodDonation").collection("users");
    const donationRequestCollection = client
      .db("bloodDonation")
      .collection("donationRequests");
    const blogsCollection = client.db("bloodDonation").collection("blogs");
    const fundingCollection = client.db("bloodDonation").collection("funding");

    // verify admin middleware
    const verifyAuthorization = async (req, res, next) => {
      const email = req.decoded?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAuthorized = user?.role === "admin" || user?.role === "volunteer";
      if (!isAuthorized) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // verify  Volunteer middleware
    const verifyVolunteer = async (req, res, next) => {
      const email = req.decoded?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === " volunteer";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // jwt related api
    app.post("/api/v1/jwt", (req, res) => {
      const email = req.body.email;
      // console.log(email)
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.send({ token });
    });

    // api for getting districts
    app.get("/api/v1/districts", async (req, res) => {
      const result = await districtsCollection.find().toArray();
      res.send(result);
    });
    // api for getting upazilas
    app.get("/api/v1/upazilas", async (req, res) => {
      const result = await upazilasCollection.find().toArray();
      res.send(result);
    });
    // api for inserting a new user in database
    app.post("/api/v1/user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // api for collect one specific user data
    app.get("/api/v1/users/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      console.log("email from params", req.params.email);
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    // api for updating specific user
    app.patch("/api/v1/updateUser/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!email === req.decoded?.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const userInfo = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.image,
          district: userInfo.district,
          upazila: userInfo.upazila,
          bloodGroup: userInfo.bloodGroup,
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    // api for storing donation request
    app.post("/api/v1/donationRequests", verifyToken, async (req, res) => {
      const donationRequest = req.body;
      const result = await donationRequestCollection.insertOne(donationRequest);
      res.send(result);
    });
    // api to get user donation requests
    app.get(
      "/api/v1/userDonationRequests/:email",
      verifyToken,
      async (req, res) => {
        const email = req.params.email;
        if (!email === req.decoded?.email) {
          return res.status(403).send({ message: "unauthorized access" });
        }
        const query = { requesterEmail: email };
        const result = await donationRequestCollection
          .find(query)
          .sort({ _id: -1 })
          .toArray();
        // console.log(result)
        res.send(result);
      }
    );
    // api to get all donation requests
    app.get("/api/v1/allDonationRequests", verifyToken, async (req, res) => {
      const result = await donationRequestCollection
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });
    // api to get all pending donation requests
    app.get("/api/v1/pendingDonationRequests", async (req, res) => {
      const query = { status: "pending" };
      const options = {
        projection: {
          _id: 1,
          requesterName: 1,
          hospitalName: 1,
          fullAddress: 1,
          donationTime: 1,
          donationDate: 1,
          recipientDistrict: 1,
          recipientUpazila: 1,
          status: 1,
        },
      };
      const result = await donationRequestCollection
        .find(query, options)
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });
    // api to get all a single donation request
    app.get("/api/v1/donationRequest/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const query = { _id: new ObjectId(id) };
      const result = await donationRequestCollection.findOne(query);
      res.send(result);
    });
    // api to update a single donation request
    app.patch("/api/v1/updateDonReq/:id", verifyToken, async (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          donorName: data.donorName,
          donorEmail: data.donorEmail,
          status: data.status,
        },
      };
      const result = await donationRequestCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // api to delete a donation request by user
    app.delete(
      "/api/v1/deleteDonationRequest/:id",
      verifyToken,
      async (req, res) => {
        const email = req.body.email;
        if (!email === req.decoded?.email) {
          return res.status(403).send({ message: "unauthorized access" });
        }
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await donationRequestCollection.deleteOne(query);
        res.send(result);
      }
    );
    // api to delete a donation request by user
    app.delete(
      "/api/v1/deleteDonationRequestByAdmin/:id",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await donationRequestCollection.deleteOne(query);
        res.send(result);
      }
    );
    // api to update a donation request
    app.patch("/api/v1/updateDonRequest/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          requesterName: data.requesterName,
          requesterEmail: data.requesterEmail,
          recipientName: data.recipientName,
          hospitalName: data.hospitalName,
          fullAddress: data.fullAddress,
          donationTime: data.donationTime,
          donationDate: data.donationDate,
          requestMessage: data.requestMessage,
          recipientDistrict: data.recipientDistrict,
          recipientUpazila: data.recipientUpazila,
        },
      };
      const result = await donationRequestCollection.updateOne(
        filter,
        updatedDoc
      );
      res.send(result);
    });
    // api to get admin statistics
    app.get(
      "/api/v1/admin-stats",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const users = await usersCollection.estimatedDocumentCount();
        const requests =
          await donationRequestCollection.estimatedDocumentCount();
        const allFunding = await fundingCollection.find().toArray();
        const totalFunding = allFunding.reduce((sum , funding) => sum + funding.amount, 0);
        res.send({ users, requests, totalFunding });
      }
    );
    // api to get all user data
    app.get(
      "/api/v1/allUsers",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const result = await usersCollection.find().sort({ _id: -1 }).toArray();
        res.send(result);
      }
    );
    // api to get search users
    app.get("/api/searchUsers", async (req, res) => {
      data = decodeURIComponent(req.query.key);
      info = JSON.parse(data);
      console.log(info);
      // const query = Object.keys(info).map(key => ({[key]: info[key]}))
      // console.log(query)
      // const filter = {
      //   $and: [
      //     ...query,
      //   ],
      // };
      // console.log(filter);
      const result = await usersCollection.find(info).toArray();
      res.send(result);
    });
    // api to update user status
    app.patch(
      "/api/v1/updateStatus/:id",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const data = req.body.status;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: data,
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );
    // api to update user role
    app.patch(
      "/api/v1/updateRole/:id",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const data = req.body.role;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: data,
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );
    // api to insert a blog data
    app.post(
      "/api/v1/addBlog",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const blogInfo = req.body;
        const result = await blogsCollection.insertOne(blogInfo);
        res.send(result);
      }
    );
    // api to get all blog data
    app.get(
      "/api/v1/allBlogs",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const options = {
          sort: {
            _id: -1,
          },
          projection: {
            _id: 1,
            blogTitle: 1,
            creationTime: 1,
            status: 1,
            blogCover: 1,
          },
        };
        // const query = {}
        const result = await blogsCollection.find({}, options).toArray();
        res.send(result);
      }
    );
    
    // api to get all published blog
    app.get("/api/v1/publishedBlog", async (req, res) => {
      const query = { status: "published" };
      options = { projection: { blogContent: 0 } };
      const result = await blogsCollection
        .find(query, options)
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });
    // api to get latest published top blogs 
    app.get('/api/v1/latestBlogs', async (req, res) => {
      const query = { status: "published" };
      options = { projection: { blogContent: 0 } };
      const result = await blogsCollection
        .find(query, options)
        .limit(3)
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    })
    // api to update blog status
    app.patch(
      "/api/v1/updateBlogStatus/:id",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const data = req.body.status;
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            status: data,
          },
        };
        const result = await blogsCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );
    // api to delete a blog
    app.delete(
      "/api/v1/deleteBlog/:id",
      verifyToken,
      verifyAuthorization,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogsCollection.deleteOne(query);
        res.send(result);
      }
    );
    // api to get a blog
    app.get("/api/v1/blogDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogsCollection.findOne(query);
      res.send(result);
    });
    // api to create payment intend
    app.post('/api/v1/payment-intent', async(req, res) => {
      const {price} = req.body;
      const amount = parseInt(price*100);
      const paymentIntent =  await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        "payment_method_types": [
          "card"
        ],
      })
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    })
    // api to insert donation information
    app.post('/api/v1/addFunding', verifyToken, async (req, res) => {
      const info = req.body;
      const result = await fundingCollection.insertOne(info);
      res.send(result);
    })
    // api to get use funding data
    app.get('/api/v1/getFunding/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!email === req.decoded?.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      console.log('funding',email)
      const query = {email: email};
      const result = await fundingCollection.find(query).sort({_id: -1}).toArray();
      res.send(result);
    })






    // checking api for admin
    app.get("/api/v1/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!email === req.decoded?.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      // console.log('admin checking', user);

      let admin = false;
      if (user?.role === "admin") {
        admin = user.role;
      }
      res.send(admin);
    });
    // checking api for volunteer
    app.get("/api/v1/volunteer/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!email === req.decoded?.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);

      let volunteer = false;
      if (user?.role === "volunteer") {
        volunteer = user.role;
      }
      res.send(volunteer);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("BLOOD DONATION SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
