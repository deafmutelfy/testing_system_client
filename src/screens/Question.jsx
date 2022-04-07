import {
  Box,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { connect } from "react-redux";

import reference from "../ansReference.js";
import { useState } from "react";

const mapStateToProps = (state) => {
  return {
    question: state.questions[state.currentQuestion - 1],
    id: state.currentQuestion,
    totalQuestions: state.questions.length,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAnswer: (props) => dispatch({ type: "SET_ANSWER", value: props }),
  };
};

let QuestionContainer = ({ question, id, totalQuestions, setAnswer }) => {
  let [value, setValue] = useState();

  if (question == null) {
    return <Box></Box>;
  }

  let submit = () => {
    setAnswer(value);
    setValue(0);
  };

  return (
    <Box h={"100%"}>
      <Center h={"100%"}>
        <Box maxW={"80%"}>
          <Text textAlign={"right"} fontSize={"sm"}>
            Вопрос: {id} из {totalQuestions}
          </Text>
          <Text fontSize={"xl"} m={12}>
            {question.Title}
          </Text>
          <RadioGroup m={12} value={value} onChange={setValue}>
            <Stack>
              <Radio value={reference.Yes}>В основном верно</Radio>
              <Radio value={reference.Probably}>Отчасти верно</Radio>
              <Radio value={reference.No}>Нет</Radio>
              <Radio value={reference.Nothing}>Не могу решить</Radio>
            </Stack>
          </RadioGroup>
          <Button
            marginLeft={12}
            colorScheme={"blue"}
            onClick={submit}
            isDisabled={value === undefined || value === 0}
          >
            Далее
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
