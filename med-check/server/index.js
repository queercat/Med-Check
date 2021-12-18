const express = require("express")
const cors = require("cors");

const Datastore = require("nedb");
const res = require("express/lib/response");

const PORT = process.env.port || 3001
const app = express()



db = new Datastore({filename: "./server/database/MedicationLog", autoload: true})

db.loadDatabase(function(err) {
    if (err !== null) {
        throw new Error("Couldn't load database!")
    }
})

// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
function get_current_date() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    return today
}

function insert_doc(doc) {
    db.insert(doc, function(err, new_doc) {
        if (err !== null) {
            throw new Error("Couldn't write document into database!")
        }
    })
}

function check_medication(medication, res) {
    today = get_current_date()

    db.find({medication: medication, date: today}, function(err, docs) {
        if (err !== null) {
            throw new Error("Couldn't search DB!")
        }

        var med_res = (docs != null)

        console.log(med_res)

        res.send({med_res})
    })
}

function set_medication(medication) {
    today = get_current_date()

    db.find({medication: medication, date: today}, function(err, docs) {
        if (err !== null) {
            throw new Error("Couldn't search DB!")
        }

        if (docs == null) {
            var doc = {name: medication, date: today}
            insert_doc(doc)
        }
    })
}

/**
interface MedicationObject {
    name: String,
    date: String
}
*/

app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

app.get('/', function(req, res) {
    res.send('401!!!');
})

app.get('/api/get_medication/:medication', function(req, res) {
    medication = req.params['medication']

    check_medication(medication, res)
})

app.post('/api/set_medication/:medication', function(req, res) {
    medication = req.params['medication']
    set_medication(medication)
    res.send('{}')
})