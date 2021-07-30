const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null,"./");
  },
  filename: function(req, file, cb){
    const ext = file.mimetype.split('/')[1];
    cb(null, `upload/${file.originalname}-${Date.now()}.${ext}`);
  }
});
const upload  = multer({
  storage: storage
});

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors({
  origin:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

//serve react build files
app.use(express.static(path.join(__dirname, "build")));

//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.get("/decisions", (req, res) => {
  db.query("SELECT * FROM decisions", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decisions", (req, res) => {
  const insertQuery = "INSERT INTO decisions SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Decision Added to Database");
    }
  });
});

app.put("/decisions", (req, res) => {
  const updateQuery =
    "UPDATE decisions SET description = ?, rating = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.description, req.body.rating, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/decisions/:id", (req, res) => {
  db.query(
    "DELETE FROM decisions WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/indicators", (req, res) => {
  db.query("SELECT * FROM indicators", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/indicators", (req, res) => {
  const insertQuery = "INSERT INTO indicators SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Indicator Added to Database");
    }
  });
});

app.put("/indicators", (req, res) => {
  const updateQuery =
    "UPDATE indicators SET description = ?, rating = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.description, req.body.rating, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/indicators/:id", (req, res) => {
  db.query(
    "DELETE FROM indicators WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/panels", (req, res) => {
  db.query("SELECT * FROM panels", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/panels", (req, res) => {
  const insertQuery = "INSERT INTO panels SET ?"; 
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Panel Added to Database");
    }
  });
});

app.put("/panels", (req, res) => {
  const updateQuery =
    "UPDATE panels SET title = ?,  description = ?, indicator_id = ?, visualization_id = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.title, req.body.description, 
      req.body.indicator_id, req.body.visualization_id,req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/panels/:id", (req, res) => {
  db.query(
    "DELETE FROM panels WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/plist", (req, res) => {
  db.query("SELECT * FROM plist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/plist", (req, res) => {
  const insertQuery = "INSERT INTO plist SET ?"; 
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("plist Added to Database");
    }
  });
});

app.delete("/plist/:id", (req, res) => {
  db.query(
    "DELETE FROM plist WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/cpanels", (req, res) => {
  db.query("SELECT * FROM cpanels", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/cpanels", (req, res) => {
  const insertQuery = "INSERT INTO cpanels SET ?"; 
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("CPanel Added to Database");
    }
  });
});

app.put("/cpanels", (req, res) => {
  const updateQuery =
    "UPDATE cpanels SET title = ?,  description = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.title, req.body.description,  req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/cpanels/:id", (req, res) => {
  db.query(
    "DELETE FROM cpanels WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/flist", (req, res) => {
  db.query("SELECT * FROM flist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/flist", (req, res) => {
  const insertQuery = "INSERT INTO flist SET ?"; 
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("flist Added to Database");
    }
  });
});

app.delete("/flist/:id", (req, res) => {
  db.query(
    "DELETE FROM flist WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/frames", (req, res) => {
  db.query("SELECT * FROM frames", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/frames", (req, res) => {
  const insertQuery = "INSERT INTO frames SET ?";
  const last = "SELECT LAST_INSERT_ID();"

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      
      db.query(last, (err, r) => {
        if (err) {console.log(err);} 
        else {res.send(r);console.log(r)}
      });
      
    }
  });

 
});

app.put("/frames", (req, res) => {
  const updateQuery =
    "UPDATE frames SET title = ?, description = ?, class = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.title, req.body.description, req.body.class, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/frames/:id", (req, res) => {
  db.query(
    "DELETE FROM frames WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/visualizations", (req, res) => {
  db.query("SELECT * FROM visualizations", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/visualizations",  function(req, res) { 
  
  const insertQuery = "INSERT INTO visualizations SET ?";
  
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Visualization Added to Database");
    }
  });
});

app.put("/visualizations", (req, res) => {
  chart = req.body.chart
  
  if(chart!==null)
  if(typeof req.body.chart !=='string'){
    const { data } = chart;
    chart = new Buffer.from(data).toString("ascii");
  }
  console.log(typeof chart);
  const updateQuery =
    "UPDATE visualizations SET description = ?, rating = ?, chart = ? WHERE id = ?";
    
  db.query(
    updateQuery,
    [req.body.description, req.body.rating, chart, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/visualizations/:id", (req, res) => {
  db.query(
    "DELETE FROM visualizations WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("App is listening on port " + listener.address().port);
});