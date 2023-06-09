import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux-hooks";
import { retrieveDataRepo, retrieveIssuesRepo } from "../../redux/operations";
import { setCurrentTitle } from "../../redux/reposSlice";

const SearchFormUrl = (): JSX.Element => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const currentTitle = useAppSelector((state) => state.currentRepoTitle);

  const data = useAppSelector((state) =>
    state.arrRepoData.find((item) => item.fullName === currentTitle)
  );

  useEffect(() => {
    if (data === undefined && currentTitle !== "") {
      dispatch(retrieveDataRepo());
      dispatch(retrieveIssuesRepo());
    }
  }, [currentTitle]);

  const handlerLoadIssues = () => {
    const fullNameRepo = url.split("/").slice(-2).join("/");
    dispatch(setCurrentTitle({ currentTitle: fullNameRepo }));
  };

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
          label="Enter repo URL"
          size="small"
          sx={{ width: "80%" }}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ width: 155 }}
          size="small"
          onClick={handlerLoadIssues}
        >
          Load issues
        </Button>
      </Box>
      {data && data.fullName !== "" && (
        <Stack direction="row" spacing={2}>
          <Link href={url} underline="none" target="_blank">
            <Typography sx={{ color: "#4259CB" }}>{data.fullName}</Typography>
          </Link>
          <Stack direction="row">
            <StarIcon sx={{ color: "#E67700" }} />
            <Typography> {data.stargazersCount} starts</Typography>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default SearchFormUrl;
