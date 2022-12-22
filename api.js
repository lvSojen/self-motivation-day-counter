var request = new XMLHttpRequest();

request.open("GET", "https://type.fit/api/quotes");

request.onload = function () {
  var response = request.response;
  var parsedData = JSON.parse(response);
  // console.log(parsedData);
  // console.log(parsedData.length);

  // getting random a quote on load
  const min = 0;
  const max = parsedData.length;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  var quotes = parsedData[randomNumber].text;
  var name = parsedData[randomNumber].author;
  var products = document.getElementById("quotes");
  // products.innerHTML = `${quotes}\n
  // ${name}`;
  products.innerText = `${quotes}\n- ${name}`;
  // products.append("\n-----" + name);
  // adding <li>{name}</li> to the body of HTML
  document.body.appendChild(products);
};

request.send();
