import { useState } from "react";
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

  const navigate = useNavigate();

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
    name: "Rajesh Yadav",
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F7CE5B] rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Worker Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-success-foreground">R</span>
              </div>
              <span className="text-foreground">{workerProfile.name}</span>
              <Badge variant="secondary">Available</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-6 mb-8 border-b">
          <button
            onClick={() => setActiveTab("browse")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "browse" 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "applied" 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applied Jobs ({appliedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "profile" 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Profile
          </button>
        </div>

        {/* Browse Jobs Tab */}
        {activeTab === "browse" && (
          <div>
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-elegant transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(job.category)}
                        {job.category}
                      </Badge>
                      <Badge variant="outline" className="text-destructive border-destructive">
                        {job.timeLeft} left
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{job.budget}</div>
                      <div className="text-sm text-muted-foreground">{job.duration}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">{job.title}</h3>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Posted by {job.postedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-accent" />
                      {job.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {job.applicants} applicants
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline">View Details</Button>
                    <Button>Apply Now</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Applied Jobs Tab */}
        {activeTab === "applied" && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Applied Jobs</h3>
            
            <div className="grid gap-6">
              {appliedJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(job.category)}
                        {job.category}
                      </Badge>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status === "accepted" && <CheckCircle className="w-4 h-4 mr-1" />}
                        {job.status === "pending" && <AlertCircle className="w-4 h-4 mr-1" />}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{job.budget}</div>
                      <div className="text-sm text-muted-foreground">Applied {job.appliedDate}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.duration}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline">View Details</Button>
                    {job.status === "accepted" && (
                      <Button>Start Work</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-foreground">Profile Information</h3>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Full Name</Label>
                      <Input value={workerProfile.name} readOnly />
                    </div>
                    <div>
                      <Label>Profession</Label>
                      <Input value={workerProfile.profession} readOnly />
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <Input value={workerProfile.experience} readOnly />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input value={workerProfile.location} readOnly />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {workerProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label>Bio</Label>
                    <Textarea 
                      placeholder="Tell customers about your experience and expertise..."
                      rows={4}
                    />
                  </div>
                </Card>
              </div>
              
              {/* Stats & Achievements */}
              <div>
                <Card className="p-6 mb-6">
                  <h4 className="font-semibold text-foreground mb-4">Performance Stats</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-accent" />
                        <span className="font-semibold">{workerProfile.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Jobs Completed</span>
                      <span className="font-semibold">{workerProfile.completedJobs}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-semibold">96%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Repeat Customers</span>
                      <span className="font-semibold">42</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Availability</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className="bg-success text-success-foreground">
                        Available
                      </Badge>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Update Availability
                    </Button>
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