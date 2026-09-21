const express = require('express');
const moment = require('moment');

const HOST = 'localhost'
const PORT = 8000

const app = express()
const today = moment();

app.use(express.json());

// 03.09.2026


function getCurrentDay() {
  const dayName = today.format('dddd');
  console.log(dayName);
}

function getCurrentMonth() {
  const monthName = today.format('MMMM');
  console.log(monthName);
}

function getCurrentYear() {
  const year = today.format('YYYY');
  console.log(year);
}

getCurrentDay();
getCurrentMonth();
getCurrentYear();

// 07.09.2026

app.get('/timestamp', (req, res) => {
    const now = moment().format('HH:mm:ss');
    res.status(200).json({date: now})
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}/timestamp`)
})

// 10.09.2026

app.get('/health', (req, res) => {
    const status = "ok";
    res.status(200).json({"status": status})
})

app.get('/stats', (req, res) => {
    const uptime = process.uptime();
    const nodeVersion = process.version;
    const timestamp = moment().format('HH:mm:ss');
    res.status(200).json({
            "uptime": uptime,
            "nodeVersion": nodeVersion,
            "timestamp": timestamp

    })
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}/health`)
})

// 14.09.2026

products = [
    {
        id: 0,
        name: "butter",
        price: 2.5,
        category: "food"
    },
    {
        id: 1,
        name: "human",
        price: 100.0,
        category: "food"
    },
    {
        id: 2,
        name: "cow",
        price: 1.5,
        category: "animal"
    },
    {
        id: 3,
        name: "lion",
        price: 1.5,
        category: "animal"
    },
    {
        id: 4,
        name: "pen",
        price: 1.0,
        category: "school"
    },
    {
        id: 5,
        name: "pencil",
        price: 1.0,
        category: "school"
    },
    {
        id: 6,
        name: "keyboard",
        price: 3.0,
        category: "device"
    },
    {
        id: 7,
        name: "headphones",
        price: 3.0,
        category: "device"
    }
    
]

app.get('/products', (req, res) => {
    const { take, category } = req.query;
    let result = products;

    let takeNumber;
    if (take !== undefined) {
        takeNumber = parseInt(take, 10);
        if (isNaN(takeNumber) || takeNumber <= 0) {
            return res.status(400).json({ 
                message: 'take must be a positive integer' 
            });
        }
    }

    if (category) {
        result = result.filter(product => product.category === category);
    }

    if (takeNumber !== undefined) {
        result = result.slice(0, takeNumber);
    }

    return res.status(200).json(result);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({ 
            message: 'ID must be a valid number' 
        });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ 
            message: `Product with id ${productId} not found` 
        });
    }

    return res.status(200).json(product);
});

app.listen(PORT, HOST, () => {
    console.log(`server is running on http://${HOST}:${PORT}/products`);
});

// 17.09.2026

products = [
    {
        id: 1,
        name: "human",
        price: 100.0,
        category: "food",
        image: ""
    }
    
]

app.post('/products', async (req, res) => {
  const { name, price, category, image } = req.body;
  const failQuery = req.query.fail === 'true'; 

  if (
    typeof name !== "string" || !name.trim() || 
    typeof price !== "number" || price <= 0 || 
    typeof category !== "string" || !category.trim()
  ) {
    return res.status(422).json("422 Invalid product data"); 
  }

  const isDuplicate = products.some(p => p.name.toLowerCase() === name.trim().toLowerCase());
  if (isDuplicate) {
    return res.status(409).json("409 Conflict");
  }
  const newProduct = {
    id: products.length + 1,
    name: name.trim(),
    price: price,
    category: category.trim(),
    image: (typeof image === "string") ? image.trim() : ""
  };

  try {
    const createdProduct = await addProduct(newProduct, failQuery);
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


const addProduct = (newProduct, fail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        return reject(new Error("Database save error simulated"));
      }
      
      products.push(newProduct);
      resolve(newProduct);
    }, 100);
  });
};

app.listen(PORT, HOST, () => {
    console.log(`server is running on http://${HOST}:${PORT}/products`);
});