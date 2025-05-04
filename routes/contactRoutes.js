// Importera express och skapa en router-instans
const express = require("express");
const router = express.Router();

// Importera controller-funktioner för att hantera kontakt-relaterade routes
const {
  getContacts, // Hämta alla kontakter
  createContact, // Skapa en ny kontakt
  getContact, // Hämta en specifik kontakt via ID
  updateContact, // Uppdatera en befintlig kontakt via ID
  deleteContact, // Ta bort en kontakt via ID
} = require("../controllers/contactController");

// Definiera routes för att hantera kontakter
router.route("/").get(getContacts).post(createContact); // GET för att hämta alla kontakter, POST för att skapa en ny kontakt
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); // GET för att hämta kontakt via ID, PUT för att uppdatera, DELETE för att ta bort kontakt via ID

// Exportera routern för att kunna användas i andra delar av applikationen
module.exports = router;

// router.route("/").get(getContact);

// router.route("/").post((req, res) => {
//   res.status(200).json({ message: "Create contact" });
// });

// router.route("/:id").get((req, res) => {
//   res.status(200).json({ message: `Get contact ${req.params.id}` });
// });

// router.route("/:id").put((req, res) => {
//   res.status(200).json({ message: `update contact ${req.params.id}` });
// });
// router.route("/:id").delete((req, res) => {
//   res.status(200).json({ message: `delete contact ${req.params.id}` });
// });


