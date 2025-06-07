require("dotenv").config();
const express = require("express");
const translator = require("open-google-translator");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

async function translateObject(obj, from, to) {
  const values = Object.values(obj);
  const translatedValues = await translator.TranslateLanguageData({
    listOfWordsToTranslate: values,
    fromLanguage: from,
    toLanguage: to,
  });

  const result = {};
  Object.keys(obj).forEach((key, index) => {
    result[key] = translatedValues[index]?.translation;
  });
  return result;
}

app.post("/translate", async (req, res) => {
  try {
    const { data, from = "ja", to = "en" } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Data object is required" });
    }

    const translatedData = await translateObject(data, from, to);
    res.json(translatedData);
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.get("/languages", async (req, res) => {
  try {
    const languages = await translator.supportedLanguages();
    res.json(languages);
  } catch (error) {
    console.error("Error getting languages:", error);
    res.status(500).json({ error: "Failed to get supported languages" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
