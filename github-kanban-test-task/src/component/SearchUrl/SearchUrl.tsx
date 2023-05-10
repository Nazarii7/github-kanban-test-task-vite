import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchUrl = (): JSX.Element => {
  const [url, setUrl] = useState("");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", mt: "15px", mb: "15px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: "15px",
          justifyContent: "space-between",
        }}
      >
        <TextField
          variant="outlined"
          label="Enter repo Url"
          size="small"
          sx={{ width: "80%" }}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button variant="contained" sx={{ width: 155 }} size="small">
          Load issues
        </Button>
      </Box>
    </Box>
  );
};

export default SearchUrl;
