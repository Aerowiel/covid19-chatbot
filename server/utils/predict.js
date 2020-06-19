const scoring = {
  symptoms: {

    fever: { score: 20, category: "mc" },
    tired: { score: 20, category: "mc" },
    dryCough: { score: 20, category: "mc" },

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


const greenArea = [
  "Ain","Aisne","Allier","Alpes-de-Haute-Provence","Hautes-Alpes","Alpes-Maritimes","Ardèche","Ardennes","Ariège","Aube","Aude","Aveyron","Bouches-du-Rhône","Calvados","Cantal","Charente","Charente-Maritime","Cher","Corrèze","Corse-du-Sud","Haute-Corse","Côte d'Or","Côtes d'Armor","Creuse", "Dordogne", "Doubs", "Drôme", "Eure", "Eure-et-Loir","Finistère","Gard", "Haute-Garonne", "Gers", "Gironde", "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire", "Isère","Jura", "Landes", "Loir-et-Cher","Loire","Haute-Loire","Loire-Atlantique","Loiret", "Lot","Lot-et-Garonne","Lozère","Maine-et-Loire","Manche", "Marne","Haute-Marne","Mayenne", "Meurthe-et-Moselle", "Meuse","Morbihan", "Moselle","Nièvre", "Nord","Oise", "Orne","Pas-de-Calais","Puy-de-Dôme","Pyrénées-Atlantiques","Bas-Rhin","Haut-Rhin","Rhône","Haute-Saône","Saône-et-Loire","Sarthe", "Savoie", "Haute-Savoie","Seine-Maritime","Deux-Sèvres","Somme","Tarn","Tarn-et-Garonne","Var","Vaucluse","Vendée","Vienne","Haute-Vienne","Vosges","Yonne","Territoire de Belfort","Guadeloupe","Martinique","La Réunion"
]

const orangeArea = [
  "Paris","Seine-et-Marne","Yvelines","Essonne","Hauts-de-Seine","Seine-Saint-Denis","Val-de-Marne","Val-d'Oise","Guyane","Mayotte"
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

  let cumulatedMCSymptomes = 0;
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



  // IMC
  total += imc >= 40 ? 15 : 0;

  // Symptoms
  symptoms.forEach(symptom => {
    scores[scoring.symptoms[symptom].category] += scoring.symptoms[symptom].score;
    switch(scoring.symptoms[symptom].category){
      case "lc":
        cumulatedLCSymptoms += 1;
        break;
      case "mc":
        cumulatedMCSymptomes += 1;
        break;
      case "mh":
        cumulatedMHSymptoms += 1;
        break;
      default:
        break;
    }
  })

  scores.mc *= cumulatedMCSymptomes === 2 ? 1.25 :
               cumulatedMCSymptomes === 3 ? 1.5 : 1;

  scores.mh *= cumulatedMHSymptoms === 2 ? 1.25 :
               cumulatedMHSymptoms === 3 ? 1.5 : 1;


  scores.lc -= cumulatedLCSymptoms >= 2 ? (cumulatedLCSymptoms - 1) * 0.05 : 1

  total = scores.mc + scores.mh + scores.lc;

  total += firstTimeFelt === 1 ? 10 :
           firstTimeFelt === 2 ? 15 : 0;

  total *= severity === 1 ? 1.15 :
           severity === 2 ? 1.25 : 1;

  // Background
  background.forEach(bg => {
    backgroundScore += 20;
    cumulatedBackground += 1;
  })

  backgroundScore *= (1 + (cumulatedBackground * 0.1) );

  total += backgroundScore;

  // Demographic
  total += contact === 0 ? 80 :
           contact === 2 ? 10 : 0;

   transit.forEach(t => {
     total += scoring.transit[t];
   })

   // Living
   total += orangeArea.includes(living) ? 10 : redArea.includes(living) ? 20 : 0;




  return total;
}

module.exports = predict;
