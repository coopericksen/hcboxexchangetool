const csvUpload = document.getElementById("csv-upload");
const peopleContainer = document.getElementById("people");
const peopleContainer2 = document.getElementById("people2");
const arrowsContainer = document.getElementById("arrows");
const peopleObjs = [];
const peopleObjs2 = [];

const hiddenElements = document.querySelectorAll(".hidden");

csvUpload.addEventListener("change", (e) => {
    csvFile = e.target.files[0];
    if (!csvFile) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        let data = parseCSV(text);
        data.shift();
        randarr = shuffleArray(data);

        //reveal elements
        hiddenElements.forEach(el => {
            el.classList.remove("hidden");
        })

        for (let i = 0; i < randarr.length; i++) {
            let row = randarr[i]
            let person = new Person(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9] - "\r");
        }

        // assign matches to objects
        for (let i = 0; i < peopleObjs.length; i++) {
            peopleObjs[i].assigned = peopleObjs2[i]
            peopleObjs2[i].assigned = peopleObjs[i]
        }
    };
    reader.readAsText(csvFile);

});

function parseCSV(text) {
  const rows = text.trim().split('\n');
  return rows.map(row => row.split(','));
}

class Person {
    constructor(timestamp, email, drinks, snacks, allergies, favcolor, other, fname, lname, grade) {
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.grade = grade;
        this.timestamp = timestamp;
        this.drinks = drinks;
        this.snacks = snacks;
        this.allergies = allergies;
        this.favcolor = favcolor;
        this.other = other;
        this.assigned = "";

        this.createElement();
    }

    createElement() {

        this.element = document.createElement("div");

        if (this.grade == "11" || this.grade == "12") {

            peopleContainer2.appendChild(this.element);
            this.element.textContent = `${this.fname} ${this.lname}   |   ${this.email}   |   ${this.grade}th`;
            peopleObjs2.push(this);
            this.element.classList.add("person2")

        } else if (this.grade == "9" || this.grade == "10") {

            peopleContainer.appendChild(this.element);
            this.element.textContent = `${this.grade}th   |   ${this.email}   |   ${this.fname} ${this.lname}`;
            peopleObjs.push(this);
            this.element.classList.add("person")

            // create arrow
            arrowsContainer.innerHTML += "&harr;<br>";
        }

        // copy email
        this.element.addEventListener("click", () => {
            // let copyText = `Hello ${this.fname},\nThank you for choosing to participate in the 2025 Homecoming Box Exchange. You have been designated to create the box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.`

            // navigator.clipboard.writeText(copyText);

            // alert(`Copied email for ${this.fname} ${this.lname} to clipboard.`);

            const recipient = this.email;
            const subject = "Homecoming Box Exchange 2025";
            const body = `Hello ${this.fname},\n\nThank you for choosing to participate in the 2025 Homecoming Box Exchange.\n\nYou have been designated to create a box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.\n\n${this.assigned.fname}'s favorite drinks are: ${this.assigned.drinks}\n${this.assigned.fname}'s favorite snacks & candy are: ${this.assigned.snacks}\n\nThe box exchange will take place on Friday, September 19, 2025. Your goal should be to create a fun, themed box that has a value of at least $25. If you need assistance with financing your box, please email either Mrs. Smith or Mr. Matthews.\n\nPlease put effort into making a box that you would be happy with receiving.\n\nHappy box building and please do enjoy Homecoming Week!\n\nSincerely,\n\nNHS Leadership Team`

            window.open(`https://mail.google.com/mail/?view=cm&to=${this.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        })

    }
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function clearAll() {
    csvUpload.value = "";

    let len = peopleObjs.length
    for (let i = 0; i < len; i++) {
        let temp = peopleObjs.pop();
        peopleContainer.removeChild(temp.element);
    }
    len = peopleObjs2.length
    for (let i = 0; i < len; i++) {
        let temp = peopleObjs2.pop();
        peopleContainer2.removeChild(temp.element);
    }
    arrowsContainer.innerHTML = "";

    hiddenElements.forEach(el => {
        el.classList.add("hidden");
    });

}