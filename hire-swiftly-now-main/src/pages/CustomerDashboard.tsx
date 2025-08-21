import { useState } from "react";
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
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Customer Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">John Doe</span>
            </div>
            <Button onClick={() => setShowJobForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Jobs</p>
                <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Jobs</p>
                <p className="text-2xl font-bold text-warning">{jobs.filter(j => j.status === "posted" || j.status === "in_progress").length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="text-2xl font-bold text-success">{jobs.filter(j => j.status === "completed").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Applicants</p>
                <p className="text-2xl font-bold text-primary">{jobs.reduce((sum, job) => sum + job.applicants, 0)}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Job Creation Form */}
        {showJobForm && (
          <Card className="p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Create New Job</h3>
              <Button variant="ghost" onClick={() => setShowJobForm(false)}>
                Cancel
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  placeholder="e.g., Kitchen Renovation"
                />
              </div>
              
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  value={newJob.budget}
                  onChange={(e) => setNewJob({...newJob, budget: e.target.value})}
                  placeholder="e.g., ₹15,000"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newJob.duration}
                  onChange={(e) => setNewJob({...newJob, duration: e.target.value})}
                  placeholder="e.g., 2 days"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newJob.category}
                  onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                  placeholder="e.g., Plumbing, Painting"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                placeholder="Describe the work that needs to be done..."
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowJobForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateJob}>
                Post Job
              </Button>
            </div>
          </Card>
        )}

        {/* Jobs List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-foreground">Your Jobs</h3>
            {!showJobForm && (
              <Button variant="outline" onClick={() => setShowJobForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            )}
          </div>
          
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-foreground">{job.title}</h4>
                          <Badge className={getStatusColor(job.status)}>
                            {getStatusIcon(job.status)}
                            <span className="ml-1 capitalize">{job.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.budget}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="sm">
                      View Applicants
                    </Button>
                    <Button size="sm">
                      Manage Job
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {jobs.length === 0 && (
            <Card className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">No jobs posted yet</h4>
              <p className="text-muted-foreground mb-6">Create your first job posting to start hiring skilled workers</p>
              <Button onClick={() => setShowJobForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Post Your First Job
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;