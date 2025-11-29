const axios = require("axios");

/**
 * Extract fields from PDF using text parsing
 * @param {string} fileUrl - The URL of the PDF file to process
 * @returns {Promise<Object>} - Extracted OCR data
 */
const extractFieldsFromPDF = async (fileUrl) => {
  try {
    // Dynamically import pdf-parse (ES Module)
    const pdfParse = (await import("pdf-parse")).default;

    // Download the PDF file
    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });
    const pdfBuffer = Buffer.from(response.data);

    // Extract text from PDF
    const pdfData = await pdfParse(pdfBuffer);
    let rawText = pdfData.text;

    // If no text extracted, return empty structure
    if (!rawText || rawText.trim().length < 10) {
      console.log("PDF text extraction failed or minimal text found");
      rawText = "";
    }

    // Parse structured fields from the extracted text
    const ocrData = {
      rawText: rawText,
      vendorName: extractVendorName(rawText),
      invoiceNumber: extractInvoiceNumber(rawText),
      invoiceDate: extractInvoiceDate(rawText),
      dueDate: extractDueDate(rawText),
      totalAmount: extractTotalAmount(rawText),
      taxAmount: extractTaxAmount(rawText),
      subtotal: extractSubtotal(rawText),
      gstRate: extractGSTRate(rawText),
      lineItems: extractLineItems(rawText),
    };

    return ocrData;
  } catch (error) {
    throw new Error(`OCR extraction failed: ${error.message}`);
  }
};

/**
 * Extract vendor/company name from raw text
 * Looks for company-like patterns at the top of the document
 */
const extractVendorName = (rawText) => {
  if (!rawText) return null;

  const lines = rawText.split("\n").filter((line) => line.trim());

  // Common vendor name patterns
  const vendorPatterns = [
    /(?:from|vendor|supplier|company|seller)[\s:]+(.+)/i,
    /^([A-Z][A-Za-z\s&.,]+(?:ltd|limited|pvt|inc|corp|llc|llp))/im,
  ];

  for (const pattern of vendorPatterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Fallback: take first non-empty line that looks like a company name
  for (const line of lines.slice(0, 5)) {
    if (/[A-Z]/.test(line) && line.length > 3 && line.length < 100) {
      return line.trim();
    }
  }

  return null;
};

/**
 * Extract invoice number from raw text
 */
const extractInvoiceNumber = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /invoice\s*(?:no|number|#)[\s:]*([A-Z0-9\-\/]+)/i,
    /bill\s*(?:no|number|#)[\s:]*([A-Z0-9\-\/]+)/i,
    /receipt\s*(?:no|number|#)[\s:]*([A-Z0-9\-\/]+)/i,
    /(?:no|number|#)[\s:]*([A-Z]{2,}\d{3,})/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
};

/**
 * Extract invoice date from raw text
 */
const extractInvoiceDate = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /invoice\s*date[\s:]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
    /date[\s:]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
    /dated[\s:]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
    /(\d{1,2}[-\/]\d{1,2}[-\/]\d{4})/,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const dateStr = match[1];
      const parsedDate = parseDate(dateStr);
      if (parsedDate) return parsedDate;
    }
  }

  return null;
};

/**
 * Extract due date from raw text
 */
const extractDueDate = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /due\s*date[\s:]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
    /payment\s*due[\s:]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const dateStr = match[1];
      const parsedDate = parseDate(dateStr);
      if (parsedDate) return parsedDate;
    }
  }

  return null;
};

/**
 * Parse date string to Date object
 */
const parseDate = (dateStr) => {
  try {
    // Handle various date formats: DD/MM/YYYY, DD-MM-YYYY, etc.
    const parts = dateStr.split(/[-\/]/);
    if (parts.length === 3) {
      let day, month, year;

      // Assume DD/MM/YYYY or DD-MM-YYYY format (common in India)
      day = parseInt(parts[0]);
      month = parseInt(parts[1]) - 1; // Months are 0-indexed
      year = parseInt(parts[2]);

      // Handle 2-digit years
      if (year < 100) {
        year += year < 50 ? 2000 : 1900;
      }

      const date = new Date(year, month, day);
      return isNaN(date.getTime()) ? null : date;
    }
  } catch (error) {
    return null;
  }
  return null;
};

/**
 * Extract total amount from raw text
 */
const extractTotalAmount = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /total[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
    /grand\s*total[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
    /amount\s*payable[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
    /net\s*amount[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const amount = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(amount)) return amount;
    }
  }

  return null;
};

/**
 * Extract tax/GST amount from raw text
 */
const extractTaxAmount = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /(?:gst|tax|igst|cgst|sgst)[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
    /tax\s*amount[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const amount = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(amount)) return amount;
    }
  }

  return null;
};

/**
 * Extract subtotal from raw text
 */
const extractSubtotal = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /sub[\s-]*total[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
    /taxable\s*amount[\s:]*(?:rs\.?|₹|inr)?[\s]*([0-9,]+\.?\d{0,2})/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const amount = parseFloat(match[1].replace(/,/g, ""));
      if (!isNaN(amount)) return amount;
    }
  }

  return null;
};

/**
 * Extract GST rate from raw text
 */
const extractGSTRate = (rawText) => {
  if (!rawText) return null;

  const patterns = [
    /gst[\s@:]*(\d{1,2})%/i,
    /(?:cgst|sgst|igst)[\s@:]*(\d{1,2})%/i,
    /tax[\s@:]*(\d{1,2})%/i,
  ];

  for (const pattern of patterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      const rate = parseInt(match[1]);
      if (!isNaN(rate) && rate >= 0 && rate <= 100) return rate;
    }
  }

  return null;
};

/**
 * Extract line items from raw text
 * This is a basic implementation - may need refinement based on actual invoice formats
 */
const extractLineItems = (rawText) => {
  if (!rawText) return [];

  const lineItems = [];
  const lines = rawText.split("\n");

  // Look for table-like structures with quantity, rate, amount
  const itemPattern = /(.+?)\s+(\d+)\s+(?:rs\.?|₹)?[\s]*([0-9,]+\.?\d{0,2})/i;

  for (const line of lines) {
    const match = line.match(itemPattern);
    if (match) {
      const description = match[1].trim();
      const quantity = parseInt(match[2]);
      const rate = parseFloat(match[3].replace(/,/g, ""));

      if (description && !isNaN(quantity) && !isNaN(rate)) {
        lineItems.push({
          description,
          quantity,
          rate,
        });
      }
    }
  }

  return lineItems;
};

module.exports = {
  extractFieldsFromPDF,
};
