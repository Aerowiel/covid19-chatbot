const scoring = {
  symptoms: {

    fever: { score: 25, category: "mc" },
    tired: { score: 25, category: "mc" },
    dryCough: { score: 25, category: "mc" },

    hardBreathing: { score: 40, category: "mh" },
    chestPain: { score: 40, category: "mh" },
    difficultMoving: { score: 40, category: "mh" },

    anyPain: { score: 8, category: "lc" },
    soreThroat: { score: 8, category: "lc" },
    diarrhea: { score: 8, category: "lc" },
    conjunctivitis: { score: 8, category: "lc" },
    headache: { score: 8, category: "lc" },
    lossTasteSmell: { score: 8, category: "lc" },
    rashDiscoloration: { score: 8, category: "lc" },

  },
  transit: {
    us: 15,
    europe: 15,
    oriental: 8,
    asia: 7,
    pacific: 6,
    africa: 5,
    none: 0,
  }
}


const greenArea =  [
    "Ain - 01","Aisne - 02","Allier - 03","Alpes-de-Haute-Provence - 04","Hautes-Alpes - 05","Alpes-Maritimes - 06","Ardèche - 07","Ardennes - 08","Ariège - 09","Aube - 10","Aude - 11","Aveyron - 12","Bouches-du-Rhône - 13","Calvados - 14","Cantal - 15","Charente - 16","Charente-Maritime - 17","Cher - 18","Corrèze - 19","Corse-du-Sud - 2A","Haute-Corse - 2B","Côte d'Or - 21","Côtes d'Armor - 22","Creuse - 23", "Dordogne - 24", "Doubs - 25", "Drôme - 26", "Eure - 27", "Eure-et-Loir - 28","Finistère - 29","Gard - 30", "Haute-Garonne - 31", "Gers - 32", "Gironde - 33", "Hérault - 34", "Ille-et-Vilaine - 35", "Indre - 36", "Indre-et-Loire - 37", "Isère - 38","Jura - 39", "Landes - 40", "Loir-et-Cher - 41","Loire - 42","Haute-Loire - 43","Loire-Atlantique - 44","Loiret - 45", "Lot - 46","Lot-et-Garonne - 47","Lozère - 48","Maine-et-Loire - 49","Manche - 50", "Marne - 51","Haute-Marne - 52","Mayenne - 53", "Meurthe-et-Moselle - 54", "Meuse - 55","Morbihan - 56", "Moselle - 57","Nièvre - 58", "Nord - 59","Oise - 60", "Orne - 61","Pas-de-Calais - 62","Puy-de-Dôme - 63","Pyrénées-Atlantiques - 64","Hautes-Pyrénées - 65", "Pyrénées-Orientales - 66","Bas-Rhin - 67","Haut-Rhin - 68","Rhône - 69","Haute-Saône - 70","Saône-et-Loire - 71","Sarthe - 72", "Savoie - 73", "Haute-Savoie - 74","Seine-Maritime - 76","Deux-Sèvres - 79","Somme - 80","Tarn - 81","Tarn-et-Garonne - 82","Var - 83","Vaucluse - 84","Vendée - 85","Vienne - 86","Haute-Vienne - 87","Vosges - 88","Yonne - 89","Territoire de Belfort - 90", "Guadeloupe - 971","Martinique - 972","La Réunion - 974"
]

const orangeArea = [
    "Paris - 75","Seine-et-Marne - 77","Yvelines - 78","Essonne - 91","Hauts-de-Seine - 92","Seine-Saint-Denis - 93","Val-de-Marne - 94","Val-d'Oise - 95","Guyane - 973","Mayotte - 976"
]

const redArea = [

]

const predict = (data) => {

  let scores = {
    mc: 0,
    mh: 0,
    lc: 0,
  }

  let total = 0;

  let cumulatedMCSymptoms = 0;
  let cumulatedMHSymptoms = 0;
  let cumulatedLCSymptoms = 0;

  let backgroundScore = 0;
  let cumulatedBackground = 0;

  const {age, sex, imc} = data.person;
  const {background, demography, symptoms, firstTimeFelt, severity} = data;
  const {living, transit, contact} = demography;
  // compute

  // Age
  total += age === 1 ? 2 :
           age === 2 ? 4 :
           age === 3 ? 6 :
           age === 4 ? 15 :
           age === 5 ? 20 : 0;

  console.log("(age) total = ", total);

  // IMC
  total += imc >= 40 ? 15 : 0;

  console.log("(imc) total = ", total);

  // Symptoms
  symptoms.forEach(symptom => {
    scores[scoring.symptoms[symptom].category] += scoring.symptoms[symptom].score;
    switch(scoring.symptoms[symptom].category){
      case "lc":
        cumulatedLCSymptoms += 1;
        break;
      case "mc":
        cumulatedMCSymptoms += 1;
        break;
      case "mh":
        cumulatedMHSymptoms += 1;
        break;
      default:
        break;
    }
  })

  scores.mc *= cumulatedMCSymptoms === 2 ? 1.4 :
               cumulatedMCSymptoms === 3 ? 1.8 : 1;

  scores.mh *= cumulatedMHSymptoms === 2 ? 1.25 :
               cumulatedMHSymptoms === 3 ? 1.5 : 1;

  scores.lc *= cumulatedLCSymptoms >= 2 ? (cumulatedLCSymptoms - 1) * 0.05 : 1;

  total += scores.mc + scores.mh + scores.lc;

  console.log("(mc/mh/lc) total = ", total);

  total += firstTimeFelt === 1 ? 10 :
           firstTimeFelt === 2 ? 15 : 0;

  console.log("(first time felt) total = ", total);

  total *= severity === 1 ? 1.15 :
           severity === 2 ? 1.25 : 1;

  console.log("(severity) total = ", total);
  // Background
  background.forEach(bg => {
    backgroundScore += 20;
    cumulatedBackground += 1;
  })

  backgroundScore *= cumulatedBackground > 2 ? (1 + (cumulatedBackground * 0.1 + 0.1) ) : 1;

  total += backgroundScore;

  console.log("(background) total = ", total);

  // Demographic
  total += contact === 0 ? 80 :
           contact === 2 ? 10 : 0;

  console.log("(contact) total = ", total);

   transit.forEach(t => {
     total += scoring.transit[t];
   })

   console.log("(transit) total = ", total);

   // Living
   total += orangeArea.includes(living) ? 10 : redArea.includes(living) ? 20 : 0;

   console.log("(living) total = ", total);




  return Math.round((total + Number.EPSILON) * 100) / 100;
}

module.exports = predict;
