/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
import express from "express";
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h2>Bienvenidos</h2>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === Number(id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id !== Number(id));

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  const ids = notes.map((note) => note.id);
  const max = Math.max(...ids);
  console.log(max);

  const note = {
    id: max + 1,
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
  };
  notes = notes.concat(note);
  res.json(notes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});

// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// let contacts = [
//   {
//     id: 1,
//     name: "MiguelSalazar",
//     number: 12413,
//   },
//   {
//     id: 2,
//     name: "Lore Salazar",
//     number: 3435234,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send("<h2>Agenda de Contactos</h2>");
// });

// app.get("/api/persons", (req, res) => {
//   res.json(contacts);
// });
// app.get("/info", (req, res) => {
//   const contact = contacts.length;
//   const date = new Date();

//   const msg = `Phonebook has info for ${contact} people`;
//   res.send(`<div><h2>${msg}</h2> <h2>${date}</h2></div>`);
// });

// app.get("/api/persons/:id", (req, res) => {
//   const { id } = req.params;
//   const contact = contacts.find((contact) => contact.id === Number(id));

//   if (contact) {
//     res.json(contact);
//   } else {
//     res.status(404).end();
//   }
// });
// app.delete("/api/persons/:id", (req, res) => {
//   const { id } = req.params;
//   const contact = contacts.filter((contact) => contact.id !== Number(id));

//   res.json(contact);
// });

// app.post("/api/persons/", (req, res) => {
//   const body = req.body;
//   const namee = contacts.find((el) => el.name === body.name);

//   if (namee || !body.name || !body.number) {
//     return res.status(400).end();
//   } else {
//     const idRandom = Math.random() * 100;
//     const id = Math.round(idRandom);
//     console.log(body, contacts);

//     const contact = {
//       id: id,
//       name: body.name,
//       number: body.number,
//     };
//     contacts = [...contacts, contact];
//     res.json(contacts);
//   }
// });

// const PORT = 3001;

// app.listen(PORT, () => {
//   console.log(`Server on port ${PORT}`);
// });
