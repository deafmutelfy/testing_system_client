import { Box, Button, Center, Input } from "@chakra-ui/react";
import { connect } from "react-redux";
import { useState } from "react";

import screens from "./reference.js";

const mapStateToProps = (state) => {
  return {
    authInfo: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthInfo: (props) => dispatch({ type: "SET_AUTH_INFO", value: props }),
    setCurrentScreen: (props) =>
      dispatch({ type: "SET_CURRENT_SCREEN", value: props }),
  };
};

let AuthorizationComponent = ({ authInfo, setAuthInfo, setCurrentScreen }) => {
  let [firstName, setFirstName] = useState(authInfo.firstName);
  let [lastName, setLastName] = useState(authInfo.lastName);

  return (
    <Box h={"100%"}>
      <Center h={"100%"}>
        <Box w={""}>
          <Input
            placeholder={"Ваше имя"}
            _placeholder={{ color: "black" }}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Input
            placeholder={"Ваша фамилия"}
            _placeholder={{ color: "black" }}
            marginTop={2}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <Center>
            <Button
              colorScheme={"blue"}
              marginTop={5}
              isDisabled={firstName === "" || lastName === ""}
              onClick={() => {
                setAuthInfo({ firstName, lastName });
                setCurrentScreen(screens.TEST);
              }}
            >
              Начать тестирование
            </Button>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorizationComponent);
