import { Box } from "@mui/material";
//import { DragDropContext, DropResult } from "react-beautiful-dnd";

const CardBoard = (): JSX.Element => {
  return (
    <>
      {
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        ></Box>
      }
    </>
  );
};

export default CardBoard;
