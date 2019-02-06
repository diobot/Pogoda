
function calculate(kelvin) {
    return Math.ceil(kelvin - 272.15);
}
    var list = document.createElement('div');
    list.setAttribute('class','hide');
    list.setAttribute('id','box');
    var container = document.getElementById('container');
    container.appendChild(list);
    

function addElement(value) {
    var d = document.createElement('div');
    d.setAttribute('class','cell');
    d.innerText = value;
    var l = document.getElementById('box');
    l.appendChild(d);
}

var button = document.querySelector('button');
    button.onclick = function() {
        list.removeAttribute('class');
        list.setAttribute('class','list');
        var input = document.querySelector('input');
        if (input.value.trim() !== '') {
          fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q=' +
              input.value +
              '&appid=ac6c6075d5e794c18b1b66402ab3eb91'
          )
            .then(function(response) {
              return response.json();
            })
            .then(function(jsonData) {
              // sprawdzam czy istnieja dane do wyswietlenia
              if (jsonData.cod === '200') {
                jsonData.list.forEach(function(item) {
                  var equalDate = item.dt_txt;
                  var checkDate = equalDate.substr(0, 10);
                  console.log(checkDate);

                  addElement(item.dt_txt);
                });
              } else {
                alert('Upppssss...');
              }
            })
            .catch(function(error) {
              console.warn('Nasz error:', error);
            });
        }
        button.disabled= true;
    };
   
    var input = document.querySelector('input');
    input.onfocus = function(){
      var btn = document.querySelector('button');
      btn.disabled=false;
    };