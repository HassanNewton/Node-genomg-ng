// Importera express-async-handler för att hantera asynkrona operationer med felhantering
const asyncHandler = require("express-async-handler");

// Importera Contact-modellen för att interagera med kontaktdatabasen
const Contact = require("../models/contactModel");


//@desc GET all contacts EASY EXEMPEL
//@route GET /api/contacts
//@access Public
// const getContact = (req, res) => {
//   res.status(200).json({ message: "Get all contacts" });
// };


//@desc Hämta alla kontakter
//@route GET /api/contacts
//@access Privat (bara för autentiserade användare)
const getContacts = asyncHandler(async (req, res) => {
  // Hämta alla kontakter från databasen
  const contacts = await Contact.find();
  // Skicka tillbaka kontakter som svar med HTTP-status 200
  res.status(200).json(contacts);
});

//@desc Skapa en ny kontakt
//@route POST /api/contacts
//@access Privat
const createContact = asyncHandler(async (req, res) => {
  // Logga förfrågans kropp i konsolen för felsökning
  console.log("The request body is", req.body);

  // Hämta namn, email och telefon från förfrågans kropp
  const { name, email, phone } = req.body;

  // Kontrollera att alla fält är ifyllda
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  // Skapa en ny kontakt i databasen
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  // Skicka tillbaka den nyskapade kontakten med HTTP-status 200
  res.status(200).json(contact);
});

//@desc Hämta en kontakt genom ID
//@route GET /api/contacts/:id
//@access Privat
const getContact = asyncHandler(async (req, res) => {
  // Hitta kontakten i databasen med hjälp av ID från URL-parametern
  const contact = await Contact.findById(req.params.id);

  // Om ingen kontakt hittades, returnera en 404-felstatus
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Skicka tillbaka den funna kontakten med HTTP-status 200
  res.status(200).json(contact);
});

//@desc Uppdatera en kontakt
//@route PUT /api/contacts/:id
//@access Privat
const updateContact = asyncHandler(async (req, res) => {
  // Hitta kontakten i databasen med hjälp av ID från URL-parametern
  const contact = await Contact.findById(req.params.id);

  // Om ingen kontakt hittades, returnera en 404-felstatus
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Uppdatera kontakten med de nya data från förfrågans kropp
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // Returnera den uppdaterade versionen av kontakten
  );

  // Skicka tillbaka den uppdaterade kontakten med HTTP-status 200
  res.status(200).json(updatedContact);
});

//@desc Ta bort en kontakt
//@route DELETE /api/contacts/:id
//@access Privat
const deleteContact = asyncHandler(async (req, res) => {
  // Hitta kontakten i databasen med hjälp av ID från URL-parametern
  const contact = await Contact.findById(req.params.id);

  // Om ingen kontakt hittades, returnera en 404-felstatus
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Ta bort kontakten från databasen
  await Contact.deleteOne({ _id: req.params.id });

  // Skicka tillbaka den borttagna kontakten med HTTP-status 200
  res.status(200).json(contact);
});

// Exportera controller-funktionerna för att användas i andra delar av applikationen
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
