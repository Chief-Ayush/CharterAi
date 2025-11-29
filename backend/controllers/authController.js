const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { uploadPDF } = require("../utils/cloudinary");
const { extractFieldsFromPDF } = require("../utils/ocr");
const { analyzeBusinessScope } = require("../utils/businessAnalyzer");

/**
 * Login controller - Authenticate user
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return user data without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      businessName: user.businessName,
      timezone: user.timezone,
      country: user.country,
      businessType: user.businessType,
      businessOutline: user.businessOutline,
      segments: user.segments,
      currency: user.currency,
      numberOfEmployees: user.numberOfEmployees,
      gstin: user.gstin,
      gstFilingPeriod: user.gstFilingPeriod,
      gstScheme: user.gstScheme,
      businessDocs: user.businessDocs,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Signup controller - Create a new user account
 * POST /api/auth/signup
 */
const signup = async (req, res) => {
  try {
    const {
      email,
      phone,
      password,
      businessName,
      timezone,
      country,
      businessType,
      businessOutline,
      segments,
      currency,
      numberOfEmployees,
      gstin,
      gstFilingPeriod,
      gstScheme,
    } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!businessName) {
      return res.status(400).json({ error: "Business name is required" });
    }
    if (!timezone) {
      return res.status(400).json({ error: "Timezone is required" });
    }
    if (!country) {
      return res.status(400).json({ error: "Country is required" });
    }
    if (!currency) {
      return res.status(400).json({ error: "Currency is required" });
    }
    if (!gstFilingPeriod) {
      return res.status(400).json({ error: "GST filing period is required" });
    }
    if (!gstScheme) {
      return res.status(400).json({ error: "GST scheme is required" });
    }

    // Validate enum values
    const validGstFilingPeriods = [
      "monthly",
      "quarterly",
      "annually",
      "not_applicable",
    ];
    if (!validGstFilingPeriods.includes(gstFilingPeriod)) {
      return res.status(400).json({
        error: `GST filing period must be one of: ${validGstFilingPeriods.join(
          ", "
        )}`,
      });
    }

    const validGstSchemes = ["composition", "regular", "not_applicable"];
    if (!validGstSchemes.includes(gstScheme)) {
      return res.status(400).json({
        error: `GST scheme must be one of: ${validGstSchemes.join(", ")}`,
      });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Process business documents if uploaded
    let businessDocsArray = [];
    let isMultinational = false;
    let isMultistate = false;

    if (req.files && req.files.length > 0) {
      const ocrResults = [];

      for (const file of req.files) {
        try {
          // Upload to Cloudinary
          const uploadResult = await uploadPDF(file.buffer);

          businessDocsArray.push({
            filename: file.originalname,
            fileUrl: uploadResult.url,
            uploadedAt: new Date(),
          });

          // Extract text using OCR
          const ocrData = await extractFieldsFromPDF(uploadResult.url);
          ocrResults.push(ocrData.rawText);
        } catch (error) {
          console.error("Error processing business document:", error);
          // Continue with other files even if one fails
        }
      }

      // Analyze all OCR results combined
      if (ocrResults.length > 0) {
        const combinedText = ocrResults.join("\n\n");
        const analysis = analyzeBusinessScope(combinedText, country);

        isMultinational = analysis.isMultinational;
        isMultistate = analysis.isMultistate;
      }
    }

    // Create new user
    const newUser = new User({
      email,
      phone: phone || undefined,
      password: hashedPassword,
      businessName,
      timezone,
      country,
      businessType: businessType || undefined,
      businessOutline: businessOutline || undefined,
      segments: segments || [],
      currency,
      numberOfEmployees: numberOfEmployees || undefined,
      gstin: gstin || undefined,
      gstFilingPeriod,
      gstScheme,
      businessDocs: businessDocsArray,
      isMultinational,
      isMultistate,
    });

    await newUser.save();

    // Return user data without password
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      phone: newUser.phone,
      businessName: newUser.businessName,
      timezone: newUser.timezone,
      country: newUser.country,
      businessType: newUser.businessType,
      businessOutline: newUser.businessOutline,
      segments: newUser.segments,
      currency: newUser.currency,
      numberOfEmployees: newUser.numberOfEmployees,
      gstin: newUser.gstin,
      gstFilingPeriod: newUser.gstFilingPeriod,
      gstScheme: newUser.gstScheme,
      businessDocs: newUser.businessDocs,
      isMultinational: newUser.isMultinational,
      isMultistate: newUser.isMultistate,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
