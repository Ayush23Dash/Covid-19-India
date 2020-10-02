// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js

let app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


let c = new Array();

rp('https://www.mohfw.gov.in/',function(err,res,body){
  let $ = cheerio.load(body);
  // let a = $('.icount');
  // for(let i =0;i<5;i++){
  // let b = a[i];

  // c.push(b.children[0].data);
  let a = $('.bg-blue');
  let b = $('.bg-green');
  let d = $('.bg-red');
  let e = $('.bg-orange');
  c.push(a[0].children[0].parent.children[3].children[0].data);
  c.push(b[0].children[0].parent.children[3].children[0].data);
  c.push(d[0].children[0].parent.children[3].children[0].data);
  // c.push(e[0].children[0].parent.children[3].children[0].data);
});

// });
// AQI
    let aqi,condition;
rp('https://aqicn.org/city/delhi/',function(err,res,body)
	{
		let $ = cheerio.load(body);
		let a = $('.aqivalue');
		 aqi = (a[0].children[0].data);
		 condition = a[0].attribs.title;
	});

  app.get("/", (req,res) =>{

  res.render("home",{value :c,aqi,condition});

});



	

app.listen(process.env.PORT || 3000,() => {
console.log("Server is running on port 3000");
}
);
