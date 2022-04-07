import { Box, Center, Text } from "@chakra-ui/react";
import { createStore } from "redux";
import { initialState, stateReducer } from "./reducer.js";
import AuthorizationComponent from "./screens/Auth.jsx";
import reference from "./screens/reference.js";
import { connect, Provider } from "react-redux";
import Question from "./screens/Question";
import Ending from "./screens/Ending";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : initialState;
let store = createStore(stateReducer, persistedState);
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

const mapStateToProps = (state) => {
  return {
    currentScreen: state.currentScreen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

let PreAppContainer = ({ currentScreen }) => {
  let sc;
  switch (currentScreen) {
    case reference.AUTH:
      sc = <AuthorizationComponent store={store} />;
      break;
    case reference.TEST:
      sc = <Question store={store} />;
      break;
    case reference.ENDING:
      sc = <Ending />;
  }

  return (
    <Box>
      <Center h={"100vh"}>
        <Box w={"100%"} h={"100%"} bgColor={"white"}>
          {sc}
        </Box>
      </Center>
    </Box>
  );
};

let AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreAppContainer);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
