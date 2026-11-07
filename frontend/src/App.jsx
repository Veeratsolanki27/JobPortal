import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { 
  Briefcase, Search, Home, UserCog, Bookmark, UserCheck, LogIn, User, 
  MapPin, Clock, DollarSign, CheckCircle2, ChevronRight, Filter, Building, 
  Sparkles, Award, Users, ArrowUp, Send, Heart, X, CheckCircle
} from "lucide-react";

// API Base URL
const API_URL = "http://localhost:5000/api";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Navbar Component
const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jobportal_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Briefcase size={22} />
          </div>
          <span>Job<span className="text-white">Pulse</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className={`hover:text-blue-400 transition ${location.pathname === '/' ? 'text-blue-400 font-semibold' : ''}`}>Home</Link>
          <Link to="/jobs" className={`hover:text-blue-400 transition ${location.pathname.startsWith('/jobs') ? 'text-blue-400 font-semibold' : ''}`}>Find Jobs</Link>
          <Link to="/companies" className={`hover:text-blue-400 transition ${location.pathname === '/companies' ? 'text-blue-400 font-semibold' : ''}`}>Companies</Link>
          <Link to="/saved" className={`hover:text-blue-400 transition ${location.pathname === '/saved' ? 'text-blue-400 font-semibold' : ''}`}>Saved Jobs</Link>
          <Link to="/contact" className={`hover:text-blue-400 transition ${location.pathname === '/contact' ? 'text-blue-400 font-semibold' : ''}`}>Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-200 hidden sm:inline">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition">
                Log In
              </Link>
              <Link to="/signup" className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Hero Banner & Home Page Component
const HomePage = ({ savedJobs, toggleSaveJob }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setJobs(data.jobs);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles size={14} /> #1 Tech & Corporate Opportunity Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Find Your Dream Job & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Build Your Career Path
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg mb-10">
            Explore thousands of curated job listings from top companies worldwide. Apply directly with one click and fast-track your hiring process.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto p-2 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-blue-500/10 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Job title, tech stack, or company..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <MapPin size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="City, country, or remote..." 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
              <Search size={16} /> Search
            </button>
          </form>

          {/* Quick Category Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-slate-500">Popular:</span>
            {["Frontend", "Backend", "Fullstack", "Design", "DevOps"].map(cat => (
              <button 
                key={cat}
                onClick={() => navigate(`/jobs?search=${cat}`)}
                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Latest Job Openings</h2>
            <p className="text-slate-400 text-sm mt-1">Handpicked fresh roles for software developers and tech experts.</p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition">
            View All Jobs <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map(job => (
            <JobCard key={job._id} job={job} savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Reusable Job Card Component
const JobCard = ({ job, savedJobs, toggleSaveJob }) => {
  const isSaved = savedJobs.some(j => j._id === job._id);

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={job.companyLogo} alt={job.companyName} className="w-12 h-12 rounded-xl object-cover bg-slate-800 border border-slate-700" />
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{job.roleName}</h3>
              <p className="text-sm text-slate-400 flex items-center gap-1"><Building size={14} /> {job.companyName}</p>
            </div>
          </div>
          <button 
            onClick={() => toggleSaveJob(job)} 
            className={`p-2 rounded-xl border transition ${isSaved ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1">
            <MapPin size={12} className="text-blue-400" /> {job.location}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1">
            <Clock size={12} className="text-emerald-400" /> {job.jobType}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1">
            <DollarSign size={12} className="text-amber-400" /> ₹{job.salary.toLocaleString()}{job.salaryType}
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{job.overview}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {job.techStack && job.techStack.map((tech, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[11px] font-medium border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <Link 
        to={`/jobs/${job._id}`}
        className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-semibold text-xs rounded-xl text-center transition-all duration-200 block"
      >
        View Details & Apply
      </Link>
    </div>
  );
};

// Jobs Listing Page
const JobsPage = ({ savedJobs, toggleSaveJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");

  useEffect(() => {
    setLoading(true);
    let query = `${API_URL}/jobs?`;
    if (search) query += `search=${encodeURIComponent(search)}&`;
    if (selectedCategory) query += `category=${encodeURIComponent(selectedCategory)}&`;

    fetch(query)
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setJobs(data.jobs);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Find Available Jobs</h1>
        <p className="text-slate-400 text-sm mt-1">Browse and filter from all live job opportunities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-xl border border-slate-800">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter by title, company or skill..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
          />
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />
          ))}
        </div>
      )}
    </div>
  );
};

// Job Details Page Component
const JobDetailsPage = ({ user }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [applicantName, setApplicantName] = useState(user ? user.name : "");
  const [applicantEmail, setApplicantEmail] = useState(user ? user.email : "");

  useEffect(() => {
    fetch(`${API_URL}/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.job) setJob(data.job);
      });
  }, [id]);

  const handleApply = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: id, applicantName, email: applicantEmail })
    })
      .then(res => res.json())
      .then(() => {
        setApplied(true);
        setShowModal(false);
      });
  };

  if (!job) return <div className="min-h-screen bg-slate-950 py-20 text-center text-slate-400">Loading job details...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img src={job.companyLogo} alt={job.companyName} className="w-16 h-16 rounded-2xl object-cover border border-slate-700 bg-slate-800" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{job.roleName}</h1>
              <p className="text-base text-blue-400 font-semibold mt-1">{job.companyName}</p>
            </div>
          </div>
          {applied ? (
            <div className="px-6 py-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl font-bold text-sm flex items-center gap-2">
              <CheckCircle size={18} /> Application Submitted
            </div>
          ) : (
            <button 
              onClick={() => setShowModal(true)} 
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block">Location</span>
            <span className="font-semibold text-slate-200">{job.location}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Salary</span>
            <span className="font-semibold text-emerald-400">₹{job.salary.toLocaleString()}{job.salaryType}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Experience</span>
            <span className="font-semibold text-slate-200">{job.experience}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Openings</span>
            <span className="font-semibold text-slate-200">{job.openings} Open Positions</span>
          </div>
        </div>

        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Job Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{job.overview}</p>
          </div>

          {job.responsibilities && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.jobCriteria && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Requirements & Criteria</h3>
              <ul className="space-y-2">
                {job.jobCriteria.map((c, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Apply for {job.roleName}</h3>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={applicantName} 
                  onChange={(e) => setApplicantName(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={applicantEmail} 
                  onChange={(e) => setApplicantEmail(e.target.value)} 
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white rounded-xl transition">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Saved Jobs Component
const SavedJobsPage = ({ savedJobs, toggleSaveJob }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white mb-2">Saved Jobs</h1>
      <p className="text-slate-400 text-sm mb-8">Review your bookmarked opportunities.</p>

      {savedJobs.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400">You haven't saved any jobs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(job => (
            <JobCard key={job._id} job={job} savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />
          ))}
        </div>
      )}
    </div>
  );
};

// Login Page Component
const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("jobportal_user", JSON.stringify(data.user));
          setUser(data.user);
          navigate("/");
        } else {
          setError(data.message || "Invalid credentials");
        }
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Log in to manage your applications and saved jobs</p>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="user@demo.com" 
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="password123" 
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white rounded-xl transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

// Companies Page Component
const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/interview/companies`)
      .then(res => res.json())
      .then(data => {
        if (data.companies) setCompanies(data.companies);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Top Hiring Companies</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Explore leading tech corporations and innovative startups actively hiring software engineers, designers, and managers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(comp => (
          <div key={comp._id} className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={comp.logo} alt={comp.companyName} className="w-14 h-14 rounded-2xl object-cover border border-slate-800 bg-slate-950" />
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{comp.companyName}</h3>
                  <span className="text-xs text-blue-400 font-semibold">{comp.questionsCount} Interview Q&As</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Leading software & enterprise solution provider actively conducting hiring rounds for backend and frontend engineering roles.
              </p>
            </div>
            <button 
              onClick={() => navigate(`/jobs?search=${encodeURIComponent(comp.companyName)}`)}
              className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-semibold text-xs rounded-xl transition text-center"
            >
              View Open Jobs at {comp.companyName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Roles Page Component
const RolesPage = () => {
  const navigate = useNavigate();
  const popularRoles = [
    { title: "Backend Developer", tag: "Backend", desc: "Design APIs, databases, microservices, and server architecture using Node.js, Python, or Java.", avgSalary: "₹60,000 - ₹1,50,000/mo" },
    { title: "Frontend Developer", tag: "Frontend", desc: "Build responsive, fast web UIs using React, TypeScript, Vue, and modern CSS frameworks.", avgSalary: "₹50,000 - ₹1,20,000/mo" },
    { title: "Senior UX Designer", tag: "Design", desc: "Craft intuitive user flows, interactive Figma prototypes, and human-centered design systems.", avgSalary: "₹80,000 - ₹1,80,000/mo" },
    { title: "Fullstack Engineer", tag: "Fullstack", desc: "End-to-end application engineering covering client interfaces down to cloud deployment.", avgSalary: "₹70,000 - ₹1,60,000/mo" },
    { title: "DevOps & Cloud Engineer", tag: "DevOps", desc: "Manage CI/CD pipelines, Docker containers, Kubernetes, and cloud infrastructure.", avgSalary: "₹75,000 - ₹1,70,000/mo" },
    { title: "Data Scientist", tag: "Data", desc: "Analyze data streams, build predictive machine learning models, and derive business insights.", avgSalary: "₹85,000 - ₹2,00,000/mo" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Career Roles</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
          Discover demanded job profiles, average salaries, skill requirements, and active openings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRoles.map((role, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition duration-300 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20 inline-block mb-3">
                {role.tag}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{role.desc}</p>
              <div className="text-xs text-emerald-400 font-semibold mb-6">
                Avg. Salary: {role.avgSalary}
              </div>
            </div>
            <button 
              onClick={() => navigate(`/jobs?search=${encodeURIComponent(role.title)}`)}
              className="w-full py-2.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-xs rounded-xl transition text-center"
            >
              Search {role.title} Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-2 text-center">Contact Support</h1>
        <p className="text-slate-400 text-xs sm:text-sm text-center mb-8">Have questions about job postings, candidate applications, or employer services? Reach out to us!</p>

        {submitted ? (
          <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">Message Sent Successfully!</h3>
            <p className="text-slate-300 text-xs">Thank you for reaching out. Our support team will respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Name</label>
                <input type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                <input type="email" required placeholder="john@domain.com" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subject</label>
              <input type="text" required placeholder="Job application query..." className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Message</label>
              <textarea rows={4} required placeholder="Write your message here..." className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white rounded-xl transition">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Sign Up Page Component
const SignUpPage = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("jobportal_user", JSON.stringify(data.user));
          setUser(data.user);
          navigate("/");
        } else {
          setError(data.message || "Registration failed");
        }
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Candidate Account</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Sign up to apply for jobs and track your applications</p>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Full Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@domain.com" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
            <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white rounded-xl transition">
            Register Account
          </button>
        </form>
      </div>
    </div>
  );
};

// Main App Router & Layout
export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("jobportal_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem("jobportal_saved_jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleSaveJob = (job) => {
    let updated;
    if (savedJobs.some(j => j._id === job._id)) {
      updated = savedJobs.filter(j => j._id !== job._id);
    } else {
      updated = [...savedJobs, job];
    }
    setSavedJobs(updated);
    localStorage.setItem("jobportal_saved_jobs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 flex flex-col">
      <ScrollToTop />
      <Navbar user={user} setUser={setUser} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/jobs" element={<JobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/jobs/:id" element={<JobDetailsPage user={user} />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/saved" element={<SavedJobsPage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
          <Route path="*" element={<HomePage savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        © 2026 JobPulse Portal. Built with React & Node.js.
      </footer>
    </div>
  );
}
