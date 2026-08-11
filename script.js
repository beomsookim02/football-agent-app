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

const AGENT_PROFILE_STORAGE_KEY = "footballAgentAppProfile";

const ENDLESS_GAME_STATE_STORAGE_KEY =
  "footballAgentAppEndlessGameState";

const CHALLENGE_GAME_STATE_STORAGE_KEY =
  "footballAgentAppChallengeGameState";

const ENDLESS_GAME_STATE_BACKUP_KEY =
  "footballAgentAppEndlessGameStateBackup";

const CHALLENGE_GAME_STATE_BACKUP_KEY =
  "footballAgentAppChallengeGameStateBackup";

const LEGACY_GAME_STATE_STORAGE_KEY =
  "footballAgentAppGameState";

const ANALYTICS_USER_ID_KEY =
  "footballAgentAppAnalyticsUserId";

const CLOUD_INTENTIONAL_RESET_KEY =
  "footballAgentCloudIntentionalReset";

function getGameStateStorageKey(mode = careerMode) {
  return mode === "challenge"
    ? CHALLENGE_GAME_STATE_STORAGE_KEY
    : ENDLESS_GAME_STATE_STORAGE_KEY;
}

function getGameStateBackupKey(mode = careerMode) {
  return mode === "challenge"
    ? CHALLENGE_GAME_STATE_BACKUP_KEY
    : ENDLESS_GAME_STATE_BACKUP_KEY;
}

const CLOUD_SAVE_SCHEMA_VERSION = 1;

function readStoredJson(storageKey) {
  try {
    const value = localStorage.getItem(storageKey);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn(`Could not read stored data for ${storageKey}.`, error);
    return null;
  }
}

function createCloudSavePayload(flushCurrentCareer = true) {
  // Manual backup can flush first. Automatic sync calls this with false
  // because saveGameState() has already written the current state locally.
  if (
    flushCurrentCareer &&
    careerMode &&
    !isResettingCareer
  ) {
    saveGameState({ skipCloudSync: true });
  }

  return {
    schemaVersion: CLOUD_SAVE_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    agentProfile: readStoredJson(AGENT_PROFILE_STORAGE_KEY),
    careers: {
      endless: readStoredJson(ENDLESS_GAME_STATE_STORAGE_KEY),
      challenge: readStoredJson(CHALLENGE_GAME_STATE_STORAGE_KEY),
    },
  };
}

function restoreCloudSavePayload(payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    payload.schemaVersion !== CLOUD_SAVE_SCHEMA_VERSION
  ) {
    throw new Error("Unsupported or invalid cloud save.");
  }

  const profile = payload.agentProfile;
  const endlessSave = payload.careers?.endless;
  const challengeSave = payload.careers?.challenge;

  if (profile?.name && profile?.countryCode) {
    localStorage.setItem(
      AGENT_PROFILE_STORAGE_KEY,
      JSON.stringify(profile),
    );
  }

  if (endlessSave?.version === 1) {
    localStorage.setItem(
      ENDLESS_GAME_STATE_STORAGE_KEY,
      JSON.stringify({
        ...endlessSave,
        careerMode: "endless",
      }),
    );
  }

  if (challengeSave?.version === 1) {
    localStorage.setItem(
      CHALLENGE_GAME_STATE_STORAGE_KEY,
      JSON.stringify({
        ...challengeSave,
        careerMode: "challenge",
      }),
    );
  }

  return true;
}

function getSavedCareerSummary(mode) {
  try {
    const savedState = JSON.parse(
      localStorage.getItem(getGameStateStorageKey(mode)),
    );

    if (!savedState || savedState.version !== 1) {
      return null;
    }

    return {
      season: Number(savedState.currentSeason) || 1,
      tierIndex: Number(savedState.currentAgencyTierIndex) || 0,
    };
  } catch (error) {
    return null;
  }
}

function migrateLegacyCareerSave() {
  try {
    const legacyRaw =
      localStorage.getItem(LEGACY_GAME_STATE_STORAGE_KEY);

    if (!legacyRaw) {
      return;
    }

    const legacyState = JSON.parse(legacyRaw);

    if (!legacyState || legacyState.version !== 1) {
      return;
    }

    const legacyMode =
      legacyState.careerMode === "challenge"
        ? "challenge"
        : "endless";

    const destinationKey =
      getGameStateStorageKey(legacyMode);

    const currentSaveRaw =
      localStorage.getItem(destinationKey);

    // 해당 모드의 새 저장이 아예 없을 때
    // 예전 저장을 새 저장 구조로 옮긴다.
    if (!currentSaveRaw) {
      localStorage.setItem(
        destinationKey,
        JSON.stringify({
          ...legacyState,
          careerMode: legacyMode,
        }),
      );

      console.log(
        `Legacy ${legacyMode} career migrated.`,
      );

      return;
    }

    // 새 저장도 있고 예전 저장도 있는 경우
    // 시즌이 더 높은 쪽을 보존한다.
    let currentSave = null;

    try {
      currentSave = JSON.parse(currentSaveRaw);
    } catch (error) {
      console.warn(
        `Could not parse current ${legacyMode} save.`,
        error,
      );
    }

    const legacySeason =
      Number(legacyState.currentSeason) || 1;

    const currentSeason =
      Number(currentSave?.currentSeason) || 1;

    if (legacySeason > currentSeason) {
      localStorage.setItem(
        destinationKey,
        JSON.stringify({
          ...legacyState,
          careerMode: legacyMode,
        }),
      );

      console.log(
        `Recovered older ${legacyMode} save: Season ${legacySeason}.`,
      );
    }
  } catch (error) {
    console.warn(
      "Could not migrate legacy career save.",
      error,
    );
  }
}

function getAnalyticsUserId() {
  let userId = localStorage.getItem(ANALYTICS_USER_ID_KEY);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(ANALYTICS_USER_ID_KEY, userId);
  }

  return userId;
}

const analyticsUserId = getAnalyticsUserId();

const SUPABASE_URL = "https://fqpldtbwnuchzgryorir.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_728F0JUKfDcm4d75Asnfzw_Gp3MbinV";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const CLOUD_SAVE_TABLE = "cloud_saves";
const CLOUD_LINKED_USER_KEY = "footballAgentCloudLinkedUserId";

let cloudAutoSyncTimer = null;
let cloudAutoSyncInFlight = false;
let cloudAutoSyncPending = false;
let cloudSyncReady = false;

// Optimistic concurrency guard for multi-device cloud saves.
// This stores the exact cloud version (updated_at) that this device last saw.
// If another device changes the cloud row after that point, this device will
// refuse to overwrite it and will ask the player to load the newer cloud save.
let cloudLastKnownUpdatedAt = null;
let cloudConflictHandling = false;

class CloudSaveConflictError extends Error {
  constructor(message = "Cloud save changed on another device.") {
    super(message);
    this.name = "CloudSaveConflictError";
  }
}

function getOAuthRedirectUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

async function getCloudAuthUser() {
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error) {
    throw error;
  }

  return user || null;
}

async function signInWithGoogleForCloudSave() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getOAuthRedirectUrl(),
    },
  });

  if (error) {
    throw error;
  }
}

async function signOutCloudSave() {
  const { error } = await supabaseClient.auth.signOut({
    scope: "local",
  });

  if (error) {
    throw error;
  }

  cloudSyncReady = false;
  cloudLastKnownUpdatedAt = null;
  localStorage.removeItem(CLOUD_LINKED_USER_KEY);
}

async function uploadCloudSave() {
  const user = await getCloudAuthUser();

  if (!user) {
    throw new Error("Please sign in with Google first.");
  }

  const payload = createCloudSavePayload(false);
  const intentionalResetMode =
    localStorage.getItem(CLOUD_INTENTIONAL_RESET_KEY);

  // Read the current cloud copy before overwriting it.
  // If local progress suddenly moves backwards without an intentional reset,
  // preserve the higher cloud career instead of uploading the rollback.
  const {
    data: existingCloudRow,
    error: existingCloudError,
  } = await supabaseClient
    .from(CLOUD_SAVE_TABLE)
    .select("save_data, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingCloudError) {
    throw existingCloudError;
  }

  const existingCloudSave =
    existingCloudRow?.save_data || null;

  // Multi-device conflict check.
  // Once this device has seen a cloud version, the row must still be that same
  // version immediately before we write. If it changed, another device saved.
  if (
    existingCloudRow?.updated_at &&
    cloudLastKnownUpdatedAt &&
    existingCloudRow.updated_at !== cloudLastKnownUpdatedAt
  ) {
    throw new CloudSaveConflictError();
  }

  const rollbackBlockedModes = new Set();

  if (existingCloudSave) {
    for (const mode of ["endless", "challenge"]) {
      const localCareer = payload.careers?.[mode];
      const cloudCareer =
        existingCloudSave.careers?.[mode];

      if (!localCareer || !cloudCareer) {
        continue;
      }

      const localSeason =
        Number(localCareer.currentSeason) || 1;
      const cloudSeason =
        Number(cloudCareer.currentSeason) || 1;

      if (
        localSeason < cloudSeason &&
        intentionalResetMode !== mode
      ) {
        console.warn(
          `Cloud rollback blocked for ${mode}: local Season ${localSeason}, cloud Season ${cloudSeason}.`,
        );

        payload.careers[mode] = cloudCareer;
        rollbackBlockedModes.add(mode);
      }
    }
  }

  // Safety check: when the active career is not being rollback-protected,
  // the payload must match the season currently visible in the game.
  if (
    careerMode === "endless" &&
    !rollbackBlockedModes.has("endless")
  ) {
    const payloadSeason = Number(
      payload.careers?.endless?.currentSeason,
    );

    if (payloadSeason !== Number(currentSeason)) {
      throw new Error(
        `Backup safety check failed: Endless Career is Season ${currentSeason}, but the backup payload is Season ${payloadSeason || "?"}.`,
      );
    }
  }

  if (
    careerMode === "challenge" &&
    !rollbackBlockedModes.has("challenge")
  ) {
    const payloadSeason = Number(
      payload.careers?.challenge?.currentSeason,
    );

    if (payloadSeason !== Number(currentSeason)) {
      throw new Error(
        `Backup safety check failed: 30-Season Challenge is Season ${currentSeason}, but the backup payload is Season ${payloadSeason || "?"}.`,
      );
    }
  }

  const updatedAt = new Date().toISOString();

  let data = null;
  let error = null;

  if (existingCloudRow) {
    // Compare-and-swap: only update if the cloud row is still exactly the
    // version this device last observed. This closes the small race window
    // between the pre-check above and the actual write.
    const expectedUpdatedAt = cloudLastKnownUpdatedAt;

    if (!expectedUpdatedAt) {
      throw new CloudSaveConflictError();
    }

    const result = await supabaseClient
      .from(CLOUD_SAVE_TABLE)
      .update({
        save_data: payload,
        updated_at: updatedAt,
      })
      .eq("user_id", user.id)
      .eq("updated_at", expectedUpdatedAt)
      .select("save_data, updated_at")
      .maybeSingle();

    data = result.data;
    error = result.error;

    if (!error && !data) {
      throw new CloudSaveConflictError();
    }
  } else {
    // First cloud save for this account. A unique user_id prevents two devices
    // from both creating competing first saves.
    const result = await supabaseClient
      .from(CLOUD_SAVE_TABLE)
      .insert({
        user_id: user.id,
        save_data: payload,
        updated_at: updatedAt,
      })
      .select("save_data, updated_at")
      .single();

    data = result.data;
    error = result.error;

    if (error?.code === "23505") {
      throw new CloudSaveConflictError();
    }
  }

  if (error) {
    throw error;
  }

  cloudLastKnownUpdatedAt = data?.updated_at || updatedAt;

  if (
    careerMode === "endless" &&
    !rollbackBlockedModes.has("endless")
  ) {
    const storedSeason = Number(
      data?.save_data?.careers?.endless?.currentSeason,
    );

    if (storedSeason !== Number(currentSeason)) {
      throw new Error(
        `Cloud verification failed: expected Endless Season ${currentSeason}, but Supabase returned Season ${storedSeason || "?"}.`,
      );
    }
  }

  if (
    careerMode === "challenge" &&
    !rollbackBlockedModes.has("challenge")
  ) {
    const storedSeason = Number(
      data?.save_data?.careers?.challenge?.currentSeason,
    );

    if (storedSeason !== Number(currentSeason)) {
      throw new Error(
        `Cloud verification failed: expected Challenge Season ${currentSeason}, but Supabase returned Season ${storedSeason || "?"}.`,
      );
    }
  }

  // An intentional reset is considered complete only after the lower
  // Season 1 save has successfully reached the cloud.
  if (
    intentionalResetMode &&
    !rollbackBlockedModes.has(intentionalResetMode)
  ) {
    localStorage.removeItem(CLOUD_INTENTIONAL_RESET_KEY);
  }

  return {
    payload: data?.save_data || payload,
    updatedAt: data?.updated_at || updatedAt,
  };
}

async function runCloudAutoSync() {
  if (
    isResettingCareer ||
    !careerMode ||
    !cloudSyncReady
  ) {
    return;
  }

  if (cloudAutoSyncInFlight) {
    cloudAutoSyncPending = true;
    return;
  }

  cloudAutoSyncInFlight = true;

  try {
    const user = await getCloudAuthUser();

    if (!user) {
      return;
    }

    await uploadCloudSave();
  } catch (error) {
    if (error instanceof CloudSaveConflictError) {
      console.warn("Cloud save conflict detected.", error);
      cloudSyncReady = false;
      void handleCloudSaveConflict();
    } else {
      console.warn("Automatic cloud sync failed.", error);
    }
  } finally {
    cloudAutoSyncInFlight = false;

    if (cloudAutoSyncPending) {
      cloudAutoSyncPending = false;
      queueCloudAutoSync(800);
    }
  }
}

function queueCloudAutoSync(delay = 1200) {
  if (
    isResettingCareer ||
    !careerMode ||
    !cloudSyncReady
  ) {
    return;
  }

  if (cloudAutoSyncTimer) {
    clearTimeout(cloudAutoSyncTimer);
  }

  cloudAutoSyncTimer = setTimeout(() => {
    cloudAutoSyncTimer = null;
    void runCloudAutoSync();
  }, delay);
}


function chooseCareerSave(localSave, cloudSave) {
  if (!localSave && !cloudSave) return null;
  if (!localSave) return cloudSave;
  if (!cloudSave) return localSave;

  const localSeason = Number(localSave.currentSeason) || 1;
  const cloudSeason = Number(cloudSave.currentSeason) || 1;

  // Primary rule: preserve the career with more progress.
  if (localSeason > cloudSeason) return localSave;
  if (cloudSeason > localSeason) return cloudSave;

  // Same season: use time only as a tie-breaker when both saves
  // actually contain a reliable timestamp.
  const localTime = new Date(localSave.savedAt || 0).getTime();
  const cloudTime = new Date(cloudSave.savedAt || 0).getTime();

  if (
    Number.isFinite(localTime) &&
    Number.isFinite(cloudTime) &&
    localTime > 0 &&
    cloudTime > 0
  ) {
    return cloudTime > localTime ? cloudSave : localSave;
  }

  // Old saves may not have savedAt. In a tie, keep this device's
  // copy so signing in never unexpectedly rolls back local work.
  return localSave;
}

async function initializeCloudSync() {
  try {
    const user = await getCloudAuthUser();

    // No explicit Google sign-in = cloud does nothing.
    if (!user) {
      cloudSyncReady = false;
      cloudLastKnownUpdatedAt = null;
      return;
    }

    const cloudRow = await downloadCloudSave();

    const localProfile = readStoredJson(AGENT_PROFILE_STORAGE_KEY);
    const localEndless = readStoredJson(
      ENDLESS_GAME_STATE_STORAGE_KEY,
    );
    const localChallenge = readStoredJson(
      CHALLENGE_GAME_STATE_STORAGE_KEY,
    );

    // First time this Google account has no cloud save:
    // upload whatever progress currently exists on this device.
    if (!cloudRow?.save_data) {
      cloudLastKnownUpdatedAt = null;
      localStorage.setItem(CLOUD_LINKED_USER_KEY, user.id);
      cloudSyncReady = true;

      await uploadCloudSave();
      return;
    }

    // Remember the exact cloud version that this device is merging from.
    cloudLastKnownUpdatedAt = cloudRow.updated_at || null;

    const cloudProfile =
      cloudRow.save_data?.agentProfile || null;
    const cloudEndless =
      cloudRow.save_data?.careers?.endless || null;
    const cloudChallenge =
      cloudRow.save_data?.careers?.challenge || null;

    // Endless and Challenge are compared independently.
    // A confirmed reset is the one exception: keep the local Season 1 copy
    // long enough to sync that deliberate reset to the cloud.
    const intentionalResetMode =
      localStorage.getItem(CLOUD_INTENTIONAL_RESET_KEY);

    const bestEndless =
      intentionalResetMode === "endless" && localEndless
        ? localEndless
        : chooseCareerSave(
            localEndless,
            cloudEndless,
          );

    const bestChallenge =
      intentionalResetMode === "challenge" && localChallenge
        ? localChallenge
        : chooseCareerSave(
            localChallenge,
            cloudChallenge,
          );

    if (bestEndless) {
      localStorage.setItem(
        ENDLESS_GAME_STATE_STORAGE_KEY,
        JSON.stringify({
          ...bestEndless,
          careerMode: "endless",
        }),
      );
    }

    if (bestChallenge) {
      localStorage.setItem(
        CHALLENGE_GAME_STATE_STORAGE_KEY,
        JSON.stringify({
          ...bestChallenge,
          careerMode: "challenge",
        }),
      );
    }

    // On a genuinely new/reinstalled device there is no local profile,
    // so restore the profile from the connected account.
    if (!localProfile && cloudProfile) {
      localStorage.setItem(
        AGENT_PROFILE_STORAGE_KEY,
        JSON.stringify(cloudProfile),
      );
    }

    localStorage.setItem(CLOUD_LINKED_USER_KEY, user.id);
    cloudSyncReady = true;

    // Push the merged "furthest progress" result back to cloud.
    // careerMode is still null during startup, so uploadCloudSave()
    // safely uploads both stored careers without active-view checks.
    await uploadCloudSave();
  } catch (error) {
    cloudSyncReady = false;

    if (error instanceof CloudSaveConflictError) {
      console.warn("Cloud save conflict detected during startup.", error);
      void handleCloudSaveConflict();
    } else {
      console.warn("Cloud sync initialization failed.", error);
    }
  }
}

async function downloadCloudSave() {
  const user = await getCloudAuthUser();

  if (!user) {
    throw new Error("Please sign in with Google first.");
  }

  const { data, error } = await supabaseClient
    .from(CLOUD_SAVE_TABLE)
    .select("save_data, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data || null;
}

async function handleCloudSaveConflict() {
  if (cloudConflictHandling) {
    return;
  }

  cloudConflictHandling = true;
  cloudSyncReady = false;

  try {
    const shouldLoadCloud = await showGameDialog({
      eyebrow: "CLOUD SAVE",
      title: "Newer Save Found",
      message:
        "This career was updated on another device. To prevent either save from being overwritten, this device stopped syncing. Load the latest cloud save to continue safely.",
      confirmLabel: "LOAD LATEST",
      tone: "warning",
    });

    if (!shouldLoadCloud) {
      return;
    }

    const cloudRow = await downloadCloudSave();

    if (!cloudRow?.save_data) {
      throw new Error("The latest cloud save could not be found.");
    }

    // Keep the losing device's current local copy in the normal backup slot
    // before replacing it. This gives us one extra recovery layer if needed.
    if (careerMode) {
      const localRaw = localStorage.getItem(getGameStateStorageKey(careerMode));
      if (localRaw) {
        localStorage.setItem(getGameStateBackupKey(careerMode), localRaw);
      }
    }

    restoreCloudSavePayload(cloudRow.save_data);
    cloudLastKnownUpdatedAt = cloudRow.updated_at || null;

    // Reload so every runtime variable is rebuilt from the newly restored save.
    window.location.reload();
  } catch (error) {
    console.error("Could not resolve cloud save conflict.", error);

    await showGameDialog({
      eyebrow: "CLOUD SAVE",
      title: "Could Not Load Latest Save",
      message:
        error?.message ||
        "Cloud sync is paused on this device. Reload the game and try again.",
      confirmLabel: "CLOSE",
      tone: "warning",
    });
  } finally {
    cloudConflictHandling = false;
  }
}

function formatCloudSaveTime(value) {
  if (!value) return "No cloud backup yet";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Cloud backup available";
  }

  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const timeText = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today · ${timeText}`;
  }

  const dateText = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  return `${dateText} · ${timeText}`;
}

function showCloudSaveDialog() {
  return new Promise(async (resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "game-dialog-overlay";

    const modal = document.createElement("div");
    modal.className = "game-dialog-modal";
    modal.style.maxWidth = "520px";

    let user = null;
    let cloudRow = null;
    let loadError = null;

    try {
      user = await getCloudAuthUser();

      if (user) {
        cloudRow = await downloadCloudSave();
      }
    } catch (error) {
      loadError = error;
      console.warn("Could not load cloud save status.", error);
    }

    const email =
      user?.email ||
      user?.user_metadata?.email ||
      "Google account connected";

    modal.innerHTML = `
      <p class="game-dialog-eyebrow">CLOUD SAVE</p>
      <h2 class="game-dialog-title">
        ${user ? "Cloud Sync" : "Protect Your Career"}
      </h2>

      <p class="game-dialog-message">
        ${
          user
            ? `Signed in as <strong>${email}</strong>. Your career saves automatically on this device and in the cloud while this account is connected. Sign in with the same account on another device to continue.`
            : "Your career is currently stored only on this device. Connect Google to sync your progress and continue on another device."
        }
      </p>

      ${
        loadError
          ? `<p class="game-dialog-message" style="color:#b45309;">Cloud status could not be loaded. You can close this window and try again.</p>`
          : ""
      }

      ${
        user
          ? `
            <div class="game-dialog-stats">
              <div class="game-dialog-stat">
                <span>LAST CLOUD SAVE</span>
                <strong>${formatCloudSaveTime(cloudRow?.updated_at)}</strong>
                <small style="display:block; margin-top:6px; opacity:.62; font-weight:800; letter-spacing:.08em;">
                  AUTO SYNC ON
                </small>
              </div>
            </div>

            <div class="game-dialog-actions" style="flex-wrap:wrap;">
              <button
                class="game-dialog-button"
                type="button"
                data-cloud-action="signout"
              >
                SIGN OUT
              </button>

              <button
                class="game-dialog-button game-dialog-confirm"
                type="button"
                data-cloud-action="close"
              >
                CLOSE
              </button>
            </div>
          `
          : `
            <div class="game-dialog-actions">
              <button
                class="game-dialog-button game-dialog-confirm"
                type="button"
                data-cloud-action="google"
              >
                CONTINUE WITH GOOGLE
              </button>

              <button
                class="game-dialog-button game-dialog-cancel"
                type="button"
                data-cloud-action="close"
              >
                NOT NOW
              </button>
            </div>
          `
      }
    `;

    const close = () => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(true);
    };

    const setBusy = (busy) => {
      modal.querySelectorAll("button").forEach((button) => {
        button.disabled = busy;
      });
    };

    modal.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-cloud-action]");

      if (!button) return;

      const action = button.dataset.cloudAction;

      if (action === "close") {
        close();
        return;
      }

      if (action === "google") {
        setBusy(true);

        try {
          await signInWithGoogleForCloudSave();
        } catch (error) {
          console.error("Google sign-in failed.", error);
          setBusy(false);

          await showGameDialog({
            eyebrow: "CLOUD SAVE",
            title: "Google Sign-In Failed",
            message:
              error?.message ||
              "Could not start Google sign-in. Please try again.",
            confirmLabel: "CLOSE",
            tone: "warning",
          });
        }

        return;
      }

      if (action === "signout") {
        setBusy(true);

        try {
          await signOutCloudSave();
          close();

          await showGameDialog({
            eyebrow: "CLOUD SAVE",
            title: "Signed Out",
            message:
              "Your local career is still saved on this device. Cloud backup is disconnected until you sign in again.",
            confirmLabel: "DONE",
            tone: "default",
          });
        } catch (error) {
          console.error("Cloud sign-out failed.", error);
          setBusy(false);

          await showGameDialog({
            eyebrow: "CLOUD SAVE",
            title: "Sign-Out Failed",
            message:
              error?.message ||
              "Could not sign out of the cloud account.",
            confirmLabel: "CLOSE",
            tone: "warning",
          });
        }
      }
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  });
}
async function registerAnalyticsSession() {
  try {
    const { error } = await supabaseClient.rpc("register_player_session", {
      p_user_id: analyticsUserId,
      p_season: currentSeason,
    });

    if (error) {
      console.warn("Analytics session registration failed.", error);
      return;
    }
  } catch (error) {
    console.warn("Analytics session registration failed.", error);
  }
}
async function updateAnalyticsMaxSeason() {
  try {
    const { error } = await supabaseClient.rpc("update_player_max_season", {
      p_user_id: analyticsUserId,
      p_season: currentSeason,
    });

    if (error) {
      console.warn("Analytics season update failed.", error);
      return;
    }

  } catch (error) {
    console.warn("Analytics season update failed.", error);
  }
}
let analyticsActiveSeconds = 0;

setInterval(() => {
  if (!document.hidden) {
    analyticsActiveSeconds += 30;
  }
}, 30000);

async function flushAnalyticsPlaytime() {
  if (analyticsActiveSeconds <= 0) return;

  const secondsToSend = analyticsActiveSeconds;
  analyticsActiveSeconds = 0;

  try {
    const { error } = await supabaseClient.rpc("add_player_playtime", {
      p_user_id: analyticsUserId,
      p_seconds: secondsToSend,
    });

    if (error) {
      analyticsActiveSeconds += secondsToSend;
      console.warn("Analytics playtime update failed.", error);
      return;
    }

  } catch (error) {
    analyticsActiveSeconds += secondsToSend;
    console.warn("Analytics playtime update failed.", error);
  }
}
setInterval(() => {
  void flushAnalyticsPlaytime();
}, 120000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    void flushAnalyticsPlaytime();
  }
});

window.addEventListener("beforeunload", () => {
  void flushAnalyticsPlaytime();
});

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
let careerMode = null;

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

function updateGoatProfileDecoration() {
  if (!agentProfileButton) return;

  const active = Boolean(goatUnlocked || GOAT_PREVIEW);
  agentProfileButton.classList.toggle("goat-profile-unlocked", active);

  let decoration =
    agentProfileButton.querySelector(".goat-profile-decoration");

  if (!active) {
    decoration?.remove();
    return;
  }

  if (!decoration) {
    decoration = document.createElement("span");
    decoration.className = "goat-profile-decoration";
    decoration.setAttribute("aria-hidden", "true");
    decoration.innerHTML = `
      <span class="goat-profile-ornament">
        <span class="goat-profile-line goat-profile-line-left"></span>
        <span class="goat-profile-laurel goat-profile-laurel-left">❧</span>
        <span class="goat-profile-crown">♛</span>
        <span class="goat-profile-laurel goat-profile-laurel-right">❧</span>
        <span class="goat-profile-line goat-profile-line-right"></span>
      </span>
    `;
    agentProfileButton.appendChild(decoration);
  }
}

function renderAgentProfile() {
  if (!agentProfile) return;

  navAgentFlag.innerHTML = getAgentFlagImage(
    agentProfile.countryCode,
    "nav-agent-flag-image",
  );
  navAgentName.textContent = agentProfile.name;
  navAgentCountry.textContent = agentProfile.nationality;
  updateGoatProfileDecoration();
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

careerSetupForm.addEventListener("submit", async (event) => {
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

if (isNewCareerProfile) {
  resetRuntimeCareerState("endless");
  generateCandidates();
  saveGameState();
  showMainMenu();
  return;
}

showView("scout");
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
function showEndlessResetDialog() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "game-dialog-overlay";

    const modal = document.createElement("div");
    modal.className = "game-dialog-modal game-dialog-danger endless-reset-dialog";

    modal.innerHTML = `
      <p class="game-dialog-eyebrow">CAREER RESET</p>
      <h2 class="game-dialog-title">Reset Endless Career?</h2>
      <p class="game-dialog-message">
        This will permanently delete your Endless Career progress.
        Your 30-Season Challenge and agent profile will not be affected.
      </p>

      <label class="endless-reset-field">
        <span>TYPE <strong>FOOTBALL</strong> TO CONFIRM</span>
        <input
          class="endless-reset-input"
          type="text"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          placeholder="FOOTBALL"
        />
      </label>

      <div class="game-dialog-actions">
        <button
          class="game-dialog-button game-dialog-cancel"
          type="button"
        >
          KEEP PLAYING
        </button>
        <button
          class="game-dialog-button game-dialog-confirm"
          type="button"
          disabled
        >
          RESET CAREER
        </button>
      </div>
    `;

    const input = modal.querySelector(".endless-reset-input");
    const confirmButton = modal.querySelector(".game-dialog-confirm");
    const cancelButton = modal.querySelector(".game-dialog-cancel");

    const updateConfirmState = () => {
      confirmButton.disabled =
        input.value.trim().toUpperCase() !== "FOOTBALL";
    };

    const close = (result) => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(result);
    };

    input.addEventListener("input", updateConfirmState);

    confirmButton.addEventListener("click", () => {
      if (!confirmButton.disabled) {
        close(true);
      }
    });

    cancelButton.addEventListener("click", () => close(false));

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close(false);
      }
    });

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => input.focus());
  });
}

function showCareerModeDialog() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "game-dialog-overlay";

    const modal = document.createElement("div");
    modal.className = "game-dialog-modal";

    const endlessSave = getSavedCareerSummary("endless");
    const challengeSave = getSavedCareerSummary("challenge");

    modal.innerHTML = `
      <p class="game-dialog-eyebrow">CHOOSE YOUR CAREER</p>
      <h2 class="game-dialog-title">Select Career Mode</h2>

      <div class="career-mode-options">
        <button
          class="career-mode-card"
          type="button"
          data-mode="endless"
        >
          <strong>ENDLESS CAREER</strong>
          <span>
            Build your football agency with no season limit.
          </span>
          <small class="career-mode-status">
            ${
              endlessSave
                ? `CONTINUE · SEASON ${endlessSave.season}`
                : "START NEW CAREER"
            }
          </small>
        </button>

        <button
          class="career-mode-card"
          type="button"
          data-mode="challenge"
        >
          <strong>30-SEASON CHALLENGE</strong>
          <span>
            Build the greatest agency possible within 30 seasons.
          </span>
          <small class="career-mode-status">
            ${
              challengeSave
                ? `CONTINUE · SEASON ${challengeSave.season} / ${MAX_SEASONS}`
                : "START NEW CAREER"
            }
          </small>
        </button>
      </div>

      ${
        careerMode
          ? `
            <button
              id="career-menu-cloud-save"
              class="game-dialog-button"
              type="button"
              style="width:100%; margin-top:16px;"
            >
              CLOUD SAVE
            </button>
          `
          : ""
      }
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    modal
      .querySelectorAll(".career-mode-card")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const selectedMode = button.dataset.mode;

          overlay.remove();
          document.body.style.overflow = "";

          resolve(selectedMode);
        });
      });

    const cloudSaveButton =
      modal.querySelector("#career-menu-cloud-save");

    if (cloudSaveButton) {
      cloudSaveButton.addEventListener("click", async () => {
        await showCloudSaveDialog();

        if (document.body.contains(overlay)) {
          document.body.style.overflow = "hidden";
        }
      });
    }
  });
}

function resetRuntimeCareerState(mode) {
  careerMode = mode;
  currentSeason = 1;
  currentAgencyTierIndex = 0;
  agencyMoney = STARTING_MONEY;
  agencyReputation = 0;
  candidates = [];
  selectedIds = new Set();
  signedPlayers = [];
  signingsThisSeason = 0;
  completedClubContracts = 0;
  inboxMessages = [];
  activeClubOffers = null;
  rerollsUsed = 0;
  ballonDorHistory = [];
  recordTransfer = null;
  hiddenBadges = {};
  ovr99Milestones = {};
  goatUnlocked = false;
  goatRevealShown = false;
  goatRevealActive = false;
  goatPreviewShownSession = false;
  badgeUnlocksShown = {};
  badgeUnlockQueue = [];
  badgeUnlockRevealActive = false;
  badgeUnlockTrackingReady = true;
  updateGoatProfileDecoration();
}

function refreshCareerScreen() {
  seasonLabelElement.textContent =
    careerMode === "challenge"
      ? `SEASON ${currentSeason} / ${MAX_SEASONS}`
      : `SEASON ${currentSeason}`;

  if (candidates.length === 0) {
    generateCandidates();
  }

  clearInboxDetail();
  renderCandidates();
  renderSignedPlayers();
  updateInterface();
  showView("scout");
}

async function switchCareerMode(selectedMode) {
  if (careerMode) {
    saveGameState();
  }

  resetRuntimeCareerState(selectedMode);

  const hasSavedCareer = loadGameState(selectedMode);

  if (!hasSavedCareer) {
    generateCandidates();
    saveGameState();
  }

  refreshCareerScreen();

  return hasSavedCareer;
}

const tryAgainButton = document.createElement("button");

tryAgainButton.type = "button";
tryAgainButton.className = "try-again-button";
tryAgainButton.textContent = "Try Again";
tryAgainButton.title = "Restart the current career from Season 1";

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


function showHowToPlay() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "how-to-play-overlay";

    overlay.innerHTML = `
      <section class="how-to-play-panel" role="dialog" aria-modal="true" aria-labelledby="how-to-play-title">
        <div class="how-to-play-header">
          <div>
            <p class="how-to-play-eyebrow">HOW TO PLAY</p>
            <h2 id="how-to-play-title">Build Your Agency</h2>
            <p class="how-to-play-intro">
              Start small, guide player careers and grow into a legendary football agency.
            </p>
          </div>

          <button
            class="how-to-play-close"
            type="button"
            aria-label="Close How to Play"
          >
            ×
          </button>
        </div>

        <div class="how-to-play-steps">
          <article class="how-to-play-step">
            <span class="how-to-play-number">01</span>
            <div>
              <strong>SCOUT PLAYERS</strong>
              <p>
                Review new candidates each season and sign the players you want to represent.
              </p>
            </div>
          </article>

          <article class="how-to-play-step">
            <span class="how-to-play-number">02</span>
            <div>
              <strong>BUILD YOUR AGENCY</strong>
              <p>
                Earn money, complete club contracts and manage stronger players to unlock higher agency levels.
              </p>
            </div>
          </article>

          <article class="how-to-play-step">
            <span class="how-to-play-number">03</span>
            <div>
              <strong>MANAGE CAREERS</strong>
              <p>
                Handle transfer offers, contracts, retirements and important messages through your Inbox.
              </p>
            </div>
          </article>

          <article class="how-to-play-step">
            <span class="how-to-play-number">04</span>
            <div>
              <strong>BECOME LEGENDARY</strong>
              <p>
                Represent elite players, chase the Ballon d'Or and build the strongest agency you can.
              </p>
            </div>
          </article>
        </div>

        <div class="how-to-play-modes">
          <article class="how-to-play-mode how-to-play-mode-endless">
            <small>ENDLESS CAREER</small>
            <strong>No season limit</strong>
            <p>Keep building your agency for as long as you want.</p>
          </article>

          <article class="how-to-play-mode">
            <small>30-SEASON CHALLENGE</small>
            <strong>30 seasons</strong>
            <p>Build the greatest agency possible before the career ends.</p>
          </article>
        </div>

        <button class="how-to-play-confirm" type="button">
          GOT IT
        </button>
      </section>
    `;

    const close = () => {
      overlay.remove();
      document.body.style.overflow = "";
      resolve(true);
    };

    overlay
      .querySelector(".how-to-play-close")
      .addEventListener("click", close);

    overlay
      .querySelector(".how-to-play-confirm")
      .addEventListener("click", close);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
  });
}


function ensureMainMenu() {
  let menu = document.querySelector("#app-main-menu");

  if (menu) {
    return menu;
  }

  menu = document.createElement("div");
  menu.id = "app-main-menu";
  menu.className = "app-main-menu hidden";

  menu.innerHTML = `
    <div class="app-main-menu-card">
      <p class="app-main-menu-eyebrow">FOOTBALL MANAGEMENT SIM</p>
      <h1 class="app-main-menu-title">FOOTBALL<br />AGENT</h1>
      <p class="app-main-menu-description">
        Build your agency. Shape careers.
      </p>

      <button
        id="main-menu-play"
        class="app-main-menu-play"
        type="button"
      >
        PLAY
      </button>

      <div class="app-main-menu-secondary">
        <button id="main-menu-how" type="button">HOW TO PLAY</button>
        <button id="main-menu-settings" type="button">SETTINGS</button>
      </div>

      <div class="app-main-menu-profile">
        <span id="main-menu-agent-flag"></span>
        <div>
          <small>AGENT PROFILE</small>
          <strong id="main-menu-agent-name">—</strong>
          <span id="main-menu-agent-country">—</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(menu);

  menu
    .querySelector("#main-menu-play")
    .addEventListener("click", async () => {
      hideMainMenu();

      const selectedMode = await showCareerModeDialog();

      if (!selectedMode) {
        showMainMenu();
        return;
      }

      await switchCareerMode(selectedMode);
      void registerAnalyticsSession();
    });

  menu
    .querySelector("#main-menu-how")
    .addEventListener("click", () => {
      void showHowToPlay();
    });

  menu
    .querySelector("#main-menu-settings")
    .addEventListener("click", () => {
      void showCloudSaveDialog();
    });

  return menu;
}

function updateMainMenuProfile() {
  const menu = ensureMainMenu();

  const flag = menu.querySelector("#main-menu-agent-flag");
  const name = menu.querySelector("#main-menu-agent-name");
  const country = menu.querySelector("#main-menu-agent-country");

  if (!agentProfile) {
    flag.innerHTML = "";
    name.textContent = "New Agent";
    country.textContent = "Create your profile to begin";
    return;
  }

  flag.innerHTML = getAgentFlagImage(
  agentProfile.countryCode,
  "app-main-menu-flag-image",
);
  name.textContent = agentProfile.name || "Agent";
  country.textContent =
  agentProfile.nationality ||
  getNationalityName(agentProfile.countryCode);
}

function showMainMenu() {
  const menu = ensureMainMenu();
  updateMainMenuProfile();

  menu.classList.remove("hidden");
  document.body.classList.add("main-menu-open");
}

function hideMainMenu() {
  const menu = ensureMainMenu();

  menu.classList.add("hidden");
  document.body.classList.remove("main-menu-open");
}

const careerMenuButton = document.createElement("button");
careerMenuButton.type = "button";
careerMenuButton.className = "career-menu-button";
careerMenuButton.textContent = "Career Menu";
careerMenuButton.title = "Switch between your saved careers";

tryAgainButton.insertAdjacentElement(
  "afterend",
  careerMenuButton,
);

careerMenuButton.addEventListener("click", async () => {
  saveGameState();

  const selectedMode = await showCareerModeDialog();

  if (!selectedMode || selectedMode === careerMode) {
    return;
  }

  await switchCareerMode(selectedMode);
});

tryAgainButton.addEventListener("click", async () => {
  const confirmed =
    careerMode === "endless"
      ? await showEndlessResetDialog()
      : await showGameDialog({
          eyebrow: "CAREER RESET",
          title: "Start Over?",
          message:
            "Your current 30-Season Challenge progress will be permanently deleted and the game will return to Season 1.",
          confirmLabel: "START AGAIN",
          cancelLabel: "KEEP PLAYING",
          tone: "danger",
        });

  if (!confirmed) {
    return;
  }

  isResettingCareer = true;

  const resettingMode = careerMode;

  // This path runs only after the user confirms Try Again.
  // Endless additionally requires typing FOOTBALL.
  localStorage.setItem(
    CLOUD_INTENTIONAL_RESET_KEY,
    resettingMode,
  );

  localStorage.removeItem(
    getGameStateStorageKey(resettingMode),
  );

  resetRuntimeCareerState(resettingMode);
  generateCandidates();

  isResettingCareer = false;
  saveGameState();
  refreshCareerScreen();
});

let currentSeason = 1;
let currentAgencyTierIndex = 0;
let agencyMoney = STARTING_MONEY;
let agencyReputation = 0;

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
let recordTransfer = null;
let hiddenBadges = {};
let ovr99Milestones = {};
let goatUnlocked = false;
let goatRevealShown = false;
let goatRevealActive = false;
let goatPreviewShownSession = false;
let badgeUnlocksShown = {};
let badgeUnlockQueue = [];
let badgeUnlockRevealActive = false;
let badgeUnlockTrackingReady = true;

const GOAT_PREVIEW = false;
const BADGE_PREVIEW = false;
let badgePreviewShownSession = false;

function saveGameState({ skipCloudSync = false } = {}) {
  if (isResettingCareer || !careerMode) {
    return;
  }

  try {
    const storageKey =
      getGameStateStorageKey();

    const backupKey =
      getGameStateBackupKey();

    const previousRaw =
      localStorage.getItem(storageKey);

    const gameState = {
      version: 1,
      savedAt: new Date().toISOString(),
      careerMode,
      currentSeason,
      currentAgencyTierIndex,
      agencyMoney,
      agencyReputation,
      candidates,
      selectedIds: [...selectedIds],
      signedPlayers,
      signingsThisSeason,
      completedClubContracts,
      inboxMessages,
      activeClubOffers,
      rerollsUsed,
      ballonDorHistory,
      recordTransfer,
      hiddenBadges,
      ovr99Milestones,
      goatUnlocked,
      goatRevealShown,
      badgeUnlocksShown,
      badgeUnlockTrackingReady,
    };

    // 기존 정상 세이브를 먼저 백업
    if (previousRaw) {
      try {
        const previousState =
          JSON.parse(previousRaw);

        const previousSeason =
          Number(previousState?.currentSeason) || 1;

        const newSeason =
          Number(gameState.currentSeason) || 1;

        /*
         * 실수로 Season 1 상태가 높은 시즌 데이터를
         * 덮으려는 상황에서는 기존 세이브를 백업한다.
         */
        if (
          previousState?.version === 1 &&
          previousSeason > newSeason
        ) {
          localStorage.setItem(
            backupKey,
            previousRaw,
          );

          console.warn(
            `Career rollback detected. Season ${previousSeason} backed up before saving Season ${newSeason}.`,
          );
        } else {
          // 정상적인 저장도 직전 상태를 백업으로 유지
          localStorage.setItem(
            backupKey,
            previousRaw,
          );
        }
      } catch (error) {
        console.warn(
          "Could not create career backup.",
          error,
        );
      }
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(gameState),
    );

    if (!skipCloudSync) {
      queueCloudAutoSync();
    }
  } catch (error) {
    console.warn(
      "Could not save game progress.",
      error,
    );
  }
}

function loadGameState(mode = careerMode) {
  try {
    const savedState = JSON.parse(
      localStorage.getItem(getGameStateStorageKey(mode)),
    );

    if (!savedState || savedState.version !== 1) {
      return false;
    }

    careerMode =
      mode === "challenge" ? "challenge" : "endless";

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
    agencyReputation = Number.isFinite(savedState.agencyReputation)
      ? savedState.agencyReputation
      : 0;
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
            message.type === "retirement" ||
            message.type === "agency-event",
        )
      : [];
    activeClubOffers = savedState.activeClubOffers || null;
    rerollsUsed = Number(savedState.rerollsUsed) || 0;
    ballonDorHistory = Array.isArray(savedState.ballonDorHistory)
      ? savedState.ballonDorHistory
      : [];
    recordTransfer =
      savedState.recordTransfer &&
      savedState.recordTransfer.recordType === "paid-transfer" &&
      Number.isFinite(savedState.recordTransfer.transferFee) &&
      savedState.recordTransfer.transferFee > 0
        ? savedState.recordTransfer
        : null;
    hiddenBadges =
      savedState.hiddenBadges && typeof savedState.hiddenBadges === "object"
        ? savedState.hiddenBadges
        : {};

    ovr99Milestones =
      savedState.ovr99Milestones &&
      typeof savedState.ovr99Milestones === "object"
        ? savedState.ovr99Milestones
        : {};

    // Backward-compatible migration for careers created before
    // permanent 99 OVR milestone ownership was stored separately.
    const loadedCurrent99 = signedPlayers.filter(
      (player) => Number(player.overall) === 99,
    ).length;

    [1, 5, 10, 15].forEach((count) => {
      if (
        savedState.badgeUnlocksShown?.[`ovr99:${count}`] ||
        loadedCurrent99 >= count
      ) {
        ovr99Milestones[count] = true;
      }
    });

    goatUnlocked = Boolean(savedState.goatUnlocked);
    goatRevealShown = Boolean(savedState.goatRevealShown);
    badgeUnlocksShown =
      savedState.badgeUnlocksShown &&
      typeof savedState.badgeUnlocksShown === "object"
        ? savedState.badgeUnlocksShown
        : {};
    badgeUnlockTrackingReady =
      savedState.badgeUnlockTrackingReady === true ||
      Boolean(savedState.badgeUnlocksShown);

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

function ensureReputationDisplay() {
  let reputationBar = document.querySelector("#nav-reputation");

  if (reputationBar) {
    return reputationBar;
  }

  const navInner = document.querySelector(".nav-inner");
  const navBrandWrap = document.querySelector(".nav-brand-wrap");

  if (!navInner || !navBrandWrap) {
    return null;
  }

  reputationBar = document.createElement("div");
  reputationBar.id = "nav-reputation";
  reputationBar.className = "nav-reputation";
  reputationBar.innerHTML = `
    <span>REPUTATION</span>
    <strong id="nav-reputation-value">0</strong>
  `;

  navBrandWrap.insertAdjacentElement("afterend", reputationBar);

  return reputationBar;
}

function renderReputation() {
  const existingReputationBar =
    document.querySelector("#nav-reputation");

  if (careerMode !== "endless") {
    existingReputationBar?.remove();
    return;
  }

  const reputationBar = ensureReputationDisplay();

  if (!reputationBar) {
    return;
  }

  const valueElement =
    reputationBar.querySelector("#nav-reputation-value");

  if (valueElement) {
    valueElement.textContent = Math.max(
      0,
      Math.floor(Number(agencyReputation) || 0),
    ).toLocaleString();
  }
}

function ensureLegacyInterface() {
  const existingLegacyButton =
    document.querySelector("#legacy-button");

  if (careerMode !== "endless") {
    existingLegacyButton?.remove();

    const actionWrap =
      agencyView?.querySelector(".agency-page-header-actions");

    if (actionWrap) {
      const agencyHeader =
        agencyView?.querySelector(".agency-page-header");
      const agencySummary =
        actionWrap.querySelector(".agency-page-summary");

      if (agencyHeader && agencySummary) {
        agencyHeader.appendChild(agencySummary);
      }

      actionWrap.remove();
    }

    closeLegacyOverlay();
    return null;
  }

  let legacyButton = existingLegacyButton;

  if (!legacyButton) {
    const agencyHeader =
      agencyView?.querySelector(".agency-page-header");
    const agencySummary =
      agencyHeader?.querySelector(".agency-page-summary");

    if (agencyHeader && agencySummary) {
      let actionWrap =
        agencyHeader.querySelector(".agency-page-header-actions");

      if (!actionWrap) {
        actionWrap = document.createElement("div");
        actionWrap.className = "agency-page-header-actions";

        agencySummary.insertAdjacentElement(
          "beforebegin",
          actionWrap,
        );
        actionWrap.appendChild(agencySummary);
      }

      legacyButton = document.createElement("button");
      legacyButton.id = "legacy-button";
      legacyButton.className = "legacy-button";
      legacyButton.type = "button";
      legacyButton.innerHTML = `
        <span>LEGACY</span>
        <strong>View Career Legacy →</strong>
      `;

      actionWrap.appendChild(legacyButton);
    }
  }

  if (
    legacyButton &&
    !legacyButton.dataset.legacyBound
  ) {
    legacyButton.dataset.legacyBound = "true";
    legacyButton.addEventListener("click", () => {
      openLegacyHub();
    });
  }

  return legacyButton;
}

function ensureLegacyOverlay() {
  let overlay = document.querySelector("#legacy-overlay");

  if (overlay) {
    return overlay;
  }

  overlay = document.createElement("div");
  overlay.id = "legacy-overlay";
  overlay.className = "legacy-overlay hidden";

  overlay.innerHTML = `
    <section
      class="legacy-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legacy-title"
    >
      <div class="legacy-topbar">
        <button
          class="legacy-close"
          type="button"
          aria-label="Close Legacy"
        >
          ×
        </button>

        <div>
          <p class="legacy-eyebrow">YOUR CAREER</p>
          <h2 id="legacy-title">Legacy</h2>
        </div>

      </div>

      <div id="legacy-content" class="legacy-content"></div>
    </section>
  `;

  document.body.appendChild(overlay);

  overlay
    .querySelector(".legacy-close")
    .addEventListener("click", closeLegacyOverlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLegacyOverlay();
    }
  });

  return overlay;
}

function openLegacyHub() {
  if (careerMode !== "endless") {
    return;
  }

  const overlay = ensureLegacyOverlay();
  const content = overlay.querySelector("#legacy-content");
  content.innerHTML = `
    <div class="legacy-hub-copy">
      <p>
        Track the achievements and records that define your career.
      </p>
    </div>

    <div class="legacy-option-grid">
      <button
        class="legacy-option-card"
        type="button"
        data-legacy-page="milestones"
      >
        <span class="legacy-option-icon">🏆</span>
        <small>ACHIEVEMENTS</small>
        <strong>MILESTONES</strong>
        <p>View the major goals you have reached during your career.</p>
        <span class="legacy-option-arrow">OPEN →</span>
      </button>

      <button
        class="legacy-option-card"
        type="button"
        data-legacy-page="records"
      >
        <span class="legacy-option-icon">📊</span>
        <small>CAREER HISTORY</small>
        <strong>CAREER RECORDS</strong>
        <p>Review the biggest numbers and moments from your agency.</p>
        <span class="legacy-option-arrow">OPEN →</span>
      </button>
    </div>
  `;

  content
    .querySelector('[data-legacy-page="milestones"]')
    .addEventListener("click", () => {
      openLegacySection("milestones");
    });

  content
    .querySelector('[data-legacy-page="records"]')
    .addEventListener("click", () => {
      openLegacySection("records");
    });

  overlay.classList.remove("hidden");
  document.body.classList.add("legacy-open");
}

function getBallonDorCareerRecords() {
  const recordsByPlayer = new Map();

  ballonDorHistory.forEach((entry) => {
    const key =
      entry.playerId ||
      `${entry.playerName || "Unknown"}-${entry.country || ""}`;

    if (!recordsByPlayer.has(key)) {
      const currentPlayer = signedPlayers.find(
        (player) => player.id === entry.playerId,
      );

      recordsByPlayer.set(key, {
        playerId: entry.playerId || key,
        playerName: entry.playerName || "Unknown Player",
        country: entry.country || currentPlayer?.country || "",
        seasons: [],
      });
    }

    const record = recordsByPlayer.get(key);

    if (!record.country && entry.country) {
      record.country = entry.country;
    }

    const season = Number(entry.season);

    if (
      Number.isFinite(season) &&
      !record.seasons.includes(season)
    ) {
      record.seasons.push(season);
    }
  });

  return [...recordsByPlayer.values()]
    .map((record) => ({
      ...record,
      seasons: record.seasons.sort((a, b) => a - b),
      wins: record.seasons.length,
    }))
    .sort(
      (a, b) =>
        b.wins - a.wins ||
        (b.seasons.at(-1) || 0) - (a.seasons.at(-1) || 0),
    );
}

const BALLON_DOR_RECORDS_PER_PAGE = 5;

function renderCareerRecords(page = 1) {
  const ballonDorRecords = getBallonDorCareerRecords();
  const totalPages = Math.max(
    1,
    Math.ceil(ballonDorRecords.length / BALLON_DOR_RECORDS_PER_PAGE),
  );
  const safePage = Math.min(
    Math.max(Number(page) || 1, 1),
    totalPages,
  );
  const startIndex =
    (safePage - 1) * BALLON_DOR_RECORDS_PER_PAGE;
  const visibleRecords = ballonDorRecords.slice(
    startIndex,
    startIndex + BALLON_DOR_RECORDS_PER_PAGE,
  );

  const ballonDorMarkup =
    ballonDorRecords.length > 0
      ? visibleRecords
          .map(
            (record) => `
              <div class="career-record-winner">
                <span class="career-record-player">
                  ${
                    record.country
                      ? getCountryFlag(record.country)
                      : '<span class="career-record-flag-fallback">🌍</span>'
                  }
                  <strong>${record.playerName}</strong>
                </span>

                <span class="career-record-trophy">
                  🏆 ${record.wins}
                </span>
              </div>
            `,
          )
          .join("")
      : `
          <div class="career-record-empty">
            No Ballon d'Or winners yet.
          </div>
        `;

  const paginationMarkup =
    ballonDorRecords.length > BALLON_DOR_RECORDS_PER_PAGE
      ? `
          <div class="career-record-pagination" aria-label="Ballon d'Or winner pages">
            <button
              class="career-record-page-button"
              type="button"
              data-record-page="${safePage - 1}"
              aria-label="Previous page"
              ${safePage === 1 ? "disabled" : ""}
            >
              ←
            </button>

            <strong class="career-record-page-number">
              ${safePage}
            </strong>

            <button
              class="career-record-page-button"
              type="button"
              data-record-page="${safePage + 1}"
              aria-label="Next page"
              ${safePage === totalPages ? "disabled" : ""}
            >
              →
            </button>
          </div>
        `
      : "";

  const transferMarkup = recordTransfer
    ? `
        <div class="record-transfer-card record-transfer-card-simple">
          <div class="record-transfer-player">
            ${
              recordTransfer.country
                ? getCountryFlag(recordTransfer.country)
                : '<span class="career-record-flag-fallback">🌍</span>'
            }
            <strong>${recordTransfer.playerName}</strong>
          </div>

          <strong class="record-transfer-fee">
            ${formatMarketValue(recordTransfer.transferFee)}
          </strong>
        </div>
      `
    : `
        <div class="career-record-empty">
          No completed transfer has set a record yet.
        </div>
      `;

  return `
    <div class="career-records-page">
      <section class="career-record-block">
        <div class="career-record-heading">
          <div>
            <p class="legacy-eyebrow">AWARDS</p>
            <h3>BALLON D'OR WINNERS</h3>
          </div>
          <span>${ballonDorRecords.length} PLAYER${ballonDorRecords.length === 1 ? "" : "S"}</span>
        </div>

        <div class="career-record-winner-list">
          ${ballonDorMarkup}
        </div>

        ${paginationMarkup}
      </section>

      <section class="career-record-block">
        <div class="career-record-heading">
          <div>
            <p class="legacy-eyebrow">TRANSFER HISTORY</p>
            <h3>RECORD TRANSFER</h3>
          </div>
        </div>

        ${transferMarkup}
      </section>
    </div>
  `;
}
const milestoneTierClasses = [
  "bronze",
  "silver",
  "gold",
  "elite",
  "legendary",
  "platinum",
];

const milestoneGroups = [
  {
    key: "seasons",
    label: "SEASONS",
    icon: "◷",
    thresholds: [50, 100, 250, 500, 750, 1000],
    getValue: () => currentSeason,
    format: (value) => value.toLocaleString(),
  },
  {
    key: "reputation",
    label: "REPUTATION",
    icon: "★",
    thresholds: [50, 100, 250, 500, 750, 1000],
    getValue: () => Math.max(0, Math.floor(Number(agencyReputation) || 0)),
    format: (value) => value.toLocaleString(),
  },
  {
    key: "funds",
    label: "FUNDS",
    icon: "€",
    thresholds: [
      100_000_000,
      250_000_000,
      500_000_000,
      1_000_000_000,
      5_000_000_000,
      10_000_000_000,
    ],
    getValue: () => agencyMoney,
    format: (value) => formatMarketValue(value),
  },
];

function renderMilestoneGroup(group) {
  const currentValue = group.getValue();

  const badges = group.thresholds
    .map((threshold, index) => {
      const unlocked = currentValue >= threshold;
      const tierClass = milestoneTierClasses[index];

      return `
        <div class="milestone-badge-item ${unlocked ? "unlocked" : "locked"}">
          <div class="milestone-medal ${tierClass}">
            <span class="milestone-medal-icon milestone-icon-${group.key}">
              ${unlocked ? group.icon : "🔒"}
            </span>
          </div>

          <strong>${group.format(threshold)}</strong>

          <span>
            ${unlocked ? "COMPLETED" : "LOCKED"}
          </span>
        </div>
      `;
    })
    .join("");

  return `
    <section class="milestone-block">
      <div class="milestone-heading">
        <div>
          <p class="legacy-eyebrow">CAREER MILESTONE</p>
          <h3>${group.label}</h3>
        </div>

        <strong>${group.format(currentValue)}</strong>
      </div>

      <div class="milestone-badge-grid">
        ${badges}
      </div>
    </section>
  `;
}


const HIDDEN_BADGE_PREVIEW = false;

const hiddenBadgeDefinitions = [
  {
    key: "ballon10",
    name: "DYNASTY",
    description: "One player wins the Ballon d'Or 10 times.",
    getProgress: () => {
      const record = getBallonDorCareerRecords().find((entry) => entry.wins >= 10);
      return record
        ? { unlocked: true, icon: "🏆", detail: record.playerName }
        : { unlocked: false };
    },
  },
  {
    key: "worldXI",
    name: "GLOBAL",
    description: "Manage 15 players with 15 different nationalities.",
    getProgress: () => {
      if (signedPlayers.length < 15) return { unlocked: false };
      const countries = signedPlayers.slice(0, 15).map((player) => player.country).filter(Boolean);
      return {
        unlocked: countries.length === 15 && new Set(countries).size === 15,
        icon: "🌐",
        detail: "15 NATIONALITIES",
      };
    },
  },
  {
    key: "oneNation",
    name: "ONE NATION",
    description: "Manage 15 players from the same nationality.",
    getProgress: () => {
      if (signedPlayers.length < 15) return { unlocked: false };
      const countries = signedPlayers.slice(0, 15).map((player) => player.country).filter(Boolean);
      const country = countries[0];
      return {
        unlocked: countries.length === 15 && countries.every((value) => value === country),
        country,
        detail: country || "",
      };
    },
  },
  {
    key: "specialist",
    name: "SPECIALIST",
    description: "Manage 15 players in the same position.",
    getProgress: () => {
      if (signedPlayers.length < 15) return { unlocked: false };
      const playerPositions = signedPlayers.slice(0, 15).map((player) => player.position).filter(Boolean);
      const position = playerPositions[0];
      return {
        unlocked: playerPositions.length === 15 && playerPositions.every((value) => value === position),
        icon: position || "POS",
        detail: position || "",
      };
    },
  },
  {
    key: "network",
    name: "THE NETWORK",
    description: "Manage 15 players from 15 different clubs.",
    getProgress: () => {
      if (signedPlayers.length < 15) return { unlocked: false };
      const playerClubs = signedPlayers.slice(0, 15).map((player) => player.club).filter(Boolean);
      return {
        unlocked: playerClubs.length === 15 && new Set(playerClubs).size === 15,
        icon: "🤝",
        detail: "15 CLUBS",
      };
    },
  },
];

function refreshHiddenBadges() {
  let changed = false;

  hiddenBadgeDefinitions.forEach((badge) => {
    if (hiddenBadges[badge.key]?.unlocked) return;

    const progress = badge.getProgress();
    if (!progress.unlocked) return;

    hiddenBadges[badge.key] = {
      unlocked: true,
      unlockedSeason: currentSeason,
      icon: progress.icon || "",
      country: progress.country || "",
      detail: progress.detail || "",
    };
    changed = true;
  });

  if (changed) saveGameState();
}

function renderHiddenBadgeIcon(badge, savedBadge, preview = false) {
  if (!savedBadge?.unlocked && !preview) return "?";

  if (badge.key === "oneNation") {
    const country = savedBadge?.country || signedPlayers[0]?.country;
    return country ? getCountryFlag(country) : "⚑";
  }

  if (badge.key === "specialist") {
    return savedBadge?.icon || signedPlayers[0]?.position || "CM";
  }

  return savedBadge?.icon || badge.getProgress().icon ||
    (badge.key === "ballon10" ? "🏆" : badge.key === "worldXI" ? "🌐" : "🤝");
}

function renderHiddenBadges() {
  refreshHiddenBadges();

  const unlockedCount = hiddenBadgeDefinitions.filter(
    (badge) => hiddenBadges[badge.key]?.unlocked,
  ).length;

  return `
    <section class="milestone-block hidden-badge-block">
      <div class="milestone-heading">
        <div>
          <p class="legacy-eyebrow">SECRET ACHIEVEMENTS</p>
          <h3>HIDDEN BADGES</h3>
        </div>
        <strong>${unlockedCount} / ${hiddenBadgeDefinitions.length}</strong>
      </div>

      <div class="hidden-badge-grid">
        ${hiddenBadgeDefinitions.map((badge) => {
          const savedBadge = hiddenBadges[badge.key];
          const preview = HIDDEN_BADGE_PREVIEW && !savedBadge?.unlocked;
          const visible = Boolean(savedBadge?.unlocked || preview);
          const icon = renderHiddenBadgeIcon(badge, savedBadge, preview);
          const detail = savedBadge?.detail || (preview ? badge.getProgress().detail : "");

          return `
            <article class="hidden-badge-card ${visible ? "unlocked" : "locked"}">
              <div class="hidden-badge-medal hidden-badge-${badge.key}">
                <span class="hidden-badge-icon">${icon}</span>
              </div>
              <strong>${visible ? badge.name : "???"}</strong>
              <span>${visible ? (detail || "UNLOCKED") : "LOCKED"}</span>
              <p>${visible ? badge.description : "Complete a secret career objective to reveal this badge."}</p>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderMilestones() {
  return `
    <div class="milestones-page">
      ${milestoneGroups.map(renderMilestoneGroup).join("")}

      <section class="milestone-block milestone-ovr-preview">
        <div class="milestone-heading">
          <div>
            <p class="legacy-eyebrow">ELITE COLLECTION</p>
            <h3>99 OVR PLAYERS</h3>
          </div>

          <strong>
            ${signedPlayers.filter((player) => player.overall === 99).length} / 15
          </strong>
        </div>

        <div class="milestone-badge-grid milestone-badge-grid-four">
          ${[
            { count: 1, tier: "gold" },
            { count: 5, tier: "elite" },
            { count: 10, tier: "legendary" },
            { count: 15, tier: "platinum" },
          ]
            .map(({ count, tier }) => {
              const current99 = signedPlayers.filter(
                (player) => player.overall === 99,
              ).length;

              const unlocked =
                Boolean(ovr99Milestones[count]) ||
                current99 >= count;

              return `
                <div class="milestone-badge-item ${unlocked ? "unlocked" : "locked"}">
                  <div class="milestone-medal ${tier}">
                    <span class="milestone-medal-icon">
                      ${unlocked ? "99" : "🔒"}
                    </span>
                  </div>

                  <strong>${count} PLAYER${count === 1 ? "" : "S"}</strong>

                  <span>
                    ${
                      unlocked
                        ? count === 15
                          ? "PERFECTION"
                          : "COMPLETED"
                        : "LOCKED"
                    }
                  </span>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>

      ${renderHiddenBadges()}
    </div>
  `;
}


const ovr99BadgeDefinitions = [
  { count: 1, tier: "gold" },
  { count: 5, tier: "elite" },
  { count: 10, tier: "legendary" },
  { count: 15, tier: "platinum" },
];

function getAllCurrentlyUnlockedBadgeKeys() {
  const keys = [];

  milestoneGroups.forEach((group) => {
    const value = group.getValue();

    group.thresholds.forEach((threshold) => {
      if (value >= threshold) {
        keys.push(`milestone:${group.key}:${threshold}`);
      }
    });
  });

  const current99 = signedPlayers.filter(
    (player) => Number(player.overall) === 99,
  ).length;

  ovr99BadgeDefinitions.forEach(({ count }) => {
    if (ovr99Milestones[count] || current99 >= count) {
      keys.push(`ovr99:${count}`);
    }
  });

  hiddenBadgeDefinitions.forEach((badge) => {
    if (hiddenBadges[badge.key]?.unlocked) {
      keys.push(`hidden:${badge.key}`);
    }
  });

  return keys;
}

function getMilestoneUnlockPayload(group, threshold, index) {
  return {
    key: `milestone:${group.key}:${threshold}`,
    type: "milestone",
    eyebrow: "MILESTONE UNLOCKED",
    title:
      group.key === "seasons"
        ? `${group.format(threshold)} SEASONS`
        : group.key === "reputation"
          ? `${group.format(threshold)} REPUTATION`
          : `${group.format(threshold)} FUNDS`,
    icon: group.icon,
    iconClass: group.key,
    tier: milestoneTierClasses[index],
  };
}

function getOvr99UnlockPayload(count, tier) {
  return {
    key: `ovr99:${count}`,
    type: "milestone",
    eyebrow: "MILESTONE UNLOCKED",
    title:
      count === 15
        ? "PERFECTION"
        : count === 1
          ? "99 OVR PLAYER"
          : `${count} 99 OVR PLAYERS`,
    subtitle:
      count === 15
        ? "15 / 15 PLAYERS · 99 OVR"
        : count === 1
          ? ""
          : `${count} PLAYERS`,
    icon: "99",
    tier,
  };
}

function getHiddenUnlockPayload(badge) {
  const savedBadge = hiddenBadges[badge.key] || {};

  let icon = savedBadge.icon || badge.getProgress().icon || "?";

  if (badge.key === "oneNation") {
    const country = savedBadge.country || signedPlayers[0]?.country;
    icon = country ? getCountryFlag(country) : "⚑";
  }

  if (badge.key === "specialist") {
    icon = savedBadge.icon || signedPlayers[0]?.position || "CM";
  }

  return {
    key: `hidden:${badge.key}`,
    type: "hidden",
    eyebrow: "SECRET BADGE DISCOVERED",
    title: badge.name,
    subtitle: savedBadge.detail || badge.description,
    icon,
    tier: "hidden-tier",
  };
}

function collectNewBadgeUnlocks() {
  if (!badgeUnlockTrackingReady) {
    const current99 = signedPlayers.filter(
      (player) => Number(player.overall) === 99,
    ).length;

    ovr99BadgeDefinitions.forEach(({ count }) => {
      if (current99 >= count) {
        ovr99Milestones[count] = true;
      }
    });

    getAllCurrentlyUnlockedBadgeKeys().forEach((key) => {
      badgeUnlocksShown[key] = true;
    });

    badgeUnlockTrackingReady = true;
    saveGameState();
    return;
  }

  const newUnlocks = [];
  let foundNewBadge = true;

  while (foundNewBadge) {
    foundNewBadge = false;

    milestoneGroups.forEach((group) => {
      const value = group.getValue();

      group.thresholds.forEach((threshold, index) => {
        if (value < threshold) return;

        const payload = getMilestoneUnlockPayload(
          group,
          threshold,
          index,
        );

        if (badgeUnlocksShown[payload.key]) return;

        badgeUnlocksShown[payload.key] = true;
        newUnlocks.push(payload);
        agencyReputation += 10;
        foundNewBadge = true;
      });
    });

    const current99 = signedPlayers.filter(
      (player) => Number(player.overall) === 99,
    ).length;

    ovr99BadgeDefinitions.forEach(({ count, tier }) => {
      if (current99 < count) return;

      if (!ovr99Milestones[count]) {
        ovr99Milestones[count] = true;
      }

      const payload = getOvr99UnlockPayload(count, tier);

      if (badgeUnlocksShown[payload.key]) return;

      badgeUnlocksShown[payload.key] = true;
      newUnlocks.push(payload);
      agencyReputation += 10;
      foundNewBadge = true;
    });

    hiddenBadgeDefinitions.forEach((badge) => {
      if (!hiddenBadges[badge.key]?.unlocked) return;

      const payload = getHiddenUnlockPayload(badge);

      if (badgeUnlocksShown[payload.key]) return;

      badgeUnlocksShown[payload.key] = true;
      newUnlocks.push(payload);
      agencyReputation += 10;
      foundNewBadge = true;
    });
  }

  if (newUnlocks.length === 0) return;

  badgeUnlockQueue.push(...newUnlocks);

  // Reputation changes immediately with the badge reward.
  renderReputation();
  saveGameState();
  processBadgeUnlockQueue();
}

function closeBadgeUnlockReveal(overlay) {
  if (!overlay) return;

  overlay.classList.add("is-closing");

  setTimeout(() => {
    overlay.remove();
    document.body.classList.remove("badge-unlock-open");
    document.body.style.overflow = "";
    badgeUnlockRevealActive = false;

    if (badgeUnlockQueue.length > 0) {
      setTimeout(processBadgeUnlockQueue, 160);
    } else {
      refreshGoatStatus();
    }
  }, 280);
}

function showBadgeUnlockReveal(unlock) {
  badgeUnlockRevealActive = true;

  const overlay = document.createElement("div");
  overlay.className =
    `badge-unlock-overlay badge-unlock-${unlock.type}`;

  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute(
    "aria-label",
    `${unlock.eyebrow}: ${unlock.title}`,
  );

  const hiddenIntro =
    unlock.type === "hidden"
      ? `
        <div class="badge-unlock-secret-shell">
          <span>?</span>
        </div>
      `
      : "";

  overlay.innerHTML = `
    <div class="badge-unlock-stage">
      ${hiddenIntro}

      <div class="badge-unlock-medal-wrap">
        <div class="milestone-medal ${unlock.tier}">
          <span class="milestone-medal-icon${
            unlock.iconClass ? ` milestone-icon-${unlock.iconClass}` : ""
          }">
            ${unlock.icon}
          </span>
        </div>
      </div>

      <div class="badge-unlock-copy">
        <p class="badge-unlock-eyebrow">${unlock.eyebrow}</p>
        <h2>${unlock.title}</h2>
        ${
          unlock.subtitle
            ? `<p class="badge-unlock-subtitle">${unlock.subtitle}</p>`
            : ""
        }
        <button class="badge-unlock-continue" type="button">
          CONTINUE
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("badge-unlock-open");
  document.body.style.overflow = "hidden";

  const continueButton =
    overlay.querySelector(".badge-unlock-continue");

  continueButton.addEventListener("click", () => {
    closeBadgeUnlockReveal(overlay);
  });

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
  });

  if (unlock.type === "hidden") {
    setTimeout(() => {
      overlay.classList.add("is-revealed");
    }, 620);
  } else {
    setTimeout(() => {
      overlay.classList.add("is-revealed");
    }, 180);
  }

  setTimeout(() => {
    overlay.classList.add("is-finished");
    continueButton.focus();
  }, unlock.type === "hidden" ? 1250 : 850);
}

function processBadgeUnlockQueue() {
  if (
    badgeUnlockRevealActive ||
    goatRevealActive ||
    badgeUnlockQueue.length === 0
  ) {
    return;
  }

  const nextUnlock = badgeUnlockQueue.shift();
  showBadgeUnlockReveal(nextUnlock);
}


function runBadgePreview() {
  if (
    !BADGE_PREVIEW ||
    badgePreviewShownSession ||
    badgeUnlockRevealActive ||
    goatRevealActive
  ) {
    return;
  }

  badgePreviewShownSession = true;

  // Preview only: does not change career progress or saved badge ownership.
  badgeUnlockQueue.push(
    {
      key: "preview:season",
      type: "milestone",
      eyebrow: "MILESTONE UNLOCKED",
      title: "50 SEASONS",
      icon: "◷",
      iconClass: "seasons",
      tier: "bronze",
    },
    {
      key: "preview:reputation",
      type: "milestone",
      eyebrow: "MILESTONE UNLOCKED",
      title: "250 REPUTATION",
      icon: "★",
      tier: "gold",
    },
    {
      key: "preview:funds",
      type: "milestone",
      eyebrow: "MILESTONE UNLOCKED",
      title: "€1B FUNDS",
      icon: "€",
      tier: "elite",
    },
    {
      key: "preview:perfection",
      type: "milestone",
      eyebrow: "MILESTONE UNLOCKED",
      title: "PERFECTION",
      subtitle: "15 / 15 PLAYERS · 99 OVR",
      icon: "99",
      tier: "platinum",
    },
    {
      key: "preview:hidden",
      type: "hidden",
      eyebrow: "SECRET BADGE DISCOVERED",
      title: "GLOBAL",
      subtitle: "Manage 15 players with 15 different nationalities.",
      icon: "🌐",
      tier: "hidden-tier",
    },
  );

  setTimeout(processBadgeUnlockQueue, 120);
}

function refreshBadgeUnlocks() {
  collectNewBadgeUnlocks();
  runBadgePreview();
}

function hasGoatRequirements() {
  const perfection =
    signedPlayers.length === 15 &&
    signedPlayers.every((player) => Number(player.overall) === 99);

  return (
    currentSeason >= 1000 &&
    agencyReputation >= 1000 &&
    agencyMoney >= 10_000_000_000 &&
    perfection
  );
}

function closeGoatReveal(overlay, preview = false) {
  if (!overlay) return;

  overlay.classList.add("is-closing");

  setTimeout(() => {
    overlay.remove();
    document.body.classList.remove("goat-reveal-open");
    document.body.style.overflow = "";
    goatRevealActive = false;

    if (!preview) {
      goatRevealShown = true;
      saveGameState();
    }

    updateGoatProfileDecoration();
  }, 320);
}

function showGoatReveal(preview = false) {
  if (goatRevealActive) return;

  goatRevealActive = true;

  const overlay = document.createElement("div");
  overlay.className = "goat-reveal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Greatest of all time achievement");

  overlay.innerHTML = `
    <div class="goat-reveal-stage">
      <div class="goat-final-badges" aria-hidden="true">
        <div class="goat-final-badge goat-final-seasons">◷</div>
        <div class="goat-final-badge goat-final-reputation">★</div>
        <div class="goat-final-badge goat-final-funds">€</div>
        <div class="goat-final-badge goat-final-perfection">99</div>
      </div>

      <div class="goat-crown-reveal" aria-hidden="true">♛</div>

      <div class="goat-reveal-copy">
        <p>YOU ARE THE GREATEST OF ALL TIME.</p>
        <button class="goat-reveal-continue" type="button">
          CONTINUE
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("goat-reveal-open");
  document.body.style.overflow = "hidden";

  const continueButton =
    overlay.querySelector(".goat-reveal-continue");

  continueButton.addEventListener("click", () => {
    closeGoatReveal(overlay, preview);
  });

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
  });

  setTimeout(() => {
    overlay.classList.add("is-gathering");
  }, 700);

  setTimeout(() => {
    overlay.classList.add("is-crowned");
  }, 1900);

  setTimeout(() => {
    overlay.classList.add("is-finished");
    continueButton.focus();
  }, 2600);
}

function refreshGoatStatus() {
  if (
    badgeUnlockRevealActive ||
    badgeUnlockQueue.length > 0
  ) {
    return;
  }

  if (GOAT_PREVIEW) {
    updateGoatProfileDecoration();

    if (!goatPreviewShownSession && !goatRevealActive) {
      goatPreviewShownSession = true;
      setTimeout(() => showGoatReveal(true), 80);
    }

    return;
  }

  if (!goatUnlocked && hasGoatRequirements()) {
    goatUnlocked = true;
    goatRevealShown = false;
  }

  updateGoatProfileDecoration();

  if (
    goatUnlocked &&
    !goatRevealShown &&
    !goatRevealActive
  ) {
    setTimeout(() => {
      if (
        goatUnlocked &&
        !goatRevealShown &&
        !goatRevealActive
      ) {
        showGoatReveal(false);
      }
    }, 120);
  }
}

function bindCareerRecordInteractions(content) {
  content
    .querySelectorAll(".career-record-page-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const nextPage = Number(button.dataset.recordPage);

        if (!Number.isFinite(nextPage)) {
          return;
        }

        openLegacySection("records", nextPage);
      });
    });
}

function openLegacySection(sectionName, recordsPage = 1) {
  const overlay = ensureLegacyOverlay();
  const content = overlay.querySelector("#legacy-content");

  const isMilestones = sectionName === "milestones";

  content.innerHTML = `
    <button
      class="legacy-back"
      type="button"
    >
      ← BACK TO LEGACY
    </button>

    ${
      isMilestones
        ? renderMilestones()
        : renderCareerRecords(recordsPage)
    }
  `;

  content
    .querySelector(".legacy-back")
    .addEventListener("click", openLegacyHub);

  if (!isMilestones) {
    bindCareerRecordInteractions(content);
  }
}

function closeLegacyOverlay() {
  const overlay = document.querySelector("#legacy-overlay");

  if (!overlay) {
    return;
  }

  overlay.classList.add("hidden");
  document.body.classList.remove("legacy-open");
}

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
        ensureLegacyInterface();

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

function renderBallonDorTrophies(wins) {
  const totalWins = Math.max(0, Number(wins) || 0);

  if (totalWins === 0) {
    return "";
  }

  const lines = [];

  for (let index = 0; index < totalWins; index += 8) {
    const lineWins = Math.min(8, totalWins - index);

    lines.push(
      `<span class="ballon-dor-trophy-line">${"🏆".repeat(lineWins)}</span>`,
    );
  }

  return lines.join("");
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
        ${renderBallonDorTrophies(player.ballonDorWins)}
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
              : message.type === "agency-event"
                ? "Agency Event"
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

async function runNoOfferSeasonEvent() {
  if (careerMode !== "endless") {
    return null;
  }

  // These events are only a consolation for a genuinely quiet season.
  // The agency must still represent at least 10 players, and there must
  // be no transfer offers or expired-contract work waiting in the Inbox.
  if (signedPlayers.length < 10) {
    return null;
  }

  const hasPlayerBusiness = inboxMessages.some(
    (message) =>
      message.type === "transfer-offer" ||
      message.type === "contract-expired",
  );

  if (hasPlayerBusiness) {
    return null;
  }

  const roll = Math.random();

  let event = null;

  if (roll < 0.50) {
    event = {
      key: "holiday",
      icon: "🏖️",
      title: "Holiday",
      reputationGain: 0,
      cost: 0,
      text:
        "No offers arrived this season, so you took some time away from negotiations and recharged.",
    };
  } else if (roll < 0.80) {
    const networkingCost = roundMoney(agencyMoney * 0.01);

    agencyMoney = Math.max(0, agencyMoney - networkingCost);
    agencyReputation += 25;

    event = {
      key: "networking",
      icon: "🤝",
      title: "Networking",
      reputationGain: 25,
      cost: networkingCost,
      text:
        `A quiet transfer season gave you time to build new relationships across football. ` +
        `You spent ${formatMarketValue(networkingCost)} and gained 25 Reputation.`,
    };
  } else {
    agencyReputation += 10;

    event = {
      key: "media-day",
      icon: "🎙️",
      title: "Media Day",
      reputationGain: 10,
      cost: 0,
      text:
        "With no offers to handle, you spent the day with the media and raised your agency profile. You gained 10 Reputation.",
    };
  }

  addInboxMessage({
    type: "agency-event",
    title: `${event.icon} ${event.title}`,
    text: event.text,
  });

  // Save immediately so refreshing while the popup is open cannot reroll
  // the event or apply the reward twice.
  saveGameState();

  const stats = [
  {
    label: "REPUTATION",
    value:
      event.reputationGain > 0
        ? `+${event.reputationGain} · Total ${agencyReputation}`
        : `Total ${agencyReputation}`,
  },
];

  if (event.cost > 0) {
    stats.unshift({
      label: "COST",
      value: `-${formatMarketValue(event.cost)}`,
    });
  }

  await showGameDialog({
    eyebrow: `SEASON ${currentSeason} · QUIET SEASON`,
    title: `${event.icon} ${event.title}`,
    message: event.text,
    stats,
    confirmLabel: "CONTINUE",
  });

  return event;
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

      const transferFee = roundMoney(
        player.marketValue *
          (randomInt(85, 120) / 100),
      );

      const signingCommission = roundMoney(
        transferFee *
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
        transferFee,
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

  if (
    careerMode === "endless" &&
    Number.isFinite(selectedOffer.transferFee) &&
    selectedOffer.transferFee > 0 &&
    (
      !recordTransfer ||
      selectedOffer.transferFee > recordTransfer.transferFee
    )
  ) {
    recordTransfer = {
      season: currentSeason,
      playerId: player.id,
      playerName: player.name,
      country: player.country,
      fromClub: previousClub,
      toClub: selectedOffer.clubName,
      transferFee: selectedOffer.transferFee,
      recordType: "paid-transfer",
    };
  }

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
    careerMode === "challenge" && currentSeason >= MAX_SEASONS
      ? "END SEASON"
      : "NEXT SEASON";

  updateAgencyDashboard();
  updateSelectionUI();
  updateInboxCounts();
  renderReputation();
  ensureLegacyInterface();
  refreshHiddenBadges();
  refreshBadgeUnlocks();
  refreshGoatStatus();
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
    country: player.country,
  });

  agencyReputation += 10;
  renderReputation();
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
      grid-template-columns: repeat(3, minmax(0, 1fr));
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
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .career-ending-summary .career-ending-stat:first-child {
        grid-column: 1 / -1;
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

      <div class="career-ending-stat">
        <span class="career-ending-label">
          FINAL BALANCE
        </span>
        <strong>${formatMarketValue(agencyMoney)}</strong>
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
          "Your completed 30-Season Challenge progress will be permanently deleted. Your agent profile and Endless Career will not be affected.",
        confirmLabel: "START NEW CAREER",
        cancelLabel: "VIEW CAREER",
        tone: "danger",
      });

      if (!confirmed) {
        return;
      }

      isResettingCareer = true;
      localStorage.removeItem(CHALLENGE_GAME_STATE_STORAGE_KEY);
      isResettingCareer = false;

      resetRuntimeCareerState("challenge");
      generateCandidates();
      saveGameState();

      overlay.remove();
      document.body.style.overflow = "";
      refreshCareerScreen();
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

  if (
  careerMode === "challenge" &&
  currentSeason >= MAX_SEASONS
) {
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
      eyebrow: `SEASON ${currentSeason}`,
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

  void updateAnalyticsMaxSeason();

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

  await runNoOfferSeasonEvent();

  const managementIncome = calculateManagementIncome();
  agencyMoney += managementIncome;

  signingsThisSeason = 0;
  rerollsUsed = 0;
  selectedIds.clear();

  seasonLabelElement.textContent =
    careerMode === "challenge"
  ? `SEASON ${currentSeason} / ${MAX_SEASONS}`
  : `SEASON ${currentSeason}`

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
migrateLegacyCareerSave();

async function initializeCareerApp() {
  // If the user previously chose Google sign-in, merge cloud progress
  // before reading the profile or rendering career summaries.
  await initializeCloudSync();

  loadAgentProfile();

  if (!agentProfile) {
    resetRuntimeCareerState("endless");
    generateCandidates();
    renderCandidates();
    renderSignedPlayers();
    updateInterface();
    return;
  }

  showMainMenu();
}

void initializeCareerApp();

window.addEventListener("beforeunload", () => {
  if (careerMode && !isResettingCareer) {
    saveGameState();
  }
});
document.addEventListener("visibilitychange", () => {
  if (
    document.visibilityState === "hidden" &&
    !isResettingCareer
  ) {
    saveGameState();
  }
});