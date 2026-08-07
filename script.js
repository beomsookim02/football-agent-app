"use strict";

const CANDIDATE_COUNT = 10;
const MAX_SEASONS = 30;
const MAX_REROLLS_PER_SEASON = 1;

const STARTING_MONEY = 500000;
const SIGNING_COST_RATE = 0.05;
const MANAGEMENT_INCOME_RATE = 0.0075;
const AGENCY_TERMINATION_FEE_RATE = 0.10;

const agencyTiers = [
 {
  name: "Unknown",
  capacity: 5,
  maxSigningsPerSeason: 3,

  candidateOverallMin: 40,
  candidateOverallMax: 60,

  maxClubLevel: 60,

  requiredMoney: 0,
  requiredContracts: 0,
  requiredHighestOverall: 0,
},
 {
  name: "Rookie",
  capacity: 8,
  maxSigningsPerSeason: 3,

  candidateOverallMin: 50,
  candidateOverallMax: 68,

  maxClubLevel: 68,

  requiredMoney: 500000,
  requiredContracts: 4,
  requiredHighestOverall: 60,
},
  {
  name: "Local",
  capacity: 10,
  maxSigningsPerSeason: 3,
  candidateOverallMin: 60,
  candidateOverallMax: 73,
  maxClubLevel: 78,
  requiredMoney: 2000000,
  requiredContracts: 12,
  requiredHighestOverall: 68,
},
  {
    name: "National",
    capacity: 12,
    maxSigningsPerSeason: 4,
    candidateOverallMin: 70,
    candidateOverallMax: 82,
    maxClubLevel: 85,
    requiredMoney: 10000000,
    requiredContracts: 25,
    requiredHighestOverall: 73,
  },
  {
    name: "International",
    capacity: 15,
    maxSigningsPerSeason: 5,
    candidateOverallMin: 73,
    candidateOverallMax: 85,
    maxClubLevel: 90,
    requiredMoney: 40000000,
    requiredContracts: 45,
    requiredHighestOverall: 82,
  },
  {
    name: "Elite",
    capacity: 15,
    maxSigningsPerSeason: 6,
    candidateOverallMin: 78,
    candidateOverallMax: 88,
    maxClubLevel: 94,
    requiredMoney: 100000000,
    requiredContracts: 75,
    requiredHighestOverall: 90,
  },
  {
    name: "Legendary",
    capacity: 15,
    maxSigningsPerSeason: 7,
    candidateOverallMin: 82,
    candidateOverallMax: 92,
    maxClubLevel: 99,
    requiredMoney: 300000000,
    requiredContracts: 120,
    requiredHighestOverall: 94,
  },
];

const namePools = {
  Brazil: {
    first: [
      "Lucas",
      "Gabriel",
      "Rafael",
      "Matheus",
      "Thiago",
      "Bruno",
      "Pedro",
      "Vinicius",
    ],
    last: [
      "Silva",
      "Santos",
      "Costa",
      "Oliveira",
      "Pereira",
      "Almeida",
      "Souza",
      "Rocha",
    ],
  },

  Argentina: {
    first: [
      "Mateo",
      "Santiago",
      "Lautaro",
      "Tomas",
      "Julian",
      "Franco",
      "Nicolas",
      "Facundo",
    ],
    last: [
      "Gonzalez",
      "Fernandez",
      "Romero",
      "Alvarez",
      "Martinez",
      "Acosta",
      "Herrera",
      "Vega",
    ],
  },

  England: {
    first: [
      "Oliver",
      "Jack",
      "Harry",
      "Theo",
      "George",
      "Ethan",
      "Charlie",
      "Lewis",
    ],
    last: [
      "Bennett",
      "Walker",
      "Taylor",
      "Wilson",
      "Parker",
      "Hughes",
      "Cooper",
      "Foster",
    ],
  },

  Spain: {
    first: [
      "Alejandro",
      "Hugo",
      "Pablo",
      "Daniel",
      "Adrian",
      "Sergio",
      "Iker",
      "Nico",
    ],
    last: [
      "Garcia",
      "Martinez",
      "Lopez",
      "Sanchez",
      "Romero",
      "Navarro",
      "Torres",
      "Vidal",
    ],
  },

  France: {
    first: [
      "Lucas",
      "Hugo",
      "Theo",
      "Mathis",
      "Enzo",
      "Rayan",
      "Noah",
      "Yanis",
    ],
    last: [
      "Martin",
      "Bernard",
      "Dubois",
      "Moreau",
      "Laurent",
      "Petit",
      "Leroy",
      "Roux",
    ],
  },

  Germany: {
    first: [
      "Leon",
      "Jonas",
      "Lukas",
      "Felix",
      "Florian",
      "Noah",
      "Elias",
      "Finn",
    ],
    last: [
      "Schmidt",
      "Weber",
      "Wagner",
      "Becker",
      "Hoffmann",
      "Keller",
      "Wolf",
      "Hartmann",
    ],
  },

  Italy: {
    first: [
      "Lorenzo",
      "Matteo",
      "Marco",
      "Alessandro",
      "Riccardo",
      "Tommaso",
      "Davide",
      "Nicolo",
    ],
    last: [
      "Rossi",
      "Romano",
      "Esposito",
      "Conti",
      "Ricci",
      "Marino",
      "Lombardi",
      "Moretti",
    ],
  },

  Portugal: {
    first: [
      "Joao",
      "Tiago",
      "Goncalo",
      "Diogo",
      "Rafael",
      "Andre",
      "Pedro",
      "Francisco",
    ],
    last: [
      "Silva",
      "Santos",
      "Ferreira",
      "Costa",
      "Pereira",
      "Oliveira",
      "Martins",
      "Sousa",
    ],
  },

  Netherlands: {
    first: [
      "Daan",
      "Jesse",
      "Lars",
      "Bram",
      "Sem",
      "Milan",
      "Thijs",
      "Sven",
    ],
    last: [
      "De Jong",
      "Van Dijk",
      "De Boer",
      "Visser",
      "Smit",
      "Meijer",
      "Bakker",
      "Vos",
    ],
  },

  Belgium: {
    first: [
      "Arthur",
      "Louis",
      "Noah",
      "Jules",
      "Victor",
      "Mathis",
      "Milan",
      "Lucas",
    ],
    last: [
      "Peeters",
      "Janssens",
      "Maes",
      "Willems",
      "Jacobs",
      "Mertens",
      "Lambert",
      "Dubois",
    ],
  },

  Croatia: {
    first: [
      "Luka",
      "Ivan",
      "Mateo",
      "Marko",
      "Josip",
      "Ante",
      "Petar",
      "Nikola",
    ],
    last: [
      "Kovac",
      "Horvat",
      "Maric",
      "Novak",
      "Peric",
      "Babic",
      "Jukic",
      "Vukovic",
    ],
  },

  Serbia: {
    first: [
      "Luka",
      "Nikola",
      "Stefan",
      "Milos",
      "Marko",
      "Aleksa",
      "Filip",
      "Dusan",
    ],
    last: [
      "Jovanovic",
      "Nikolic",
      "Petrovic",
      "Markovic",
      "Ilic",
      "Stojanovic",
      "Pavlovic",
      "Milosevic",
    ],
  },

  Denmark: {
    first: [
      "Emil",
      "Oscar",
      "Mikkel",
      "Magnus",
      "Oliver",
      "Victor",
      "Frederik",
      "Mathias",
    ],
    last: [
      "Jensen",
      "Nielsen",
      "Hansen",
      "Pedersen",
      "Andersen",
      "Christensen",
      "Larsen",
      "Sorensen",
    ],
  },

  Sweden: {
    first: [
      "Hugo",
      "Elias",
      "Oscar",
      "Lucas",
      "Axel",
      "Viktor",
      "Albin",
      "Isak",
    ],
    last: [
      "Andersson",
      "Johansson",
      "Karlsson",
      "Nilsson",
      "Eriksson",
      "Larsson",
      "Olsson",
      "Persson",
    ],
  },

  Norway: {
    first: [
      "Jakob",
      "Emil",
      "Henrik",
      "Magnus",
      "Sander",
      "Kristian",
      "Elias",
      "Oscar",
    ],
    last: [
      "Hansen",
      "Johansen",
      "Olsen",
      "Larsen",
      "Andersen",
      "Nilsen",
      "Berg",
      "Solberg",
    ],
  },

  Uruguay: {
    first: [
      "Facundo",
      "Agustin",
      "Santiago",
      "Nicolas",
      "Matias",
      "Joaquin",
      "Franco",
      "Martin",
    ],
    last: [
      "Rodriguez",
      "Gonzalez",
      "Pereira",
      "Martinez",
      "Fernandez",
      "Silva",
      "Suarez",
      "Cabrera",
    ],
  },

  Colombia: {
    first: [
      "Santiago",
      "Juan",
      "Andres",
      "Daniel",
      "Mateo",
      "Sebastian",
      "Nicolas",
      "David",
    ],
    last: [
      "Rodriguez",
      "Martinez",
      "Gomez",
      "Lopez",
      "Garcia",
      "Ramirez",
      "Torres",
      "Moreno",
    ],
  },

  USA: {
    first: [
      "Ethan",
      "Liam",
      "Noah",
      "Mason",
      "Logan",
      "Caleb",
      "Aiden",
      "Cameron",
    ],
    last: [
      "Johnson",
      "Miller",
      "Davis",
      "Wilson",
      "Anderson",
      "Taylor",
      "Moore",
      "Clark",
    ],
  },

  Japan: {
    first: [
      "Haruto",
      "Ren",
      "Yuto",
      "Sota",
      "Kaito",
      "Riku",
      "Takumi",
      "Daichi",
    ],
    last: [
      "Sato",
      "Suzuki",
      "Takahashi",
      "Tanaka",
      "Watanabe",
      "Ito",
      "Yamamoto",
      "Nakamura",
    ],
  },

  Korea: {
    first: [
      "Min-jun",
      "Ji-ho",
      "Seo-jun",
      "Hyun-woo",
      "Jun-ho",
      "Do-yun",
      "Tae-min",
      "Woo-jin",
    ],
    last: [
      "Kim",
      "Lee",
      "Park",
      "Choi",
      "Jung",
      "Kang",
      "Cho",
      "Yoon",
    ],
  },
};

const positions = [
  "ST",
  "LW",
  "RW",
  "AM",
  "CM",
  "DM",
  "LB",
  "RB",
  "CB",
  "GK",
];

const countryCodes = {
  Brazil: "br",
  Argentina: "ar",
  England: "gb-eng",
  Spain: "es",
  France: "fr",
  Germany: "de",
  Italy: "it",
  Korea: "kr",
  Portugal: "pt",
  Netherlands: "nl",
  Belgium: "be",
  Croatia: "hr",
  Serbia: "rs",
  Denmark: "dk",
  Sweden: "se",
  Norway: "no",
  Uruguay: "uy",
  Colombia: "co",
  USA: "us",
  Japan: "jp",
};

function getCountryFlag(country) {
  const countryCode = countryCodes[country];

  if (!countryCode) {
    return "";
  }

  const flagCode = country === "England" ? "gb-eng" : countryCode;

  return `
    <img
      class="country-flag"
      src="https://flagcdn.com/w40/${flagCode}.png"
      srcset="https://flagcdn.com/w80/${flagCode}.png 2x"
      alt="${country} flag"
      title="${country}"
      loading="lazy"
    />
  `;
}
const clubs = [
  // England — 10 clubs
  { name: "Bristol", country: "England", level: 48 },
  { name: "Preston", country: "England", level: 55 },
  { name: "Swansea", country: "England", level: 62 },
  { name: "Leicester", country: "England", level: 68 },
  { name: "Brighton", country: "England", level: 74 },
  { name: "Newcastle", country: "England", level: 80 },
  { name: "London", country: "England", level: 85 },
  { name: "Liverpool", country: "England", level: 89 },
  { name: "Birmingham", country: "England", level: 70 },
  { name: "Manchester", country: "England", level: 94 },

  // Spain — 10 clubs
  { name: "Gijon", country: "Spain", level: 50 },
  { name: "Zaragoza", country: "Spain", level: 55 },
  { name: "Valladolid", country: "Spain", level: 61 },
  { name: "Mallorca", country: "Spain", level: 67 },
  { name: "Vigo", country: "Spain", level: 72 },
  { name: "Valencia", country: "Spain", level: 78 },
  { name: "Seville", country: "Spain", level: 82 },
  { name: "Bilbao", country: "Spain", level: 85 },
  { name: "Barcelona", country: "Spain", level: 93 },
  { name: "Madrid", country: "Spain", level: 95 },

  // Germany — 10 clubs
  { name: "Dresden", country: "Germany", level: 49 },
  { name: "Nuremberg", country: "Germany", level: 55 },
  { name: "Hamburg", country: "Germany", level: 63 },
  { name: "Bremen", country: "Germany", level: 68 },
  { name: "Berlin", country: "Germany", level: 73 },
  { name: "Frankfurt", country: "Germany", level: 78 },
  { name: "Leverkusen", country: "Germany", level: 84 },
  { name: "Leipzig", country: "Germany", level: 86 },
  { name: "Dortmund", country: "Germany", level: 89 },
  { name: "Munich", country: "Germany", level: 94 },

  // Italy — 10 clubs
  { name: "Palermo", country: "Italy", level: 52 },
  { name: "Bari", country: "Italy", level: 57 },
  { name: "Parma", country: "Italy", level: 64 },
  { name: "Genoa", country: "Italy", level: 69 },
  { name: "Florence", country: "Italy", level: 75 },
  { name: "Bergamo", country: "Italy", level: 80 },
  { name: "Rome", country: "Italy", level: 84 },
  { name: "Naples", country: "Italy", level: 88 },
  { name: "Turin", country: "Italy", level: 89 },
  { name: "Milan", country: "Italy", level: 92 },

  // France — 10 clubs
  { name: "Caen", country: "France", level: 48 },
  { name: "Metz", country: "France", level: 54 },
  { name: "Bordeaux", country: "France", level: 61 },
  { name: "Nantes", country: "France", level: 66 },
  { name: "Rennes", country: "France", level: 72 },
  { name: "Lille", country: "France", level: 77 },
  { name: "Lyon", country: "France", level: 81 },
  { name: "Marseille", country: "France", level: 84 },
  { name: "Monaco", country: "France", level: 87 },
  { name: "Paris", country: "France", level: 94 },

  // Portugal — 5 clubs
  { name: "Braga", country: "Portugal", level: 68 },
  { name: "Guimaraes", country: "Portugal", level: 71 },
  { name: "Sporting Lisbon", country: "Portugal", level: 80 },
  { name: "Porto", country: "Portugal", level: 83 },
  { name: "Lisbon", country: "Portugal", level: 84 },

  // Brazil — 5 clubs
  { name: "Porto Alegre", country: "Brazil", level: 72 },
  { name: "Belo Horizonte", country: "Brazil", level: 74 },
  { name: "Rio", country: "Brazil", level: 78 },
  { name: "Sao Paulo", country: "Brazil", level: 80 },
  { name: "Flamengo", country: "Brazil", level: 82 },

  // Argentina — 5 clubs
  { name: "Rosario", country: "Argentina", level: 70 },
  { name: "Avellaneda", country: "Argentina", level: 73 },
  { name: "La Plata", country: "Argentina", level: 75 },
  { name: "Cordoba", country: "Argentina", level: 80 },
  { name: "Buenos Aires", country: "Argentina", level: 82 },

  // United States — 3 clubs
  { name: "New York", country: "USA", level: 63 },
  { name: "Los Angeles", country: "USA", level: 67 },
  { name: "Miami", country: "USA", level: 70 },

  // Korea — 3 clubs
  { name: "Seoul", country: "Korea", level: 57 },
  { name: "Ulsan", country: "Korea", level: 60 },
  { name: "Jeonbuk", country: "Korea", level: 62 },

  // Japan — 3 clubs
  { name: "Tokyo", country: "Japan", level: 59 },
  { name: "Yokohama", country: "Japan", level: 62 },
  { name: "Kobe", country: "Japan", level: 65 },
];

const AGENT_PROFILE_STORAGE_KEY = "footballAgentProfile";
const GAME_STATE_STORAGE_KEY = "footballAgentGameState";

const nationalityCountryCodes = [
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH","CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY","MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM","NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG","PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB-ENG","US","UY","UZ","VU","VA","VE","VN","YE","ZM","ZW"
];

const nationalityNameOverrides = {
  BO: "Bolivia",
  BN: "Brunei",
  CD: "DR Congo",
  CG: "Congo",
  CI: "Ivory Coast",
  CZ: "Czechia",
  "GB-ENG": "England",
  IR: "Iran",
  KR: "South Korea",
  KP: "North Korea",
  LA: "Laos",
  MD: "Moldova",
  MK: "North Macedonia",
  PS: "Palestine",
  RU: "Russia",
  SY: "Syria",
  TZ: "Tanzania",
  US: "United States",
  VA: "Vatican City",
  VE: "Venezuela",
  VN: "Vietnam",
};

function getNationalityName(code) {
  if (nationalityNameOverrides[code]) return nationalityNameOverrides[code];

  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
  } catch (error) {
    return code;
  }
}

function countryCodeToEmoji(code) {
  return code
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    );
}

function getAgentFlagImage(code, className = "") {
  if (!code) return "🌍";

  const safeCode = code.toLowerCase();
  const nationality = getNationalityName(code);

  return `
    <img
      class="agent-flag-image ${className}"
      src="https://flagcdn.com/w80/${safeCode}.png"
      srcset="https://flagcdn.com/w160/${safeCode}.png 2x"
      alt="${nationality} flag"
      title="${nationality}"
    />
  `;
}

const careerSetupElement = document.querySelector("#career-setup");
const careerSetupForm = document.querySelector("#career-setup-form");
const agentNameInput = document.querySelector("#agent-name-input");
const agentNationalitySelect = document.querySelector("#agent-nationality-select");
const agentPreview = document.querySelector("#agent-preview");
const agentPreviewFlag = document.querySelector("#agent-preview-flag");
const agentPreviewName = document.querySelector("#agent-preview-name");
const agentPreviewCountry = document.querySelector("#agent-preview-country");
const agentProfileButton = document.querySelector("#agent-profile-button");
const navAgentFlag = document.querySelector("#nav-agent-flag");
const navAgentName = document.querySelector("#nav-agent-name");
const navAgentCountry = document.querySelector("#nav-agent-country");

let agentProfile = null;

function populateNationalityOptions() {
  const options = nationalityCountryCodes
    .map((code) => ({ code, name: getNationalityName(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const fragment = document.createDocumentFragment();
  options.forEach(({ code, name }) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    fragment.appendChild(option);
  });

  agentNationalitySelect.appendChild(fragment);
}

function updateAgentPreview() {
  const name = agentNameInput.value.trim();
  const code = agentNationalitySelect.value;

  if (!name && !code) {
    agentPreview.classList.add("hidden");
    return;
  }

  agentPreview.classList.remove("hidden");
  agentPreviewFlag.innerHTML = getAgentFlagImage(code, "agent-preview-flag-image");
  agentPreviewName.textContent = name || "Your Name";
  agentPreviewCountry.textContent = code ? getNationalityName(code) : "Choose nationality";
}

function renderAgentProfile() {
  if (!agentProfile) return;

  navAgentFlag.innerHTML = getAgentFlagImage(
    agentProfile.countryCode,
    "nav-agent-flag-image",
  );
  navAgentName.textContent = agentProfile.name;
  navAgentCountry.textContent = agentProfile.nationality;
}

function openCareerSetup() {
  careerSetupElement.classList.remove("hidden");
  document.body.classList.add("setup-open");

  if (agentProfile) {
    agentNameInput.value = agentProfile.name;
    agentNationalitySelect.value = agentProfile.countryCode;
  }

  updateAgentPreview();
  setTimeout(() => agentNameInput.focus(), 0);
}

function closeCareerSetup() {
  careerSetupElement.classList.add("hidden");
  document.body.classList.remove("setup-open");
}

function loadAgentProfile() {
  try {
    const savedProfile = JSON.parse(localStorage.getItem(AGENT_PROFILE_STORAGE_KEY));
    if (savedProfile?.name && savedProfile?.countryCode) {
      agentProfile = savedProfile;
      renderAgentProfile();
      closeCareerSetup();
      return true;
    }
  } catch (error) {
    console.warn("Could not load agent profile.", error);
  }

  openCareerSetup();
  return false;
}

careerSetupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = agentNameInput.value.trim();
  const countryCode = agentNationalitySelect.value;

  if (!name || !countryCode) return;

  const isNewCareerProfile = !agentProfile;

  agentProfile = {
    name,
    countryCode,
    nationality: getNationalityName(countryCode),
  };

  localStorage.setItem(AGENT_PROFILE_STORAGE_KEY, JSON.stringify(agentProfile));
  renderAgentProfile();
  closeCareerSetup();
  showView("scout");

  if (isNewCareerProfile) {
    void showGameDialog({
      eyebrow: "YOUR CAREER",
      title: "Your Career Begins",
      message:
        "You have 30 seasons to build the world's greatest football agency. Sign players, complete transfers, grow your reputation, and guide your clients to the Ballon d'Or.",
      confirmLabel: "START YOUR JOURNEY",
      tone: "default",
    });
  }
});

agentNameInput.addEventListener("input", updateAgentPreview);
agentNationalitySelect.addEventListener("change", updateAgentPreview);
agentProfileButton.addEventListener("click", openCareerSetup);


function showGameDialog({
  eyebrow = "FOOTBALL AGENT",
  title,
  message = "",
  stats = [],
  confirmLabel = "CONTINUE",
  cancelLabel = "",
  tone = "default",
}) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "game-dialog-overlay";

    const modal = document.createElement("div");
    modal.className = `game-dialog-modal game-dialog-${tone}`;

    const statsMarkup =
      Array.isArray(stats) && stats.length > 0
        ? `
          <div class="game-dialog-stats">
            ${stats
              .map(
                (item) => `
                  <div class="game-dialog-stat">
                    <span>${item.label}</span>
                    <strong>${item.value}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        `
        : "";

    modal.innerHTML = `
      <p class="game-dialog-eyebrow">${eyebrow}</p>
      <h2 class="game-dialog-title">${title}</h2>
      ${
        message
          ? `<p class="game-dialog-message">${message}</p>`
          : ""
      }
      ${statsMarkup}
      <div class="game-dialog-actions">
        ${
          cancelLabel
            ? `<button class="game-dialog-button game-dialog-cancel" type="button">${cancelLabel}</button>`
            : ""
        }
        <button class="game-dialog-button game-dialog-confirm" type="button">${confirmLabel}</button>
      </div>
    `;

    const close = (result) => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(result);
    };

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    modal
      .querySelector(".game-dialog-confirm")
      .addEventListener("click", () => close(true));

    const cancelButton = modal.querySelector(".game-dialog-cancel");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => close(false));
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay && cancelLabel) {
        close(false);
      }
    });
  });
}

const tryAgainButton = document.createElement("button");

tryAgainButton.type = "button";
tryAgainButton.className = "try-again-button";
tryAgainButton.textContent = "Try Again";
tryAgainButton.title = "Restart the challenge from Season 1";

tryAgainButton.style.width = "auto";
tryAgainButton.style.minWidth = "0";
tryAgainButton.style.padding = "7px 10px";
tryAgainButton.style.marginLeft = "8px";
tryAgainButton.style.border = "1px solid rgba(255, 255, 255, 0.22)";
tryAgainButton.style.borderRadius = "8px";
tryAgainButton.style.background = "transparent";
tryAgainButton.style.color = "inherit";
tryAgainButton.style.fontSize = "11px";
tryAgainButton.style.fontWeight = "800";
tryAgainButton.style.lineHeight = "1";
tryAgainButton.style.whiteSpace = "nowrap";
tryAgainButton.style.cursor = "pointer";

agentProfileButton.insertAdjacentElement(
  "afterend",
  tryAgainButton,
);

tryAgainButton.addEventListener("click", async () => {
  const confirmed = await showGameDialog({
    eyebrow: "CAREER RESET",
    title: "Start Over?",
    message:
      "Your current career progress will be permanently deleted and the game will return to Season 1.",
    confirmLabel: "START AGAIN",
    cancelLabel: "KEEP PLAYING",
    tone: "danger",
  });

  if (!confirmed) {
    return;
  }

  isResettingCareer = true;
  localStorage.removeItem(GAME_STATE_STORAGE_KEY);
  window.location.reload();
});

let currentSeason = 1;
let currentAgencyTierIndex = 0;
let agencyMoney = STARTING_MONEY;

let candidates = [];
let selectedIds = new Set();
let signedPlayers = [];
let signingsThisSeason = 0;
let completedClubContracts = 0;
let inboxMessages = [];
let activeClubOffers = null;
let rerollsUsed = 0;
let isResettingCareer = false;
let ballonDorHistory = [];

function saveGameState() {
  if (isResettingCareer) {
    return;
  }
  try {
    const gameState = {
      version: 1,
      currentSeason,
      currentAgencyTierIndex,
      agencyMoney,
      candidates,
      selectedIds: [...selectedIds],
      signedPlayers,
      signingsThisSeason,
      completedClubContracts,
      inboxMessages,
      activeClubOffers,
      rerollsUsed,
      ballonDorHistory,
    };

    localStorage.setItem(
      GAME_STATE_STORAGE_KEY,
      JSON.stringify(gameState),
    );
  } catch (error) {
    console.warn("Could not save game progress.", error);
  }
}

function loadGameState() {
  try {
    const savedState = JSON.parse(
      localStorage.getItem(GAME_STATE_STORAGE_KEY),
    );

    if (!savedState || savedState.version !== 1) {
      return false;
    }

    currentSeason = Number(savedState.currentSeason) || 1;
    currentAgencyTierIndex = Math.max(
      0,
      Math.min(
        Number(savedState.currentAgencyTierIndex) || 0,
        agencyTiers.length - 1,
      ),
    );
    agencyMoney = Number.isFinite(savedState.agencyMoney)
      ? savedState.agencyMoney
      : STARTING_MONEY;
    candidates = Array.isArray(savedState.candidates)
      ? savedState.candidates
      : [];
    selectedIds = new Set(
      Array.isArray(savedState.selectedIds)
        ? savedState.selectedIds
        : [],
    );
    signedPlayers = Array.isArray(savedState.signedPlayers)
      ? savedState.signedPlayers
      : [];
    const migratePlayerMarketValue = (player) => {
      if (
        player.marketValueModelVersion ===
        MARKET_VALUE_MODEL_VERSION
      ) {
        return;
      }

      player.marketValue = calculateMarketValue(
        player.overall,
        player.age,
        player.potential,
      );
      player.signingCost = calculateSigningCost(
        player.marketValue,
      );
      player.marketValueModelVersion =
        MARKET_VALUE_MODEL_VERSION;
    };

    candidates.forEach(migratePlayerMarketValue);

    signedPlayers.forEach((player) => {
      if (!Number.isFinite(player.trust)) player.trust = 70;
      if (!("lowTrustWarningSeason" in player)) player.lowTrustWarningSeason = null;
      migratePlayerMarketValue(player);
    });
    signingsThisSeason = Number(savedState.signingsThisSeason) || 0;
    completedClubContracts = Number(savedState.completedClubContracts) || 0;
    inboxMessages = Array.isArray(savedState.inboxMessages)
      ? savedState.inboxMessages.filter(
          (message) =>
            message.type === "contract-expired" ||
            message.type === "transfer-offer" ||
            message.type === "retirement",
        )
      : [];
    activeClubOffers = savedState.activeClubOffers || null;
    rerollsUsed = Number(savedState.rerollsUsed) || 0;
    ballonDorHistory = Array.isArray(savedState.ballonDorHistory)
      ? savedState.ballonDorHistory
      : [];

    return true;
  } catch (error) {
    console.warn("Could not load saved game progress.", error);
    return false;
  }
}

const seasonLabelElement =
  document.querySelector("#season-label");

const playerListElement =
  document.querySelector("#player-list");

const selectedCountElement =
  document.querySelector("#selected-count");

const selectedCostElement =
  document.querySelector("#selected-cost");

const rerollButton =
  document.querySelector("#reroll-button");

const signButton =
  document.querySelector("#sign-button");

const nextSeasonButton =
  document.querySelector(
    "#next-season-button",
  );

const signedSection =
  document.querySelector("#signed-section");

const signedListElement =
  document.querySelector("#signed-list");

const agencyPlayerCountElement =
  document.querySelector(
    "#agency-player-count",
  );

const agencyTierElement =
  document.querySelector("#agency-tier");

const agencyMoneyElement =
  document.querySelector("#agency-money");

const agencyCapacityElement =
  document.querySelector(
    "#agency-capacity",
  );

const candidateLimitElement =
  document.querySelector(
    "#candidate-limit",
  );

const upgradeDescriptionElement =
  document.querySelector(
    "#upgrade-description",
  );

const upgradeButton =
  document.querySelector(
    "#upgrade-button",
  );
const scoutTab =
  document.querySelector("#scout-tab");

const inboxTab =
  document.querySelector("#inbox-tab");

const agencyTab =
  document.querySelector("#agency-tab");

const scoutView =
  document.querySelector("#scout-view");

const inboxView =
  document.querySelector("#inbox-view");

const agencyView =
  document.querySelector("#agency-view");

const navInboxCountElement =
  document.querySelector("#nav-inbox-count");

const inboxUnreadCountElement =
  document.querySelector("#inbox-unread-count");

const inboxMessageCountElement =
  document.querySelector("#inbox-message-count");

const inboxMessageList =
  document.querySelector("#inbox-message-list");

const inboxMessageDetail =
  document.querySelector("#inbox-message-detail");

const inboxLayout =
  document.querySelector("#inbox-layout");

const emptyInboxMessage =
  document.querySelector("#empty-inbox-message");

const inboxScoutButton =
  document.querySelector("#inbox-scout-button");

const navPlayerCountElement =
  document.querySelector("#nav-player-count");
  

const agencySearchElement =
  document.querySelector(
    "#agency-search",
  );

const agencySortElement =
  document.querySelector(
    "#agency-sort",
  );

const emptyAgencyMessage =
  document.querySelector(
    "#empty-agency-message",
  );

const agencyListWrapper =
  document.querySelector(
    "#agency-list-wrapper",
  );

const emptyScoutButton =
  document.querySelector(
    "#empty-scout-button",
  );

  function showView(viewName) {

    scoutView.classList.add("hidden");
    inboxView.classList.add("hidden");
    agencyView.classList.add("hidden");

    scoutTab.classList.remove("active");
    inboxTab.classList.remove("active");
    agencyTab.classList.remove("active");

    if (viewName === "scout") {

        scoutView.classList.remove("hidden");
        scoutTab.classList.add("active");

    } else if (viewName === "inbox") {

        inboxView.classList.remove("hidden");
        inboxTab.classList.add("active");

        renderInbox();

    } else {

        agencyView.classList.remove("hidden");
        agencyTab.classList.add("active");

        renderSignedPlayers();

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function randomItem(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function randomInt(min, max) {
  return (
    Math.floor(
      Math.random() * (max - min + 1),
    ) + min
  );
}
function rollCandidateOverall(tier) {
  const roll = Math.random();

  let min;
  let max;

  if (roll < 0.40) {
    // 40%
    min = tier.candidateOverallMin;
    max = Math.floor(
      tier.candidateOverallMin +
      (tier.candidateOverallMax - tier.candidateOverallMin) * 0.4
    );
  } else if (roll < 0.75) {
    // 35%
    min = Math.floor(
      tier.candidateOverallMin +
      (tier.candidateOverallMax - tier.candidateOverallMin) * 0.4
    ) + 1;

    max = Math.floor(
      tier.candidateOverallMin +
      (tier.candidateOverallMax - tier.candidateOverallMin) * 0.7
    );
  } else if (roll < 0.95) {
    // 20%
    min = Math.floor(
      tier.candidateOverallMin +
      (tier.candidateOverallMax - tier.candidateOverallMin) * 0.7
    ) + 1;

    max = tier.candidateOverallMax - 2;
  } else {
    // 마지막 5%
    if (tier.candidateOverallMax >= 98) {
      return Math.random() < 0.67 ? 97 : 98;
    }

    if (tier.candidateOverallMax - tier.candidateOverallMin <= 1) {
      return Math.random() < 0.9
        ? tier.candidateOverallMax - 1
        : tier.candidateOverallMax;
    }

   const rareRoll = Math.random();

if (rareRoll < 0.6) {
  return tier.candidateOverallMax - 2;
}

if (rareRoll < 0.9) {
  return tier.candidateOverallMax - 1;
}

return tier.candidateOverallMax;}

  return randomInt(min, max);
}
function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

function roundMoney(value) {
  return Math.round(value / 10000) * 10000;
}

function getCurrentAgencyTier() {
  return agencyTiers[
    currentAgencyTierIndex
  ];
}

function getNextAgencyTier() {
  return agencyTiers[
    currentAgencyTierIndex + 1
  ] ?? null;
}

function getRemainingSigningSlots() {
  const tier = getCurrentAgencyTier();

  return Math.max(
    tier.maxSigningsPerSeason -
      signingsThisSeason,
    0,
  );
}

function getRemainingPlayerCapacity() {
  const tier = getCurrentAgencyTier();

  if (
    tier.capacity === Infinity
  ) {
    return Infinity;
  }

  return Math.max(
    tier.capacity -
      signedPlayers.length,
    0,
  );
}
function getHighestCurrentOverall() {
  if (signedPlayers.length === 0) {
    return 0;
  }

  return Math.max(
    ...signedPlayers.map(
      (player) => player.overall,
    ),
  );
}
function getOverallTier(overall) {
  if (overall === 99) {
    return "platinum";
  }

  if (overall >= 95) {
    return "legendary";
  }

  if (overall >= 90) {
    return "elite";
  }

  if (overall >= 80) {
    return "gold";
  }

  if (overall >= 65) {
    return "silver";
  }

  return "bronze";
}

function generateName(country) {
  const pool = namePools[country];

  if (country === "Korea") {
    return `${randomItem(
      pool.last,
    )} ${randomItem(pool.first)}`;
  }

  return `${randomItem(
    pool.first,
  )} ${randomItem(pool.last)}`;
}
function generateClub(overall) {
  const suitableClubs = clubs.filter(
    (club) => Math.abs(club.level - overall) <= 14,
  );

  if (suitableClubs.length > 0) {
    return randomItem(suitableClubs);
  }

  return clubs.reduce((closestClub, club) => {
    const currentDifference = Math.abs(
      club.level - overall,
    );

    const closestDifference = Math.abs(
      closestClub.level - overall,
    );

    return currentDifference < closestDifference
      ? club
      : closestClub;
  });
}

function generateContractYears() {
  const roll = Math.random();

  if (roll < 0.30) {
    return 5;
  }

  if (roll < 0.60) {
    return 4;
  }

  if (roll < 0.80) {
    return 3;
  }

  if (roll < 0.95) {
    return 2;
  }

  return 1;
}

function generateContractYearsForPlayer(player) {
  const yearsUntilRetirement = Math.max(
    40 - player.age,
    1,
  );

  return Math.min(
    generateContractYears(),
    yearsUntilRetirement,
  );
}

function getTrustStatus(trust) {
  if (trust >= 80) return { label: "High Trust", className: "satisfied" };
  if (trust >= 60) return { label: "Good Trust", className: "satisfied" };
  if (trust >= 40) return { label: "Average Trust", className: "average" };
  if (trust >= 20) return { label: "Low Trust", className: "warning" };
  return { label: "Critical Trust", className: "critical" };
}

function getBaseApprovalChance(trust) {
  if (trust >= 90) return 97;
  if (trust >= 80) return 93;
  if (trust >= 70) return 88;
  if (trust >= 60) return 80;
  if (trust >= 50) return 68;
  if (trust >= 40) return 55;
  if (trust >= 30) return 40;
  if (trust >= 20) return 30;
  return 20;
}

function calculatePlayerApproval(player, offer) {
  let chance = getBaseApprovalChance(player.trust ?? 70);

  if (offer.clubCountry === player.country) chance += 5;

  const currentLevel = player.clubLevel ?? player.overall;
  const levelChange = offer.clubLevel - currentLevel;

  if (levelChange >= 4) chance += 5;
  else if (levelChange <= -4) chance -= 10;

  if (offer.clubLevel - player.overall >= 10) chance -= 5;

  if (offer.contractYears === 5) chance += 4;
  if (offer.contractYears === 4) chance += 2;
  if (offer.contractYears === 2) chance -= 3;
  if (offer.contractYears === 1) chance -= 7;

  return clamp(Math.round(chance), 10, 99);
}

function calculateSuccessfulDealTrustChange(player, offer) {
  let change = 0;
  if (offer.clubCountry === player.country) change += 3;

  const levelDifference = Math.abs(offer.clubLevel - player.overall);
  if (levelDifference <= 5) change += 3;
  else if (offer.clubLevel < player.overall - 8) change -= 5;
  else if (offer.clubLevel > player.overall + 12) change -= 2;

  if (offer.contractYears === 5) change += 3;
  if (offer.contractYears === 4) change += 2;
  if (offer.contractYears === 2) change -= 2;
  if (offer.contractYears === 1) change -= 4;
  return change;
}

function getDealCollapseReason() {
  return randomItem([
    "the player did not pass the medical examination",
    "a work permit could not be secured",
    "the parties could not resolve a tax issue",
    "the club withdrew before the final documents were signed",
    "personal terms collapsed at the final stage",
    "a registration problem prevented the move",
  ]);
}

function applyTrustChange(player, amount) {
  player.trust = clamp((player.trust ?? 70) + amount, 0, 100);
}

function generatePlayerProfile() {
  const roll = Math.random();

  if (roll < 0.55) {
    return {
      type: "Prospect",
      age: randomInt(16, 20),
      overallMin: 42,
      overallMax: 65,
      potentialGapMin: 8,
      potentialGapMax: 35,
    };
  }

  if (roll < 0.8) {
    return {
      type: "Developing",
      age: randomInt(21, 24),
      overallMin: 55,
      overallMax: 74,
      potentialGapMin: 4,
      potentialGapMax: 20,
    };
  }

  if (roll < 0.95) {
    return {
      type: "Prime",
      age: randomInt(25, 29),
      overallMin: 65,
      overallMax: 83,
      potentialGapMin: 0,
      potentialGapMax: 8,
    };
  }

  return {
    type: "Veteran",
    age: randomInt(30, 34),
    overallMin: 65,
    overallMax: 84,
    potentialGapMin: 0,
    potentialGapMax: 3,
  };
}

function generatePotentialEstimate(
  actualPotential,
  overall,
) {
  const estimateError =
    randomInt(-4, 4);

  const estimatedCenter = clamp(
    actualPotential + estimateError,
    overall,
    99,
  );

  const uncertainty = randomInt(5, 9);

  const min = clamp(
    estimatedCenter - uncertainty,
    overall,
    95,
  );

  const max = clamp(
    estimatedCenter + uncertainty,
    min + 1,
    99,
  );

  return {
    min,
    max,
  };
}

function getAgeValueMultiplier(age) {
  if (age <= 17) {
    return 1.25;
  }

  if (age === 18) {
    return 1.18;
  }

  if (age === 19) {
    return 1.1;
  }

  if (age >= 34) {
    return 0.6;
  }

  if (age >= 30) {
    return 0.8;
  }

  return 1;
}

const MARKET_VALUE_MODEL_VERSION = 2;

const marketValueAnchors = [
  { overall: 35, value: 100000 },
  { overall: 40, value: 150000 },
  { overall: 45, value: 250000 },
  { overall: 50, value: 400000 },
  { overall: 55, value: 650000 },
  { overall: 60, value: 1000000 },
  { overall: 65, value: 2000000 },
  { overall: 70, value: 4000000 },
  { overall: 75, value: 8000000 },
  { overall: 80, value: 20000000 },
  { overall: 85, value: 60000000 },
  { overall: 88, value: 85000000 },
  { overall: 90, value: 110000000 },
  { overall: 92, value: 150000000 },
  { overall: 95, value: 250000000 },
  { overall: 97, value: 350000000 },
  { overall: 99, value: 500000000 },
];

function getBaseMarketValue(overall) {
  const rating = clamp(overall, 35, 99);

  for (
    let index = 0;
    index < marketValueAnchors.length - 1;
    index += 1
  ) {
    const lower = marketValueAnchors[index];
    const upper = marketValueAnchors[index + 1];

    if (rating <= upper.overall) {
      const progress =
        (rating - lower.overall) /
        (upper.overall - lower.overall);

      return (
        lower.value +
        (upper.value - lower.value) * progress
      );
    }
  }

  return marketValueAnchors.at(-1).value;
}

function calculateMarketValue(
  overall,
  age,
  potential,
) {
  const overallBase = getBaseMarketValue(overall);

  const potentialMultiplier =
    1 +
    Math.min(
      Math.max(potential - overall, 0) * 0.02,
      0.20,
    );

  const ageMultiplier =
    getAgeValueMultiplier(age);

  const variation =
    randomInt(95, 105) / 100;

  const value =
    overallBase *
    potentialMultiplier *
    ageMultiplier *
    variation;

  return Math.max(
    Math.round(value / 50000) * 50000,
    100000,
  );
}

function calculateSigningCost(
  marketValue,
) {
  return Math.max(
    roundMoney(
      marketValue *
        SIGNING_COST_RATE,
    ),
    10000,
  );
}

function formatMarketValue(value) {
  if (value >= 1000000) {
    const millions =
      value / 1000000;

    return `€${millions
      .toFixed(
        millions >= 10 ? 1 : 2,
      )
      .replace(
        /\.0+$|(\.\d*[1-9])0+$/,
        "$1",
      )}M`;
  }

  return `€${Math.round(
    value / 1000,
  )}K`;
}

function generatePlayer(index) {
  const country = randomItem(
    Object.keys(namePools),
  );

  const profile =
    generatePlayerProfile();

  const tier =
    getCurrentAgencyTier();

 const overall = rollCandidateOverall(tier);

  /*
    Potential does not depend on agency level.

    A beginner agency can still discover
    a low-OVR player with elite potential.
  */
  const potential = clamp(
    overall +
      randomInt(
        profile.potentialGapMin,
        profile.potentialGapMax,
      ),
    overall,
    99,
  );

  const potentialEstimate =
    generatePotentialEstimate(
      potential,
      overall,
    );

  const marketValue =
    calculateMarketValue(
      overall,
      profile.age,
      potential,
    );
 const club = generateClub(overall);
const contractYears = generateContractYears();
  return {
  id: crypto.randomUUID(),
  number: index + 1,

  name: generateName(country),
  country,
  age: profile.age,
  position: randomItem(positions),
  playerType: profile.type,

  overall,
  potential,

  potentialMin:
    potentialEstimate.min,

  potentialMax:
    potentialEstimate.max,

  marketValue,
  marketValueModelVersion:
    MARKET_VALUE_MODEL_VERSION,

  signingCost:
    calculateSigningCost(
      marketValue,
    ),
  club: club.name,
  clubLevel: club.level,
  contractYears,

  careerSeasons: 0,
};  
}

function generateCandidates() {
  candidates = Array.from(
    {
      length: CANDIDATE_COUNT,
    },
    (_, index) =>
      generatePlayer(index),
  );

  selectedIds.clear();

  renderCandidates();
  updateInterface();
}

function getSelectedPlayers() {
  return candidates.filter(
    (player) =>
      selectedIds.has(player.id),
  );
}

function getSelectedSigningCost() {
  return getSelectedPlayers().reduce(
    (total, player) =>
      total + player.signingCost,
    0,
  );
}

function createPlayerCard(
  player,
  options = {},
) {
  const { selectable = false } = options;
  const row = document.createElement("button");

  row.type = "button";
  row.className = "scout-player-row";
  row.dataset.playerId = player.id;

  if (selectedIds.has(player.id)) {
    row.classList.add("selected");
  }

  if (
    selectable &&
    player.signingCost > agencyMoney
  ) {
    row.classList.add("unaffordable");
  }

  const contractText =
    player.contractYears === 0
      ? "Expired"
      : `${player.contractYears}y`;

  const overallTier =
    getOverallTier(player.overall);

  row.innerHTML = `
  <span class="scout-player-info">
    <span class="scout-player-name-line">
  ${getCountryFlag(player.country)}
  <strong>${player.name}</strong>
</span>

    <small>
      Age ${player.age} · ${player.position} ·
      ${player.playerType}
    </small>
  </span>

  <span class="scout-overall ${overallTier}">
    <strong>${player.overall}</strong>
    <small>OVR</small>
  </span>

  <span class="scout-cell scout-potential">
    <small>EST. POT</small>
    <strong>
      ${player.potentialMin}–${player.potentialMax}
    </strong>
  </span>

  <span class="scout-cell scout-club">
    <small>CURRENT CLUB</small>
    <strong>${player.club}</strong>
  </span>

  <span class="scout-cell scout-contract ${
    player.contractYears === 0
      ? "expired"
      : ""
  }">
    <small>CONTRACT</small>
    <strong>${contractText}</strong>
  </span>

  <span class="scout-cell scout-value">
    <small>MARKET VALUE</small>
    <strong>
      ${formatMarketValue(player.marketValue)}
    </strong>
  </span>

  <span class="scout-cell scout-cost">
    <small>SIGNING COST</small>
    <strong>
      ${formatMarketValue(player.signingCost)}
    </strong>
  </span>
`;

  if (selectable) {
    row.addEventListener("click", () => {
      togglePlayerSelection(player.id);
    });
  }

  return row;
}

function createSignedPlayerRow(player) {
  const row = document.createElement("div");

  row.className = "agency-player-row";
  row.dataset.playerId = player.id;

  const contractText =
    player.contractYears === 0
      ? "Expired"
      : `${player.contractYears}y`;

  const contractClass =
    player.contractYears === 0
      ? "row-contract expired"
      : "row-contract";

  row.innerHTML = `
    <span class="row-player">
      <span class="row-player-name">
        ${getCountryFlag(player.country)}
        <strong>${player.name}</strong>
      </span>

      <small class="desktop-agency-meta">
        Age ${player.age} · ${player.position}
      </small>
      <small class="mobile-agency-meta">
        Age ${player.age} · ${player.position} · ${player.club}
      </small>
    </span>

    <span class="row-club">
      ${player.club}
    </span>

    <span class="agency-rating-group">
      <span
        class="row-ballon-dor"
        title="Ballon d'Or wins: ${Number(player.ballonDorWins) || 0}"
      >
        ${"🏆".repeat(Number(player.ballonDorWins) || 0)}
      </span>

      <span
        class="row-overall overall-pill ${getOverallTier(player.overall)}"
      >
        ${player.overall}
      </span>
    </span>

    <span class="${contractClass}">
      ${contractText}
    </span>

    <span class="row-value">
      ${formatMarketValue(player.marketValue)}
    </span>

    <button
      class="secondary-button terminate-agency-button"
      type="button"
      data-player-id="${player.id}"
      title="End agency agreement"
      style="
        width: auto;
        min-width: 0;
        padding: 5px 8px;
        font-size: 10px;
        line-height: 1;
        white-space: nowrap;
        justify-self: end;
      "
    >
      End Contract
    </button>
  `;

  const terminateButton = row.querySelector(
    ".terminate-agency-button",
  );

  terminateButton.addEventListener("click", (event) => {
    event.stopPropagation();
    terminateAgencyContract(player.id);
  });

  return row;
}

async function terminateAgencyContract(playerId) {
  const player = signedPlayers.find(
    (signedPlayer) => signedPlayer.id === playerId,
  );

  if (!player) {
    return;
  }

  const terminationFee = Math.max(
    roundMoney(
      player.marketValue * AGENCY_TERMINATION_FEE_RATE,
    ),
    10000,
  );

  if (agencyMoney < terminationFee) {
    await openAgencyActionModal({
      kicker: "CONTRACT TERMINATION",
      title: "Insufficient Funds",
      type: "danger",
      playerName: player.name,
      message:
        `You need ${formatMarketValue(terminationFee)} to end this agency agreement.`,
      stats: [
        ["TERMINATION FEE", formatMarketValue(terminationFee)],
        ["AVAILABLE FUNDS", formatMarketValue(agencyMoney)],
      ],
      confirmLabel: "CONTINUE",
      cancelLabel: null,
    });
    return;
  }

  const confirmed = await openAgencyActionModal({
    kicker: "CONTRACT TERMINATION",
    title: "End Agency Contract?",
    type: "danger",
    playerName: player.name,
    message:
      "The player's club contract will not be affected.",
    stats: [
      ["COMPENSATION", `-${formatMarketValue(terminationFee)}`],
      ["MARKET VALUE", formatMarketValue(player.marketValue)],
    ],
    confirmLabel: "END CONTRACT",
    cancelLabel: "CANCEL",
    dangerConfirm: true,
  });

  if (!confirmed) {
    return;
  }

  agencyMoney -= terminationFee;

  removeRequiredMessageForPlayer(
    "contract-expired",
    player.id,
  );
  removeRequiredMessageForPlayer(
    "transfer-offer",
    player.id,
  );

  if (activeClubOffers?.playerId === player.id) {
    activeClubOffers = null;
    clearInboxDetail();
  }

  signedPlayers = signedPlayers.filter(
    (signedPlayer) => signedPlayer.id !== player.id,
  );

  renderSignedPlayers();
  updateInterface();

  await openAgencyActionModal({
    kicker: "CONTRACT ENDED",
    title: "Agency Agreement Ended",
    type: "danger",
    playerName: player.name,
    message: "The player has been removed from your agency roster.",
    stats: [
      ["COMPENSATION PAID", `-${formatMarketValue(terminationFee)}`],
    ],
    confirmLabel: "CONTINUE",
    cancelLabel: null,
  });
}

function getVisibleSignedPlayers() {
  const query =
    agencySearchElement.value
      .trim()
      .toLowerCase();

  const sortValue =
    agencySortElement.value;

  const filteredPlayers =
    signedPlayers.filter((player) => {
      const searchableText = [
        player.name,
        player.country,
        player.position,
        player.club,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

  return filteredPlayers.sort(
    (playerA, playerB) => {
      if (sortValue === "value-desc") {
        return (
          playerB.marketValue -
          playerA.marketValue
        );
      }

      if (sortValue === "age-asc") {
        return playerA.age - playerB.age;
      }

      if (
        sortValue === "contract-asc"
      ) {
        return (
          playerA.contractYears -
          playerB.contractYears
        );
      }

      if (sortValue === "name-asc") {
        return playerA.name.localeCompare(
          playerB.name,
        );
      }

      return (
        playerB.overall -
        playerA.overall
      );
    },
  );
}
function renderCandidates() {
  playerListElement.innerHTML = `
    <div class="scout-list-header" aria-hidden="true">
      <span>PLAYER</span>
      <span>OVR</span>
      <span>EST. POT</span>
      <span>CLUB</span>
      <span>CONTRACT</span>
      <span>VALUE</span>
      <span>COST</span>
    </div>
  `;

  candidates.forEach((player) => {
    const row = createPlayerCard(
      player,
      { selectable: true },
    );

    playerListElement.appendChild(row);
  });
}


function ensureAgencyListLayout() {
  if (!document.querySelector("#agency-list-layout-fix")) {
    const style = document.createElement("style");
    style.id = "agency-list-layout-fix";
    style.textContent = `
      @media (min-width: 681px) {
        .agency-list-header,
        .agency-player-row {
          display: grid !important;
          grid-template-columns:
            minmax(220px, 2fr)
            minmax(110px, 1fr)
            70px
            100px
            minmax(120px, 1fr)
            minmax(120px, 1fr)
            minmax(100px, 1fr) !important;
          align-items: center !important;
          column-gap: 16px !important;
        }

        .agency-list-header > span,
        .agency-player-row > span {
          min-width: 0;
        }

        .agency-rating-group {
          display: contents;
        }

        .row-overall,
        .row-contract,
        .row-value {
          justify-self: start;
        }

        .row-ballon-dor {
          display: flex;
          align-items: center;
          gap: 3px;
          min-height: 24px;
          white-space: nowrap;
          font-size: 16px;
          line-height: 1;
        }

        .terminate-agency-button {
          justify-self: end !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const header = document.querySelector(".agency-list-header");

  if (header) {
    const labels = [
      "PLAYER",
      "CLUB",
      "OVR",
      "CONTRACT",
      "VALUE",
      "BALLON D'OR",
      "",
    ];

    header.innerHTML = labels
      .map((label) => `<span>${label}</span>`)
      .join("");
  }
}

function ensureAgencyRetirementNote() {
  const headerCopy = agencyView?.querySelector(
    ".agency-page-header > div:first-child",
  );

  if (
    !headerCopy ||
    headerCopy.querySelector(".agency-retirement-note")
  ) {
    return;
  }

  const note = document.createElement("p");
  note.className = "agency-retirement-note";
  note.textContent = "Players automatically retire at age 40.";
  headerCopy.appendChild(note);
}

function renderSignedPlayers() {
  ensureAgencyRetirementNote();
  ensureAgencyListLayout();
  signedListElement.innerHTML = "";

  const visiblePlayers =
    getVisibleSignedPlayers();

  visiblePlayers.forEach((player) => {
    const row =
      createSignedPlayerRow(player);

    signedListElement.appendChild(row);
  });

  const hasPlayers =
    signedPlayers.length > 0;

  emptyAgencyMessage.classList.toggle(
    "hidden",
    hasPlayers,
  );

  agencyListWrapper.classList.toggle(
    "hidden",
    !hasPlayers,
  );

  agencyPlayerCountElement.textContent =
    `${signedPlayers.length} Player${
      signedPlayers.length === 1
        ? ""
        : "s"
    }`;

  navPlayerCountElement.textContent =
    signedPlayers.length;
}
function renderInbox() {
  updateInboxCounts();

  if (inboxMessages.length === 0) {
    emptyInboxMessage.classList.remove("hidden");
    inboxLayout.classList.add("hidden");
    inboxMessageDetail.innerHTML = `
      <div class="inbox-detail-placeholder">
        <strong>Select a message.</strong>
        <p>Choose a message from the list to read its details.</p>
      </div>
    `;
    return;
  }

  emptyInboxMessage.classList.add("hidden");
  inboxLayout.classList.remove("hidden");
  inboxMessageList.innerHTML = "";

  inboxMessages.forEach((message) => {
    const item = document.createElement("button");

    item.className = message.read
      ? "inbox-message-item"
      : "inbox-message-item unread";

    item.innerHTML = `
      <span class="inbox-message-status"></span>

      <span class="inbox-message-copy">
        <strong>${message.title}</strong>
        <small>Season ${message.season}</small>
      </span>

      <span class="inbox-message-arrow">→</span>
    `;

    item.addEventListener("click", () => {
      message.read = true;

      let actionMarkup = "";

      if (message.type === "contract-expired") {
        actionMarkup = `
          <div class="inbox-detail-actions">
            <button
              class="primary-button find-club-button"
              type="button"
              data-player-id="${message.playerId}"
            >
              Find New Club
            </button>
          </div>
        `;
      }

      if (message.type === "transfer-offer") {
        const transferOffers = Array.isArray(message.offers)
          ? message.offers
          : [];

        const offersMarkup = transferOffers
          .map(
            (offer) => `
              <button
                class="club-offer-card transfer-candidate-card"
                type="button"
                data-message-id="${message.id}"
                data-offer-id="${offer.id}"
              >
                <span class="club-offer-label">TRANSFER OFFER</span>

                <strong class="club-offer-name">
                  ${getCountryFlag(offer.clubCountry)}
                  ${offer.clubName}
                </strong>

                <div class="club-offer-details">
                  <div>
                    <span>CLUB LEVEL</span>
                    <strong>${offer.clubLevel}</strong>
                  </div>

                  <div>
                    <span>TRANSFER FEE</span>
                    <strong>${formatMarketValue(offer.transferFee)}</strong>
                  </div>

                  <div class="agency-commission-detail">
                    <span>AGENCY COMMISSION</span>
                    <strong>${formatMarketValue(offer.commission)}</strong>
                  </div>

                  <div>
                    <span>CONTRACT</span>
                    <strong>
                      ${offer.contractYears}
                      Year${offer.contractYears === 1 ? "" : "s"}
                    </strong>
                  </div>

                  <div>
                    <span>PLAYER APPROVAL</span>
                    <strong>${offer.approvalChance}%</strong>
                  </div>
                </div>

                <span class="club-offer-action">Recommend Offer →</span>
              </button>
            `,
          )
          .join("");

        actionMarkup = `
          <div class="club-offer-grid transfer-candidate-grid">
            ${offersMarkup}
          </div>
        `;
      }

      const badgeText =
        message.type === "contract-expired"
          ? "Contract Expired"
          : message.type === "transfer-offer"
            ? "Transfer Offer"
            : message.type === "retirement"
              ? "Retirement"
              : "Career Update";

      inboxMessageDetail.innerHTML = `
        <div class="inbox-detail-content">
          <div class="inbox-detail-meta">
            <span class="inbox-type-badge">${badgeText}</span>
            <span>Season ${message.season}</span>
          </div>

          <h2>${message.title}</h2>
          <p>${message.text}</p>
          ${actionMarkup}
        </div>
      `;

      const findClubButton =
        inboxMessageDetail.querySelector(".find-club-button");

      if (findClubButton) {
        findClubButton.addEventListener("click", () => {
          findNewClubForPlayer(findClubButton.dataset.playerId);
        });
      }

      const transferCandidateButtons =
        inboxMessageDetail.querySelectorAll(
          ".transfer-candidate-card",
        );

      transferCandidateButtons.forEach((button) => {
        button.addEventListener("click", () => {
          acceptTransferOffer(
            button.dataset.messageId,
            button.dataset.offerId,
          );
        });
      });

      updateInboxCounts();
      item.classList.remove("unread");
    });

    inboxMessageList.appendChild(item);
  });
}
function updateInboxCounts() {
  const unreadCount =
    inboxMessages.filter(
      (message) => !message.read,
    ).length;

  navInboxCountElement.textContent =
    unreadCount;

  inboxUnreadCountElement.textContent =
    `${unreadCount} Unread`;

  inboxMessageCountElement.textContent =
    inboxMessages.length;
}
function addInboxMessage({
  type,
  title,
  text,
  playerId = null,
  clubName = null,
  clubCountry = null,
  clubLevel = null,
  transferFee = null,
  commission = null,
  contractYears = null,
  approvalChance = null,
  offers = null,
}) {
  inboxMessages.unshift({
    id: crypto.randomUUID(),
    type,
    title,
    text,
    playerId,
    clubName,
    clubCountry,
    clubLevel,
    transferFee,
    commission,
    contractYears,
    approvalChance,
    offers,
    season: currentSeason,
    read: false,
  });

  renderInbox();
}

function removeInboxMessage(messageId) {
  inboxMessages = inboxMessages.filter(
    (message) => message.id !== messageId,
  );
}

function removeRequiredMessageForPlayer(type, playerId) {
  inboxMessages = inboxMessages.filter(
    (message) =>
      !(
        message.type === type &&
        message.playerId === playerId
      ),
  );
}

function getPendingRequiredMessages() {
  return inboxMessages.filter(
    (message) =>
      message.type === "contract-expired" ||
      message.type === "transfer-offer",
  );
}

function clearInboxDetail() {
  inboxMessageDetail.innerHTML = `
    <div class="inbox-detail-placeholder">
      <strong>Select a message.</strong>
      <p>Choose a message from the list to read its details.</p>
    </div>
  `;
}

function getTransferOfferChance(player) {
  let chance = 0.15;

  if (player.overall >= 95) chance = 0.05;
  else if (player.overall >= 90) chance = 0.30;
  else if (player.overall >= 85) chance = 0.40;
  else if (player.overall >= 80) chance = 0.45;
  else if (player.overall >= 70) chance = 0.35;
  else if (player.overall >= 60) chance = 0.25;

  if (player.contractYears === 1) {
    chance += 0.25;
  } else if (player.contractYears >= 5) {
    chance -= 0.05;
  }

  return clamp(chance, 0, 0.80);
}

function generateTransferOffers() {
  signedPlayers.forEach((player) => {
    if (player.contractYears === 0) return;

    const alreadyHasPendingOffer = inboxMessages.some(
      (message) =>
        message.type === "transfer-offer" &&
        message.playerId === player.id,
    );

    if (alreadyHasPendingOffer) return;

    if (Math.random() >= getTransferOfferChance(player)) {
      return;
    }

    const possibleClubs = clubs.filter(
      (club) =>
        club.name !== player.club &&
        Math.abs(club.level - player.overall) <= 14,
    );

    if (possibleClubs.length === 0) return;

    const shuffledClubs = [...possibleClubs].sort(
      () => Math.random() - 0.5,
    );

    const offers = shuffledClubs
      .slice(0, Math.min(3, shuffledClubs.length))
      .map((club) => {
        const transferFee = roundMoney(
          player.marketValue *
            (randomInt(85, 120) / 100),
        );

        const contractYears =
          generateContractYearsForPlayer(player);

        const commission = roundMoney(
          transferFee * 0.05,
        );

        const approvalChance =
          calculatePlayerApproval(player, {
            clubCountry: club.country,
            clubLevel: club.level,
            contractYears,
          });

        return {
          id: crypto.randomUUID(),
          clubName: club.name,
          clubCountry: club.country,
          clubLevel: club.level,
          transferFee,
          commission,
          contractYears,
          approvalChance,
        };
      });

    addInboxMessage({
      type: "transfer-offer",
      title: `Transfer options for ${player.name}`,
      text:
        `${offers.length} club${offers.length === 1 ? "" : "s"} ` +
        `have submitted offers for ${player.name}. ` +
        `Choose one to recommend to the player.`,
      playerId: player.id,
      offers,
    });
  });
}

function generateFreeAgentOffers(player) {
  const tier = getCurrentAgencyTier();

  const accessibleClubs = clubs.filter(
    (club) => club.level <= tier.maxClubLevel,
  );

  const suitableClubs = accessibleClubs.filter(
    (club) =>
      club.name !== player.club &&
      Math.abs(club.level - player.overall) <= 14,
  );

  const fallbackClubs = accessibleClubs.filter(
    (club) => club.name !== player.club,
  );

  const clubPool =
    suitableClubs.length >= 3
      ? suitableClubs
      : fallbackClubs;

  const shuffledClubs = [...clubPool].sort(
    () => Math.random() - 0.5,
  );

  return shuffledClubs
    .slice(0, 3)
    .map((club) => {
      const contractYears =
        generateContractYearsForPlayer(player);

      const signingCommission = roundMoney(
        player.marketValue *
          (randomInt(10, 20) / 1000),
      );

      const approvalChance =
        calculatePlayerApproval(player, {
          clubCountry: club.country,
          clubLevel: club.level,
          contractYears,
        });

      return {
        id: crypto.randomUUID(),
        clubName: club.name,
        clubCountry: club.country,
        clubLevel: club.level,
        contractYears,
        signingCommission,
        approvalChance,
      };
    });
}

function findNewClubForPlayer(playerId) {
  const player = signedPlayers.find(
    (signedPlayer) => signedPlayer.id === playerId,
  );

  if (!player) return;

  if (player.contractYears > 0) {
    void showGameDialog({
      eyebrow: "PLAYER STATUS",
      title: "Already Under Contract",
      message: `${player.name} already has an active club contract.`,
      confirmLabel: "GOT IT",
    });
    return;
  }

  const expiryMessage = inboxMessages.find(
    (message) =>
      message.type === "contract-expired" &&
      message.playerId === player.id,
  );

  if (!expiryMessage) return;

  // Old saves without stored offers get one fixed set once.
  if (
    !Array.isArray(expiryMessage.offers) ||
    expiryMessage.offers.length === 0
  ) {
    expiryMessage.offers = generateFreeAgentOffers(player);
    saveGameState();
  }

  activeClubOffers = {
    playerId: player.id,
    previousClub: player.club,
    messageId: expiryMessage.id,
    offers: expiryMessage.offers,
  };

  renderClubOffers(player);
}

function renderClubOffers(player) {
  if (!activeClubOffers) {
    return;
  }

  const offersMarkup = activeClubOffers.offers
    .map(
      (offer) => `
        <button
          class="club-offer-card"
          type="button"
          data-offer-id="${offer.id}"
        >
          <span class="club-offer-label">CLUB OFFER</span>

          <strong class="club-offer-name">
            ${getCountryFlag(offer.clubCountry)}
            ${offer.clubName}
          </strong>

          <div class="club-offer-details">
            <div>
              <span>CLUB LEVEL</span>
              <strong>${offer.clubLevel}</strong>
            </div>

            <div>
              <span>SIGNING COMMISSION</span>
              <strong>
                ${formatMarketValue(offer.signingCommission)}
              </strong>
            </div>

            <div>
              <span>CONTRACT</span>
              <strong>
                ${offer.contractYears}
                Year${offer.contractYears === 1 ? "" : "s"}
              </strong>
            </div>
            <div>
              <span>PLAYER APPROVAL</span>
              <strong>${offer.approvalChance}%</strong>
            </div>
          </div>

          <span class="club-offer-action">Recommend Offer →</span>
        </button>
      `,
    )
    .join("");

  inboxMessageDetail.innerHTML = `
    <div class="inbox-detail-content club-offer-screen">
      <div class="inbox-detail-meta">
        <span class="inbox-type-badge">Free Agent Offers</span>
        <span>Season ${currentSeason}</span>
      </div>

      <h2>Choose ${player.name}'s next club</h2>

      <p>
        Three clubs have submitted contract offers.
        Select the best destination for your client.
      </p>

      <div class="club-offer-grid">${offersMarkup}</div>

      <button
        id="cancel-club-offers"
        class="secondary-button"
        type="button"
      >
        Cancel
      </button>
    </div>
  `;

  const offerButtons =
    inboxMessageDetail.querySelectorAll(".club-offer-card");

  offerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      acceptClubOffer(button.dataset.offerId);
    });
  });

  const cancelButton =
    inboxMessageDetail.querySelector("#cancel-club-offers");

  cancelButton.addEventListener("click", () => {
    activeClubOffers = null;
    clearInboxDetail();
  });
}

function ensureAgencyActionModalStyles() {
  ensureTransferGameModalStyles();

  if (document.querySelector("#agency-action-modal-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "agency-action-modal-styles";
  style.textContent = `
    .agency-action-rank {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      margin: 20px 0;
      padding: 18px 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.025);
    }

    .agency-action-rank strong {
      min-width: 0;
      font-size: 20px;
      font-weight: 900;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .agency-action-rank strong:last-child {
      text-align: right;
      color: #16a34a;
    }

    .agency-action-danger-value {
      color: var(--danger);
    }

    .transfer-game-button.upgrade-confirm {
      border-color: #16a34a;
      background: #16a34a;
      color: white;
    }

    .transfer-game-button.danger-confirm {
      border-color: var(--danger);
      background: var(--danger);
      color: white;
    }
  `;

  document.head.appendChild(style);
}

function openAgencyActionModal({
  kicker,
  title,
  type = "",
  playerName = "",
  message = "",
  stats = [],
  rankFrom = "",
  rankTo = "",
  confirmLabel = "CONTINUE",
  cancelLabel = null,
  dangerConfirm = false,
  upgradeConfirm = false,
}) {
  ensureAgencyActionModalStyles();

  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "transfer-game-overlay";

    const modal = document.createElement("section");
    modal.className = "transfer-game-modal";

    const rankMarkup =
      rankFrom && rankTo
        ? `
          <div class="agency-action-rank">
            <strong>${rankFrom}</strong>
            <span class="transfer-game-arrow">→</span>
            <strong>${rankTo}</strong>
          </div>
        `
        : "";

    const statsMarkup = stats.length
      ? `
        <div class="transfer-game-stats">
          ${stats
            .map(
              ([label, value, valueClass = ""]) => `
                <div class="transfer-game-stat">
                  <span>${label}</span>
                  <strong class="${valueClass}">${value}</strong>
                </div>
              `,
            )
            .join("")}
        </div>
      `
      : "";

    const confirmClass = dangerConfirm
      ? "danger-confirm"
      : upgradeConfirm
        ? "upgrade-confirm"
        : "primary";

    modal.innerHTML = `
      <p class="transfer-game-kicker">${kicker}</p>
      <h2 class="transfer-game-title ${type}">${title}</h2>
      ${playerName ? `<p class="transfer-game-player">${playerName}</p>` : ""}
      ${rankMarkup}
      ${statsMarkup}
      ${message ? `<p class="transfer-game-message">${message}</p>` : ""}

      <div class="transfer-game-actions">
        ${
          cancelLabel
            ? `
              <button class="transfer-game-button secondary" type="button" data-action="cancel">
                ${cancelLabel}
              </button>
            `
            : ""
        }
        <button class="transfer-game-button ${confirmClass}" type="button" data-action="confirm">
          ${confirmLabel}
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const close = (result) => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(result);
    };

    if (cancelLabel) {
      modal.querySelector('[data-action="cancel"]')
        .addEventListener("click", () => close(false));
    }

    modal.querySelector('[data-action="confirm"]')
      .addEventListener("click", () => close(true));
  });
}

function ensureTransferGameModalStyles() {
  if (document.querySelector("#transfer-game-modal-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "transfer-game-modal-styles";
  style.textContent = `
    .transfer-game-overlay {
      position: fixed;
      inset: 0;
      z-index: 10500;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(11, 15, 22, 0.64);
      backdrop-filter: blur(8px);
    }

    .transfer-game-modal {
      width: min(520px, 100%);
      padding: 28px;
      border: 1px solid var(--border);
      border-radius: 20px;
      background: var(--card);
      color: var(--text);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
    }

    .transfer-game-kicker {
      margin: 0 0 8px;
      color: var(--muted);
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.14em;
    }

    .transfer-game-title {
      margin: 0 0 8px;
      font-size: 30px;
      line-height: 1.05;
      letter-spacing: -0.04em;
    }

    .transfer-game-title.success {
      color: #22c55e;
    }

    .transfer-game-title.warning {
      color: #c47b24;
    }

    .transfer-game-title.danger {
      color: var(--danger);
    }

    .transfer-game-player {
      margin: 0 0 20px;
      color: var(--muted);
      font-size: 14px;
    }

    .transfer-game-route {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      margin: 20px 0;
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.025);
    }

    .transfer-game-club {
      min-width: 0;
      font-size: 17px;
      font-weight: 850;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .transfer-game-club:last-child {
      text-align: right;
    }

    .transfer-game-arrow {
      color: var(--muted);
      font-size: 18px;
      font-weight: 900;
    }

    .transfer-game-stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }

    .transfer-game-stat {
      padding: 13px 14px;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.045);
    }

    .transfer-game-stat span {
      display: block;
      margin-bottom: 5px;
      color: var(--muted);
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.08em;
    }

    .transfer-game-stat strong {
      display: block;
      font-size: 18px;
    }

    .transfer-game-income {
      color: #15803d;
    }

    .transfer-game-message {
      margin: 16px 0 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
    }

    .transfer-game-actions {
      display: flex;
      justify-content: flex-end;
      gap: 9px;
      margin-top: 24px;
    }

    .transfer-game-button {
      min-width: 110px;
      padding: 11px 15px;
      border-radius: 10px;
      font: inherit;
      font-size: 12px;
      font-weight: 850;
      cursor: pointer;
    }

    .transfer-game-button.primary {
      border: 1px solid var(--accent);
      background: var(--accent);
      color: white;
    }

    .transfer-game-button.secondary {
      border: 1px solid var(--border);
      background: white;
      color: var(--text);
    }

    @media (max-width: 520px) {
      .transfer-game-modal {
        padding: 22px 18px;
      }

      .transfer-game-stats {
        grid-template-columns: 1fr;
      }

      .transfer-game-actions {
        flex-direction: column-reverse;
      }

      .transfer-game-button {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}

function openTransferDecisionModal({
  playerName,
  fromClub,
  toClub,
  approvalChance,
  income,
  incomeLabel = "AGENCY COMMISSION",
}) {
  ensureTransferGameModalStyles();

  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "transfer-game-overlay";

    const modal = document.createElement("section");
    modal.className = "transfer-game-modal";

    modal.innerHTML = `
      <p class="transfer-game-kicker">TRANSFER DECISION</p>
      <h2 class="transfer-game-title">Recommend this offer?</h2>
      <p class="transfer-game-player">${playerName}</p>

      <div class="transfer-game-route">
        <span class="transfer-game-club">${fromClub}</span>
        <span class="transfer-game-arrow">→</span>
        <span class="transfer-game-club">${toClub}</span>
      </div>

      <div class="transfer-game-stats">
        <div class="transfer-game-stat">
          <span>PLAYER APPROVAL</span>
          <strong>${approvalChance}%</strong>
        </div>

        <div class="transfer-game-stat">
          <span>${incomeLabel}</span>
          <strong>${formatMarketValue(income)}</strong>
        </div>
      </div>

      <div class="transfer-game-actions">
        <button class="transfer-game-button secondary" type="button" data-action="cancel">
          CANCEL
        </button>
        <button class="transfer-game-button primary" type="button" data-action="confirm">
          RECOMMEND OFFER
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    const close = (result) => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(result);
    };

    modal.querySelector('[data-action="cancel"]')
      .addEventListener("click", () => close(false));

    modal.querySelector('[data-action="confirm"]')
      .addEventListener("click", () => close(true));
  });
}

function openTransferResultModal({
  type = "success",
  title,
  playerName,
  fromClub,
  toClub,
  income = null,
  message = "",
}) {
  ensureTransferGameModalStyles();

  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "transfer-game-overlay";

    const modal = document.createElement("section");
    modal.className = "transfer-game-modal";

    const kicker =
      type === "success"
        ? "TRANSFER COMPLETE"
        : type === "warning"
          ? "TRANSFER UPDATE"
          : "TRANSFER FAILED";

    const routeMarkup =
      fromClub && toClub
        ? `
          <div class="transfer-game-route">
            <span class="transfer-game-club">${fromClub}</span>
            <span class="transfer-game-arrow">→</span>
            <span class="transfer-game-club">${toClub}</span>
          </div>
        `
        : "";

    const incomeMarkup =
      income !== null
        ? `
          <div class="transfer-game-stats">
            <div class="transfer-game-stat">
              <span>AGENCY INCOME</span>
              <strong class="transfer-game-income">
                +${formatMarketValue(income)}
              </strong>
            </div>
          </div>
        `
        : "";

    modal.innerHTML = `
      <p class="transfer-game-kicker">${kicker}</p>
      <h2 class="transfer-game-title ${type}">${title}</h2>
      ${playerName ? `<p class="transfer-game-player">${playerName}</p>` : ""}
      ${routeMarkup}
      ${incomeMarkup}
      ${message ? `<p class="transfer-game-message">${message}</p>` : ""}

      <div class="transfer-game-actions">
        <button class="transfer-game-button primary" type="button" data-action="close">
          CONTINUE
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    modal.querySelector('[data-action="close"]')
      .addEventListener("click", () => {
        overlay.remove();
        document.body.style.overflow = "";
        resolve();
      });
  });
}

async function acceptClubOffer(offerId) {
  if (!activeClubOffers) return;

  const offerSession = activeClubOffers;

  const player = signedPlayers.find(
    (signedPlayer) => signedPlayer.id === offerSession.playerId,
  );

  const selectedOffer = offerSession.offers.find(
    (offer) => offer.id === offerId,
  );

  if (!player || !selectedOffer) return;

  const previousClub =
    offerSession.previousClub || player.club;

  const confirmed = await openTransferDecisionModal({
    playerName: player.name,
    fromClub: previousClub,
    toClub: selectedOffer.clubName,
    approvalChance: selectedOffer.approvalChance,
    income: selectedOffer.signingCommission,
    incomeLabel: "SIGNING COMMISSION",
  });

  if (!confirmed) return;

  if (Math.random() * 100 >= selectedOffer.approvalChance) {
    const trustLoss = randomInt(2, 4);
    applyTrustChange(player, -trustLoss);

    // Keep the same offer session alive so the player can choose again.
    activeClubOffers = offerSession;

    renderSignedPlayers();
    updateInterface();

    await openTransferResultModal({
      type: "warning",
      title: "Offer Rejected",
      playerName: player.name,
      fromClub: previousClub,
      toClub: selectedOffer.clubName,
      message:
        `${player.name} decided not to accept the offer. You can recommend another offer.`,
    });

    // Rebuild the offer screen so every button is fresh and clickable.
    if (
      activeClubOffers &&
      activeClubOffers.playerId === player.id &&
      player.contractYears === 0
    ) {
      renderClubOffers(player);
    }

    return;
  }

  if (Math.random() >= 0.99) {
    const reason = getDealCollapseReason();

    // A collapsed deal does not consume the remaining choices.
    activeClubOffers = offerSession;
    updateInterface();

    await openTransferResultModal({
      type: "danger",
      title: "Deal Collapsed",
      playerName: player.name,
      fromClub: previousClub,
      toClub: selectedOffer.clubName,
      message:
        `${reason}. No commission was received. You can recommend another offer.`,
    });

    if (
      activeClubOffers &&
      activeClubOffers.playerId === player.id &&
      player.contractYears === 0
    ) {
      renderClubOffers(player);
    }

    return;
  }

  const trustChange =
    calculateSuccessfulDealTrustChange(
      player,
      selectedOffer,
    );

  player.club = selectedOffer.clubName;
  player.clubLevel = selectedOffer.clubLevel;
  player.contractYears = selectedOffer.contractYears;

  applyTrustChange(player, trustChange);
  agencyMoney += selectedOffer.signingCommission;
  completedClubContracts += 1;

  removeRequiredMessageForPlayer(
    "contract-expired",
    player.id,
  );

  activeClubOffers = null;

  renderSignedPlayers();
  renderInbox();
  clearInboxDetail();
  updateInterface();

  await openTransferResultModal({
    type: "success",
    title: "Transfer Completed",
    playerName: player.name,
    fromClub: previousClub,
    toClub: selectedOffer.clubName,
    income: selectedOffer.signingCommission,
  });
}

async function acceptTransferOffer(messageId, offerId) {
  const message = inboxMessages.find(
    (inboxMessage) =>
      inboxMessage.id === messageId &&
      inboxMessage.type === "transfer-offer",
  );

  if (!message) return;

  const player = signedPlayers.find(
    (signedPlayer) =>
      signedPlayer.id === message.playerId,
  );

  if (!player) {
    removeInboxMessage(messageId);
    renderInbox();
    clearInboxDetail();
    return;
  }

  const selectedOffer = Array.isArray(message.offers)
    ? message.offers.find(
        (offer) => offer.id === offerId,
      )
    : null;

  if (!selectedOffer) return;

  const previousClub = player.club;

  const confirmed = await openTransferDecisionModal({
    playerName: player.name,
    fromClub: previousClub,
    toClub: selectedOffer.clubName,
    approvalChance: selectedOffer.approvalChance,
    income: selectedOffer.commission,
    incomeLabel: "AGENCY COMMISSION",
  });

  if (!confirmed) return;

  removeInboxMessage(messageId);
  clearInboxDetail();

  if (Math.random() * 100 >= selectedOffer.approvalChance) {
    const trustLoss = randomInt(2, 4);
    applyTrustChange(player, -trustLoss);

    renderSignedPlayers();
    renderInbox();
    updateInterface();

    await openTransferResultModal({
      type: "warning",
      title: "Offer Rejected",
      playerName: player.name,
      fromClub: previousClub,
      toClub: selectedOffer.clubName,
      message: `${player.name} decided not to accept the offer.`,
    });

    return;
  }

  if (Math.random() >= 0.99) {
    const reason = getDealCollapseReason();

    renderInbox();
    updateInterface();

    await openTransferResultModal({
      type: "danger",
      title: "Transfer Collapsed",
      playerName: player.name,
      fromClub: previousClub,
      toClub: selectedOffer.clubName,
      message: `${reason}. No commission was received.`,
    });

    return;
  }

  const trustChange =
    calculateSuccessfulDealTrustChange(
      player,
      selectedOffer,
    );

  player.club = selectedOffer.clubName;
  player.clubLevel = selectedOffer.clubLevel;
  player.contractYears = selectedOffer.contractYears;

  applyTrustChange(player, trustChange);
  agencyMoney += selectedOffer.commission;
  completedClubContracts += 1;

  renderSignedPlayers();
  renderInbox();
  updateInterface();

  await openTransferResultModal({
    type: "success",
    title: "Transfer Completed",
    playerName: player.name,
    fromClub: previousClub,
    toClub: selectedOffer.clubName,
    income: selectedOffer.commission,
  });
}


function createContractExpiryMessages(seasonResults) {
  seasonResults.forEach((result) => {
    if (
      result.previousContractYears === 0 ||
      result.contractYears !== 0
    ) {
      return;
    }

    const player = signedPlayers.find(
      (signedPlayer) => signedPlayer.id === result.playerId,
    );

    if (!player) {
      return;
    }

    const alreadyExists = inboxMessages.some(
      (message) =>
        message.type === "contract-expired" &&
        message.playerId === player.id,
    );

    if (alreadyExists) {
      return;
    }

    const offers =
      generateFreeAgentOffers(player);

    addInboxMessage({
      type: "contract-expired",
      title: `${player.name}'s club contract has expired`,
      text:
        `${player.name}'s contract with ${player.club} has expired.\n\n` +
        `The player is currently without a club contract. ` +
        `Choose a new club before advancing another season.`,
      playerId: player.id,
      offers,
    });
  });
}
function togglePlayerSelection(
  playerId,
) {
  if (selectedIds.has(playerId)) {
    selectedIds.delete(playerId);

    renderCandidates();
    updateInterface();

    return;
  }

  const remainingSeasonSlots =
    getRemainingSigningSlots();

  const remainingCapacity =
    getRemainingPlayerCapacity();

  if (remainingSeasonSlots === 0) {
    void showGameDialog({
      eyebrow: "SIGNING LIMIT",
      title: "No Signing Slots Left",
      message:
        "You have already reached this season's maximum number of player signings.",
      confirmLabel: "GOT IT",
    });

    return;
  }

  if (remainingCapacity === 0) {
    void showGameDialog({
      eyebrow: "AGENCY CAPACITY",
      title: "Agency Full",
      message:
        "Your agency has no open player slots. Upgrade the agency before signing another player.",
      confirmLabel: "GOT IT",
    });

    return;
  }

  const maximumSelectable =
    Math.min(
      remainingSeasonSlots,
      remainingCapacity,
    );

  if (
    selectedIds.size >=
    maximumSelectable
  ) {
    void showGameDialog({
      eyebrow: "SELECTION LIMIT",
      title: "Selection Limit Reached",
      message: `You can only select ${maximumSelectable} more player${
        maximumSelectable === 1 ? "" : "s"
      } right now.`,
      confirmLabel: "GOT IT",
    });

    return;
  }

  selectedIds.add(playerId);

  renderCandidates();
  updateInterface();
}

function updateAgencyDashboard() {
  const tier =
    getCurrentAgencyTier();

  const nextTier =
    getNextAgencyTier();

  const highestOverall =
    getHighestCurrentOverall();

  agencyTierElement.textContent =
    tier.name;

  agencyMoneyElement.textContent =
    formatMarketValue(
      agencyMoney,
    );

  agencyCapacityElement.textContent =
    tier.capacity === Infinity
      ? `${signedPlayers.length} / ∞`
      : `${signedPlayers.length} / ${tier.capacity}`;

  candidateLimitElement.textContent =
    `${tier.candidateOverallMin}–${tier.candidateOverallMax}`;

  if (!nextTier) {
    upgradeDescriptionElement.textContent =
      "Maximum agency rank reached";

    upgradeButton.textContent =
      "Max Rank";

    upgradeButton.disabled = true;
    upgradeButton.style.background = "";
    upgradeButton.style.borderColor = "";
    upgradeButton.style.color = "";
    upgradeButton.style.boxShadow = "";

    return;
  }

  const moneyComplete =
    agencyMoney >=
    nextTier.requiredMoney;

  const contractsComplete =
    completedClubContracts >=
    nextTier.requiredContracts;

  const overallComplete =
    highestOverall >=
    nextTier.requiredHighestOverall;

  upgradeDescriptionElement.textContent =
    `${nextTier.name} · ` +
    `${formatMarketValue(
      agencyMoney,
    )} / ${formatMarketValue(
      nextTier.requiredMoney,
    )} · ` +
    `${completedClubContracts} / ` +
    `${nextTier.requiredContracts} completed contracts · ` +
    `OVR ${highestOverall} / ` +
    `${nextTier.requiredHighestOverall}`;

  upgradeButton.textContent =
    `Upgrade to ${nextTier.name}`;

  const canUpgrade =
    moneyComplete &&
    contractsComplete &&
    overallComplete;

  upgradeButton.disabled = !canUpgrade;

  upgradeButton.style.background =
    canUpgrade ? "#16a34a" : "";
  upgradeButton.style.borderColor =
    canUpgrade ? "#16a34a" : "";
  upgradeButton.style.color =
    canUpgrade ? "#ffffff" : "";
  upgradeButton.style.boxShadow =
    canUpgrade
      ? "0 8px 22px rgba(22, 163, 74, 0.24)"
      : "";
}

function updateSelectionUI() {
  const remainingSeasonSlots =
    getRemainingSigningSlots();

  const remainingCapacity =
    getRemainingPlayerCapacity();

  const selectedCost =
    getSelectedSigningCost();

  const totalSeasonUsage =
    signingsThisSeason +
    selectedIds.size;

  selectedCountElement.textContent =
  `${totalSeasonUsage} / ${
    getCurrentAgencyTier().maxSigningsPerSeason
  }`;

  selectedCostElement.textContent =
    formatMarketValue(selectedCost);

  const selectionTooExpensive =
    selectedCost > agencyMoney;

  const noSelection =
    selectedIds.size === 0;

  signButton.disabled =
    noSelection ||
    selectionTooExpensive ||
    remainingSeasonSlots === 0 ||
    remainingCapacity === 0;

  const rerollLimitReached =
    rerollsUsed >= MAX_REROLLS_PER_SEASON;

  rerollButton.disabled =
    remainingSeasonSlots === 0 ||
    remainingCapacity === 0 ||
    rerollLimitReached;

  rerollButton.textContent =
    rerollLimitReached
      ? "New Candidates Used (1 / 1)"
      : "Generate New Candidates (1 remaining)";

  if (remainingCapacity === 0) {
    signButton.textContent =
      "Agency Capacity Reached";
  } else if (
    remainingSeasonSlots === 0
  ) {
    signButton.textContent =
      "Season Signing Limit Reached";
  } else if (
    selectionTooExpensive
  ) {
    signButton.textContent =
      "Insufficient Funds";
  } else {
    signButton.textContent =
      "Sign Selected Players";
  }
}

function updateInterface() {
  nextSeasonButton.textContent =
    currentSeason >= MAX_SEASONS
      ? "END SEASON"
      : "NEXT SEASON";

  updateAgencyDashboard();
  updateSelectionUI();
  updateInboxCounts();
  saveGameState();
}

function signSelectedPlayers() {
  const selectedPlayers =
    getSelectedPlayers();

  if (
    selectedPlayers.length === 0
  ) {
    return;
  }

  const remainingSeasonSlots =
    getRemainingSigningSlots();

  const remainingCapacity =
    getRemainingPlayerCapacity();

  const allowedCount =
    Math.min(
      remainingSeasonSlots,
      remainingCapacity,
    );

  const newlySigned =
    selectedPlayers.slice(
      0,
      allowedCount,
    );

  const totalCost =
    newlySigned.reduce(
      (total, player) =>
        total +
        player.signingCost,
      0,
    );

  if (totalCost > agencyMoney) {
    void showGameDialog({
      eyebrow: "AVAILABLE FUNDS",
      title: "Not Enough Funds",
      message:
        "Your agency does not have enough money to complete these signings.",
      stats: [
        {
          label: "AVAILABLE",
          value: formatMarketValue(agencyMoney),
        },
        {
          label: "REQUIRED",
          value: formatMarketValue(totalCost),
        },
      ],
      confirmLabel: "GOT IT",
      tone: "danger",
    });

    return;
  }

  agencyMoney -= totalCost;

  signedPlayers = [
    ...signedPlayers,
    ...newlySigned,
  ];

  signingsThisSeason +=
    newlySigned.length;
  const newlySignedIds =
    new Set(
      newlySigned.map(
        (player) => player.id,
      ),
    );

  candidates = candidates.filter(
    (player) =>
      !newlySignedIds.has(
        player.id,
      ),
  );

  selectedIds.clear();

  renderCandidates();
  renderSignedPlayers();
  updateInterface();
}

async function upgradeAgency() {
  const currentTier =
    getCurrentAgencyTier();

  const nextTier =
    getNextAgencyTier();

  if (!nextTier) {
    return;
  }

  const highestOverall =
    getHighestCurrentOverall();

  const moneyComplete =
    agencyMoney >=
    nextTier.requiredMoney;

  const contractsComplete =
    completedClubContracts >=
    nextTier.requiredContracts;

  const overallComplete =
    highestOverall >=
    nextTier.requiredHighestOverall;

  if (
    !moneyComplete ||
    !contractsComplete ||
    !overallComplete
  ) {
    await openAgencyActionModal({
      kicker: "AGENCY UPGRADE",
      title: `${nextTier.name} Requirements`,
      type: "warning",
      stats: [
        [
          "MONEY",
          `${formatMarketValue(agencyMoney)} / ${formatMarketValue(nextTier.requiredMoney)}`,
        ],
        [
          "COMPLETED CONTRACTS",
          `${completedClubContracts} / ${nextTier.requiredContracts}`,
        ],
        [
          "HIGHEST CURRENT OVR",
          `${highestOverall} / ${nextTier.requiredHighestOverall}`,
        ],
      ],
      message: "Complete every requirement to unlock this agency upgrade.",
      confirmLabel: "CONTINUE",
      cancelLabel: null,
    });

    return;
  }

  const confirmed = await openAgencyActionModal({
    kicker: "AGENCY UPGRADE",
    title: "Ready to Level Up",
    type: "success",
    rankFrom: currentTier.name,
    rankTo: nextTier.name,
    stats: [
      [
        "CANDIDATE OVR",
        `${currentTier.candidateOverallMin}–${currentTier.candidateOverallMax} → ${nextTier.candidateOverallMin}–${nextTier.candidateOverallMax}`,
      ],
      [
        "SEASON SIGNING LIMIT",
        `${currentTier.maxSigningsPerSeason} → ${nextTier.maxSigningsPerSeason}`,
      ],
      [
        "PLAYER CAPACITY",
        `${currentTier.capacity === Infinity ? "∞" : currentTier.capacity} → ${nextTier.capacity === Infinity ? "∞" : nextTier.capacity}`,
      ],
    ],
    message: "Upgrading immediately unlocks the next level of scouting and agency growth.",
    confirmLabel: "UPGRADE",
    cancelLabel: "CANCEL",
    upgradeConfirm: true,
  });

  if (!confirmed) {
    return;
  }

  currentAgencyTierIndex += 1;

  generateCandidates();
  updateInterface();

  await openAgencyActionModal({
    kicker: "AGENCY UPGRADED",
    title: `${nextTier.name} Unlocked`,
    type: "success",
    rankFrom: currentTier.name,
    rankTo: nextTier.name,
    stats: [
      [
        "NEW CANDIDATE OVR",
        `${nextTier.candidateOverallMin}–${nextTier.candidateOverallMax}`,
      ],
      [
        "SIGNINGS / SEASON",
        `${nextTier.maxSigningsPerSeason}`,
      ],
      [
        "PLAYER CAPACITY",
        `${nextTier.capacity === Infinity ? "∞" : nextTier.capacity}`,
      ],
    ],
    message: "New scouting candidates have been generated for your upgraded agency.",
    confirmLabel: "CONTINUE",
    cancelLabel: null,
    upgradeConfirm: true,
  });
}

function calculateSeasonGrowth(
  player,
) {
  if (player.age >= 34) {
    return randomInt(-2, 0);
  }

  if (player.age >= 31) {
    return randomInt(-1, 1);
  }

  if (
    player.overall >=
    player.potential
  ) {
    return 0;
  }

  const potentialGap =
    player.potential -
    player.overall;

  let minimumGrowth = 0;
  let maximumGrowth = 2;

  if (player.age <= 18) {
    minimumGrowth = 1;
    maximumGrowth = 4;
  } else if (player.age <= 21) {
    minimumGrowth = 0;
    maximumGrowth = 3;
  } else if (player.age <= 25) {
    minimumGrowth = 0;
    maximumGrowth = 2;
  } else {
    minimumGrowth = 0;
    maximumGrowth = 1;
  }

  if (potentialGap >= 25) {
    maximumGrowth += 1;
  }
  const growth = randomInt(
    minimumGrowth,
    Math.max(
      minimumGrowth,
      maximumGrowth,
    ),
  );

  return Math.min(
    growth,
    potentialGap,
  );
}

function improvePotentialEstimate(
  player,
) {
  const width =
    player.potentialMax -
    player.potentialMin;

  if (width <= 6) {
    return;
  }

  if (
    player.potentialMin <
    player.potential
  ) {
    player.potentialMin +=
      randomInt(0, 1);
  }

  if (
    player.potentialMax >
    player.potential
  ) {
    player.potentialMax -=
      randomInt(0, 1);
  }

  player.potentialMin = clamp(
    player.potentialMin,
    Math.min(
      player.overall,
      player.potential,
    ),
    player.potential,
  );

  player.potentialMax = clamp(
    player.potentialMax,
    player.potential,
    99,
  );
}

function progressPlayerSeason(
  player,
) {
  const previousOverall =
    player.overall;

  const previousValue =
    player.marketValue;
 const previousContractYears =
  player.contractYears;

  player.age += 1;
  player.careerSeasons += 1;
  
  player.contractYears = Math.max(
  player.contractYears - 1,
  0,
);
  const growth =
    calculateSeasonGrowth(player);

  player.overall = clamp(
    player.overall + growth,
    35,
    player.potential,
  );

  improvePotentialEstimate(player);

  player.marketValue =
    calculateMarketValue(
      player.overall,
      player.age,
      player.potential,
    );

  player.signingCost =
    calculateSigningCost(
      player.marketValue,
    );

 return {
  playerId: player.id,
  name: player.name,
  previousOverall,
  newOverall: player.overall,
  growth,
  previousValue,
  newValue: player.marketValue,
  previousContractYears,
  contractYears: player.contractYears,
};
}

function processRetirements() {
  const retiredPlayers = signedPlayers.filter(
    (player) => player.age >= 40,
  );

  retiredPlayers.forEach((player) => {
    removeRequiredMessageForPlayer(
      "contract-expired",
      player.id,
    );

    removeRequiredMessageForPlayer(
      "transfer-offer",
      player.id,
    );

    addInboxMessage({
      type: "retirement",
      title: `${player.name} has retired`,
      text:
        `${player.name} has retired from professional football ` +
        `at age ${player.age}.`,
      playerId: player.id,
    });
  });

  if (retiredPlayers.length > 0) {
    const retiredIds = new Set(
      retiredPlayers.map((player) => player.id),
    );

    signedPlayers = signedPlayers.filter(
      (player) => !retiredIds.has(player.id),
    );
  }

  return retiredPlayers;
}

function calculateManagementIncome() {
  const playerValueTotal =
    signedPlayers.reduce(
      (total, player) =>
        total +
        player.marketValue,
      0,
    );

  if (playerValueTotal === 0) {
    return 0;
  }

  return Math.max(
    roundMoney(
      playerValueTotal *
        MANAGEMENT_INCOME_RATE,
    ),
    10000,
  );
}

function createSeasonReport(
  results,
  managementIncome,
) {
  const reportLines = results.map(
    (result) => {
      let growthText =
        "No change";

      if (result.growth > 0) {
        growthText =
          `+${result.growth}`;
      }

      if (result.growth < 0) {
        growthText =
          `${result.growth}`;
      }

      const contractText =
  result.contractYears === 0
    ? "Contract: EXPIRED"
    : `Contract: ${result.contractYears} Year${
        result.contractYears === 1
          ? ""
          : "s"
      } Remaining`;

return (
  `${result.name}\n` +
  `OVR ${result.previousOverall} → ` +
  `${result.newOverall} (${growthText})\n` +
  `${formatMarketValue(
    result.previousValue,
  )} → ` +
  `${formatMarketValue(
    result.newValue,
  )}\n` +
  contractText
);
    },
  );

  const playerReport =
    reportLines.length > 0
      ? reportLines.join("\n\n")
      : "You currently have no signed players.";

  return (
    `Season ${currentSeason} begins.\n\n` +
    `Agency management income: ${formatMarketValue(
      managementIncome,
    )}\n\n` +
    playerReport
  );
}


function ensureBallonDorStyles() {
  if (document.querySelector("#ballon-dor-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "ballon-dor-styles";
  style.textContent = `
    .scout-overall.platinum,
    .overall-pill.platinum {
      color: #f8fafc !important;
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.98),
          rgba(226, 232, 240, 0.96) 46%,
          rgba(203, 213, 225, 0.96)
        ) !important;
      border-color: rgba(255, 255, 255, 0.95) !important;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.55),
        0 0 16px rgba(226, 232, 240, 0.8),
        inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
      text-shadow: none !important;
    }

    .scout-overall.platinum strong,
    .scout-overall.platinum small,
    .overall-pill.platinum {
      color: #334155 !important;
    }

    .ballon-dor-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(7, 10, 18, 0.78);
      backdrop-filter: blur(10px);
    }

    .ballon-dor-modal {
      width: min(980px, 100%);
      max-height: min(820px, calc(100vh - 48px));
      overflow: auto;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 22px;
      background:
        radial-gradient(circle at top, rgba(226, 232, 240, 0.14), transparent 34%),
        #10141d;
      color: #f8fafc;
      box-shadow: 0 28px 80px rgba(0, 0, 0, 0.48);
      padding: 30px;
    }

    .ballon-dor-kicker {
      margin: 0 0 8px;
      color: #cbd5e1;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.18em;
      text-align: center;
    }

    .ballon-dor-title {
      margin: 0;
      font-size: clamp(28px, 5vw, 46px);
      line-height: 1;
      text-align: center;
    }

    .ballon-dor-subtitle {
      margin: 12px auto 26px;
      max-width: 620px;
      color: #94a3b8;
      font-size: 13px;
      line-height: 1.6;
      text-align: center;
    }

    .ballon-dor-candidates {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 14px;
    }

    .ballon-dor-card {
      display: flex;
      flex-direction: column;
      min-height: 260px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.11);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.045);
    }

    .ballon-dor-card-name {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 30px;
      font-size: 18px;
      font-weight: 900;
    }

    .ballon-dor-card-name .country-flag {
      width: 22px;
      height: auto;
    }

    .ballon-dor-card-meta {
      margin-top: 9px;
      color: #94a3b8;
      font-size: 12px;
      line-height: 1.7;
    }

    .ballon-dor-card-ovr {
      margin: 22px 0 18px;
      font-size: 48px;
      font-weight: 950;
      line-height: 1;
      color: #f8fafc;
      text-shadow: 0 0 20px rgba(226, 232, 240, 0.45);
    }

    .ballon-dor-card-ovr small {
      display: block;
      margin-top: 5px;
      color: #94a3b8;
      font-size: 10px;
      letter-spacing: 0.14em;
    }

    .ballon-dor-vote {
      width: 100%;
      margin-top: auto;
      padding: 11px 14px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 10px;
      background: #f8fafc;
      color: #0f172a;
      font: inherit;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.08em;
      cursor: pointer;
    }

    .ballon-dor-vote:hover {
      transform: translateY(-1px);
    }

    .ballon-dor-podium {
      display: grid;
      grid-template-columns: 1fr 1.12fr 1fr;
      align-items: end;
      gap: 14px;
      margin-top: 28px;
    }

    .ballon-dor-place {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 240px;
      padding: 18px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px 16px 8px 8px;
      background: rgba(255, 255, 255, 0.045);
      text-align: center;
    }

    .ballon-dor-place.first {
      min-height: 310px;
      background:
        linear-gradient(180deg, rgba(226, 232, 240, 0.13), rgba(255, 255, 255, 0.045));
      border-color: rgba(248, 250, 252, 0.24);
    }

    .ballon-dor-rank {
      margin-bottom: auto;
      color: #94a3b8;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.16em;
    }

    .ballon-dor-trophy {
      margin: 10px 0 12px;
      font-size: 42px;
      line-height: 1;
    }

    .ballon-dor-place strong {
      display: block;
      margin-top: 10px;
      font-size: 17px;
    }

    .ballon-dor-place small {
      display: block;
      margin-top: 7px;
      color: #94a3b8;
      font-size: 11px;
    }

    .ballon-dor-continue {
      display: block;
      width: min(260px, 100%);
      margin: 26px auto 0;
      padding: 12px 16px;
      border: 0;
      border-radius: 10px;
      background: #f8fafc;
      color: #0f172a;
      font: inherit;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
    }

    @media (max-width: 700px) {
      .ballon-dor-modal {
        padding: 22px 16px;
      }

      .ballon-dor-podium {
        grid-template-columns: 1fr;
        align-items: stretch;
      }

      .ballon-dor-place,
      .ballon-dor-place.first {
        min-height: 190px;
      }

      .ballon-dor-place.first {
        order: -1;
      }
    }
  `;
  document.head.appendChild(style);
}

function hasBallonDorForSeason(season) {
  return ballonDorHistory.some(
    (award) => award.season === season,
  );
}

function getBallonDorCandidates() {
  return signedPlayers.filter(
    (player) => player.overall === 99,
  );
}

function createExternalBallonDorPlayer(excludedNames = []) {
  let player;

  do {
    const country = randomItem(Object.keys(namePools));
    const club = randomItem(
      clubs.filter((candidateClub) => candidateClub.level >= 84),
    ) || randomItem(clubs);

    player = {
      id: `external-${crypto.randomUUID()}`,
      name: generateName(country),
      country,
      age: randomInt(24, 31),
      position: randomItem(positions),
      club: club.name,
      overall: randomInt(96, 98),
      external: true,
    };
  } while (excludedNames.includes(player.name));

  return player;
}

function shuffleArray(array) {
  const copy = [...array];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [copy[index], copy[swapIndex]] =
      [copy[swapIndex], copy[index]];
  }

  return copy;
}

function buildBallonDorPodium(winner, candidates) {
  const remainingAgencyPlayers = shuffleArray(
    candidates.filter((player) => player.id !== winner.id),
  );

  const otherPlaces = remainingAgencyPlayers.slice(0, 2);
  const excludedNames = [
    winner.name,
    ...otherPlaces.map((player) => player.name),
  ];

  while (otherPlaces.length < 2) {
    const externalPlayer =
      createExternalBallonDorPlayer(excludedNames);

    otherPlaces.push(externalPlayer);
    excludedNames.push(externalPlayer.name);
  }

  const shuffledOthers = shuffleArray(otherPlaces);

  return {
    first: winner,
    second: shuffledOthers[0],
    third: shuffledOthers[1],
  };
}

function renderBallonDorCandidateCard(player) {
  return `
    <article class="ballon-dor-card">
      <div class="ballon-dor-card-name">
        ${getCountryFlag(player.country)}
        <span>${player.name}</span>
      </div>

      <div class="ballon-dor-card-meta">
        Age ${player.age} · ${player.position}<br>
        ${player.club}
      </div>

      <div class="ballon-dor-card-ovr">
        99
        <small>OVR · PLATINUM</small>
      </div>

      <button
        class="ballon-dor-vote"
        type="button"
        data-player-id="${player.id}"
      >
        VOTE
      </button>
    </article>
  `;
}

function renderBallonDorPodiumPlace(player, rank) {
  const className = rank === 1 ? " first" : "";
  const trophy = rank === 1
    ? `<div class="ballon-dor-trophy">🏆</div>`
    : "";

  return `
    <div class="ballon-dor-place${className}">
      <div class="ballon-dor-rank">${rank}${rank === 1 ? "ST" : rank === 2 ? "ND" : "RD"}</div>
      ${trophy}
      <div>
        ${getCountryFlag(player.country)}
        <strong>${player.name}</strong>
        <small>
          ${player.club} · ${player.position} · OVR ${player.overall}
        </small>
      </div>
    </div>
  `;
}

function recordBallonDorWinner(player) {
  player.ballonDorWins =
    (Number(player.ballonDorWins) || 0) + 1;

  ballonDorHistory.push({
    season: currentSeason,
    playerId: player.id,
    playerName: player.name,
  });

  saveGameState();
}

function openBallonDorCeremony(candidates) {
  ensureBallonDorStyles();

  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "ballon-dor-overlay";

    const modal = document.createElement("section");
    modal.className = "ballon-dor-modal";

    modal.innerHTML = `
      <p class="ballon-dor-kicker">SEASON ${currentSeason}</p>
      <h2 class="ballon-dor-title">BALLON D'OR</h2>
      <p class="ballon-dor-subtitle">
        Your OVR 99 players are eligible for the award.
        Choose one player to receive your vote.
      </p>

      <div class="ballon-dor-candidates">
        ${candidates
          .map(renderBallonDorCandidateCard)
          .join("")}
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    modal
      .querySelectorAll(".ballon-dor-vote")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const winner = candidates.find(
            (player) =>
              player.id === button.dataset.playerId,
          );

          if (!winner) {
            return;
          }

          const podium =
            buildBallonDorPodium(winner, candidates);

          recordBallonDorWinner(winner);

          modal.innerHTML = `
            <p class="ballon-dor-kicker">SEASON ${currentSeason} · RESULTS</p>
            <h2 class="ballon-dor-title">BALLON D'OR</h2>
            <p class="ballon-dor-subtitle">
              ${winner.name} wins the Ballon d'Or.
            </p>

            <div class="ballon-dor-podium">
              ${renderBallonDorPodiumPlace(podium.second, 2)}
              ${renderBallonDorPodiumPlace(podium.first, 1)}
              ${renderBallonDorPodiumPlace(podium.third, 3)}
            </div>

            <button
              class="ballon-dor-continue"
              type="button"
            >
              CONTINUE
            </button>
          `;

          modal
            .querySelector(".ballon-dor-continue")
            .addEventListener("click", () => {
              overlay.remove();
              document.body.style.overflow = "";
              resolve();
            });
        });
      });
  });
}

async function runBallonDorBeforeSeasonAdvance() {
  const candidates = getBallonDorCandidates();

  if (
    candidates.length === 0 ||
    hasBallonDorForSeason(currentSeason)
  ) {
    return;
  }

  await openBallonDorCeremony(candidates);
}


function ensureCareerEndingStyles() {
  if (document.querySelector("#career-ending-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "career-ending-styles";
  style.textContent = `
    .career-ending-overlay {
      position: fixed;
      inset: 0;
      z-index: 11000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(7, 10, 18, 0.88);
      backdrop-filter: blur(12px);
    }

    .career-ending-modal {
      width: min(760px, 100%);
      max-height: min(860px, calc(100vh - 48px));
      overflow: auto;
      padding: 38px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 24px;
      background:
        radial-gradient(
          circle at top,
          rgba(255, 255, 255, 0.10),
          transparent 35%
        ),
        #10141d;
      color: #f8fafc;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.52);
    }

    .career-ending-modal.success {
      background:
        radial-gradient(
          circle at 50% 0%,
          rgba(226, 232, 240, 0.19),
          transparent 40%
        ),
        #10141d;
    }

    .career-ending-kicker {
      margin: 0 0 9px;
      color: #94a3b8;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.18em;
      text-align: center;
    }

    .career-ending-title {
      margin: 0;
      font-size: clamp(34px, 7vw, 58px);
      line-height: 0.98;
      letter-spacing: -0.045em;
      text-align: center;
    }

    .career-ending-copy {
      max-width: 580px;
      margin: 16px auto 30px;
      color: #aab4c3;
      font-size: 14px;
      line-height: 1.65;
      text-align: center;
    }

    .career-ending-summary {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .career-ending-stat,
    .career-ending-awards {
      padding: 18px;
      border: 1px solid rgba(255, 255, 255, 0.10);
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.045);
    }

    .career-ending-label {
      display: block;
      margin-bottom: 7px;
      color: #94a3b8;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.11em;
    }

    .career-ending-stat strong {
      display: block;
      font-size: 22px;
      line-height: 1.15;
    }

    .career-ending-awards {
      margin-top: 12px;
    }

    .career-ending-award-list {
      display: grid;
      gap: 9px;
      margin-top: 12px;
    }

    .career-ending-award-player {
      display: flex;
      align-items: center;
      gap: 9px;
      min-height: 38px;
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.045);
    }

    .career-ending-award-player .country-flag {
      width: 20px;
      height: 14px;
      flex: 0 0 auto;
    }

    .career-ending-award-name {
      min-width: 0;
      flex: 1;
      overflow: hidden;
      font-size: 13px;
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .career-ending-trophies {
      flex: 0 0 auto;
      white-space: nowrap;
      font-size: 16px;
      letter-spacing: 1px;
    }

    .career-ending-none {
      margin: 12px 0 0;
      color: #94a3b8;
      font-size: 14px;
    }

    .career-ending-footer {
      margin: 26px auto 0;
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.6;
      text-align: center;
    }

    .career-ending-new-career {
      display: block;
      width: min(280px, 100%);
      margin: 24px auto 0;
      padding: 13px 16px;
      border: 0;
      border-radius: 11px;
      background: #f8fafc;
      color: #0f172a;
      font: inherit;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.05em;
      cursor: pointer;
    }

    @media (max-width: 620px) {
      .career-ending-modal {
        padding: 28px 18px;
      }

      .career-ending-summary {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);
}

function getCurrentBallonDorWinners() {
  return signedPlayers
    .filter(
      (player) => (Number(player.ballonDorWins) || 0) > 0,
    )
    .sort(
      (playerA, playerB) =>
        (Number(playerB.ballonDorWins) || 0) -
        (Number(playerA.ballonDorWins) || 0),
    );
}

function hasCompletedUltimateCareerGoal() {
  const isLegendary =
    getCurrentAgencyTier().name === "Legendary";

  const hasCurrentBallonDorWinner =
    getCurrentBallonDorWinners().length > 0;

  return isLegendary && hasCurrentBallonDorWinner;
}

function renderCareerEndingAwardPlayer(player) {
  const wins = Number(player.ballonDorWins) || 0;

  return `
    <div class="career-ending-award-player">
      ${getCountryFlag(player.country)}
      <span class="career-ending-award-name">
        ${player.name}
      </span>
      <span
        class="career-ending-trophies"
        title="Ballon d'Or wins: ${wins}"
      >
        ${"🏆".repeat(wins)}
      </span>
    </div>
  `;
}

function openCareerEnding() {
  ensureCareerEndingStyles();

  const success = hasCompletedUltimateCareerGoal();
  const winners = getCurrentBallonDorWinners();
  const tierName = getCurrentAgencyTier().name;

  const overlay = document.createElement("div");
  overlay.className = "career-ending-overlay";

  const modal = document.createElement("section");
  modal.className =
    `career-ending-modal${success ? " success" : ""}`;

  const awardsMarkup =
    winners.length > 0
      ? `
        <div class="career-ending-award-list">
          ${winners
            .map(renderCareerEndingAwardPlayer)
            .join("")}
        </div>
      `
      : `
        <p class="career-ending-none">—</p>
      `;

  modal.innerHTML = `
    <p class="career-ending-kicker">
      30-SEASON CAREER COMPLETE
    </p>

    <h2 class="career-ending-title">
      ${success ? "CONGRATULATIONS!" : "CAREER COMPLETE"}
    </h2>

    <p class="career-ending-copy">
      ${
        success
          ? "You completed an extraordinary 30-season journey and built one of football's greatest agencies."
          : "Your 30-season journey has come to an end. Here is the legacy your agency leaves behind."
      }
    </p>

    <div class="career-ending-summary">
      <div class="career-ending-stat">
        <span class="career-ending-label">
          FINAL AGENCY RANK
        </span>
        <strong>${tierName.toUpperCase()}</strong>
      </div>

      <div class="career-ending-stat">
        <span class="career-ending-label">
          CURRENT PLAYERS
        </span>
        <strong>${signedPlayers.length}</strong>
      </div>
    </div>

    <div class="career-ending-awards">
      <span class="career-ending-label">
        BALLON D'OR WINNERS
      </span>
      ${awardsMarkup}
    </div>

    <p class="career-ending-footer">
      ${
        success
          ? "You reached the highest level of agency management and represented a Ballon d'Or winner."
          : "Every career leaves a different story. A new journey can always begin."
      }
    </p>

    <button
      class="career-ending-new-career"
      type="button"
    >
      NEW CAREER
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  modal
    .querySelector(".career-ending-new-career")
    .addEventListener("click", async () => {
      const confirmed = await showGameDialog({
        eyebrow: "NEW CAREER",
        title: "Begin a New Journey?",
        message:
          "Your completed career, game progress and agent profile will be permanently deleted.",
        confirmLabel: "START NEW CAREER",
        cancelLabel: "VIEW CAREER",
        tone: "danger",
      });

      if (!confirmed) {
        return;
      }

      isResettingCareer = true;
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
      localStorage.removeItem(AGENT_PROFILE_STORAGE_KEY);
      window.location.reload();
    });
}

async function advanceToNextSeason() {
  const pendingRequiredMessages = getPendingRequiredMessages();

  if (pendingRequiredMessages.length > 0) {
    const expiredCount = pendingRequiredMessages.filter(
      (message) => message.type === "contract-expired",
    ).length;

    const transferOfferCount = pendingRequiredMessages.filter(
      (message) => message.type === "transfer-offer",
    ).length;

    await showGameDialog({
      eyebrow: "SEASON BLOCKED",
      title: "Inbox Action Required",
      message:
        "Resolve all required player and club decisions before advancing to the next season.",
      stats: [
        {
          label: "EXPIRED CONTRACTS",
          value: expiredCount,
        },
        {
          label: "TRANSFER OFFERS",
          value: transferOfferCount,
        },
      ],
      confirmLabel: "GO TO INBOX",
      tone: "warning",
    });

    showView("inbox");
    return;
  }

  await runBallonDorBeforeSeasonAdvance();

  if (currentSeason >= MAX_SEASONS) {
    openCareerEnding();
    return;
  }

  const tier = getCurrentAgencyTier();
  const seasonSigningLimit = tier.maxSigningsPerSeason;

  if (
    signingsThisSeason < seasonSigningLimit &&
    getRemainingPlayerCapacity() > 0
  ) {
    const remaining =
      seasonSigningLimit - signingsThisSeason;

    const confirmed = await showGameDialog({
      eyebrow: "SEASON ${currentSeason}",
      title: "Advance to Next Season?",
      message: `You still have ${remaining} signing slot${
        remaining === 1 ? "" : "s"
      } available this season.`,
      stats: [
        {
          label: "SIGNINGS USED",
          value: `${signingsThisSeason} / ${seasonSigningLimit}`,
        },
        {
          label: "SLOTS REMAINING",
          value: remaining,
        },
      ],
      confirmLabel: "NEXT SEASON",
      cancelLabel: "STAY THIS SEASON",
    });

    if (!confirmed) {
      return;
    }
  }

  currentSeason += 1;

  // Inbox contains only the current season's work and updates.
  inboxMessages = [];
  activeClubOffers = null;
  clearInboxDetail();

  const seasonResults = signedPlayers.map(
    progressPlayerSeason,
  );

  processRetirements();
  createContractExpiryMessages(seasonResults);
  generateTransferOffers();

  const managementIncome = calculateManagementIncome();
  agencyMoney += managementIncome;

  signingsThisSeason = 0;
  rerollsUsed = 0;
  selectedIds.clear();

  seasonLabelElement.textContent =
    `SEASON ${currentSeason} / ${MAX_SEASONS}`;

  generateCandidates();
  renderSignedPlayers();
  updateInterface();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

rerollButton.addEventListener(
  "click",
  async () => {
    if (
      getRemainingSigningSlots() === 0 ||
      getRemainingPlayerCapacity() === 0 ||
      rerollsUsed >= MAX_REROLLS_PER_SEASON
    ) {
      return;
    }

    const remainingRerolls =
      MAX_REROLLS_PER_SEASON - rerollsUsed;

    const confirmed = await openAgencyActionModal({
      kicker: "SCOUTING NETWORK",
      title: "Generate New Candidates?",
      message:
        "The current candidate list will be discarded and replaced with 10 new players.",
      stats: [
        ["NEW CANDIDATES", `${CANDIDATE_COUNT} players`],
        [
          "REROLLS REMAINING",
          `${remainingRerolls} → ${Math.max(remainingRerolls - 1, 0)}`,
        ],
      ],
      confirmLabel: "GENERATE NEW",
      cancelLabel: "CANCEL",
    });

    if (!confirmed) {
      return;
    }

    rerollsUsed += 1;
    generateCandidates();
    updateInterface();
  },
);

signButton.addEventListener(
  "click",
  signSelectedPlayers,
);

upgradeButton.addEventListener(
  "click",
  upgradeAgency,
);

nextSeasonButton.addEventListener(
  "click",
  advanceToNextSeason,
);
scoutTab.addEventListener(
  "click",
  () => {
    showView("scout");
  },
);
inboxTab.addEventListener("click", () => {

    showView("inbox");

});
agencyTab.addEventListener(
  "click",
  () => {
    showView("agency");
  },
);

emptyScoutButton.addEventListener(
  "click",
  () => {
    showView("scout");
  },
);
inboxScoutButton.addEventListener("click", () => {

    showView("scout");

});
agencySearchElement.addEventListener(
  "input",
  renderSignedPlayers,
);

agencySortElement.addEventListener(
  "change",
  renderSignedPlayers,
);
ensureBallonDorStyles();
populateNationalityOptions();
loadAgentProfile();

const hasSavedGame = loadGameState();

seasonLabelElement.textContent =
    `SEASON ${currentSeason} / ${MAX_SEASONS}`;

if (!hasSavedGame || candidates.length === 0) {
  generateCandidates();
}

renderCandidates();
renderSignedPlayers();
updateInterface();

window.addEventListener("beforeunload", saveGameState);
document.addEventListener("visibilitychange", () => {
  if (
    document.visibilityState === "hidden" &&
    !isResettingCareer
  ) {
    saveGameState();
  }
});