import { Container, Box } from "@mui/material";
import CardBoard from "../Card/CardBoard";
import SearchUrl from "../SearchUrl/SearchUrl";

const App: React.FC = () => {
  return (
    <>
      <Container>
        <Box>
          <SearchUrl />
          <CardBoard />
        </Box>
      </Container>
    </>
  );
};

export default App;
