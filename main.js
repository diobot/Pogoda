// function myBtn(){

// var town = document.getElementById('town').value;

//     function(){
//         // var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q='+town+'1&APPID=ac6c6075d5e794c18b1b66402ab3eb91';
//         // var request = new XMLHttpRequest();
//         // request.open('GET', requestURL);
//         // request.responseType = 'json';
//         // request.send();
//     }

// }

function calculate(kelvin) {
    return Math.ceil(kelvin - 272.15);
}
    var list = document.createElement('div');
    list.setAttribute('class','hide');
    var container = document.getElementById('container');
    container.appendChild(list);
    var ulCreate = document.createElement('ul');
    list.appendChild(ulCreate);

function addElement(value) {
    var li = document.createElement('li');
    li.innerText = value;
    var ul = document.querySelector('ul');
    ul.appendChild(li);
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
                  addElement(item.dt_txt + ': ' + calculate(item.main.temp)+ ' ℃');
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
    input.addEventListener(focus, function(){  
        document.querySelector('button').disabled=false;
    },true);      //nie działa...