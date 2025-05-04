// Importera mongoose för att hantera databasanslutningen
const mongoose = require("mongoose");

// Funktion för att ansluta till MongoDB
const connectDB = async () => {
  try {
    // Anslut till databasen med hjälp av CONNECTION_STRING från miljövariabler
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);

    // Logga anslutningens host och databasens namn
    console.log(
      "Database connected: ",
      conn.connection.host,
      conn.connection.name
    );

    // Bekräfta att anslutningen lyckades
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Vid fel, logga felet och avsluta processen
    console.error(`Error: ${error.message}`);
    process.exit(1); // Avsluta applikationen vid fel
  }
};

// Exportera connectDB för att kunna användas i andra filer
module.exports = connectDB;
