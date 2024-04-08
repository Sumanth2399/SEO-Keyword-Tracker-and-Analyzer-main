import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const typingSpeed = 100;
  const [urlError, setUrlError] = useState("");
  const navigate = useNavigate();
  const placeholderTexts = ["Enter the URL here", "Enter URL to webscrape"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openCheckboxSnackbar, setOpenCheckboxSnackbar] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    selectAll: false,
    rabinKarp: false,
    suffixTree: false,
    suffixArray: false,
    naiveStringMatching: false,
    kmpAlgorithm: false,
  });

  const [loadingSteps, setLoadingSteps] = useState([
    "Scraping website...",
    "Extracting data...",
    "Filtering data...",
    "Removing stopwords...",
    "Runnning algorithms...",
    "Counting words...",
    "Generating word cloud...",
    "Almost reached...",
    // Add more steps as needed
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOpenCheckboxSnackbar = () => {
    setOpenCheckboxSnackbar(true);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenCheckboxSnackbar(false);
  };

  useEffect(() => {
    let stepIndex = 0;

    const showNextStep = () => {
      setCurrentStep(stepIndex);
      stepIndex = (stepIndex + 1) % loadingSteps.length;
    };

    const interval = setInterval(showNextStep, 2000); // Change the interval duration as needed

    showNextStep(); // Show the first step immediately

    return () => {
      clearInterval(interval);
    };
  }, [loadingSteps]);

  useEffect(() => {
    let currentIndex = 0;
    let interval;

    if (!inputValue) {
      interval = setInterval(() => {
        if (currentIndex <= placeholderTexts[placeholderIndex].length) {
          setAnimatedPlaceholder(
            placeholderTexts[placeholderIndex].substring(0, currentIndex)
          );
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setAnimatedPlaceholder("");
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % 2);
          }, 2000); // Wait 2 seconds before switching to the next placeholder
        }
      }, typingSpeed);
    } else {
      setAnimatedPlaceholder(""); // Reset the animated placeholder if there's user input
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [placeholderIndex, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (urlError) {
      setUrlError("");
    }
  };

  const postString = async () => {
    if (!inputValue.trim()) {
      setUrlError("Text cannot be empty!");
      handleOpenSnackbar();
      return;
    }

    const selectedCheckboxes = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key])
      .map((key) => key);

    if (selectedCheckboxes.length === 0) {
      setUrlError("Please select at least one algorithm!");
      handleOpenCheckboxSnackbar();
      return;
    }

    if (!validateUrl(inputValue.trim())) {
      setUrlError("Please enter a valid URL");
      return;
    }

    try {
      setIsLoading(true);

      const dataToSend = {
        data: inputValue,
        selectedCheckboxes,
      };

      const response = await axios.post("http://127.0.0.1:5000/", dataToSend);
      localStorage.setItem("responseData", JSON.stringify(response.data));
      navigate("/main");
    } catch (error) {
      console.error("Error posting string:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      const newValues = {
        selectAll: checked,
        rabinKarp: checked,
        suffixTree: checked,
        suffixArray: checked,
        naiveStringMatching: checked,
        kmpAlgorithm: checked,
      };
      setCheckboxValues(newValues);
    } else {
      setCheckboxValues({
        ...checkboxValues,
        [name]: checked,
        selectAll: false,
      });
    }
  };

  const clearInputAndCheckboxes = () => {
    setInputValue("");
    setUrlError("");
    setCheckboxValues({
      selectAll: false,
      rabinKarp: false,
      suffixTree: false,
      suffixArray: false,
      naiveStringMatching: false,
      kmpAlgorithm: false,
    });
  };

  const validateUrl = (url) => {
    const urlRegex =
      /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/;
    return urlRegex.test(url);
  };

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress style={{ margin: "20px", marginBottom: "30px" }} />
      <Typography variant="h6">{loadingSteps[currentStep]}</Typography>
    </div>
  ) : (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Paper elevation={24}>
        <Box p={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Web Scraping
          </Typography>
          <form>
            <Box mb={3}>
              <TextField
                fullWidth
                variant="standard"
                size="large"
                InputProps={{
                  style: {
                    fontSize: "24px",
                    borderBottom: "3px solid black",
                  },
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter the URL"
                error={urlError !== ""}
                helperText={urlError}
                FormHelperTextProps={{
                  style: { fontSize: "1rem" },
                }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.rabinKarp}
                      onChange={handleCheckboxChange}
                      name="rabinKarp"
                    />
                  }
                  label="Rabin-Karp"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.suffixTree}
                      onChange={handleCheckboxChange}
                      name="suffixTree"
                    />
                  }
                  label="Suffix Tree"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.suffixArray}
                      onChange={handleCheckboxChange}
                      name="suffixArray"
                    />
                  }
                  label="Suffix Array"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.naiveStringMatching}
                      onChange={handleCheckboxChange}
                      name="naiveStringMatching"
                    />
                  }
                  label="Naive String Matching"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.kmpAlgorithm}
                      onChange={handleCheckboxChange}
                      name="kmpAlgorithm"
                    />
                  }
                  label="KMP Algorithm"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues.selectAll}
                      onChange={handleCheckboxChange}
                      name="selectAll"
                    />
                  }
                  label="Select All"
                />
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={postString}
                style={{ marginRight: "10px" }}
              >
                Analyze
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearInputAndCheckboxes}
              >
                Refresh
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar || openCheckboxSnackbar}
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
          {urlError}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
