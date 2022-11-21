const app = require("./src/app");
require("dotenv").config(); //Requiero el .env

const PORT = process.env.PORT; // Asigno número del puerto

// Conecto servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});