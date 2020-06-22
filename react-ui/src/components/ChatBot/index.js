import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ForwardIcon from '@material-ui/icons/Forward';

import {
  ChatBotContainer,
  ChatBotHeader,
  ChatBotHeaderTitle,
  ChatBotHeaderIcon,
  ChatBotContent,
  ChatBotFooter,
  ChatBotInput,
  ChatBotSubmitButton,
  CoronavirusIcon,
} from "./components";

import TextStep from "./components/steps/text/Step";
import OptionsStep from "./components/steps/options/Step"

import Green from "./images/green.png";
import Yellow from "./images/yellow.png";
import Red from "./images/red.png";

import axios from "axios";

const PROVINCE_STATES = [
  "Ain - 01","Aisne - 02","Allier - 03","Alpes-de-Haute-Provence - 04","Hautes-Alpes - 05","Alpes-Maritimes - 06","Ardèche - 07","Ardennes - 08","Ariège - 09","Aube - 10","Aude - 11","Aveyron - 12","Bouches-du-Rhône - 13","Calvados - 14","Cantal - 15","Charente - 16","Charente-Maritime - 17","Cher - 18","Corrèze - 19","Corse-du-Sud - 2A","Haute-Corse - 2B","Côte d'Or - 21","Côtes d'Armor - 22","Creuse - 23", "Dordogne - 24", "Doubs - 25", "Drôme - 26", "Eure - 27", "Eure-et-Loir - 28","Finistère - 29","Gard - 30", "Haute-Garonne - 31", "Gers - 32", "Gironde - 33", "Hérault - 34", "Ille-et-Vilaine - 35", "Indre - 36", "Indre-et-Loire - 37", "Isère - 38","Jura - 39", "Landes - 40", "Loir-et-Cher - 41","Loire - 42","Haute-Loire - 43","Loire-Atlantique - 44","Loiret - 45", "Lot - 46","Lot-et-Garonne - 47","Lozère - 48","Maine-et-Loire - 49","Manche - 50", "Marne - 51","Haute-Marne - 52","Mayenne - 53", "Meurthe-et-Moselle - 54", "Meuse - 55","Morbihan - 56", "Moselle - 57","Nièvre - 58", "Nord - 59","Oise - 60", "Orne - 61","Pas-de-Calais - 62","Puy-de-Dôme - 63","Pyrénées-Atlantiques - 64","Hautes-Pyrénées - 65", "Pyrénées-Orientales - 66","Bas-Rhin - 67","Haut-Rhin - 68","Rhône - 69","Haute-Saône - 70","Saône-et-Loire - 71","Sarthe - 72", "Savoie - 73", "Haute-Savoie - 74","Paris - 75","Seine-Maritime - 76","Seine-et-Marne - 77","Yvelines - 78","Deux-Sèvres - 79","Somme - 80","Tarn - 81","Tarn-et-Garonne - 82","Var - 83","Vaucluse - 84","Vendée - 85","Vienne - 86","Haute-Vienne - 87","Vosges - 88","Yonne - 89","Territoire de Belfort - 90","Essonne - 91","Hauts-de-Seine - 92","Seine-Saint-Denis - 93","Val-de-Marne - 94","Val-d'Oise - 95","Guadeloupe - 971","Martinique - 972","Guyane - 973","La Réunion - 974","Mayotte - 976"
]

const useStateRef = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

const validHeight = (value) => {
  const isValidHeight = value > 0 && value > 50 && value < 250;

  return {result:isValidHeight, error: !isValidHeight ? "La taille doit être supérieure à 0 et comprise entre 50cm et 250cm." : ""};
}

const validWeight = (value) => {
  const isValidWeight = value > 0 && value > 30 && value < 300;

  return {result:isValidWeight, error: !isValidWeight ? "Le poids doit être supérieur à 0 et compris entre 30kg et 300kg." : ""};
}

const validProvinceState = (value) => {
  const isValidProvinceState = value !== "" && PROVINCE_STATES.includes(value);

  return {result:isValidProvinceState, error: !isValidProvinceState ? "Le département n'est pas valide." : ""};
}

const useStyles = makeStyles(theme => ({
  finalTextStepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  finalTextStepImage: {
    width: "5em",
  }
}))

const ChatBot = (props) => {

  const classes = useStyles();

  const [answers, setAnswers] = React.useState({})
  const [inputValue, setInputValue] = React.useState("")
  const [inputError, setInputError] = React.useState("");
  const [hideSubmitButton, setHideSubmitButton] = React.useState(false)

  const [renderedSteps, setRenderedSteps, renderedStepsRef] = useStateRef([])


  const [steps, setSteps] = React.useState([
    {id:1, message: "Bonjour.", type: "text", trigger:2},
    {id:2, message: "Nous allons procéder à un diagnostic de vos symptômes, êtes-vous d'accord pour répondre à une série de questions ?", type:"options", question:"initial", options:[
      {value: true, label: "Oui", trigger:4},
      {value: false, label: "Non", trigger: 3}
    ]},
    {id:3, type:"text", message: "Ok, revenez quand vous serez prêt."},
    {id:4, type:"text", message: "Bien, procédons donc au questionnaire...", trigger:5},
    {id:5, message: "Quel est votre âge ?", type: "options", question: "age", options: [
      {label: "Entre 0 et 15 ans", value: 0, trigger: 6},
      {label: "Entre 16 et 30 ans", value: 1, trigger: 6},
      {label: "Entre 31 et 45 ans", value: 2, trigger: 6},
      {label: "Entre 46 et 60 ans", value: 3, trigger: 6},
      {label: "Entre 61 et 75 ans", value: 4, trigger: 6},
      {label: "Plus de 75 ans", value: 5, trigger: 6}
    ]},
    {id: 6, message: "Quel est votre sexe ?", type: "options", question: "sex", trigger: 7, options: [
      {label: "Homme", value: 0, trigger: 7},
      {label: "Femme", value: 1, trigger: 7},
    ]},
    {id: 7, message: "Quel est votre poids (en kg) ?", type: "input", inputType: "number", question: "weight", inputLabel: "poids (en kg)", validator: validWeight, trigger: 8},
    {id: 8, message: "Quelle est votre taille (en cm) ?", type: "input", inputType: "number", question: "height", inputLabel: "taille (en cm)", validator: validHeight, trigger: 9},

    {id:9, message: "Quels sont vos symptômes ?", type:"options", multiple: true, question: "symptoms", trigger: 10, options: [
      {name: "fever", label: "Fièvre" },
      {name: "tired", label: "Fatigue" },
      {name: "dryCough", label: "Toux sèche" },
      {name: "hardBreathing", label: "Difficulté à respirer ou souffle court" },
      {name: "chestPain", label: "Douleurs ou pression à la poitrine" },
      {name: "difficultMoving", label: "Difficulté à s’exprimer ou se mouvoir" },
      {name: "anyPain", label: "Douleurs en général" },
      {name: "soreThroat", label: "Gorge irritée" },
      {name: "diarrhea", label: "Diarrhée" },
      {name: "conjunctivitis", label: "Conjonctivite" },
      {name: "headache", label: "Maux de têtes" },
      {name: "lossTasteSmell", label: "Perte du goût ou de l’odorat" },
      {name: "rashDiscoloration", label: "Décoloration des doigts ou éruption cutanées" },
      {name: "none", label: "Aucun", trigger: 12},
    ]},

    {id:10, message: "Depuis combien de temps ressentez-vous ces symptômes ?", type: "options", question: "firstTimeFelt", options: [
      {label: "Moins de 5 jours", value: 0, trigger: 11},
      {label: "Entre 5 et 10 jours", value: 1, trigger: 11},
      {label: "Plus de 10 jours", value: 2, trigger: 11},
    ]},

    {id:11, message: "De quelle façon ressentez-vous ces symptômes ?", type: "options", question: "severity", options: [
      {label: "Faible", value: 0, trigger: 12},
      {label: "Modérée", value: 1, trigger: 12},
      {label: "Sévère", value: 2, trigger: 12},
    ]},

    {id:12, message: "Avez-vous comme antécédents ou êtes-vous sujet à", type:"options", multiple: true, question: "background", trigger: 13, options: [
      {name: "pulmonary", label: "Des maladies pulmonaires chroniques ou asthme modéré à sévère" },
      {name: "cardiac", label: "Des maladies cardiaques sévère" },
      {name: "immunocompromised", label: "Un déficit immunitaire" },
      {name: "diabetes", label: "Du diabète" },
      {name: "liver", label: "Des maladies au foie nécessitant des dialyses" },
      {name: "kidney", label: "Des maladies aux reins" },
      {name: "none", label: "Aucun", trigger: 13},
    ]},
    {id: 13, message: "Dans quel département résidez-vous ?", type: "input", question: "living", options: PROVINCE_STATES, inputLabel: "Département", validator: validProvinceState, trigger: 14},
    {id:14, message: "Au cours du dernier mois, avez-vous transité dans les zones suivantes ?", type:"options", multiple: true, question: "transit", trigger: 15, options: [
      {name: "us", label: "Amérique" },
      {name: "europe", label: "Autres pays européens"},
      {name: "oriental", label: "Méditerranée orientale"},
      {name: "asia", label: "Asie du sud-est"},
      {name: "pacific", label: "Pacifique occidental"},
      {name: "africa", label: "Afrique"},
      {name: "none", label: "Aucun", trigger: 15},
    ]},
    {id:15, message: "Avez-vous été en contact avec une personne atteinte du coronavirus ?", type: "options", question: "contact", options: [
      {label: "Oui", value: 0, trigger: 16},
      {label: "Non", value: 1, trigger: 16},
      {label: "Ne sais pas", value: 2, trigger: 16},
    ]},
    {id: 16, message: "Veuillez patientez pendant que nous analysons vos réponses.", type:"text", trigger: "END"}
  ])

  const [currentStep, setCurrentStep] = React.useState(steps[0]);

  const [isFirst, setIsFirst] = React.useState(true);
  const [hideInput, setHideInput] = React.useState(true);
  const [inputType, setInputType] = React.useState("textarea");
  const [removePreviousStep, setRemovePreviousStep] = React.useState(false);

  React.useEffect(() => {
    renderStep(currentStep);
  }, [])

  React.useEffect(() => {
    if(!currentStep) return console.log("step not found");
    const currentStepIsInput = currentStep.type === "input";
    if(currentStepIsInput){
      setInputType(currentStep.inputType);
    }
    setHideInput(!currentStepIsInput)

    if(currentStep.id === 1) return;

    renderStep(currentStep)
  }, [currentStep])

  React.useEffect(() => {

    if(renderedSteps.length === 0) return;

    const container = document.getElementById("chatBotContent");
    container.scrollTop = container.scrollHeight;

  }, [renderedSteps])

  React.useEffect(() => {
    console.log(answers)
  }, [answers])

  const handleInputChange = (ev) => {
    if(inputError.length > 0) setInputError("");
    setInputValue(ev.target.value);
  }


  const getFormatedJson = (answers) => {

    const {symptoms, background, age, sex, weight, height, living, transit, contact, firstTimeFelt, severity} = answers;
    const {pulmonary, cardiac, liver, kidney, diabetes, immunocompromised} = background;

    const formatedJson = {
      person: {
        age: age,
        sex: sex,
        imc: weight / ( (height / 100) ^ 2),
      },
      symptoms: Object.keys(symptoms).filter(symptom => {
        return symptoms[symptom].value && symptoms[symptom].name !== "none";
      }),
      firstTimeFelt: firstTimeFelt,
      severity: severity,
      background: Object.keys(background).filter(bg => {
        return background[bg].value && background[bg].name !== "none";
      }),
      demography: {
        living: living,
        transit: Object.keys(transit).filter(t => {
          return transit[t].value && transit[t].name !== "none";
        }),
        contact: contact,
      }
    }

    return formatedJson;
  };

  const triggerNextStep = (message, name, value, stepId) => {

    if(currentStep.type === "input" && currentStep.validator){

      const validatorResult = currentStep.validator.apply(null, [inputValue])
      console.log(validatorResult)
      if(!validatorResult.result){
        return setInputError(validatorResult.error);
      }
    }

    setIsFirst(true);
    setAnswers({...answers, [name]: value});

    if(currentStep.type === "input") setInputValue("");

    const newRenderedSteps = [...renderedStepsRef.current];

    if(newRenderedSteps.length > 1){
      const lastRenderedStep = newRenderedSteps[newRenderedSteps.length - 1 ];

      if(lastRenderedStep.meta.type === "options") {
        newRenderedSteps.pop();
      };
    }

    const answerComponent = <TextStep key={`step_${stepId}_${renderedSteps.length + 1}`} isUser isFirst message={message} />
    setRenderedSteps([...newRenderedSteps, {component:answerComponent, meta: {id: stepId, type: "answer", display: true}}])

    const nextStep = steps.find(step => step.id === stepId)
    setTimeout(() => {
      setCurrentStep(nextStep)
    }, 1200)
  }

  const renderStep = (step) => {

    const newRenderedSteps = [...renderedSteps];

    if(step.type === "text"){
      const textComponent = <TextStep key={`step_${step.id}_${renderedSteps.length + 1}`} isUser={false} isFirst={isFirst} message={typeof step.message === "function" ? step.message() : step.message} />
      newRenderedSteps.push({component: textComponent, meta: {id: step.id, type: step.type}})
    }
    else if(step.type === "options"){
      const textComponent = <TextStep key={`step_${step.id}_${renderedSteps.length + 1}_text`} isUser={false} isFirst={isFirst} message={typeof step.message === "function" ? step.message() : step.message} />
      const optionsComponent = <OptionsStep key={`step_${step.id}_${renderedSteps.length + 1}_options`} question={step.question} options={step.options} trigger={step.trigger} multiple={step.multiple ? true : false} onClick={triggerNextStep} visible />
      newRenderedSteps.push(...[
        {component: textComponent, meta: {id: step.id, type: "text"}},
        {component: optionsComponent, meta: {id: step.id, type: step.type}}
      ])

    }
    else if(step.type === "input"){
      const textComponent = <TextStep key={`step_${step.id}_${renderedSteps.length + 1}_text`} isUser={false} isFirst={isFirst} message={typeof step.message === "function" ? step.message() : step.message} />
      newRenderedSteps.push({component: textComponent, meta: {id: step.id, type: step.type}});
    }

    setRenderedSteps(newRenderedSteps)

    if(isFirst) setIsFirst(false);

    const nextStep = steps.find(s => s.id === step.trigger);
    if(step.trigger && step.type !== "options" && step.type !== "input"){
      if(step.trigger === "END"){
        const formatedJson = getFormatedJson(answers);
        axios.post("https://chat-bot-covid19.herokuapp.com/api/covid/predict", formatedJson) //https://chat-bot-covid19.herokuapp.com/
        .then(response => {

          const total = response.data;

          const prediction = total >= 0 && total <= 99 ? () => {
            return (
              <div className={classes.finalTextStepContainer}>
                <img className={classes.finalTextStepImage} src={Green} />
                <div style={{whiteSpace: "pre-line"}}>{
                  `Profil à risque bas - ${total} points :

                  Votre profil se situe dans la tranche basse des risques selon les données à notre disposition. Il vous est donc conseillé de ne pas vous présenter immédiatement dans une zone médicale.

                  Si vous êtes porteurs de symptômes et que ces derniers persistent nous vous encourageons à vous rapprocher de votre médecin de proximité.
                  Continuez à appliquer les gestes barrières car le risque zéro n’existe pas.

                  Merci également de noter que ces recommandations sont basées sur des données et ne remplace pas l’avis d’un professionnel de la santé.

                  Dans tous les cas avant de vous rendre en zone médicale, veillez à prévenir de votre arrivée et de votre situation afin que les professionnels préparent les mesures sanitaires adéquates.`
                }</div>
              </div>
            )
          } :
           total > 99 && total <= 199 ? () => {
             return (
               <div className={classes.finalTextStepContainer}>
                 <img className={classes.finalTextStepImage} src={Yellow} />
                 <div style={{whiteSpace: "pre-line"}}>{
                   `Profil à risque modéré - ${total} points :

                   Votre profil se situe dans la tranche modérée des risques selon les données à notre disposition. Nous vous suggérons de vous rendre auprès d’un professionnel de santé.

                  Avant de vous rendre en zone médicale, veillez à prévenir de votre arrivée et de votre situation afin que les professionnels préparent les mesures sanitaires adéquates.

                  Continuez à appliquer les gestes barrières, portez un masque et restez chez vous autant que possible en attente du verdict médical.

                  Merci également de noter que ces recommandations sont basées sur des données et ne remplace pas l’avis d’un professionnel de la santé.`
                 }</div>
               </div>
             )
           } :
           total > 199 && function (){
             return (
               <div className={classes.finalTextStepContainer}>
                 <img className={classes.finalTextStepImage} src={Red} />
                 <div style={{whiteSpace: "pre-line"}}>{
                   `Profil à risque élevé - ${total} points :

                   Votre profil se situe dans la tranche élevée des risques selon les données à notre disposition. Nous vous suggérons de contacter le Samu afin de poser un verdict médical dès que possible.
                   Veillez à prévenir de vos conditions en appelant le Samu afin que ces derniers prennent les précautions sanitaires nécessaires..

                    Restez chez vous en attente de l’arrivée du corps médical et isolez-vous de vos proches, ces derniers sont encouragés à porter un masque et à rester également au domicile familial en attente du verdict médical.

                    Merci également de noter que ces recommandations sont basées sur des données et ne remplace pas l’avis d’un professionnel de la santé.`
                 }</div>
               </div>
             )
           }
           const borderColor = total >= 0 && total <= 99 ? "#78d0b1" : total > 99 && total <= 199 ? "#f9da41" : "#ee596b";
          const resultComponent = <TextStep key={`step_final`} message={prediction()} isFinal borderColor={borderColor} />
          setRenderedSteps([...newRenderedSteps, {component:resultComponent, meta: {id: "final", type: "text", display: true}}])
        })
        .catch(error => {
          console.log("ERROR = ", error)
        })
      }else{
        setTimeout(() => {
          setCurrentStep(nextStep)
        }, 220)
      }

    }


    return step;
  }

  return (
    <div style={{width:"100%", height:"100%", padding:"15px"}}>
      <ChatBotContainer
        background="whitesmoke"
        height="100%"
        width="100%"
      >
        <ChatBotHeader>

          <CoronavirusIcon fontSize="large" style={{marginRight:8}} />

          <ChatBotHeaderTitle>COVID-19 ChatBot</ChatBotHeaderTitle>

        </ChatBotHeader>
         <ChatBotContent
            id="chatBotContent"
            height="100%"
            hideInput={hideInput}
          >
            {
              renderedSteps.map(step => step.component)
            }

          </ChatBotContent>
          {
            !hideInput && (
              <ChatBotFooter>
                <ChatBotInput
                  type={inputType}
                  value={inputValue}
                  error={inputError}
                  inputLabel={currentStep.inputLabel}
                  onChange={handleInputChange}
                  onSubmit={() => triggerNextStep(inputValue, currentStep.question, inputValue, currentStep.trigger)}
                  placeholder="Votre réponse..."
                  {...currentStep.options && {options: currentStep.options}}
                />
                <div style={{position: "absolute", right:0, top:0}}>
                  <ChatBotSubmitButton onClick={() => triggerNextStep(inputValue, currentStep.question, inputValue, currentStep.trigger)}>
                    <ForwardIcon style={{fill:"grey"}} />
                  </ChatBotSubmitButton>
                </div>
              </ChatBotFooter>
            )
          }

      </ChatBotContainer>
    </div>
  )
}

export default ChatBot;
