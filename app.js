//server setup
const express = require("express");
const { request, response } = require("http");
const app = express();
const port = 3000;
const listings = require("./data/listings");

app.listen(port, () => console.log(`Listning on port ${port}`));

app.use(express.static("public"));
app.set("view engine", "ejs");

// function to change price type from string to number, removes dolar sign and comas
function convertPriceToNumber(price) {
  return parseFloat(price.replace(/[\$,]/g, ""));
}

//rout for downtown page
app.get("/downtown", (request, response) => {
  const { sort } = request.query;

  // method to sort price ascendingly for downtown
  if (sort === "ascendingly") {
    console.log("Sorting Ascending");
    listings.downtown.sort(
      (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
    );

    //method to sort price decendingly for downtown listing
  } else if (sort === "decendingly") {
    console.log("Sorting Descending");
    listings.downtown.sort(
      (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
    );
  }
  response.render("downtown-view", { downtown: listings.downtown });
});

// route for northend page
app.get("/northend", (request, response) => {
  const { sort } = request.query;
  if (sort === "ascendingly") {
    listings.northend.sort(
      (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
    );
  } else if (sort === "decendingly") {
    listings.northend.sort(
      (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
    );
  }
  response.render("northend-view", { northend: listings.northend });
});

//route for riverdale page
app.get("/riverdale", (request, response) => {
  const { sort } = request.query;
  if (sort === "ascendingly") {
    listings.riverdale.sort(
      (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
    );
  } else if (sort === "decendingly") {
    listings.riverdale.sort(
      (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
    );
  }
  response.render("riverdale-view", { riverdale: listings.riverdale });
});

//route for eastend page
app.get("/eastend", (request, response) => {
  const { sort } = request.query;
  if (sort === "ascendingly") {
    listings.eastend.sort(
      (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
    );
  } else if (sort === "decendingly") {
    listings.eastend.sort(
      (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price)
    );
  }
  response.render("eastend-view", { eastend: listings.eastend });
});

//route for specific listing by ID
app.get("/:neighbourhood/:id", (request, response) => {
  const neighbourhood = request.params.neighbourhood;
  const id = request.params.id;

  //to get listing for particular neighbourhood and id
  const listing = getListing(neighbourhood, id);

  //to render listing for specific id
  response.render("listing-view", { neighbourhood, listing });
});

//function to find specific listing on the bases of id and neighbourhood
function getListing(neighbourhood, id) {
  if (listings[neighbourhood]) {
    return listings[neighbourhood].find((listing) => listing.id === id);
  }
}
