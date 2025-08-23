import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search,
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Briefcase,
  ArrowLeft,
  User,
  Settings,
  CheckCircle,
  AlertCircle,
  Eye,
  Filter,
  Hammer,
  Wrench,
  Paintbrush,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState<"browse" | "applied" | "profile">("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showTabPopup, setShowTabPopup] = useState(false);

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

  const availableJobs = [
    {
      id: 1,
      title: "Kitchen Cabinet Installation",
      budget: "₹18,000",
      location: "Mumbai, Andheri",
      duration: "2 days",
      category: "Carpentry",
      postedBy: "Ramesh Sharma",
      rating: 4.8,
      description: "Install modular kitchen cabinets in a 2BHK apartment. Materials provided.",
      timeLeft: "2 hours",
      applicants: 8
    },
    {
      id: 2,
      title: "Bathroom Pipe Repair",
      budget: "₹3,500",
      location: "Mumbai, Bandra",
      duration: "4 hours", 
      category: "Plumbing",
      postedBy: "Priya Patel",
      rating: 4.9,
      description: "Fix leaking pipes in bathroom and replace old faucets.",
      timeLeft: "5 hours",
      applicants: 12
    },
    {
      id: 3,
      title: "Living Room Wall Painting",
      budget: "₹12,000",
      location: "Mumbai, Powai",
      duration: "1 day",
      category: "Painting",
      postedBy: "Amit Kumar", 
      rating: 4.7,
      description: "Paint living room and dining area walls with premium Asian Paints.",
      timeLeft: "1 day",
      applicants: 15
    },
    {
      id: 4,
      title: "Electrical Wiring Setup",
      budget: "₹8,000",
      location: "Mumbai, Malad",
      duration: "6 hours",
      category: "Electrical",
      postedBy: "Sunita Joshi",
      rating: 5.0,
      description: "Install additional electrical points and LED lights in new room.",
      timeLeft: "3 hours",
      applicants: 6
    }
  ];

  const appliedJobs = [
    {
      id: 5,
      title: "Ceiling Fan Installation",
      budget: "₹2,500", 
      location: "Mumbai, Thane",
      duration: "3 hours",
      category: "Electrical",
      status: "pending",
      appliedDate: "2 hours ago"
    },
    {
      id: 6,
      title: "Door Frame Repair",
      budget: "₹4,500",
      location: "Mumbai, Vikhroli", 
      duration: "1 day",
      category: "Carpentry",
      status: "accepted",
      appliedDate: "1 day ago"
    }
  ];

  const workerProfile = {
    name: "Roman Reigns",
    profession: "Multi-skilled Worker",
    experience: "8 years",
    rating: 4.6,
    completedJobs: 127,
    skills: ["Carpentry", "Plumbing", "Electrical", "Painting"],
    availability: "Available",
    location: "Mumbai, Maharashtra"
  };

  const categories = [
    { id: "all", name: "All Categories", icon: Briefcase },
    { id: "carpentry", name: "Carpentry", icon: Hammer },
    { id: "plumbing", name: "Plumbing", icon: Wrench },
    { id: "painting", name: "Painting", icon: Paintbrush },
    { id: "electrical", name: "Electrical", icon: Zap }
  ];

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           job.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "carpentry":
        return <Hammer className="w-4 h-4" />;
      case "plumbing":
        return <Wrench className="w-4 h-4" />;
      case "painting":
        return <Paintbrush className="w-4 h-4" />;
      case "electrical":
        return <Zap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
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
                <h1 className="text-lg sm:text-2xl font-bold text-white">Find Work</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs sm:text-sm font-bold text-white">R</span>
                </div>
                <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">{workerProfile.name}</span>
                <span className="text-white font-medium text-sm sm:hidden">Rajesh</span>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm animate-pulse sm:hidden"></div>
                <Badge className="hidden sm:inline bg-green-500/20 text-green-300 border-green-400/30 hover:bg-green-500/30 text-xs">
                  Available
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
                  {activeTab === "browse" && "Browse Jobs"}
                  {activeTab === "applied" && `Applied Jobs (${appliedJobs.length})`}
                  {activeTab === "profile" && "My Profile"}
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
                    setActiveTab("browse");
                    setShowTabPopup(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveTab("browse");
                    setShowTabPopup(false);
                  }}
                  className={`w-full text-left px-4 py-4 text-sm transition-all duration-200 flex items-center gap-2 touch-manipulation active:scale-95 ${
                    activeTab === "browse"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span className="text-blue-600">🔍</span>
                  <span>Browse Jobs</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab("applied");
                    setShowTabPopup(false);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setActiveTab("applied");
                    setShowTabPopup(false);
                  }}
                  className={`w-full text-left px-4 py-4 text-sm transition-all duration-200 flex items-center gap-2 touch-manipulation active:scale-95 ${
                    activeTab === "applied"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <span className="text-green-600">📋</span>
                  <span>Applied Jobs ({appliedJobs.length})</span>
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
                  <span>My Profile</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden sm:flex gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "browse" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Browse Jobs
            </button>
            <button
              onClick={() => setActiveTab("applied")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "applied" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Applied Jobs ({appliedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-all duration-300 ${
                activeTab === "profile" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              My Profile
            </button>
          </div>
        </div>

        {/* Browse Jobs Tab */}
        {activeTab === "browse" && (
          <div>
            {/* Enhanced Search & Filter - Mobile Responsive */}
            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 sm:w-5 sm:h-5" />
                <Input 
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 rounded-xl h-11 sm:h-12 focus:border-amber-400/50 focus:ring-amber-400/20 text-sm sm:text-base"
                />
              </div>
              
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-1 sm:gap-2 whitespace-nowrap rounded-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 min-w-fit ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                    }`}
                  >
                    <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Enhanced Job Cards - Mobile Responsive */}
            <div className="grid gap-4 sm:gap-6">
              {filteredJobs.map((job) => (
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
                          <Badge className="bg-blue-500/20 text-blue-700 border-blue-400/30 flex items-center gap-1 text-xs">
                            {getCategoryIcon(job.category)}
                            {job.category}
                          </Badge>
                          <Badge className="bg-red-500/20 text-red-700 border-red-400/30 text-xs">
                            {job.timeLeft} left
                          </Badge>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{job.budget}</div>
                          <div className="text-xs text-gray-500">{job.duration}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-300 mb-2">{job.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2">{job.description}</p>
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
                          <span className="truncate">{job.postedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-yellow-500" />
                          <span>{job.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Section */}
                    <div className="p-4 sm:p-6 pt-3 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                      <Button variant="outline" className="px-4 sm:px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm h-10">
                        View Details
                      </Button>
                      <Button className="px-4 sm:px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm h-10">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Applied Jobs Tab - Mobile Responsive */}
        {activeTab === "applied" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Applied Jobs</h3>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 w-fit">
                {appliedJobs.length} Applications
              </Badge>
            </div>
            
            <div className="grid gap-4 sm:gap-6">
              {appliedJobs.map((job) => (
                <Card key={job.id} className="group relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 overflow-hidden">
                  {/* Status-based gradient overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 rounded-2xl ${
                    job.status === "accepted" 
                      ? "bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/50 group-hover:to-emerald-50/30"
                      : job.status === "pending"
                      ? "bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:to-cyan-50/30"
                      : "bg-gradient-to-br from-gray-50/0 to-slate-50/0 group-hover:from-gray-50/50 group-hover:to-slate-50/30"
                  }`}></div>
                  
                  {/* Status-based top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                    job.status === "accepted" 
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : job.status === "pending"
                      ? "bg-gradient-to-r from-blue-400 to-cyan-500"
                      : "bg-gradient-to-r from-gray-400 to-slate-500"
                  }`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-700 border-blue-400/30 flex items-center gap-1 text-xs">
                          {getCategoryIcon(job.category)}
                          {job.category}
                        </Badge>
                        <Badge className={`flex items-center gap-1 text-xs ${
                          job.status === "accepted" 
                            ? "bg-green-500/20 text-green-700 border-green-400/30"
                            : job.status === "pending"
                            ? "bg-blue-500/20 text-blue-700 border-blue-400/30"
                            : "bg-gray-500/20 text-gray-700 border-gray-400/30"
                        }`}>
                          {job.status === "accepted" && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />}
                          {job.status === "pending" && <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />}
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{job.budget}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Applied {job.appliedDate}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">{job.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[150px] sm:max-w-none">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {job.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                      <Button variant="outline" className="px-4 sm:px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm">
                        View Details
                      </Button>
                      {job.status === "accepted" && (
                        <Button className="px-4 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                          Start Work
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Profile Tab - Mobile Responsive */}
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
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Edit Profile</span>
                        <span className="sm:hidden">Edit</span>
                      </Button>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Full Name</Label>
                        <Input 
                          value={workerProfile.name} 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Profession</Label>
                        <Input 
                          value={workerProfile.profession} 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Experience</Label>
                        <Input 
                          value={workerProfile.experience} 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-semibold text-sm">Location</Label>
                        <Input 
                          value={workerProfile.location} 
                          readOnly 
                          className="mt-2 bg-gray-50 border-gray-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-gray-700 font-semibold text-sm">Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {workerProfile.skills.map((skill) => (
                          <Badge key={skill} className="bg-blue-500/20 text-blue-700 border-blue-400/30 px-2 sm:px-3 py-1 rounded-full text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-gray-700 font-semibold text-sm">Bio</Label>
                      <Textarea 
                        placeholder="Tell customers about your experience and expertise..."
                        rows={4}
                        className="mt-2 bg-gray-50 border-gray-200 rounded-xl resize-none text-sm"
                      />
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Enhanced Stats & Achievements - Mobile Responsive */}
              <div>
                <Card className="relative p-4 sm:p-6 mb-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-50/20 rounded-2xl"></div>
                  
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                  
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Performance Stats</h4>
                    
                    <div className="space-y-3 sm:space-y-5">
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Rating</span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-yellow-500" />
                          <span className="font-bold text-gray-800 text-sm sm:text-base">{workerProfile.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Jobs Completed</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{workerProfile.completedJobs}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Success Rate</span>
                        <span className="font-bold text-green-600 text-sm sm:text-base">96%</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Repeat Customers</span>
                        <span className="font-bold text-blue-600 text-sm sm:text-base">42</span>
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
                    <h4 className="font-bold text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg">Availability</h4>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">Status</span>
                        <Badge className="bg-green-500/20 text-green-700 border-green-400/30 text-xs">
                          Available
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="px-4 sm:px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                          <span className="hidden sm:inline">Update Availability</span>
                          <span className="sm:hidden">Update</span>
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

export default WorkerDashboard;