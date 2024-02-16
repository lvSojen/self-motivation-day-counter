var request = new XMLHttpRequest();

// request.open("GET", "https://type.fit/api/quotes");
request.open("GET", "https://raw.githubusercontent.com/bmumz/inspirational-quotes-api/main/db.json");

request.onload = function () {
  var response = request.response;
  // console.log(response);
  var parsedData = JSON.parse(response).quotes;
  console.log(parsedData);
  // console.log(parsedData.length);

  // getting random a quote on load
  const min = 0;
  const max = parsedData.length;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomNumber);
  var quotes = parsedData[randomNumber].quote;
  var name = parsedData[randomNumber].source;
  var products = document.getElementById("quotes");
  // products.innerHTML = `${quotes}\n
  // ${name}`;
  products.innerText = `${quotes}\n- ${name === null ? 'Anonymous': name}`;
  // products.append("\n-----" + name);
  // adding <li>{name}</li> to the body of HTML
  document.body.appendChild(products);
};

request.send();
