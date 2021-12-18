import logo from './logo.svg';
import './App.css';

const base_url = window.location.href.split(':')[1].split('/')[2];
const api_url = "http://" + base_url + ":3001/api/"

//fetch(api_url).then(response => response.text().then(text => console.log(text)));

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url)

  return response.json(); // parses JSON response into native JavaScript objects
}

// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '-' + dd + '-' + yyyy;

  return today
}

function haveTaken(medication) {
  var has_taken_p = getData(api_url + "get_medication/" + medication)
  var has_taken

  console.log(has_taken_p)

  has_taken_p.then(temp => has_taken = temp)

  var text = "You have taken your"

  if (!has_taken) {
    text = "You haven't taken your"
  }

  return text + " [" + medication + "] today [" + getCurrentDate() + "]"
}

function PageCard(props) {
  return <div class="card container inline">
    <div class="container">
      <h4>{props.medication}</h4>
      <div class="container inline">
        <p>{haveTaken(props.medication)}</p>
      </div>

      <div class="container inline">
        <button>Test</button>
      </div>
    </div>
  </div>
}

function App() {
  return (
    <div className="App">
    <PageCard medication="Spiro"/>
    <PageCard medication="Estrogen"/>
    </div>
  );
}

export default App;
