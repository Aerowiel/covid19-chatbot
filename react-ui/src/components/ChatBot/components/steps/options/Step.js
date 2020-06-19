import React from "react";

import FormGroup from "@material-ui/core/FormGroup";

import Option from "./Option";
import OptionElement from "./OptionElement";
import Options from "./Options";
import OptionsStepContainer from "./StepContainer";
import Loading from "../../../common/Loading";

import Checkbox from "./Checkbox";
import Checkboxes from "./Checkboxes";

const OptionsStep = (props) => {

  const {question, options, trigger, onClick, multiple, visible} = props;

  const [loading, setLoading] = React.useState(true);

  const [checkedItems, setCheckedItems] = React.useState({});

  React.useEffect(() => {
    const initialChecked = {};
    options.forEach(item => initialChecked[item.name] = {label: item.label, value: false});
    setCheckedItems(initialChecked);
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200)
  }, [])

  React.useEffect(() => {
    const container = document.getElementById("chatBotContent");
    container.scrollTop = container.scrollHeight;
  }, [loading])

  const onOptionClick = (message, value, trigger) => {

    onClick(message, question, value, trigger);
  };

  const renderButton = (option) => {

    const { label, value, trigger } = option;

    return (
      <Option key={value}>
        <OptionElement
          onClick={() => onOptionClick(label, value, trigger)}
        >
          {label}
        </OptionElement>
      </Option>
    );
  };

  const handleChecked = (ev) => {

    const { name, checked } = ev.target;
    let clonedCheckedItems = JSON.parse(JSON.stringify(checkedItems))

    if(checkedItems.hasOwnProperty('none')){

      if(name === "none" && checked){

        Object.keys(clonedCheckedItems).forEach(key => {
          clonedCheckedItems[key].value = false;
        });
        clonedCheckedItems.none.value = true;
        return setCheckedItems(clonedCheckedItems);
      }
      else if(checkedItems.none.value && name != "none"){
        clonedCheckedItems.none.value = false;
        clonedCheckedItems[name].value = checked;
        return setCheckedItems(clonedCheckedItems);
      }
    }

    clonedCheckedItems[name].value = checked;
    setCheckedItems(clonedCheckedItems)
  }

  const renderCheckbox = (option) => {

    const {name, label} = option;

    return (
      <Checkbox
        key={name}
        checked={checkedItems[name].value || false}
        name={name}
        label={label}
        onChange={(ev) => handleChecked(ev)}
      />
    )
  }

  const onSubmit = () => {
    let realTrigger = trigger;
    if(checkedItems.none.value){
      const triggerIndex = options.findIndex(option => option.trigger);
      if(triggerIndex !== -1) realTrigger = options[triggerIndex].trigger;
    }

    let count = 0;
    const message = Object.keys(checkedItems).reduce((msg, key) => {
      const isLast = Object.keys(checkedItems).filter(key => checkedItems[key].value).length - 1 === count;
      console.log(Object.keys(checkedItems).filter(key => checkedItems[key].value).length)
      console.log(count)
      if(checkedItems[key].value) count += 1;
      return msg += checkedItems[key].value ?  `${checkedItems[key].label}${isLast ? "." : ", "}` : "";
    }, "")
    onClick(message.toLowerCase(), question, checkedItems, realTrigger);
  }



  return (

      !loading && <OptionsStepContainer visible={visible}>

      {
        multiple ? (
          <>
            <Checkboxes>
              {options.map(option => renderCheckbox(option))}
            </Checkboxes>
            <button onClick={onSubmit}>Valider</button>
          </>

        ) : (
          <Options>
            {options.map(option => renderButton(option))}
          </Options>
        )

      }
      </OptionsStepContainer>

  );

}


export default OptionsStep;
