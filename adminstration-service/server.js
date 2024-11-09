const express = require('express');
const dotenv = require('dotenv');
const prisma = require('./db/prisma');


//load environment variables
dotenv.config();

const app = express();

app.get('/', (req,res)=> {
    res.send("Home Page!");
})

// Middleware to parse JSON requests
app.use(express.json());

// Create (POST) a new item
app.post('/user', async (req, res) => {
  const {name, email, password, type}= req.body;
  const result = await prisma.User.create({
    data: {
        name, 
        email, 
        password, 
        type, 
        active: "true"
    },
  })
  res.json(result);
});

app.put('/user/:id', async (req, res) => {
    const {name, email, password, type}= req.body;
    const {id} = req.params;
    const result = await prisma.User.update({
      where: {id: Number(id)},
      data: {
          name, 
          email, 
          password, 
          type, 
          active: "true"
      },
    })
    res.json(result);
  });

// Read (GET) all items
app.get('/users', async (req, res) => {
  const users = await prisma.User.findMany({
    where: {active: "true"}
  })
  res.json(users);
});

// Read (GET) a specific item by ID
app.get('/user/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.User.findMany({
    where: {id: Number(id)}
  })
  res.json(user);
});

app.delete('/user/:id', async (req, res) => {
    const {id} = req.params;
    const result = await prisma.User.delete({
      where: {id: Number(id)},
    })
    res.json(result);
  });


//Orders

// Create (POST) a new item
app.post('/order', async (req, res) => {
    const {name, state, deliverytime}= req.body;
    const result = await prisma.Order.create({
      data: {
          name, 
          state, 
          deliverytime, 
      },
    })
    res.json(result);
  });
  
  app.patch('/order/:id', async (req, res) => {
      const {id} = req.params;
      const result = await prisma.Order.update({
        where: {id: Number(id)},
        data: req.body
      })
      res.json(result);
    });
  
  // Read (GET) all items
  app.get('/orders', async (req, res) => {
    const orders = await prisma.Order.findMany();
    res.json(orders);
  });
  
  // Read (GET) a specific item by ID
  app.get('/order/:id', async (req, res) => {
      const {id} = req.params;
      const user = await prisma.Order.findMany({
      where: {id: Number(id)}
    })
    res.json(user);
  });
  
  app.delete('/order/:id', async (req, res) => {
      const {id} = req.params;
      const result = await prisma.Order.delete({
        where: {id: Number(id)},
      })
      res.json(result);
    });
  
    app.get('/orders', async (req, res) => {
        const orders = await prisma.Order.findMany();
        res.json(orders);
    });

    app.get('/averagedeliverytime', async (req, res) => {
        const orders = await prisma.Order.findMany();
        var avg = 0;
        var i;
        for(i=0; i<orders.length ; i++){
            avg += Number(orders[i].deliverytime);
        }
        avg = avg/i;

        res.json(avg);
    });
    app.get('/ordertrends', async (req, res) => {
        let orders = await prisma.Order.findMany();
        orders.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
          });
        res.json(orders);

    });

    app.get('/activeusers', async (req, res) => {
        const activeusers = await prisma.User.findMany({
            where: {active: "true"}
          })
          res.json(activeusers);
    });

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})

