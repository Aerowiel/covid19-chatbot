import React from 'react';

import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './StepContainer';

const OptionsStep = (props) => {

  const {options, onClick} = props;

  const onOptionClick = (label, value, trigger) => {

    onClick(label, value, trigger);
  };

  const renderOption = (option) => {

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

  return (
    <OptionsStepContainer>

      <Options>
        {options.map(option => renderOption(option))}
      </Options>

    </OptionsStepContainer>
  );

}


export default OptionsStep;
