"use strict";

const { query } = require("express");
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Cat endpoints here 👇
  .get("/cat-message", (req, res) => {
    console.log("This is cat");
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // Monkey endpoints here ☝️
  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const theMessage = messages[Math.floor(Math.random() * messages.length)];
    const message = { author: "monkey", text: theMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // Parrot endpoints here 👇
  .get("/parrot-message", (req, res) => {
    console.log(req.query);
    const userText = req.query.text;
    const message = { author: "parrot", text: userText };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // Bot endpoints here 👇
  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonGoodbyes = [
        "goodbye",
        "bye",
        "see you",
        "thanks",
        "thank you",
      ];
      const lowerCasedText = text.toLowerCase();

      let botMsg = "";
      if (commonGreetings.includes(lowerCasedText)) {
        botMsg = `Bzzt Hello, this is bot 🤖`;
      } else if (commonGoodbyes.includes(lowerCasedText)) {
        botMsg = `Bzzt Goodbye, human`;
      } else {
        botMsg = `Bzzt ${text}`;
      }
      return botMsg;
    };
    const userText = req.query.text;
    const message = { author: "bot", text: getBotMessage(userText) };
    const randomTime = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
