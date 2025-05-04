// Importera nödvändiga beroenden
const express = require("express"); // Express är webbramverket som används för att bygga API:er
const dotend = require("dotenv").config(); // Laddar miljövariabler från en .env-fil till process.env
const errorHandler = require("./middleware/errorHandler"); // Egen middleware för felhantering
const { connect } = require("mongoose"); // Mongoose används för att interagera med MongoDB
const connectDB = require("./config/dbConnection"); // Egen funktion för att ansluta till databasen

// Anslut till databasen
connectDB();

// Skapa en instans av express-applikationen
const app = express();

// Sätt porten, som standard 3000 om inte angiven i miljövariabler
const PORT = process.env.PORT || 3000;

// Skriv en enkel route direkt här för att testa GET-request
// app.get("/api/contacts", (req, res) => {
//   res.status(200).json({ message: "Get all contacts" });
// });

// Middleware för att parsa inkommande JSON-förfrågningar
app.use(express.json());

// Route för att hantera kontakt-relaterade förfrågningar (CRUD)
app.use("/api/contacts", require("./routes/contactRoutes"));

// Global felhanteringsmiddleware som fångar upp fel som kastas i någon route
app.use(errorHandler);

// Starta servern och logga den körande porten
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);


