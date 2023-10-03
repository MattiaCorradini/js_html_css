let placeOfBirth = document.getElementById('placeOfBirth');
let COMUNI = null;

async function fetchComuni() {
  try {
    const response = await fetch('comuni.json');
    const data = await response.json();
    COMUNI = data.comuni;
    populatePlaceOfBirth();
  } catch (error) {
    console.error('Errore nel recupero dei comuni:', error);
  }
}

function populatePlaceOfBirth() {
  if (!COMUNI) return;

  COMUNI.forEach((comune, idx) => {
    let option = document.createElement('option');
    option.value = idx;
    option.innerHTML = `${comune[2]}, ${comune[1]}`;
    placeOfBirth.appendChild(option);
  });
}

function calculateCodiceFiscale() {
  const lastName = document.getElementById('lastName').value.toUpperCase();
  const name = document.getElementById('name').value.toUpperCase();
  const dateOfBirth = new Date(document.getElementById('dateOfBirth').value);
  const year = dateOfBirth.getFullYear().toString().substr(-2);
  const month = convertMonthToLetter(dateOfBirth.getMonth());
  const day = (parseInt(document.getElementById('dateOfBirth').value.split('-')[2]) + (document.getElementById('gender').value === 'F' ? 40 : 0)).toString().padStart(2, '0');

  let comune = getComuneNascita(placeOfBirth.value);

  let cfLastName = getConsonants(lastName).padEnd(3, 'X');

  let cfName = getConsonants(name).padEnd(3, 'X');

  const partialCF = cfLastName + cfName + year + month + day + comune;

  const controlCharacter = calculateControlCharacter(partialCF);

  const cfCode = partialCF + controlCharacter;

  document.getElementById('cfCode').value = cfCode;
}

function getComuneNascita(indice_comune) {
  return COMUNI[indice_comune][0];
}

function getConsonants(str) {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let consonants = '';
  for (let i = 0; i < str.length && consonants.length < 3; i++) {
    if (!vowels.includes(str[i]) && str[i] !== ' ') {
      consonants += str[i];
    }
  }
  return consonants;
}

function convertMonthToLetter(monthNumber) {
  const monthLetters = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  return monthLetters[monthNumber];
}

function calculateControlCharacter(codice) {
  const posizioniPari = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
    'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18,
    'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
  };

  const posizioniDispari = {
    '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
    'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
    'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
    'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
  };

  let sum = 0;
  for (let i = 0; i < codice.length; i += 2) {
    sum += posizioniDispari[codice.slice(i, i + 1)];
  }
  for (let i = 1; i < codice.length; i += 2) {
    sum += posizioniPari[codice.slice(i, i + 1)];
  }
  sum %= 26;
  const caratteriControllo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return caratteriControllo[sum];
}

const calculateButton = document.getElementById('calculate');
calculateButton.addEventListener('click', calculateCodiceFiscale);

// Chiamata alla funzione per caricare i comuni solo se non sono stati già caricati
if (COMUNI === null) {
  fetchComuni();
} else {
  populatePlaceOfBirth(); // Se i comuni sono già stati caricati, popola direttamente il select
}
