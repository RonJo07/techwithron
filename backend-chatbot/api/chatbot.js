const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RON_EMAIL = process.env.RON_EMAIL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// Helper: Extract text from PDF
async function extractPdfText(pdfPath) {
  if (fs.existsSync(pdfPath)) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }
  return '';
}

// Helper: Extract text from DOCX
async function extractDocxText(docxPath) {
  if (fs.existsSync(docxPath)) {
    const data = await mammoth.extractRawText({ path: docxPath });
    return data.value;
  }
  return '';
}

// Helper: Send email to Ron
async function sendEmailToRon({ userMessage, userEmail }) {
  if (!EMAIL_USER || !EMAIL_PASS || !RON_EMAIL) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });
  await transporter.sendMail({
    from: EMAIL_USER,
    to: RON_EMAIL,
    subject: 'Portfolio Chatbot Inquiry',
    html: `<p><b>Question:</b> ${userMessage}</p>
           <p><b>User Email:</b> ${userEmail || 'Not provided'}</p>
           <p><b>Timestamp:</b> ${new Date().toISOString()}</p>`
  });
}

// Main handler
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message, userEmail } = req.body;

  // Extract data from files
  const resumePath = path.join(__dirname, '../data/Ron_Jo_Resume.docx');
  const profilePdfPath = path.join(__dirname, '../data/profile.pdf');

  const [resumeText, profileText] = await Promise.all([
    extractDocxText(resumePath),
    extractPdfText(profilePdfPath)
  ]);

  // Compose context from your site, resume, and PDFs
  const context = `
You are Ron Jo's AI assistant. Use only the information below to answer. If you don't know, say so and offer to forward the question to Ron.

PROFESSIONAL SUMMARY:
- Certified AWS Solutions Architect Associate and Full Stack Developer
- Specializing in ASP.NET Core, Web APIs, SQL, and AWS
- Building Scalable Web Applications
- Transforming Ideas into Interactive Experiences
- Crafting Code with Creativity and Minimalism

EXPERIENCE:
- SSK Infotech PVT LTD (2024 - Present): Software Developer
  * Developed secure ASP.NET MVC web applications with role-based authorization
  * Reduced vulnerabilities by 40%, accelerated delivery by 30%
  * Optimized SQL queries improving performance by 20%
  * Automated reporting using Crystal Reports, reducing generation time by 25%
  * Built desktop applications with C#/WPF
  * Automated data processing tasks using Python, reducing manual workload by 34%

- Santhisoft Technologies (2023): Software Developer
  * Developed RESTful APIs using ASP.NET Web API, improving backend performance by 35%
  * Enhanced data handling using SQL Server queries and stored procedures
  * Applied MVC and TDD principles for scalable web application development
  * Integrated Crystal Reports with SQL databases to automate reporting

PROJECTS:
1. Pulse - A Tap Timing Game
   - React 18.2.0, FastAPI 0.104.1, Python 3.11, Supabase
   - Features: precise tap timing, global leaderboard, achievement system, PWA support
   - GitHub: https://github.com/RonJo07/Pulse-Game

2. Luna AI - Smart Coding Assistant
   - FastAPI, Python, Phi-4 model
   - Features: local AI processing, privacy-focused, code suggestions
   - GitHub: https://github.com/RonJo07/Luna-AI-Smart-Coding-Assistant

3. MyStore - E-commerce Platform
   - ASP.NET Core MVC, SQL Server, Entity Framework
   - Features: user authentication, shopping cart, order management
   - GitHub: https://github.com/RonJo07/MyStore.git

SKILLS:
- C#, JavaScript, Python, SQL, ASP.NET Core MVC, React, FastAPI, AWS (EC2, S3, RDS, Lambda), Docker, SQL Server, MySQL, Supabase, Git, Visual Studio, VS Code, Crystal Reports, TDD, CI/CD, RESTful APIs, MVC

RESUME DATA (extracted from Ron_Jo_Resume.docx):
${resumeText.slice(0, 4000)}

PROFILE PDF DATA (extracted from profile.pdf):
${profileText.slice(0, 4000)}

INSTRUCTIONS:
- Be friendly and professional
- Answer questions about Ron's experience, projects, and skills
- If asked about something not covered, say: "I don't have specific information about that. Let me forward your question to Ron so he can provide you with accurate information."
- If someone wants to communicate with Ron, ask for their email address and forward it to Ron
- Keep responses concise but informative
- Never make up information not provided in the context
`;

  // Default response
  let aiResponse = '';
  let requiresEmail = false;
  let needsEmailCollection = false;

  // Detect if user wants to contact you
  if (
    /contact|email|communicate|reach out|connect/i.test(message)
  ) {
    needsEmailCollection = true;
    aiResponse = "I'd be happy to help you connect with Ron! Could you please provide your email address so I can forward your message to him?";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Try Gemini AI if available
  if (GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(`${context}\n\nUser: ${message}\n\nAssistant:`);
      aiResponse = result.response.text();

      // If AI doesn't know, forward to Ron
      if (
        /don't have specific information|forward your question|not sure|no information/i.test(aiResponse)
      ) {
        requiresEmail = true;
        await sendEmailToRon({ userMessage: message, userEmail });
        aiResponse = "I don't have specific information about that. I've forwarded your question to Ron, and he'll get back to you soon.";
      }
    } catch (e) {
      aiResponse = "Sorry, I couldn't process your request right now. Please leave your email and I'll get back to you!";
      requiresEmail = true;
      await sendEmailToRon({ userMessage: message, userEmail });
    }
  } else {
    // Gemini not available
    aiResponse = "AI is currently unavailable. Please leave your email and Ron will get back to you!";
    requiresEmail = true;
    await sendEmailToRon({ userMessage: message, userEmail });
  }

  res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
};
