// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const axios = require('axios');


// Get our API routes
const api = require('./server/routes/api');
const search = require('./server/routes/search');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/search', search);

// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.post("/search", async(req, res) => {
  const formData = req.body;
  var keyword = formData["keyword"];
  var category= formData["category"];
  var distance= formData["distance"];
  var condition= formData["conditions"];
  var segmentId;
  var zip;
  var conditionStr = "&itemFilter(4).name=Condition"; //condition string to be concatenated
  var localPick ="false";
  var freeShip ="false";
  var addCon = false;


  if(formData["useCurLoc"]== true) {
    zip = formData["zip"]
  } else if(formData["useCurLoc"]== false)  {
    zip = formData["location"]
  }

  if(formData["shippings"][0]["selected"] == true) {
    localPick = "true"
  }
  if(formData["shippings"][1]["selected"] == true) {
    freeShip = "true"
  }

  var conditionCount = 0;
  var conditionArray =[]
  for(i=0; i<condition.length;i++) {
    if(condition[i]["selected"] == true) {
      addCon = true;
      conditionCount++;
      conditionArray.push(condition[i]["name"])
    }
  }
  for(j=0; j<conditionCount; j++) {
    conditionStr= conditionStr+"&itemFilter(4).value("+j+")="+conditionArray[j]
  }

  if(!addCon) {conditionStr= ""}

if(category=="All Categories") {
	segmentId="";}
else if(category=="Art"){
	segmentId="&categoryId=550";}
else if(category=="Baby"){
	segmentId="&categoryId=2984";}
else if(category=="Books"){
	segmentId="&categoryId=267";}
else if(category=="Clothing, Shoes & Accessories") {
	segmentId="&categoryId=11450";}
else if(category=="Computers/Tablets & Networking") {
	segmentId="&categoryId=58058";}
else if(category=="Health & Beauty") {
	segmentId="&categoryId=26395";}
else if(category=="Music") {
	segmentId="&categoryId=11233";}
else if(category=="Video Games & Consoles") {
	segmentId="&categoryId=1249";}

  try{
    let url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=LiFan-mytestap-PRD-816e2f149-f30e199f&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+keyword+"&paginationInput.entriesPerPage=30&buyerPostalCode="+zip+"&itemFilter(0).name=MaxDistance&itemFilter(0).value="+distance+"&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value="+freeShip+"&itemFilter(2).name=LocalPickupOnly&itemFilter(2).value="+localPick+"&itemFilter(3).name=HideDuplicateItems&itemFilter(3).value=true"+conditionStr+"&outputSelector(0)=SellerInfo&outputSelector(1)=StoreInfo"+segmentId
    axios.get(url).then(response => {
      res.send(response["data"]["findItemsAdvancedResponse"][0]["searchResult"][0]["item"])
    })
  } catch(err) {
    console.log(err);
    res.status(503).send(err);
  }



});

app.post("/detail", async(req, res) => {
  try{
    let itemId = req.body["itemId"]
    let url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=LiFan-mytestap-PRD-816e2f149-f30e199f&siteid=0&version=967&ItemID="+itemId+"&IncludeSelector=Description,Details,ItemSpecifics"
    axios.get(url).then(response => {
      res.send(response["data"]["Item"])
    })
  } catch(err) {
    console.log(err);
    res.status(503).send(err);
  }

})


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
