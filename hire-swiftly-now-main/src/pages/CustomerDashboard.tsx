import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign, 
  Eye,
  CheckCircle,
  AlertCircle,
  Briefcase,
  ArrowLeft,
  User,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "jobs" | "profile">("dashboard");
  const [showTabPopup, setShowTabPopup] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Kitchen Renovation",
      budget: "₹25,000",
      location: "Mumbai, Maharashtra",
      duration: "3 days",
      category: "Carpentry",
      status: "in_progress",
      applicants: 8,
      description: "Complete kitchen renovation including cabinets and countertops"
    },
    {
      id: 2,
      title: "Bathroom Plumbing Fix",
      budget: "₹5,000",
      location: "Mumbai, Maharashtra", 
      duration: "4 hours",
      category: "Plumbing",
      status: "posted",
      applicants: 12,
      description: "Fix leaking faucet and install new shower head"
    },
    {
      id: 3,
      title: "Wall Painting - Living Room",
      budget: "₹8,000",
      location: "Mumbai, Maharashtra",
      duration: "1 day",
      category: "Painting", 
      status: "completed",
      applicants: 15,
      description: "Paint living room walls with premium paint"
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    budget: "",
    location: "",
    duration: "",
    category: "",
    description: ""
  });

  const navigate = useNavigate();

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element;
      if (showTabPopup && target && !target.closest('.mobile-dropdown')) {
        setShowTabPopup(false);
      }
    };

    if (showTabPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTabPopup]);

  const handleCreateJob = () => {
    if (newJob.title && newJob.budget && newJob.description) {
      const job = {
        id: jobs.length + 1,
        ...newJob,
        status: "posted" as const,
        applicants: 0
      };
      setJobs([job, ...jobs]);
      setNewJob({
        title: "",
        budget: "", 
        location: "",
        duration: "",
        category: "",
        description: ""
      });
      setShowJobForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in_progress":
        return "bg-warning text-warning-foreground";
      case "posted":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <AlertCircle className="w-4 h-4" />;
      case "posted":
        return <Eye className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76]">
      {/* Enhanced Header - Mobile Responsive */}
      <header className="relative bg-gradient-to-r from-[#0D1321] via-[#1D2D44] to-[#2A4A5F] shadow-2xl border-b border-white/10 backdrop-blur-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/10 to-cyan-600/5"></div>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="text-white hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 rounded-full p-2 sm:px-4 sm:py-2"
              >
                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
              <div className="flex items-center gap-2 sm:gap-3">
                <h1 className="text-lg sm:text-2xl font-bold text-white">Hire</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs sm:text-sm font-bold text-white">J</span>
                </div>
                <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">John Doe</span>
                <span className="text-white font-medium text-sm sm:hidden">John</span>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm animate-pulse sm:hidden"></div>
                <Badge className="hidden sm:inline bg-green-500/20 text-green-300 border-green-400/30 hover:bg-green-500/30 text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Responsive Navigation - Tabs for Desktop, Dropdown for Mobile */}
        <div className="mb-6">
          {/* Mobile Dropdown */}
          <div className="sm:hidden relative mobile-dropdown">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTabPopup(!showTabPopup);
              }}
              className="flex items-center justify-between w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-all duration-300 touch-manipulation active:scale-95"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "jobs" && "My Jobs"}
                  {activeTab === "profile" && "Profile"}
                </span>
              </div>
              <div className={`transform transition-transform duration-200 ${
                showTabPopup ? "rotate-180" : "rotate-0"
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {/* Mobile Popup Options */}
            {showTabPopup && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab("dashboard");
                    setShowTabPopup(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveTab("dashboard");
                    setShowTabPopup(false);
                  }}
                  className={`w-full text-left px-4 py-4 text-sm transition-all duration-200 flex items-center gap-2 touch-manipulation active:scale-95 ${
                    activeTab === "dashboard"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span className="text-blue-600">📊</span>
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab("jobs");
                    setShowTabPopup(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveTab("jobs");
                    setShowTabPopup(false);
                  }}
                  className={`w-full text-left px-4 py-4 text-sm transition-all duration-200 flex items-center gap-2 touch-manipulation active:scale-95 ${
                    activeTab === "jobs"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span className="text-green-600">💼</span>
                  <span>My Jobs</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab("profile");
                    setShowTabPopup(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveTab("profile");
                    setShowTabPopup(false);
                  }}
                  className={`w-full text-left px-4 py-4 text-sm transition-all duration-200 flex items-center gap-2 touch-manipulation active:scale-95 ${
                    activeTab === "profile"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span className="text-purple-600">👤</span>
                  <span>Profile</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden sm:flex gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "dashboard" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "jobs" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "profile" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {/* Enhanced Stats Cards - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-cyan-50/20 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Total Jobs</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">{jobs.length}</p>
                    <p className="text-xs text-green-600 font-medium">+2 this month</p>
                  </div>
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </Card>
              
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-50/20 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Active Jobs</p>
                    <p className="text-xl sm:text-2xl font-bold text-amber-600">{jobs.filter(j => j.status === "posted" || j.status === "in_progress").length}</p>
                    <p className="text-xs text-amber-600 font-medium">In progress</p>
                  </div>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
                </div>
              </Card>
              
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-emerald-50/20 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Completed</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{jobs.filter(j => j.status === "completed").length}</p>
                    <p className="text-xs text-green-600 font-medium">95% success rate</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
              </Card>
              
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-1">Total Spent</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">₹{jobs.reduce((sum, job) => sum + parseInt(job.budget.replace(/[₹,]/g, '')), 0).toLocaleString()}</p>
                    <p className="text-xs text-purple-600 font-medium">This month</p>
                  </div>
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Quick Actions - Horizontal Layout */}
            <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 rounded-2xl"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setShowJobForm(true)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm px-4 py-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post Job
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-white/50 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm px-4 py-2"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Browse Workers
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-white/50 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm px-4 py-2"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Reviews
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-white/50 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm px-4 py-2"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Find Workers
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-white/50 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm px-4 py-2"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Local Services
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-white/50 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm px-4 py-2"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pricing
                  </Button>
                </div>
              </div>
            </Card>

            {/* Activity & Tips Section */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Recent Activity */}
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-emerald-50/20 rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">Recent Activity</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Kitchen job completed</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">5 new applications</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Payment processed</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">New job posted</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Tips & Insights */}
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">💡 Tips for Better Hiring</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50/50 rounded-xl border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-800 text-sm mb-1">Clear Job Descriptions</h4>
                      <p className="text-blue-700 text-xs">Provide detailed requirements to attract the right workers</p>
                    </div>
                    
                    <div className="p-3 bg-green-50/50 rounded-xl border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-800 text-sm mb-1">Competitive Pricing</h4>
                      <p className="text-green-700 text-xs">Research market rates to get quality applications</p>
                    </div>
                    
                    <div className="p-3 bg-amber-50/50 rounded-xl border-l-4 border-amber-400">
                      <h4 className="font-semibold text-amber-800 text-sm mb-1">Check Reviews</h4>
                      <p className="text-amber-700 text-xs">Always review worker profiles and past customer feedback</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50/50 rounded-xl border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-800 text-sm mb-1">Communication</h4>
                      <p className="text-purple-700 text-xs">Stay in touch with workers for better project outcomes</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Jobs & Tips Section */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Recent Jobs */}
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-50/20 rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recent Jobs</h3>
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveTab("jobs")}
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-sm"
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {jobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{job.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${
                              job.status === "completed" 
                                ? "bg-green-500/20 text-green-700 border-green-400/30"
                                : job.status === "in_progress"
                                ? "bg-blue-500/20 text-blue-700 border-blue-400/30"
                                : "bg-amber-500/20 text-amber-700 border-amber-400/30"
                            }`}>
                              {job.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-gray-500">{job.applicants} applicants</span>
                          </div>
                        </div>
                        <div className="text-right ml-3">
                          <p className="font-bold text-amber-600 text-sm">{job.budget}</p>
                        </div>
                      </div>
                    ))}
                    
                    {jobs.length === 0 && (
                      <div className="text-center py-6">
                        <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No jobs posted yet</p>
                        <Button 
                          onClick={() => setShowJobForm(true)}
                          className="mt-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs"
                        >
                          Post Your First Job
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              
              {/* Tips & Insights */}
              <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-2xl"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">💡 Tips for Better Hiring</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50/50 rounded-xl border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-800 text-sm mb-1">Clear Job Descriptions</h4>
                      <p className="text-blue-700 text-xs">Provide detailed requirements to attract the right workers</p>
                    </div>
                    
                    <div className="p-3 bg-green-50/50 rounded-xl border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-800 text-sm mb-1">Competitive Pricing</h4>
                      <p className="text-green-700 text-xs">Research market rates to get quality applications</p>
                    </div>
                    
                    <div className="p-3 bg-amber-50/50 rounded-xl border-l-4 border-amber-400">
                      <h4 className="font-semibold text-amber-800 text-sm mb-1">Check Reviews</h4>
                      <p className="text-amber-700 text-xs">Always review worker profiles and past customer feedback</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50/50 rounded-xl border-l-4 border-purple-400">
                      <h4 className="font-semibold text-purple-800 text-sm mb-1">Communication</h4>
                      <p className="text-purple-700 text-xs">Stay in touch with workers for better project outcomes</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div>
            {/* Job Creation Form */}
            {showJobForm && (
              <Card className="relative p-4 sm:p-6 mb-6 sm:mb-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-50/20 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Create New Job</h3>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowJobForm(false)}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl w-fit"
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="title" className="text-gray-700 font-medium text-sm">Job Title</Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        placeholder="e.g., Kitchen Renovation"
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="budget" className="text-gray-700 font-medium text-sm">Budget</Label>
                      <Input
                        id="budget"
                        value={newJob.budget}
                        onChange={(e) => setNewJob({...newJob, budget: e.target.value})}
                        placeholder="e.g., ₹15,000"
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location" className="text-gray-700 font-medium text-sm">Location</Label>
                      <Input
                        id="location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                        placeholder="e.g., Mumbai, Maharashtra"
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration" className="text-gray-700 font-medium text-sm">Duration</Label>
                      <Input
                        id="duration"
                        value={newJob.duration}
                        onChange={(e) => setNewJob({...newJob, duration: e.target.value})}
                        placeholder="e.g., 2 days"
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <Label htmlFor="category" className="text-gray-700 font-medium text-sm">Category</Label>
                      <Input
                        id="category"
                        value={newJob.category}
                        onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                        placeholder="e.g., Plumbing, Painting"
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="description" className="text-gray-700 font-medium text-sm">Job Description</Label>
                    <Textarea
                      id="description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                      placeholder="Describe the work that needs to be done..."
                      rows={4}
                      className="mt-2 bg-gray-50 border-gray-200 rounded-xl resize-none text-sm"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowJobForm(false)}
                      className="px-4 sm:px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateJob}
                      className="px-4 sm:px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                    >
                      Post Job
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Enhanced Jobs List */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Your Jobs</h3>
                {!showJobForm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobForm(true)}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 rounded-xl w-fit"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                )}
              </div>
              
              <div className="grid gap-4 sm:gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 hover:border-amber-200 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/30 transition-all duration-500 rounded-2xl"></div>
                    
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="p-4 sm:p-6 pb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-300">{job.title}</h4>
                            <Badge className={`flex items-center gap-1 text-xs ${
                              job.status === "completed" 
                                ? "bg-green-500/20 text-green-700 border-green-400/30"
                                : job.status === "in_progress"
                                ? "bg-blue-500/20 text-blue-700 border-blue-400/30"
                                : "bg-amber-500/20 text-amber-700 border-amber-400/30"
                            }`}>
                              {getStatusIcon(job.status)}
                              <span className="ml-1 capitalize">{job.status.replace('_', ' ')}</span>
                            </Badge>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{job.budget}</div>
                            <div className="text-xs text-gray-500">{job.duration}</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2 mb-2">{job.description}</p>
                      </div>
                      
                      {/* Details Section */}
                      <div className="px-4 sm:px-6 py-3 bg-gray-50/50">
                        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span>{job.applicants} applicants</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span>{job.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                            <span className="truncate">{job.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Section */}
                      <div className="p-4 sm:p-6 pt-3 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                        <Button 
                          variant="outline" 
                          className="px-4 sm:px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm h-10"
                        >
                          View Applicants
                        </Button>
                        <Button 
                          className="px-4 sm:px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm h-10"
                        >
                          Manage Job
                        </Button>
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </Card>
                ))}
              </div>
              
              {jobs.length === 0 && (
                <Card className="relative p-8 sm:p-12 text-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 to-slate-50/20 rounded-2xl"></div>
                  <div className="relative z-10">
                    <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">No jobs posted yet</h4>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">Create your first job posting to start hiring skilled workers</p>
                    <Button 
                      onClick={() => setShowJobForm(true)}
                      className="px-4 sm:px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Enhanced Profile Info */}
              <div className="lg:col-span-2">
                <Card className="relative p-4 sm:p-6 mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-blue-50/20 rounded-2xl"></div>
                  
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Profile Information</h3>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base px-4 sm:px-6">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Edit Profile</span>
                        <span className="sm:hidden">Edit</span>
                      </Button>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Full Name</Label>
                        <Input 
                          value="John Doe" 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Business Type</Label>
                        <Input 
                          value="Home Renovation Services" 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Contact Number</Label>
                        <Input 
                          value="+91 98765 43210" 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Location</Label>
                        <Input 
                          value="Mumbai, Maharashtra" 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-gray-700 font-semibold text-sm">Preferred Services</Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {["Carpentry", "Plumbing", "Electrical", "Painting", "Cleaning"].map((service) => (
                          <Badge key={service} className="bg-blue-500/20 text-blue-700 border-blue-400/30 px-2 sm:px-3 py-1 rounded-full text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-gray-700 font-semibold text-sm">About</Label>
                      <Textarea 
                        placeholder="Tell workers about your requirements and preferences..."
                        rows={4}
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl resize-none text-sm"
                        defaultValue="Looking for reliable and skilled professionals for home improvement projects. Prefer workers with good ratings and reviews."
                      />
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Enhanced Stats & Preferences - Mobile Responsive */}
              <div>
                <Card className="relative p-4 sm:p-6 mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-50/20 rounded-2xl"></div>
                  
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                  
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Account Stats</h4>
                    
                    <div className="space-y-3 sm:space-y-5">
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Rating</span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500" />
                          <span className="font-bold text-gray-800 text-sm sm:text-base">4.8</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Total Jobs Posted</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{jobs.length}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Successful Hires</span>
                        <span className="font-bold text-green-600 text-sm sm:text-base">{jobs.filter(j => j.status === "completed").length}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Member Since</span>
                        <span className="font-bold text-blue-600 text-sm sm:text-base">Jan 2024</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-emerald-50/20 rounded-2xl"></div>
                  
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                  
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Account Settings</h4>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Account Status</span>
                        <Badge className="bg-green-500/20 text-green-700 border-green-400/30 text-xs">
                          Verified
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Plan</span>
                        <Badge className="bg-amber-500/20 text-amber-700 border-amber-400/30 text-xs">
                          Premium
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button className="px-4 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                          Manage Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;