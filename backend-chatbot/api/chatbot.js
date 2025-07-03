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
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://techwithron.co.in';

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
  // Set CORS headers for every request
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message, userEmail } = req.body;

  // Extract data from files
  const resumePath = path.join(__dirname, '../data/Ron_Jo_Resume.docx');
  const profilePdfPath = path.join(__dirname, '../data/profile.pdf');

  const [resumeText, profileText] = await Promise.all([
    extractDocxText(resumePath),
    extractPdfText(profilePdfPath)
  ]);

  // Define variables for prompt
  const name = 'Ron Jo';
  const summary = `Certified AWS Solutions Architect Associate and Full Stack Developer\nSpecializing in ASP.NET Core, Web APIs, SQL, and AWS\nBuilding Scalable Web Applications\nTransforming Ideas into Interactive Experiences\nCrafting Code with Creativity and Minimalism\n\nEXPERIENCE:\n- SSK Infotech PVT LTD (2024 - Present): Software Developer\n  * Developed secure ASP.NET MVC web applications with role-based authorization\n  * Reduced vulnerabilities by 40%, accelerated delivery by 30%\n  * Optimized SQL queries improving performance by 20%\n  * Automated reporting using Crystal Reports, reducing generation time by 25%\n  * Built desktop applications with C#/WPF\n  * Automated data processing tasks using Python, reducing manual workload by 34%\n\n- Santhisoft Technologies (2023): Software Developer\n  * Developed RESTful APIs using ASP.NET Web API, improving backend performance by 35%\n  * Enhanced data handling using SQL Server queries and stored procedures\n  * Applied MVC and TDD principles for scalable web application development\n  * Integrated Crystal Reports with SQL databases to automate reporting\n\nPROJECTS:\n1. Pulse - A Tap Timing Game\n   - React 18.2.0, FastAPI 0.104.1, Python 3.11, Supabase\n   - Features: precise tap timing, global leaderboard, achievement system, PWA support\n   - GitHub: https://github.com/RonJo07/Pulse-Game\n\n2. Luna AI - Smart Coding Assistant\n   - FastAPI, Python, Phi-4 model\n   - Features: local AI processing, privacy-focused, code suggestions\n   - GitHub: https://github.com/RonJo07/Luna-AI-Smart-Coding-Assistant\n\n3. MyStore - E-commerce Platform\n   - ASP.NET Core MVC, SQL Server, Entity Framework\n   - Features: user authentication, shopping cart, order management\n   - GitHub: https://github.com/RonJo07/MyStore.git\n\nSKILLS:\n- C#, JavaScript, Python, SQL, ASP.NET Core MVC, React, FastAPI, AWS (EC2, S3, RDS, Lambda), Docker, SQL Server, MySQL, Supabase, Git, Visual Studio, VS Code, Crystal Reports, TDD, CI/CD, RESTful APIs, MVC`;
  const linkedin = 'https://www.linkedin.com/in/ron-jo-linkme';

  // Compose context from your site, resume, and PDFs
  const system_prompt = `You are acting as assistant for  ${name}. You are answering questions on ${name}'s website, particularly questions related to ${name}'s career, background, skills and experience. Your responsibility is to represent ${name} for interactions on the website as faithfully as possible. You are given a summary of ${name}'s background and LinkedIn profile which you can use to answer questions. Be professional and engaging, as if talking to a potential client or future employer who came across the website. If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool.`;
  system_prompt += `\n\n## Summary:\n${summary}\n\n## LinkedIn Profile:\n${linkedin}\n\n`;
  system_prompt += `With this context, please chat with the user, always staying in character as ${name}.`;

  const context = `${system_prompt}\n\nRESUME DATA (extracted from Ron_Jo_Resume.docx):\n${resumeText.slice(0, 4000)}\n\nPROFILE PDF DATA (extracted from profile.pdf):\n${profileText.slice(0, 4000)}`;

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
      // Use Gemini 2.0 Flash via HTTP API
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${context}\n\nUser: ${message}\n\nAssistant:` }
                ]
              }
            ]
          })
        }
      );

      if (!geminiResponse.ok) throw new Error("Gemini API error");

      const geminiData = await geminiResponse.json();
      // Extract the response text
      aiResponse =
        geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process your request right now. Please leave your email and I'll get back to you!";

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
