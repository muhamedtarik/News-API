var httpReq = new XMLHttpRequest();
var data = [];
var category = "general";
var country = "eg";
var chosenCat = document.getElementsByClassName("cat");
var count = document.getElementsByClassName("count");

function displayData() {
  var temp = ``;
  for (var i = 0; i < data.length; i++) {
    
    temp +=
      `<div class="col-lg-3 col-md-4 col-sm-12 bg-light py-2">
    <img
      class="img-fluid"
      src="` +
      data[i].urlToImage +
      `"
      alt=""
    />
    <h5>
      ` +
      data[i].title +
      `
    </h5>
    <span class="badge badge-pill badge-secondary float-right"
      >` +
      data[i].publishedAt +
      `</span
    >
    <p>
    ` +
      data[i].description +
      `
    </p>
    <a
      target="_blank"
      href="` +
      data[i].url +
      `"
      >Read More</a
    >
  </div>`;
  }
  document.getElementById("displayData").innerHTML = temp;
}

function getCatAndCoun(category, country) {
  httpReq.open(
    "GET",
    "https://newsapi.org/v2/top-headlines?country=" +
      country +
      "&category=" +
      category +
      "&apiKey=5e72679e25ea4260a7d42cecb583dfcb"
  );
  httpReq.send();
  httpReq.onreadystatechange = function() {
    if (httpReq.readyState == 4 && httpReq.status == 200) {
      data = JSON.parse(httpReq.response).articles;
      displayData();
    }
  };
}

getCatAndCoun(category, country);

for (var i = 0; i < chosenCat.length; i++) {
  chosenCat[i].addEventListener("click", function(e) {
    category = e.target.text;
    getCatAndCoun(category, country);
  });
}

for (var i = 0; i < count.length; i++) {
  count[i].addEventListener("click", function(e) {
    country = e.target.text;
    getCatAndCoun(category, country);
  });
}
