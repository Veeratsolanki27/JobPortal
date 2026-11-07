import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database for Job Portal
let jobs = [
  {
    _id: "job1",
    roleName: "Backend Developer",
    companyName: "Infosys",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    techStack: ["Node.js", "Express.js", "MongoDB"],
    location: "Bangalore",
    experience: "3 years",
    salary: 50000,
    salaryType: "/month",
    jobType: "full-time",
    postDate: "2026-04-21T00:00:00.000Z",
    category: "Development",
    openings: 3,
    overview: "We need a Backend Developer to design APIs, manage databases, and build secure server-side applications.",
    responsibilities: [
      "Create and maintain REST APIs",
      "Design database models and optimize queries",
      "Implement authentication and authorization",
      "Collaborate with frontend developers"
    ],
    jobCriteria: [
      "Good knowledge of Node.js and Express.js",
      "Experience with MongoDB",
      "Understanding of authentication systems",
      "Problem-solving mindset"
    ],
    education: [
      "Bachelor's degree in Computer Science",
      "Strong backend project experience is a plus"
    ],
    status: "active"
  },
  {
    _id: "job2",
    roleName: "Senior UX Designer",
    companyName: "TechVision Inc",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80",
    techStack: ["Figma", "Adobe XD", "User Research", "Wireframing"],
    location: "Hyderabad",
    experience: "5 years",
    salary: 120000,
    salaryType: "/month",
    jobType: "full-time",
    postDate: "2026-04-18T00:00:00.000Z",
    category: "Design",
    openings: 2,
    overview: "Leading UX strategy and designing intuitive user-centered digital interfaces for enterprise applications.",
    responsibilities: [
      "Conduct user research and usability testing",
      "Create wireframes, user flows, and interactive prototypes",
      "Establish and maintain design systems"
    ],
    jobCriteria: [
      "5+ years of experience in UX/UI design",
      "Strong portfolio showcasing web and mobile apps",
      "Proficiency in Figma and Adobe Suite"
    ],
    education: [
      "Bachelor's or Master's in Design/HCI or related field"
    ],
    status: "active"
  },
  {
    _id: "job3",
    roleName: "Frontend Developer",
    companyName: "WebFlow Studios",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    location: "Remote",
    experience: "2 years",
    salary: 95000,
    salaryType: "/month",
    jobType: "remote",
    postDate: "2026-04-19T00:00:00.000Z",
    category: "Development",
    openings: 4,
    overview: "Build highly interactive, accessible, and fast web user interfaces for worldwide clients.",
    responsibilities: [
      "Develop clean, reusable React components",
      "Integrate RESTful APIs and state management",
      "Optimize web application performance"
    ],
    jobCriteria: [
      "Strong proficiency in React and JavaScript (ES6+)",
      "Hands-on experience with Tailwind CSS",
      "Familiarity with Git version control"
    ],
    education: [
      "B.Tech / B.E in CS / IT or relevant software experience"
    ],
    status: "active"
  }
];

let users = [
  {
    _id: "u1",
    name: "Demo Candidate",
    email: "user@demo.com",
    password: "password123",
    phone: "9876543210",
    role: "candidate"
  }
];

let applications = [
  {
    _id: "app1",
    jobId: "job1",
    applicantName: "Demo Candidate",
    email: "user@demo.com",
    appliedAt: new Date().toISOString(),
    status: "Pending"
  }
];

let companies = [
  { _id: "c1", companyName: "Infosys", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80", questionsCount: 15 },
  { _id: "c2", companyName: "TechVision Inc", logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80", questionsCount: 20 },
  { _id: "c3", companyName: "WebFlow Studios", logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=80", questionsCount: 12 }
];

let roles = [
  { _id: "r1", roleName: "Backend Developer", questionsCount: 25 },
  { _id: "r2", roleName: "Frontend Developer", questionsCount: 30 },
  { _id: "r3", roleName: "Senior UX Designer", questionsCount: 18 }
];

// Routes

// Get all jobs with optional search/filter
app.get('/api/jobs', (req, res) => {
  const { search, category, location, jobType } = req.query;
  let filtered = [...jobs];

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(j => 
      j.roleName.toLowerCase().includes(s) || 
      j.companyName.toLowerCase().includes(s) ||
      (j.techStack && j.techStack.some(t => t.toLowerCase().includes(s)))
    );
  }

  if (category) {
    filtered = filtered.filter(j => j.category.toLowerCase() === category.toLowerCase());
  }

  if (location) {
    filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (jobType) {
    filtered = filtered.filter(j => j.jobType.toLowerCase() === jobType.toLowerCase());
  }

  res.json({ success: true, count: filtered.length, jobs: filtered });
});

// Get job by ID
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j._id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, job });
});

// Create new job (Admin)
app.post('/api/jobs', (req, res) => {
  const newJob = {
    _id: "job_" + Date.now(),
    postDate: new Date().toISOString(),
    status: "active",
    companyLogo: req.body.companyLogo || "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80",
    ...req.body
  };
  jobs.unshift(newJob);
  res.status(201).json({ success: true, message: "Job created successfully", job: newJob });
});

// Update job (Admin)
app.put('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Job not found" });
  jobs[idx] = { ...jobs[idx], ...req.body };
  res.json({ success: true, message: "Job updated successfully", job: jobs[idx] });
});

// Delete job (Admin)
app.delete('/api/jobs/:id', (req, res) => {
  jobs = jobs.filter(j => j._id !== req.params.id);
  res.json({ success: true, message: "Job deleted successfully" });
});

// User Auth Routes
app.post('/api/users/signup', (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Email and password are required" });
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ success: false, message: "User already exists" });

  const newUser = { _id: "u_" + Date.now(), name, email, password, phone, role: "candidate" };
  users.push(newUser);
  res.status(201).json({ success: true, message: "Registration successful", user: newUser });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
  res.json({ success: true, message: "Login successful", user });
});

// Apply for Job
app.post('/api/applications', (req, res) => {
  const { jobId, applicantName, email } = req.body;
  const newApp = { _id: "app_" + Date.now(), jobId, applicantName, email, appliedAt: new Date().toISOString(), status: "Submitted" };
  applications.push(newApp);
  res.status(201).json({ success: true, message: "Application submitted successfully!", application: newApp });
});

// Get Applicants (Admin)
app.get('/api/applications', (req, res) => {
  res.json({ success: true, applications });
});

// Get Companies & Roles for Interview Prep
app.get('/api/interview/companies', (req, res) => {
  res.json({ success: true, companies });
});

app.get('/api/interview/roles', (req, res) => {
  res.json({ success: true, roles });
});

// Dashboard Stats (Admin)
app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'active').length,
      totalApplicants: applications.length,
      totalCompanies: companies.length
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Job Portal Backend Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`\n⚠️  Port ${PORT} is already in use (the server is ALREADY running on http://localhost:${PORT})!`);
    console.log(`You can open http://localhost:5000 in your browser or test API endpoints directly.\n`);
  } else {
    console.error('Server error:', err);
  }
});
