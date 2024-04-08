import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Recommendation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSearchVolume = async () => {
    if (!inputValue.trim()) {
      handleOpenSnackbar();
      return;
    }

    const postArray = [
      {
        keywords: [inputValue],
      },
    ];

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
        postArray,
        {
          auth: {
            username: "aniket.wattamwar17@gmail.com",
            password: "6aa8991ae1ab613a",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data.tasks[0];
      if (result && result.result) {
        const searchData = result.result[0];
        setSearchData({
          competition: searchData.competition,
          competition_index: searchData.competition_index,
          search_volume: searchData.search_volume,
          keyword: searchData.keyword,
          monthly_searches: searchData.monthly_searches,
        });
        setChartData(
          searchData.monthly_searches.map((item) => ({
            ...item,
            date: `${item.month}-${item.year}`,
            search_volume: item.search_volume,
          }))
        );
      } else {
        console.error("No result found", result);
      }
    } catch (error) {
      console.error("Error while fetching search volume", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!inputValue.trim()) {
      handleOpenSnackbar();
      return;
    }

    const postArray = [
      {
        keywords: [inputValue],
      },
    ];

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live",
        postArray,
        {
          auth: {
            username: "aniket.wattamwar17@gmail.com",
            password: "6aa8991ae1ab613a",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data.tasks[0];
      if (result && result.result) {
        const searchData = result.result[1];
        setSearchData({
          competition: searchData.competition,
          competition_index: searchData.competition_index,
          search_volume: searchData.search_volume,
          recommended_keyword: searchData.keyword,
          monthly_searches: searchData.monthly_searches,
        });
        setChartData(
          searchData.monthly_searches.map((item) => ({
            ...item,
            date: `${item.month}-${item.year}`,
            search_volume: item.search_volume,
          }))
        );
      } else {
        console.error("No result found", result);
      }
    } catch (error) {
      console.error("Error while fetching search volume", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchData(null);
    setChartData([]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={12}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        style={{ alignSelf: "flex-start", marginBottom: "20px", marginLeft:"10px" }}
      >
        Back
      </Button>
      <TextField
        label="Enter Text"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={handleClear}
                onMouseDown={(event) => event.preventDefault()}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box>
        <Button
          variant="contained"
          onClick={handleSearchVolume}
          style={{ marginRight: "10px" }}
        >
          Search
        </Button>
        <Button variant="contained" onClick={handleRecommend}>
          Recommend
        </Button>
      </Box>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ margin: "20px", marginBottom: "30px" }} />
          <Typography variant="h6">Fetching Data, please wait...!!!</Typography>
        </div>
      ) : (
        searchData && (
          <>
            <Box
              width="80%"
              p={3}
              boxShadow={3}
              style={{
                transition: "transform 0.5s, opacity 0.5s",
                transform: "scale(1)",
                opacity: 1,
                marginTop: 16,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {searchData.recommended_keyword ? (
                  <label>
                    Recommended Keyword: {searchData.recommended_keyword}
                  </label>
                ) : (
                  searchData.keyword
                )}
              </Typography>
              <Typography>
                <b>Competition:</b> {searchData.competition}
              </Typography>
              <Typography>
                <b>Competition Index:</b> {searchData.competition_index}
              </Typography>
              <Typography>
                <b>Avg Search Volume:</b>{" "}
                {searchData.search_volume.toLocaleString()}
              </Typography>
            </Box>
            <ResponsiveContainer width="80%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 35, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="search_volume"
                  stroke="#f02936"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: 4 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Text cannot be empty!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Recommendation;
