import { Container, Box } from "@mui/material";
import CardBoard from "../Card/CardBoard";
import SearchUrl from "../SearchUrl/SearchUrl";
import { persistor, store } from "../../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Box>
              <SearchUrl />
              <CardBoard />
            </Box>
          </Container>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
