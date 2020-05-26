import React from "react";

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





const ChatBot = (props) => {

  const [answers, setAnswers] = React.useState([])
  const [inputValue, setInputValue] = React.useState("")
  const [hideSubmitButton, setHideSubmitButton] = React.useState(false)

  const [renderedSteps, setRenderedSteps] = React.useState([])
  const [currentStep, setCurrentStep] = React.useState(1)
  const [steps, setSteps] = React.useState([
    {id:1, message: "Salut !", type: "text", trigger:2},
    {id:2, message: "Pour vérifier votre habilité à répondre à ce questionnaire, nous allons procéder à une petite vérification de votre état mental.", type: "text", trigger: 3},
    {id:3, message: "Pouvez-vous me dire combien font : 1 + 1 * 2 ?", type: "text", trigger: 4},
    {id:4, type:"options", options:[{value: 1, label: "1", trigger:5}, {value: 2, label: "2", trigger: 5}, {value: 3, label: "3", trigger: 6}, {value: 4, label: "4", trigger: 5}, {value: 5, label: "5", trigger: 5}]},
    {id:5, message: () => <img src="https://media1.tenor.com/images/343e3060d6faceb1a7ce05fa83e91476/tenor.gif" />, type: "text", trigger: 3},
    {id:6, message: "C'est bien vous pouvez passer en première section de maternelle !", type: "text", trigger: 7},
    {id:7, message: "C'est tout ! Pour le moment...", type: "text"},
  ])

  const [isFirst, setIsFirst] = React.useState(true);
  const [hideInput, setHideInput] = React.useState(true);
  const [removePreviousStep, setRemovePreviousStep] = React.useState(false);

  React.useEffect(() => {
    renderStep(1);
  }, [])

  React.useEffect(() => {
    console.log(currentStep)
    if (currentStep === 1) return;
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
    setInputValue(ev.target.value);
  }

  const triggerNextStep = (label, value, stepId) => {
    setIsFirst(true);
    setAnswers([...answers, value]);
    const answerComponent = <TextStep key={`step_${stepId}_${renderedSteps.length + 1}`} isUser isFirst message={label} />
    setRenderedSteps([...renderedSteps, {component:answerComponent, meta: {id: stepId, type: "answer", display: true}}])

    setTimeout(() => {
      setCurrentStep(stepId)
    }, 1200)
  }

  const renderStep = (stepId) => {

    const stepIndex = steps.findIndex(step => stepId === step.id);
    if(stepIndex === -1) return console.log("index not found for step id = ", stepId)

    const step = steps[stepIndex];

    const stepComponent = step.type === "text" ? (
      <TextStep key={`step_${step.id}_${renderedSteps.length + 1}`} isUser={false} isFirst={isFirst} message={typeof step.message === "function" ? step.message() : step.message} />
    ) : step.type === "options" ? (
      <OptionsStep key={`step_${step.id}_${renderedSteps.length + 1}`} options={step.options} onClick={triggerNextStep} />
    ) : <></>

    const newRenderedSteps = [...renderedSteps];

    if(newRenderedSteps.length > 1){
      const lastRenderedStep = newRenderedSteps[newRenderedSteps.length - 1 ];
      if(lastRenderedStep.meta.type === "options") lastRenderedStep.meta.display = false;
    }

    newRenderedSteps.push({component: stepComponent, meta: {id: step.id, type: step.type, display:true}})
    setRenderedSteps(newRenderedSteps)

    if(isFirst) setIsFirst(false);

    if(step.trigger){
      setTimeout(() => {
        setCurrentStep(step.trigger)
      }, 2200)
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
              renderedSteps.map(step => {
                return step.meta.display && step.component;
              })
            }

          </ChatBotContent>
          {
            !hideInput && (
              <ChatBotFooter>
                <ChatBotInput
                  type="textarea"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Votre réponse..."
                  hasButton={!hideSubmitButton}
                />
                <div style={{position: "absolute", right:0, top:0}}>
                <ChatBotSubmitButton>
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
