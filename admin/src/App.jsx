import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, PlusCircle, Briefcase, Users, Building2, 
  Trash2, Eye, CheckCircle, XCircle, Search, Sparkles, MapPin, DollarSign 
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

// Admin Navbar
const AdminNavbar = () => {
  const location = useLocation();

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <LayoutDashboard size={22} />
          </div>
          <span>Job<span className="text-white">Admin</span></span>
        </Link>

        <nav className="flex items-center gap-4 text-xs font-semibold">
          <Link to="/" className={`px-3 py-2 rounded-xl transition ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            Dashboard
          </Link>
          <Link to="/add-job" className={`px-3 py-2 rounded-xl transition ${location.pathname === '/add-job' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            + Post Job
          </Link>
          <Link to="/manage-jobs" className={`px-3 py-2 rounded-xl transition ${location.pathname === '/manage-jobs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            Manage Jobs
          </Link>
          <Link to="/applicants" className={`px-3 py-2 rounded-xl transition ${location.pathname === '/applicants' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            Applicants
          </Link>
        </nav>
      </div>
    </header>
  );
};

// Admin Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, totalApplicants: 0, totalCompanies: 0 });
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.stats) setStats(data.stats);
      });

    fetch(`${API_URL}/jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setRecentJobs(data.jobs.slice(0, 5));
      });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Employer Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of job postings, candidate applications, and portal activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase">Total Jobs Posted</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{stats.totalJobs}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase">Active Listings</p>
            <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">{stats.activeJobs}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase">Total Applications</p>
            <h3 className="text-3xl font-extrabold text-indigo-400 mt-2">{stats.totalApplicants}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase">Partner Companies</p>
            <h3 className="text-3xl font-extrabold text-purple-400 mt-2">{stats.totalCompanies}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Building2 size={24} />
          </div>
        </div>
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Job Postings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentJobs.map(job => (
                <tr key={job._id} className="hover:bg-slate-850">
                  <td className="px-4 py-3.5 font-bold text-white">{job.roleName}</td>
                  <td className="px-4 py-3.5 text-slate-300">{job.companyName}</td>
                  <td className="px-4 py-3.5 text-slate-400">{job.location}</td>
                  <td className="px-4 py-3.5 text-emerald-400 font-medium">₹{job.salary.toLocaleString()}{job.salaryType}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold capitalize">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Add Job Component
const AddJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roleName: "",
    companyName: "",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    techStack: "",
    location: "",
    experience: "",
    salary: 60000,
    salaryType: "/month",
    jobType: "full-time",
    category: "Development",
    openings: 2,
    overview: "",
    responsibilities: "",
    jobCriteria: "",
    education: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      salary: Number(formData.salary),
      openings: Number(formData.openings),
      techStack: formData.techStack.split(",").map(s => s.trim()),
      responsibilities: formData.responsibilities.split("\n").filter(Boolean),
      jobCriteria: formData.jobCriteria.split("\n").filter(Boolean),
      education: formData.education.split("\n").filter(Boolean)
    };

    fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/manage-jobs");
        }
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6">Post a New Job Opening</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Job Role Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Senior Full Stack Developer"
                value={formData.roleName}
                onChange={e => setFormData({ ...formData, roleName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Company Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Acme Tech Solutions"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Location</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Bangalore / Remote"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Monthly Salary (INR)</label>
              <input 
                type="number" 
                required 
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Job Type</label>
              <select 
                value={formData.jobType}
                onChange={e => setFormData({ ...formData, jobType: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="remote">Remote</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. React, Node.js, Express, MongoDB"
              value={formData.techStack}
              onChange={e => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Job Overview</label>
            <textarea 
              rows={3}
              placeholder="Brief description of the position..."
              value={formData.overview}
              onChange={e => setFormData({ ...formData, overview: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Responsibilities (One per line)</label>
            <textarea 
              rows={3}
              placeholder="Design and implement APIs&#10;Write unit and integration tests"
              value={formData.responsibilities}
              onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white rounded-xl transition">
            Publish Job Listing
          </button>
        </form>
      </div>
    </div>
  );
};

// Manage Jobs Component
const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  const loadJobs = () => {
    fetch(`${API_URL}/jobs`)
      .then(res => res.json())
      .then(data => {
        if (data.jobs) setJobs(data.jobs);
      });
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => loadJobs());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Manage Posted Jobs</h1>
        <Link to="/add-job" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition">
          + Create New Job
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {jobs.map(job => (
              <tr key={job._id} className="hover:bg-slate-850">
                <td className="px-4 py-3.5 font-bold text-white">{job.roleName}</td>
                <td className="px-4 py-3.5 text-slate-300">{job.companyName}</td>
                <td className="px-4 py-3.5 text-slate-400">{job.location}</td>
                <td className="px-4 py-3.5 text-emerald-400">₹{job.salary.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-right">
                  <button onClick={() => handleDelete(job._id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// View Applicants Component
const ViewApplicantsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/applications`)
      .then(res => res.json())
      .then(data => {
        if (data.applications) setApplications(data.applications);
      });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Job Applications Received</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Applicant Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Job ID</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {applications.map(app => (
              <tr key={app._id} className="hover:bg-slate-850">
                <td className="px-4 py-3.5 font-bold text-white">{app.applicantName}</td>
                <td className="px-4 py-3.5 text-slate-300">{app.email}</td>
                <td className="px-4 py-3.5 text-slate-400">{app.jobId}</td>
                <td className="px-4 py-3.5 text-slate-400">{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <AdminNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-job" element={<AddJobPage />} />
          <Route path="/manage-jobs" element={<ManageJobsPage />} />
          <Route path="/applicants" element={<ViewApplicantsPage />} />
        </Routes>
      </main>
    </div>
  );
}
