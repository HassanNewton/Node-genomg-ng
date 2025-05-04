// Importera mongoose för att skapa databasmodellen
const mongoose = require("mongoose");

// Skapa ett schema för en kontakt
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"], // Fältet är obligatoriskt
    },
    email: {
      type: String,
      required: [true, "Please add an email"], // Fältet är obligatoriskt
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"], // Fältet är obligatoriskt
    },
  },
  {
    timestamps: true, // Skapa "createdAt" och "updatedAt"-fält automatiskt
  }
);

// Exportera modellen baserat på schema
module.exports = mongoose.model("Contact", contactSchema);
