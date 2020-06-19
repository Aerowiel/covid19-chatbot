import React from "react";

import TextBubble from "./Bubble";
import TextStepContainer from "./StepContainer";
import AvatarContainer from "./AvatarContainer";
import Avatar from "./Avatar";

import Loading from "../../../common/Loading";

import DoctorIcon from "../../../icons/Doctor";
import PatientIcon from "../../../icons/Patient";


const TextStep = (props) => {

  const {isUser, isFirst, message} = props;

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, isUser ? 100 : 200)
  }, [])

  React.useEffect(() => {
    const container = document.getElementById("chatBotContent");
    container.scrollTop = container.scrollHeight;
  }, [loading])

  return (
    <TextStepContainer isUser={isUser} isFirst={isFirst}>
      {
        !isUser && isFirst ? (
          <AvatarContainer>
            <Avatar
              avatar={DoctorIcon}
            />
          </AvatarContainer>
        ) : isUser && (
          <AvatarContainer isUser>
            <Avatar
              avatar={PatientIcon}
            />
          </AvatarContainer>
        )
      }
      <TextBubble
        isUser={isUser}
        isFirst={isFirst}
      >
        {loading ? <Loading /> : message}
      </TextBubble>
    </TextStepContainer>
  )
}

export default TextStep;
