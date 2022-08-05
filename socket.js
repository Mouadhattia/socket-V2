const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("./config");
const cors = require("cors");
const axios = require("axios");
const db = require("./db");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();
app.use(express.json());
const { Op } = require("sequelize");
app.use(cors());

const safeDbRequest = async (lambda, defaultVal = {}) => {
  const e = new Error();
  try {
    const rv = await lambda();
    return rv || defaultVal;
  } catch (e) {
    return defaultVal;
  }
};
// verify hashed password 
const verifyPassword = async (password, password_hash) => {
  const result = await axios.get(
    "http://141.94.77.9/caisse/verify_password.php?password=" +
      password +
      "&" +
      "hashed_password=" +
      password_hash
  );
  return result.data;
};
// login route


app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await safeDbRequest(
      () => db.qr_user.findOne({ where: { username: username } }),
      {}
    );

    let password_hash = user.password_hash;
    password_hash = password_hash.replace(/^\$2y(.+)$/i, "$2a$1");
    if (user) {
      user = user.dataValues;
      if (await verifyPassword(password, password_hash)) {
        const restaurant = await safeDbRequest(
          () =>
            db.qr_restaurant.findOne({
              where: {
                user_id: user.manager_id,
              },
            }),
          {}
        );

        const token = jwt.sign(
          { userId: user.id, restId: restaurant.dataValues.id },
          config.JWTPRIVATEKEY
        );
        const kitchen = await safeDbRequest(
          () =>
            db.qr_kitchen.findAll({
              where: {
                user_id: user.manager_id,
                is_open: 1,
              },
            }),
          {}
        );
   
        return res.send({
          token,
          user_id: user.id,
          username: user.username,
          tva: restaurant.dataValues.tva,
          address: restaurant.dataValues.address,
          telephone: restaurant.dataValues.telephone,
          kitchen,
        });
      
      }
      res.status(400).send({ msg: "wrong password" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "user not found" });
  }
});
// print order
app.post("/api/printOrder", async (req, res) => {
  const { user_id, order} = req.body;

  
  
  const restInDb = await safeDbRequest(
    () => db.qr_restaurant.findOne({ where: { user_id: user_id } }),
    {}
  );
 

 

  const restaurant = {
    wifi: restInDb.dataValues.wifi,
    ip_printer: restInDb.dataValues.ip_printer,
    ip_bar: restInDb.dataValues.ip_bar,
    name: restInDb.dataValues.name,
    address: restInDb.dataValues.address,
    telephone: restInDb.dataValues.telephone,
    delivery_minimum: restInDb.dataValues.delivery_minimum,
    frais: restInDb.dataValues.frais,
  };

 
 
  




  let post_data = {
    initData: {
      logoSrc: "/",
    },
    restaurant,
   
  
    userName: order.customer_name || "client",
    customer_adress: order.customer_adress || "",
    phone: order.customer_tel ,
    
 
    paymentType: order.paymentType,
    
    order: {
      remarque: order.message,
      id: order.order_id,
      orderType: order.orderType,
     
      taxPrice: "",
      table_number: "",
      totalPrice: "",
      nbrCouvert: "",
      orderItems: ((items) => {
        items = items.map((item) => {
          if (item.extras?.length) {
            return { ...item, count: item.qt };
          } else if (item.slots && Object.keys(item.slots).length) {
            return {
              ...item,
              count: item.qt,
              slots: ((slots) => {
                slots = JSON.parse(JSON.stringify(slots));
                try {
                  slotsCopy = {};
                  const slotKeys = Object.keys(slots);
                  for (let slotKey of slotKeys) {
                    let slot = slots[slotKey];
                    let slotmap = {
                      products: slot.products
                        ?.filter((p) => p.checked)
                        .map((product) => ({
                          name: product.name,
                          price: product.price,
                        })),
                    };
                    slotsCopy[slotKey] = slotmap;
                  }
                  return slotsCopy;
                } catch (e) {
                  console.log("ERROR FOR SLOTS  : ");
               
                  throw e;
                }
              })(item.slots),
            };
          } else if (item.stepItems && Object.keys(item.stepItems).length > 0) {
            return {
              ...item,
              stepItems: Object.values(item.stepItems).flat(1),
            };
          } else {
            return item;
          }
        });
        items.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        let rv = [];
        for (let key in items) {
          let current = items[key];
          if (rv.length === 0) {
            if ((current.extras && current.extras.length) || current.isComp)
              rv = [current];
            else
              rv = [
                {
                  ...current,
                  count: 1,
                },
              ];
          } else {
            let last = rv[rv.length - 1];
            if ((current.extras && current.extras.length) || current.isComp) {
              rv = [...rv, current];
            } else {
              rv = [
                ...rv,
                {
                  ...current,
                  count: 1,
                },
              ];
            }
          }
        }
        items = rv;
        return items;
      })(order.orderItems),
    },
  };
 
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
      post_data = { ...post_data, ip_type: "kitchen" };  
      const kitchenprint = await safeDbRequest(
        () =>
          axios.post(
            "http://192.168.1.102/print/kitchen.php",
            post_data,
            axiosConfig
          ),
        {}
      );
  res.sendStatus(200);
});


// get orders 

app.post("/api/getorders", async (req, res) => {
  const { user_id} = req.body;
  var myOrders = [];
  const caisse = await safeDbRequest(() => {
    return db.qr_caisse.findOne({
      where: { user_id:user_id }
  
    });
  }, {});  
    
  const lastOuverture = await safeDbRequest(() => {
    return db.qr_historique.findOne({
      where: { caisse_id: caisse.dataValues.id, type: "open" },
      order: [["date", "DESC"]],
    });
  }, {});
 

  const ordersInDb = await safeDbRequest(
    () =>
      db.qr_orders.findAll({
        where: {
          restaurant_id: user_id,
          created_at: {
            [Op.gte]: lastOuverture.dataValues.date,
          },
          status:{
            [Op.not]:["rejected","completed"]
          }
          
        },
      }),
    []
  );

  myOrders = await ordersInDb.map((e) => e.dataValues);
  var toSend = [];
  for (let order of myOrders) {
    order = { ...order, orderItems: [] };
    let paymentsInDb = await safeDbRequest(
      () =>
        db.qr_payment.findAll({
          where: { order_id: order.id },
        }),
      []
    );
    paymentsInDb = paymentsInDb.map((e) => e.dataValues);

    let orderItemsInDb = await safeDbRequest(
      () =>
        db.qr_order_items.findAll({
          where: { order_id: order.id },
        }),
      {}
    );
    orderItemsInDb = orderItemsInDb.map((e) => e.dataValues);
    for (let item of orderItemsInDb) {
      if (item.is_comp) {
        var itemInDb = await safeDbRequest(
          () =>
            db.qr_composition_main.findOne({
              where: { id: item.item_id },
            }),
          {}
        );
      } else {
        var itemInDb = await safeDbRequest(
          () =>
            db.qr_menu.findOne({
              where: { id: item.item_id },
            }),
          {}
        );
      }
      itemInDb = itemInDb.dataValues;
      itemInDb = {
        ...itemInDb,
        qt: item.quantity,
        ready:item.ready,
        slots: [],
        extras: [],
        steps: [],
      };
      // console.log(itemInDb.id);
      ////slots///
      let slots = await safeDbRequest(
        () =>
          db.qr_order_item_composition.findAll({
            where: { order_item_id: item.id },
          }),
        {}
      );
      slots = slots.map((e) => e.dataValues);
      for (let slot of slots) {
        let slotInDb = await safeDbRequest(
          () =>
            db.qr_menu.findOne({
              where: { id: slot.product_id },
            }),
          {}
        );
        slotInDb = slotInDb.dataValues;
        itemInDb["slots"].push({
          ...slotInDb,
          price: slot.price,
          quantity: slot.quantity,
        });
      }

      //////extra/////
      let extras = await safeDbRequest(
        () =>
          db.qr_order_item_extras.findAll({
            where: { order_item_id: item.id },
          }),
        {}
      );
      extras = extras.map((e) => e.dataValues);
      for (let extra of extras) {
        let extraInDb = await safeDbRequest(
          () =>
            db.qr_menu_extras.findOne({
              where: { id: extra.extra_id },
            }),
          {}
        );
        extraInDb = extraInDb.dataValues;
        itemInDb["extras"].push({
          ...extraInDb,
          price: extra.price,
          default_quantity: extra.quantity,
        });

        // console.log(extraInDb);
      }
      //////steps/////
      let steps = await safeDbRequest(
        () =>
          db.qr_order_item_steps.findAll({
            where: { order_item_id: item.id },
          }),
        {}
      );
      steps = steps.map((e) => e.dataValues);
      for (let step of steps) {
        let stepInDb = await safeDbRequest(
          () =>
            db.qr_menu.findOne({
              where: { id: step.item_id },
            }),
          {}
        );
        stepInDb = stepInDb.dataValues;
        itemInDb["steps"].push({
          ...stepInDb,
          price: step.price,
          quantity: step.quantity,
        });

        // console.log(extraInDb);
      }

      // console.log(itemInDb);
      await order["orderItems"].push({
        ...itemInDb,
        quantity: item.quantity,
        tva: item.tva,
        price: item.price,
        is_comp: item.is_comp,
        from_kiosk: item.from_kiosk,
       
      });
    }

    toSend.push({ ...order, paymentsInDb });
  }
  res.status(200).send(toSend);
});

//update order 
app.post("/api/updateorder", async (req, res) => {
  const { order } = req.body;
  console.log(order);
  const orderInDb = await safeDbRequest(() => {
    return db.qr_orders.update(
      {
        status: order.status,
        
      },
      { where: { id: order.id } }
    );
  }, {});

  res.status(200).send(order.status);
});

//update item 
app.post("/api/updateitem", async (req, res) => {
  const { item,order_id } = req.body;
  const ready= !item.ready
 

    
      const itemInDb = await safeDbRequest(() => {
        return db.order_items.findOne(
          {
            ready: ready,
            
          },
          { where: { id:"716"} }
        );
      }, {});
      console.log("zae",itemInDb)
    
  

  res.status(200).send("item Updated");
});
//Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/api/socket",(req, res) => {
  const {user_id}=req.body
  //connect socket
io.on("connection", (socket) => {
  socket.removeAllListeners()
  id=user_id
  console.log("a user connected",socket.id);
  
// ping socket 
socket.on(`accept${user_id}`,data=>{
  socket.broadcast.emit(`ping${user_id}`,data)
})

// disconnect socket
  socket.on("disconnect", (data) => {
    console.log("user disconnected");
    socket.removeAllListeners();
    
  });
});


})


//connect server
server.listen(5002, () => {
  console.log("listening on *:5002");
});
