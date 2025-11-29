/**
 * Analyze business documents to determine if business is multinational or multistate
 * @param {string} rawText - The OCR extracted text from business document
 * @param {string} userCountry - The country provided by user
 * @returns {Object} - Analysis result
 */
const analyzeBusinessScope = (rawText, userCountry) => {
  if (!rawText) {
    return {
      isMultinational: false,
      isMultistate: false,
      detectedCountries: [],
      detectedStates: [],
      confidence: "low",
    };
  }

  const textLower = rawText.toLowerCase();

  // Lists of countries and Indian states for detection
  const countries = [
    "united states",
    "usa",
    "united kingdom",
    "uk",
    "canada",
    "australia",
    "germany",
    "france",
    "singapore",
    "dubai",
    "uae",
    "china",
    "japan",
    "hong kong",
    "malaysia",
    "indonesia",
    "thailand",
    "vietnam",
    "bangladesh",
    "sri lanka",
    "nepal",
    "pakistan",
    "south africa",
    "brazil",
    "mexico",
  ];

  const indianStates = [
    "andhra pradesh",
    "arunachal pradesh",
    "assam",
    "bihar",
    "chhattisgarh",
    "goa",
    "gujarat",
    "haryana",
    "himachal pradesh",
    "jharkhand",
    "karnataka",
    "kerala",
    "madhya pradesh",
    "maharashtra",
    "manipur",
    "meghalaya",
    "mizoram",
    "nagaland",
    "odisha",
    "punjab",
    "rajasthan",
    "sikkim",
    "tamil nadu",
    "telangana",
    "tripura",
    "uttar pradesh",
    "uttarakhand",
    "west bengal",
    "delhi",
    "puducherry",
    "chandigarh",
    "jammu and kashmir",
    "ladakh",
  ];

  // Detect countries
  const detectedCountries = [];
  for (const country of countries) {
    if (textLower.includes(country)) {
      detectedCountries.push(country);
    }
  }

  // Detect Indian states
  const detectedStates = [];
  if (userCountry && userCountry.toLowerCase() === "india") {
    for (const state of indianStates) {
      if (textLower.includes(state)) {
        detectedStates.push(state);
      }
    }
  }

  // Check for multinational indicators
  const multinationalKeywords = [
    "international",
    "global",
    "worldwide",
    "multinational",
    "import",
    "export",
    "overseas",
    "foreign",
    "cross-border",
    "branch office",
    "subsidiary",
  ];

  let multinationalIndicators = 0;
  for (const keyword of multinationalKeywords) {
    if (textLower.includes(keyword)) {
      multinationalIndicators++;
    }
  }

  // Check for multistate indicators (India specific)
  const multistateKeywords = [
    "pan india",
    "all india",
    "nationwide",
    "multi-state",
    "multistate",
    "interstate",
    "inter-state",
    "branches in",
    "offices across",
  ];

  let multistateIndicators = 0;
  for (const keyword of multistateKeywords) {
    if (textLower.includes(keyword)) {
      multistateIndicators++;
    }
  }

  // Determine if multinational
  const isMultinational =
    detectedCountries.length >= 2 || multinationalIndicators >= 2;

  // Determine if multistate
  const isMultistate = detectedStates.length >= 2 || multistateIndicators >= 2;

  // Calculate confidence
  let confidence = "low";
  if (
    detectedCountries.length >= 2 ||
    detectedStates.length >= 2 ||
    multinationalIndicators >= 3 ||
    multistateIndicators >= 3
  ) {
    confidence = "high";
  } else if (
    detectedCountries.length >= 1 ||
    detectedStates.length >= 1 ||
    multinationalIndicators >= 1 ||
    multistateIndicators >= 1
  ) {
    confidence = "medium";
  }

  return {
    isMultinational,
    isMultistate,
    detectedCountries: [...new Set(detectedCountries)], // Remove duplicates
    detectedStates: [...new Set(detectedStates)],
    confidence,
    indicators: {
      multinationalKeywords: multinationalIndicators,
      multistateKeywords: multistateIndicators,
    },
  };
};

module.exports = {
  analyzeBusinessScope,
};
