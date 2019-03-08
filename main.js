
function calculate(kelvin) {
  return Math.ceil(kelvin - 272.15);
}

var input=document.getElementById("town");
input.addEventListener("keyup", function(event){
  event.preventDefault();
  if(event.keyCode ===13){
    document.getElementById("search").click();
  }
});
var left=document.createElement("div");
left.setAttribute("id","left");
left.setAttribute("onclick","SL()");
var right=document.createElement("div");
right.setAttribute("id","right");
right.setAttribute("onclick","SR()");
var list = document.createElement('div');
list.setAttribute('id', 'box');
var container = document.getElementById('weatherBox');
container.appendChild(left);
container.appendChild(list);
container.appendChild(right);



function addElement(value, ic, temp) {
  var d = document.createElement('div');
  d.setAttribute('class', 'cell');
  var c = document.createElement('div');
  c.setAttribute('class', 'icon')
  var s = document.createElement('div');
  s.setAttribute('class', 'date');
  var p = document.createElement('p');
  p.innerText = temp;
  c.innerHTML = ic;
  s.innerText = value;
  s.appendChild(p);
  d.appendChild(s);
  d.appendChild(c);
  var l = document.getElementById('box');
  l.appendChild(d);
}

var button = document.querySelector('button');
button.onclick = function () {
  list.removeAttribute('class');
  list.setAttribute('class', 'list');
  var input = document.querySelector('input');
  if (input.value.trim() !== '') {
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      input.value +
      '&appid=ac6c6075d5e794c18b1b66402ab3eb91'
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        list.innerHTML="";
        if (jsonData.cod === '200') {
          jsonData.list.forEach(function (item) {
            var equalDate = item.dt_txt;
            var checkDate = equalDate.substr(11, 5);
            var temperature = item.main.temp;
            var temp = calculate(temperature) + '°C';
            console.log(temp);
            console.log(checkDate);
            var picture = item.weather[0].icon;
            var icon = '<img src="http://openweathermap.org/img/w/\\' + picture + '.png"/>';
            addElement(checkDate, icon, temp);

            var name= document.getElementById("townName");
            var search=document.getElementById("town").value;
            name.innerHTML=search;
          });
        }
        else {
          alert('Upppssss...');
        }
      })

      .catch(function (error) {
        console.warn('Nasz error:', error);
      });
  }
  button.disabled = true;

  
};

  if (navigator.geolocation){
    window.onload = function(){
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }
  
  function getPosition(position){
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    if(latitude!==" "&longitude!==" "){
      
   
  fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&units=metric&&appid=ac6c6075d5e794c18b1b66402ab3eb91')
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      if (jsonData.cod === '200') {
        jsonData.list.forEach(function (item) {
          var equalDate = item.dt_txt;
          var checkDate = equalDate.substr(11, 5);
          var temperature = item.main.temp;
          var temp = Math.ceil(temperature) + '°C';
          console.log(temp);
          console.log(checkDate);
          var picture = item.weather[0].icon;
          var icon = '<img src="http://openweathermap.org/img/w/\\' + picture + '.png"/>';
          addElement(checkDate, icon, temp);
          var townName = jsonData.city.name;
    var name = document.getElementById("townName");
    name.innerText = townName;
        });
      }
      else {
        alert('Upppssss...');
      }
    })

    .catch(function (error) {
      console.warn('Nasz error:', error);
    });
    
};
var h=document.getElementById("left");
var g=document.getElementById("right");
h.setAttribute('class','arrow');
g.setAttribute('class','arrow');
};

var input = document.querySelector('input');
input.onfocus = function () {
  var btn = document.querySelector('button');
  btn.disabled = false;
};
function SL(){
  var q=document.getElementById('left');
  var cont=document.getElementById("box");
      const step = 300;
          cont.scrollLeft -= step;
  };

  function SR(){
  var q=document.getElementById('right');
  var cont=document.getElementById("box");
      const step = 300;
          cont.scrollLeft += step;
  };