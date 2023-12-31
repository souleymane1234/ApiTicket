const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../keys");
const router = express.Router();
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const Ticket = mongoose.model("Ticket");
const Sport = mongoose.model("Sport");
const Img = mongoose.model("Img");
const StlEvent = mongoose.model("StlEvent");
const StlTicket = mongoose.model("StlTicket");
const RahimoTicket = mongoose.model("RahimoTicket");
const CinemaEvent = mongoose.model("CinemaEvent");
const CinemaTicket = mongoose.model("CinemaTicket");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
router.post("/uploadd", upload.single("image"), function (req, res, next) {
  const url = req.protocol + "://" + req.get("host");
  const NewImage = new Img({
    image: url + "/public/" + req.file.filename,
  });
  NewImage.save()
    .then((result) => {
      res.status(201).json({
        message: "Done upload!",
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

// sign up API start
router.post("/api/signup", async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    number,
    image,
    created_at,
    updated_at,
  } = req.body;
  try {
    const user = new User({
      nom,
      prenom,
      email,
      password,
      number,
      image,
      created_at,
      updated_at,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.send({ user, token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// sign up API end
// sign in API start
router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "erreur de mail ou pass" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Utilisateur non trouver" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.send({ user, token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" });
  }
});
// sign in API end
// create event API start
router.post("/api/createEvent", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    nombreTicketStandart,
    prixVip,
    nombreTicketVip,
    nomLieu,
    descriptionLieu,
    artisteInviter1,
    artisteInviter2,
    artisteInviter3,
    artisteInviter4,
    created_at,
    updated_at,
  } = req.body;
  try {
    const events = new Event({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      nombreTicketStandart,
      prixVip,
      nombreTicketVip,
      nomLieu,
      descriptionLieu,
      artisteInviter1,
      artisteInviter2,
      artisteInviter3,
      artisteInviter4,
      created_at,
      updated_at,
    });
    await events.save();
    res.json(events);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create event API end
// create cenima API start
router.post("/api/createCinema", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prix,
    nombreTicket,
    nomLieu,
    descriptionLieu,
    created_at,
    updated_at,
  } = req.body;
  try {
    const cinemas = new CinemaEvent({
      nom,
      image,
      description,
      date,
      heure,
      prix,
      nombreTicket,
      nomLieu,
      descriptionLieu,
      created_at,
      updated_at,
    });
    await cinemas.save();
    res.json(cinemas);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create cenima API end
// create sport API start
router.post("/api/createSport", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    prixVip,
    prixVvip,
    nomLieu,
    descriptionLieu,
    created_at,
    updated_at,
  } = req.body;
  try {
    const sports = new Sport({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      prixVip,
      prixVvip,
      nomLieu,
      descriptionLieu,
      created_at,
      updated_at,
    });
    await sports.save();
    res.json(sports);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create sport API end
// create ticket API start
router.post("/api/createTicket", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prixStandart,
    prixVip,
    prixVvip,
    nomLieu,
    descriptionLieu,
    artisteInviter1,
    artisteInviter2,
    artisteInviter3,
    artisteInviter4,
    usersId,
    eventId,
    created_at,
    updated_at,
  } = req.body;
  try {
    const tickets = new Ticket({
      nom,
      image,
      description,
      date,
      heure,
      prixStandart,
      prixVip,
      prixVvip,
      nomLieu,
      descriptionLieu,
      artisteInviter1,
      artisteInviter2,
      artisteInviter3,
      artisteInviter4,
      usersId,
      eventId,
      created_at,
      updated_at,
    });
    await tickets.save();
    res.json(tickets);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create ticket API end
// create createCinemaTicket API start
router.post("/api/createCinemaTicket", async (req, res) => {
  const {
    nom,
    image,
    description,
    date,
    heure,
    prix,
    nombreTicket,
    nomLieu,
    descriptionLieu,
    usersId,
    eventId,
    created_at,
    updated_at,
  } = req.body;
  try {
    const cinematickets = new CinemaTicket({
      nom,
      image,
      description,
      date,
      heure,
      prix,
      nombreTicket,
      nomLieu,
      descriptionLieu,
      usersId,
      eventId,
      created_at,
      updated_at,
    });
    await cinematickets.save();
    res.json(cinematickets);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create createCinemaTicket API end
// create stlEvent API start
router.post("/api/createStlEvent", async (req, res) => {
  const { nom, depart, arrive, prix, created_at, updated_at } = req.body;
  try {
    const stlEvents = new StlEvent({
      nom,
      depart,
      arrive,
      prix,
      created_at,
      updated_at,
    });
    await stlEvents.save();
    res.json(stlEvents);
  } catch (err) {
    res.status(422).send(err.message);
  }
});
// create stlEvents API end
// create StlTicket API start
router.post("/api/createStlTicket", async (req, res) => {
  const {
    nom,
    depart,
    arrive,
    prix,
    usersId,
    eventId,
    created_at,
    updated_at,
  } = req.body;
  try {
    const stlTickets = new StlTicket({
      nom,
      depart,
      arrive,
      prix,
      usersId,
      eventId,
      created_at,
      updated_at,
    });
    await stlTickets.save();
    res.json(stlTickets);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

// create StlTicket API start
// create RahimoTicket API start
router.post("/api/createRahimoTicket", async (req, res) => {
  const {
    depart,
    arrive,
    date,
    prix,
    nombreTicket,
    usersId,
    created_at,
    updated_at,
  } = req.body;
  try {
    const rahimoTickets = new RahimoTicket({
      depart,
      arrive,
      date,
      prix,
      nombreTicket,
      usersId,
      created_at,
      updated_at,
    });
    await rahimoTickets.save();
    res.json(rahimoTickets);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

// create RahimoTicket API start

// GET API

// get all event API start
router.get("/api/allEvent", (req, res) => {
  Event.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all event API end
// get all cenima API start
router.get("/api/allCinema", (req, res) => {
  CinemaEvent.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all cenima API end
// get all stlEvents API start
router.get("/api/allStlEvent", (req, res) => {
  StlEvent.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all stlEvents API end
// get single event API start
router.get("/api/single/event/:id", (req, res) => {
  Event.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get single event API end
// get all sport API start
router.get("/api/allSport", (req, res) => {
  Sport.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all sport API end
// get single sport API start
router.get("/api/single/sport/:id", (req, res) => {
  Sport.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get single sport API end
// get all allTicket API start
router.get("/api/allTicket", (req, res) => {
  Ticket.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all allTicket API end
// get all cinemaTicket API start
router.get("/api/cinemaTicket", (req, res) => {
  CinemaTicket.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all cinemaTicket API end
// get all rahimoTicket API start
router.get("/api/rahimoTicket", (req, res) => {
  RahimoTicket.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all rahimoTicket API end
// get all stlTicket API start
router.get("/api/stlTicket", (req, res) => {
  StlTicket.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});
// get all stlTicket API end

// PUT API
// create ticket API end
router.put("/api/user/:id", (req, res, next) => {
  User.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        image: req.body.image,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
