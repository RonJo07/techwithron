const nodemailer = require('nodemailer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const RON_EMAIL = process.env.RON_EMAIL;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://techwithron.co.in';

// Helper: Extract text from PDF
async function extractPdfText(pdfPath) {
  if (fs.existsSync(pdfPath)) {
    // Use Python and PyPDF2 to extract text
    const pyScript = `import sys\nfrom PyPDF2 import PdfReader\nreader = PdfReader(sys.argv[1])\ntext = ''\nfor page in reader.pages:\n    text += page.extract_text() or ''\nprint(text[:4000])`;
    const result = spawnSync('python', ['-c', pyScript, pdfPath], { encoding: 'utf-8' });
    if (result.stdout) return result.stdout;
    if (result.stderr) console.error('PyPDF2 error:', result.stderr);
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
  // Set CORS headers for every request, at the very top
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  // Handle preflight OPTIONS request immediately
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { message, userEmail, isFirstMessage, userName } = req.body;

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
  const system_prompt = `You are Ron Jo's AI assistant. Use only the information below to answer. If you don't know, say so and offer to forward the question to Ron.

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

HOBBIES:
- Ron enjoys coding, testing new technologies, playing games, travelling, cooking, and more in his free time.

LINKEDIN:
- Ron's LinkedIn: https://www.linkedin.com/in/ron-jo-linkme

INSTRUCTIONS:
- Be friendly and professional
- Answer questions about Ron's experience, projects, skills, hobbies, and LinkedIn
- If asked about something not covered, say: "I don't have specific information about that. Let me forward your question to Ron so he can provide you with accurate information."
- If someone wants to communicate with Ron, ask for their email address and forward it to Ron
- Keep responses concise but informative
- Never make up information not provided in the context
- If asked for a list of random questions people have asked, provide a sample list such as: ["What are Ron's hobbies?", "What projects has Ron worked on?", "How can I contact Ron?", "What skills does Ron have?", "What is Ron's LinkedIn?"]
`;

  const context = `${system_prompt}\n\nRESUME DATA (extracted from Ron_Jo_Resume.docx):\n${resumeText.slice(0, 4000)}\n\nPROFILE PDF DATA (extracted from profile.pdf):\n${profileText.slice(0, 4000)}`;

  // Default response
  let aiResponse = '';
  let requiresEmail = false;
  let needsEmailCollection = false;

  // If userName is not present, always ask for the name before answering anything else
  if (!userName) {
    aiResponse = "Before we continue, may I know your name?";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Custom handling for skills
  if (/^skills?$/i.test(message.trim()) || /what (are|is) (ron'?s )?skills?/i.test(message)) {
    aiResponse = "Ron is skilled in C#, JavaScript, Python, SQL, ASP.NET Core MVC, React, FastAPI, AWS (EC2, S3, RDS, Lambda), Docker, SQL Server, MySQL, Supabase, Git, Visual Studio, VS Code, Crystal Reports, TDD, CI/CD, RESTful APIs, and MVC.";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Custom handling for hobbies
  if (/hobby|hobbies/i.test(message)) {
    aiResponse = "Ron enjoys coding, testing new technologies, playing games, travelling, cooking, and more in his free time.";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Custom handling for LinkedIn
  if (/linkedin\s*id|linkedin|linked in/i.test(message)) {
    aiResponse = "You can find Ron's LinkedIn profile here: https://www.linkedin.com/in/ron-jo-linkme";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Custom handling for random questions
  if (/random questions|ask me the question people asked randomly|sample questions|example questions/i.test(message)) {
    aiResponse = "Here are some questions people have asked Ron's assistant:\n- What are Ron's hobbies?\n- What projects has Ron worked on?\n- How can I contact Ron?\n- What skills does Ron have?\n- What is Ron's LinkedIn?";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  // Custom handling for user offering to share more about themselves
  if (/do you want to know anything more about me|should i share more about myself|do you want to know more about me|anything else you want to know about me/i.test(message)) {
    aiResponse = "Thank you for offering to share more about yourself! As Ron Jo's AI assistant, I'm here to help answer questions about Ron. If you'd like to share more about yourself or leave a message for Ron, please let me know and I can forward it to him.";
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

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

      // Prepend OrionAI introduction if this is the first message
      if (isFirstMessage) {
        aiResponse = "Hi! I'm OrionAI, Ron Jo's AI assistant. Ask me anything about Ron's experience, projects, or skills!";
      } else if (/^\s*(hi|hello|hey|greetings|good morning|good afternoon|good evening)\s*$/i.test(message)) {
        // If the user greets again, reply with a short greeting and a sample list of questions
        aiResponse = "Hello! How can I help you today? Here is a sample list of common questions people ask:\n- What are Ron's hobbies?\n- What projects has Ron worked on?\n- How can I contact Ron?\n- What skills does Ron have?\n- What is Ron's LinkedIn?";
      }

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

  // If userName is present and the message is empty, greet the user
  if (userName && (!message || message.trim() === "")) {
    aiResponse = `Welcome, ${userName}! How can I help you today?`;
    return res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
  }

  res.json({ response: aiResponse, requiresEmail, needsEmailCollection });
};
