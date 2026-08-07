import app from "./app.js";
import config from "./config/index.js";



const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Royal Mart API is running successfully ${config.app.appUrl}`);
});