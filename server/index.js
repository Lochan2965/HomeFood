import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({ extended: true }))

//var userIsAuthorised = false;
function checker(req, res, next)
{
    const password = req.body["password"];
    if (password === "lochan5403") {
      req.userIsAuthorised = true;
    }
    next();
  }

app.use(checker);

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/checkpoint", checker, (req, res) => {
    if (req.userIsAuthorised)
        {res.sendFile(__dirname+"/public/pswdsuccess.html");}
    else
        {res.sendFile(__dirname+"/public/index.html");}
})

app.listen(port, (req, res) => {
    console.log(`server running on port ${port}`);
})
