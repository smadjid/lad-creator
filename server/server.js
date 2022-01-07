const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `upload/${file.originalname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: storage,
});

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//serve react build files
app.use(express.static(path.join(__dirname, "build")));


//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.get("/api/decisions", (req, res) => {
  db.query("SELECT * FROM decisions", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/decisions", (req, res) => {
  const insertQuery = "INSERT INTO decisions SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Decision Added to Database");
    }
  });
});

app.put("/api/decisions", (req, res) => {
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

app.delete("/api/decisions/:id", (req, res) => {
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

app.get("/api/indicators", (req, res) => {
  db.query("SELECT * FROM indicators", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/indicators", (req, res) => {
  const insertQuery = "INSERT INTO indicators SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Indicator Added to Database");
    }
  });
});

app.put("/api/indicators", (req, res) => {
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

app.delete("/api/indicators/:id", (req, res) => {
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

app.get("/api/wss", (req, res) => {
  db.query("SELECT * FROM workspaces", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/api/wss", (req, res) => {
  const insertQuery = "INSERT INTO workspaces SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("WS Added to Database");
    }
  });
});

app.get("/api/panels", (req, res) => {
  db.query("SELECT * FROM panels", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/panels", (req, res) => {
  const insertQuery = "INSERT INTO panels SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Panel Added to Database");
    }
  });
});

app.put("/api/panels", (req, res) => {
  const updateQuery =
    "UPDATE panels SET title = ?,  description = ?, indicator_id = ?, visualization_id = ?, request = ? WHERE id = ?";
  db.query(
    updateQuery,
    [
      req.body.title,
      req.body.description,
      req.body.indicator_id,
      req.body.visualization_id,
      req.body.request,
      req.body.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/panels/:id", (req, res) => {
  db.query("DELETE FROM panels WHERE id = ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/plist", (req, res) => {
  db.query("SELECT * FROM plist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/plist", (req, res) => {
  const insertQuery = "INSERT INTO plist SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("plist Added to Database");
    }
  });
});

app.delete("/api/plist/:id", (req, res) => {
  db.query("DELETE FROM plist WHERE id = ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/cpanels", (req, res) => {
  db.query("SELECT * FROM cpanels", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/cpanels", (req, res) => {
  const insertQuery = "INSERT INTO cpanels SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("CPanel Added to Database");
    }
  });
});

app.put("/api/cpanels", (req, res) => {
  const updateQuery =
    "UPDATE cpanels SET title = ?,  description = ?, sample = ? WHERE id = ?";
  db.query(
    updateQuery,
    [req.body.title, req.body.description, req.body.sample, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/api/cpanels/:id", (req, res) => {
  db.query("DELETE FROM cpanels WHERE id = ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/flist", (req, res) => {
  db.query("SELECT * FROM flist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/flist", (req, res) => {
  const insertQuery = "INSERT INTO flist SET ?";
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("flist Added to Database");
    }
  });
});

app.delete("/api/flist/:id", (req, res) => {
  db.query("DELETE FROM flist WHERE id = ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/*****************************/
/* LAD STUDIO SPECIFICATION */
app.get("/api/ladstudiospecs", (req, res) => {
  const getQuery = "SELECT * FROM ladstudiospecs";
  db.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/ladstudiospecs", (req, res) => {
  const insertQuery = "INSERT INTO ladstudiospecs SET ?";
  const last = "SELECT max(id) from ladstudiospecs;";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(last, (err, r) => {
        if (err) {
          console.log(err);
        } else {
          res.send(r);
        }
      });
    }
  });
});

app.put("/api/ladstudiospecs", (req, res) => {
  const updateQuery =
    "UPDATE ladstudiospecs SET title = ?, description = ?";
  db.query(
    updateQuery,
    [req.body.title, req.body.description, req.body.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/////////// SPEC FRAMES
app.get("/api/specframes", (req, res) => {
  const getQuery = "SELECT * FROM dash_frame_list";
  db.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/specframes", (req, res) => {
  const insertQuery = "INSERT INTO dash_frame_list SET ?";
  const last = "SELECT max(id) from dash_frame_list;";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(last, (err, r) => {
        if (err) {
          console.log(err);
        } else {
          res.send(r);
          console.log(r);
        }
      });
    }
  });
});


/*******************************/
app.get("/api/frames", (req, res) => {
  const getQuery = "SELECT * FROM frames";
  db.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/frames", (req, res) => {
  const insertQuery = "INSERT INTO frames SET ?";
  const last = "SELECT max(id) from frames;";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(last, (err, r) => {
        if (err) {
          console.log(err);
        } else {
          res.send(r);
          console.log(r);
        }
      });
    }
  });
});

app.put("/api/frames", (req, res) => {
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

app.delete("/api/frames/:id", (req, res) => {
  db.query("DELETE FROM frames WHERE id = ?", req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/visualizations", (req, res) => {
  db.query("SELECT * FROM visualizations", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/visualizations", function (req, res) {
  const insertQuery = "INSERT INTO visualizations SET ?";

  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Visualization Added to Database");
    }
  });
});

app.put("/api/visualizations", (req, res) => {
  let chart = req.body.chart;

  if (chart !== null)
    if (typeof req.body.chart !== "string") {
      const { data } = chart;
      chart = new Buffer.from(data).toString("ascii");
    }

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

app.delete("/api/visualizations/:id", (req, res) => {
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
