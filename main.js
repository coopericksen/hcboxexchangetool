const csvUpload = document.getElementById("csv-upload");
const peopleContainer = document.getElementById("people");
const peopleContainer2 = document.getElementById("people2");
const peopleContainer3 = document.getElementById("people3");
const peopleContainer4 = document.getElementById("people4");
const arrowsContainer = document.getElementById("arrows");
const arrowsContainer2 = document.getElementById("arrows2");
let peopleObjs = [];
let peopleObjs2 = [];
let peopleObjs3 = [];
let peopleObjs4 = [];

const hiddenElements = document.querySelectorAll(".hidden");

csvUpload.addEventListener("change", (e) => {
    csvFile = e.target.files[0];
    if (!csvFile) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        let data = parseCSV(text);
        data.shift();

        //reveal elements
        hiddenElements.forEach(el => {
            el.classList.remove("hidden");
        })

        for (let i = 0; i < data.length; i++) {
            let row = data[i]
            let person = new Person(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9] - "\r");
        }

        addButtonToContainer(peopleContainer);
        addButtonToContainer(peopleContainer2);
        addButtonToContainer(peopleContainer3);
        addButtonToContainer(peopleContainer4);
        assignMatches();
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

        this.createElements();
    }

    createElements() {

        this.element = document.createElement("div");
        this.element2 = document.createElement("div");

        if (this.grade == "9" || this.grade == "10") {
            peopleContainer.appendChild(this.element);
            peopleContainer4.appendChild(this.element2);

            this.element.textContent = `${this.email}   |   ${this.grade}th   |   ${this.fname} ${this.lname}`;
            this.element2.textContent = `${this.fname} ${this.lname}   |   ${this.grade}th   |   ${this.email}`;

            peopleObjs.push(this);
            peopleObjs4.push(this);

            this.element.classList.add("person");
            this.element2.classList.add("person2");

        } else if (this.grade == "11" || this.grade == "12") {
            peopleContainer2.appendChild(this.element);
            peopleContainer3.appendChild(this.element2);

            this.element.textContent = `${this.fname} ${this.lname}   |   ${this.grade}th   |   ${this.email}`;
            this.element2.textContent = `${this.email}   |   ${this.grade}th   |   ${this.fname} ${this.lname}`;

            peopleObjs2.push(this);
            peopleObjs3.push(this);
            this.element.classList.add("person2");
            this.element2.classList.add("person");

            // create arrow
            arrowsContainer.innerHTML += "&rarr;<br>";
            arrowsContainer2.innerHTML += "&rarr;<br>";
        }

        // copy email
        this.element.addEventListener("click", () => {
            // let copyText = `Hello ${this.fname},\nThank you for choosing to participate in the 2025 Homecoming Box Exchange. You have been designated to create the box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.`
            // navigator.clipboard.writeText(copyText);
            // alert(`Copied email for ${this.fname} ${this.lname} to clipboard.`);

            const subject = "Homecoming Box Exchange 2025";
            const body = `Hello ${this.fname},\n\nThank you for choosing to participate in the 2025 Homecoming Box Exchange.\n\nYou have been designated to create a box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.\n\n${this.assigned.fname}'s favorite drinks are: ${this.assigned.drinks}\n${this.assigned.fname}'s favorite snacks & candy are: ${this.assigned.snacks}\n\nThe box exchange will take place on Friday, September 26, 2025. Your goal should be to create a fun, themed box that has a value of at least $25. If you need assistance with financing your box, please email either Mrs. Smith or Mr. Matthews.\n\nPlease put effort into making a box that you would be happy with receiving.\n\nHappy box building and please do enjoy Homecoming Week!\n\nSincerely,\n\nNHS Leadership Team`

            window.open(`https://mail.google.com/mail/?view=cm&to=${this.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        })

        this.element2.addEventListener("click", () => {
            // let copyText = `Hello ${this.fname},\nThank you for choosing to participate in the 2025 Homecoming Box Exchange. You have been designated to create the box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.`
            // navigator.clipboard.writeText(copyText);
            // alert(`Copied email for ${this.fname} ${this.lname} to clipboard.`);

            const subject = "Homecoming Box Exchange 2025";
            const body = `Hello ${this.fname},\n\nThank you for choosing to participate in the 2025 Homecoming Box Exchange.\n\nYou have been designated to create a box for ${this.assigned.fname} ${this.assigned.lname} of the ${this.assigned.grade}th grade.\n\n${this.assigned.fname}'s favorite drinks are: ${this.assigned.drinks}\n${this.assigned.fname}'s favorite snacks & candy are: ${this.assigned.snacks}\n\nThe box exchange will take place on Friday, September 26, 2025. Your goal should be to create a fun, themed box that has a value of at least $25. If you need assistance with financing your box, please email either Mrs. Smith or Mr. Matthews.\n\nPlease put effort into making a box that you would be happy with receiving.\n\nHappy box building and please do enjoy Homecoming Week!\n\nSincerely,\n\nNHS Leadership Team`

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

function shuffleContainer(container) {
    container.innerHTML = "";
    switch (container) {
        case peopleContainer:
            peopleObjs = shuffleArray(peopleObjs);
            peopleObjs.forEach(object => {
                peopleContainer.appendChild(object.element);
            })
            break;
        case peopleContainer2:
            peopleObjs2 = shuffleArray(peopleObjs2);
            peopleObjs2.forEach(object => {
                peopleContainer2.appendChild(object.element);
            })
            break;
        case peopleContainer3:
            peopleObjs3 = shuffleArray(peopleObjs3);
            peopleObjs3.forEach(object => {
                peopleContainer3.appendChild(object.element2);
            })
            break;
        case peopleContainer4:
            peopleObjs4 = shuffleArray(peopleObjs4);
            peopleObjs4.forEach(object => {
                peopleContainer4.appendChild(object.element2);
            })
            break;
    }

    addButtonToContainer(container);
    assignMatches();
}

function addButtonToContainer(container) {
    let button = document.createElement("button");
    button.addEventListener("click", () => {
        shuffleContainer(container);
    });
    button.textContent = "Shuffle";
    button.classList.add("shuffle-button")
    container.appendChild(button);
}

function clearAll() {
    csvUpload.value = "";
    peopleContainer.innerHTML = "";
    peopleContainer2.innerHTML = "";
    peopleContainer3.innerHTML = "";
    peopleContainer4.innerHTML = "";

    let len = peopleObjs.length
    for (let i = 0; i < len; i++) {
        peopleObjs.pop();
    }
    len = peopleObjs2.length
    for (let i = 0; i < len; i++) {
        peopleObjs2.pop();
    }

    arrowsContainer.innerHTML = "";
    arrowsContainer2.innerHTML = "";

    hiddenElements.forEach(el => {
        el.classList.add("hidden");
    });

}

function assignMatches() {
    for (let i = 0; i < peopleObjs.length; i++) {
        peopleObjs[i].assigned = peopleObjs2[i];
    } 
    for (let i = 0; i < peopleObjs3.length; i++) {
        peopleObjs3[i].assigned = peopleObjs4[i];
    } 
}