import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/database.js";
import router from "./router.js";

const port = "3000";
const app = express();

/* App configuration */
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("combined"));
/* App use view engine */
app.set("views", path.join(path.resolve(), "src", "views"));
app.set("view engine", "ejs");

/* App connect to Database */
connectDB();
/* App router */
router(app);


app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
