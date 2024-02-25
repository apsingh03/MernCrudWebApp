// initial setup
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "busbooking",
});

app.get("/", (request, response) => {
  return response.json({
    "http://localhost:7000/": "Home Page",
    "http://localhost:7000/read/": " Read Page",
    "http://localhost:7000/create/": " create Page",
    "http://localhost:7000/update/": " update Page",
    "http://localhost:7000/delete/": " delete Page",
  });
});

// GET ALL TABLES DATA
app.get("/read/", (request, response) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      return response.json({ message: "Error inside server" });
    }

    return response.json(result);
  });
});

// POST ALL DATA
app.post("/postData/", (request, response) => {
  const sql = `INSERT INTO users (name , email, age, busNo) VALUES (?)`;
  // const values = [request.body.name , request.body.email , request.body.age ];

  // console.log( request.body );
  const values = [
    request.body.name,
    request.body.email,
    request.body.age,
    request.body.busNo,
  ];

  // console.log( " values " , values );

  db.query(sql, [values], (error, result) => {
    if (error) return console.log("Error postData - ", error);
    return response.json({ data: request.body, result: result });
  });
});

// POST ALL DATA
app.delete("/deleteData/:deleteId", (request, response) => {
  const deleteId = request.params.deleteId;

  const sql = `DELETE FROM users WHERE id = ${deleteId}`;

  console.log("deleteId - ", sql);

  db.query(sql, (error, result) => {
    if (error) return console.log("Error deleteData - ", error);
    return response.json({ result: result });
  });
});

// POST ALL DATA
app.put("/updateData/", (request, response) => {
  console.log(request.body);

  // console.log( "deleteId - " , sql );
  const sql =
    "UPDATE users SET `name`=?, `email`=?, `age`=?, `busNo`=? WHERE id = ?";

  db.query(
    sql,
    [
      request.body.name,
      request.body.email,
      request.body.age,
      request.body.busNo,
    ],
    (error, result) => {
      if (error) return console.log("Error Update - ", error);
      return response.json({ result: result });
    }
  );
});

app.listen(7000, () => {
  console.log("Listening on Port - 7000 ");
});
