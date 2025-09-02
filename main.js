// Näkymät

const homeView = document.getElementById('homeView');
const userView = document.getElementById('userView');
const adminView = document.getElementById('adminView');

document.getElementById('userBtn').addEventListener('click', () => {
    homeView.classList.add('d-none');
    userView.classList.remove('d-none');
});

document.getElementById('adminBtn').addEventListener('click', () => {
    homeView.classList.add('d-none');
    adminView.classList.remove('d-none');
});

document.getElementById('backToHomeUser').addEventListener('click', () => {
    userView.classList.add('d-none');
    homeView.classList.remove('d-none');
});

document.getElementById('backToHomeAdmin').addEventListener('click', () => {
    adminView.classList.add('d-none');
    homeView.classList.remove('d-none');
});

// Ylläpitäjä kirjautuminen
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const adminLoginSection = document.getElementById('adminLogin');
const adminPanel = document.getElementById('adminPanel');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value.trim();

    if (username === 'admin' && password === 'admin') {
        // Piilotetaan kirjautuminen ja näytetään hallinta
        adminLoginSection.classList.add('d-none');
        adminPanel.classList.remove('d-none');
        loginError.classList.add('d-none');
    } else {
        loginError.classList.remove('d-none');
    }
});


// Käyttäjä -näkymä

// Esitäytetyt äänestykset
const defaultPolls = [
    {
        id: 1,
        question: "Mikä ohjelmointikieli on paras?",
        options: ["Python", "JavaScript", "Java", "C"],
        votes: [0, 0, 0, 0]
    },
    {
        id: 2,
        question: "Mikä on paras vuodenaika?",
        options: ["Kevät", "Kesä", "Syksy", "Talvi"],
        votes: [0, 0, 0, 0]
    },
    {
        id: 3,
        question: "Mikä automerkki on paras?",
        options: ["BMW", "Audi", "Mercedes-Benz"],
        votes: [0, 0, 0]
    }
];

// Haetaan olemassa olevat äänestykset localStoragesta
function loadPolls() {
    let polls = JSON.parse(localStorage.getItem('polls'));
    if (!polls) {
        polls = defaultPolls;
        localStorage.setItem('polls', JSON.stringify(polls));
    }
    return polls;
}

// Tallennetaan päivitetyt äänestykset localStorageen
function savePolls(polls) {
    localStorage.setItem('polls', JSON.stringify(polls));
}

// Piirretään käyttäjä -näkymän äänestykset
function renderUserPolls() {
    const pollList = document.getElementById('pollList');
    pollList.innerHTML = "";
    const polls = loadPolls();

    if (polls.length === 0) {
        pollList.innerHTML = "<p>Ei äänestyksiä</p>";
        return;
    }

    polls.forEach((poll, pollIndex) => {
        const card = document.createElement('div');
        card.className = "poll-card";

        const q = document.createElement('h5');
        q.textContent = poll.question;
        card.appendChild(q);

        // Lasketaan äänien kokonaismäärä
        const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

        poll.options.forEach((opt, optIndex) => {
            const optDiv = document.createElement('div');
            optDiv.className = "mb-2";

            // Äänien määrä -teksti
            const label = document.createElement('div');
            label.textContent = `${opt} (${poll.votes[optIndex]} ääntä)`;
            optDiv.appendChild(label);

            // Progress-baari
            const progress = document.createElement('div');
            progress.className = "progress";

            const bar = document.createElement('div');
            bar.className = "progress-bar";
            // Lasketaan prosentti vain jos ääniä on annettu
            const percent = totalVotes > 0 
                ? Math.round((poll.votes[optIndex] / totalVotes) * 100) 
                : 0;
            bar.style.width = percent + "%";
            bar.textContent = percent + "%";

            // Bootstrappin värit vaihteluun
            const colors = ["bg-primary", "bg-success", "bg-warning", "bg-info", "bg-danger"];
            bar.classList.add(colors[optIndex % colors.length]);

            progress.appendChild(bar);
            optDiv.appendChild(progress);

            card.appendChild(optDiv);
        });

        // Radio -napit äänestämistä varten
        const optionsGroup = document.createElement('div');
        poll.options.forEach((opt, optIndex) => {
            const radioDiv = document.createElement('div');
            radioDiv.className = "form-check";

            const input = document.createElement('input');
            input.type = "radio";
            input.name = "votePoll" + poll.id;
            input.value = optIndex;
            input.className = "form-check-input";

            const radioLabel = document.createElement('label');
            radioLabel.className = "form-check-label";
            radioLabel.textContent = opt;

            radioDiv.appendChild(input);
            radioDiv.appendChild(radioLabel);
            optionsGroup.appendChild(radioDiv);
        });

        card.appendChild(optionsGroup);

        const voteBtn = document.createElement('button');
        voteBtn.className = "btn btn-sm btn-primary mt-2";
        voteBtn.textContent = "Äänestä";
        voteBtn.addEventListener('click', () => {
            const selected = document.querySelector(`input[name="votePoll${poll.id}"]:checked`);
            if (selected) {
                polls[pollIndex].votes[selected.value]++;
                savePolls(polls);
                renderUserPolls();
            } else {
                alert("Valitse jokin vaihtoehto ennen äänestämistä");
            }
        });
        card.appendChild(voteBtn);

        pollList.appendChild(card);
    });
}

// Näytetään äänestykset, kun käyttäjä tulee käyttäjä -näkymään
document.getElementById('userBtn').addEventListener('click', renderUserPolls);



// Ylläpidon lisäystoiminto

const savePollBtn = document.getElementById('savePollBtn');
const addOptionBtn = document.getElementById('addOptionBtn');
const pollOptionsContainer = document.getElementById('pollOptions');
const adminMessage = document.getElementById('adminMessage');

// Uuden vastauskentän lisäys
addOptionBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = "text";
    input.className = "form-control mb-2";
    input.placeholder = `Vastausvaihtoehto ${pollOptionsContainer.children.length + 1}`;
    pollOptionsContainer.appendChild(input);
});

// Uuden äänestyksen tallennus
savePollBtn.addEventListener('click', () => {
    const question = document.getElementById('pollQuestion').value.trim();
    const optionInputs = pollOptionsContainer.querySelectorAll('input[type="text"]');
    const options = [];

    optionInputs.forEach(opt => {
        if (opt.value.trim() !== "") {
            options.push(opt.value.trim());
        }
    });

    if (question === "" || options.length < 2) {
        adminMessage.textContent = "Anna kysymys ja vähintään kaksi vastausvaihtoehtoa.";
        adminMessage.className = "text-danger";
        return;
    }

    // Haetaan nykyiset äänestykset ja lisätään uusi
    const polls = loadPolls();
    const newPoll = {
        id: Date.now(), // Uniikki ID aikaleimasta
        question: question,
        options: options,
        votes: new Array(options.length).fill(0)
    };
    polls.push(newPoll);
    savePolls(polls);

    // Nollataan lomake
    document.getElementById('pollQuestion').value = "";
    pollOptionsContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const inp = document.createElement('input');
        inp.type = "text";
        inp.className = "form-control mb-2";
        inp.placeholder = `Vastausvaihtoehto ${i + 1}`;
        pollOptionsContainer.appendChild(inp);
    }

    adminMessage.textContent = "Äänestys lisätty onnistuneesti!";
    adminMessage.className = "text-success";

    // Päivitetään myös poistettavat äänestykset -lista
    renderDeletePollList();
});



// Ylläpidon poistotoiminto

const deletePollList = document.getElementById('deletePollList');

// Listan luominen poistettavista äänestyksistä
function renderDeletePollList() {
    const polls = loadPolls();
    deletePollList.innerHTML = "";

    if (polls.length === 0) {
        deletePollList.innerHTML = "<p>Ei äänestyksiä poistettavana</p>";
        return;
    }

    polls.forEach((poll) => {
        const row = document.createElement('div');
        row.className = "delete-row mb-2";
        
        const title = document.createElement('span');
        title.textContent = poll.question;

        const delBtn = document.createElement('button');
        delBtn.className = "btn btn-sm btn-danger";
        delBtn.textContent = "Poista";
        delBtn.addEventListener('click', () => {
            const ok = confirm(`Haluatko varmasti poistaa äänestyksen:\n"${poll.question}"?`);
            if (ok) {
                const updatedPolls = polls.filter(p => p.id !== poll.id);
                savePolls(updatedPolls);
                renderDeletePollList();
            }
        });

        row.appendChild(title);
        row.appendChild(delBtn);
        deletePollList.appendChild(row);
    });
}

// Kun ylläpitäjä kirjautuu, poistettavat äänestykset näkyvät heti
loginBtn.addEventListener('click', () => {
    const username = document.getElementById('adminUser').value.trim();
    const password = document.getElementById('adminPass').value.trim();

    if (username === 'admin' && password === 'admin') {
        adminLoginSection.classList.add('d-none');
        adminPanel.classList.remove('d-none');
        loginError.classList.add('d-none');
        renderDeletePollList();
    } else {
        loginError.classList.remove('d-none');
    }
});

