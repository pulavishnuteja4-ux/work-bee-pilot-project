import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Briefcase,
  Users,
  Star,
  ArrowRight,
  Hammer,
  Wrench,
  Paintbrush,
  Zap,
  Camera,
  Car,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import paintingJob from "@/assets/painting-job.jpg";
import plumbingJob from "@/assets/plumbing-job.jpg";
import photographyJob from "@/assets/photography-job.jpg";

const jobCategories = [
  {
    name: "Carpentry",
    icon: Hammer,
    jobs: "150+ jobs",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Plumbing",
    icon: Wrench,
    jobs: "200+ jobs",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Painting",
    icon: Paintbrush,
    jobs: "180+ jobs",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Electrical",
    icon: Zap,
    jobs: "120+ jobs",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Photography",
    icon: Camera,
    jobs: "90+ jobs",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Transport",
    icon: Car,
    jobs: "250+ jobs",
    color: "bg-red-100 text-red-700",
  },
];

const featuredJobs = [
  {
    title: "Interior Wall Painting",
    budget: "₹15,000",
    location: "Mumbai, Maharashtra",
    time: "2 days",
    category: "Painting",
    image: paintingJob,
    expiry: Date.now() + 1 * 60 * 1000, // 20 minutes from now
  },
  {
    title: "Kitchen Plumbing Repair",
    budget: "₹8,000",
    location: "Delhi, NCR",
    time: "1 day",
    category: "Plumbing",
    image: plumbingJob,
    expiry: Date.now() + 12 * 60 * 1000,
  },
  {
    title: "Wedding Photography",
    budget: "₹25,000",
    location: "Bangalore, Karnataka",
    time: "1 day",
    category: "Photography",
    image: photographyJob,
    expiry: Date.now() + 20 * 60 * 1000,
  },
];
function ExpiryProgressBar({ expiry }: { expiry: number }) {
  const total = 20 * 60 * 1000; // 20 minutes in ms
  const [timeLeft, setTimeLeft] = useState(expiry - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(expiry - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  const percent = Math.max(0, Math.min(100, (timeLeft / total) * 100));
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  let barColor = "bg-green-400";
  if (percent < 10) barColor = "bg-red-500";
  else if (percent < 40) barColor = "bg-yellow-400";
  else if (percent < 70) barColor = "bg-orange-400";

  return (
    <div className="flex flex-col items-end w-32">
      <div className="w-full h-2 bg-gray-300 rounded-full mb-1">
        <div
          className={`h-2 ${barColor} rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        className={`text-xs font-semibold ${
          percent < 10
            ? "text-red-500"
            : percent < 40
            ? "text-yellow-600"
            : percent < 70
            ? "text-orange-600"
            : "text-green-700"
        }`}
      >
        {timeLeft <= 0
          ? "Expired"
          : `${minutes}:${seconds.toString().padStart(2, "0")} left`}
      </span>
    </div>
  );
}
const Index = () => {
  const [userType, setUserType] = useState<"customer" | "worker" | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = (type: "customer" | "worker") => {
    setUserType(type);
    if (type === "customer") {
      navigate("/customer-dashboard");
    } else {
      navigate("/worker-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft">
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              WorkBee
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleGetStarted("worker")}
              className="text-sm"
            >
              Find Work
            </Button>
            <Button
              size="sm"
              onClick={() => handleGetStarted("customer")}
              className="text-sm"
            >
              Hire Workers
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76] text-primary-foreground py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-primary-glow opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent opacity-10 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight tracking-tight">
              <span className="block text-white drop-shadow-lg">
                Find Workers Fast
              </span>
              <span className="block text-primary-glow animate-pulse mt-2">
                Get Your Job Done Easily
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-[#34CC99] mb-8 sm:mb-10 max-w-xl mx-auto px-4 font-bold">
              Simple. Quick. Trusted.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-14 px-4">
              <div className="relative w-full sm:flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for services (plumber, painter)..."
                  className="pl-12 py-3 bg-white/80 text-foreground border-0 shadow-lg text-lg rounded-xl focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button
                size="lg"
                variant="accent"
                className="w-full sm:w-auto text-lg font-bold shadow-xl rounded-full bg-[#497DE2] hover:bg-[#497DE2] text-white px-8 py-3 flex items-center justify-center transition-all duration-200 border-2 border-[#34CC99] focus:ring-2 focus:ring-[#249e6e]"
              >
                <span className="mr-2">Search</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div> */}

            <div className="flex flex-col lg:flex-row gap-6 justify-center px-4">
              <Card className="p-6 bg-card/20 lg:w-[400px] border-primary-foreground/20 backdrop-blur-md animate-slide-up shadow-xl hover:scale-105 transition-transform">
                <div className="text-center">
                  <Users className="w-10 h-10 mx-auto mb-3 text-accent" />
                  <h3 className="font-bold mb-2 text-lg text-white">
                    For Customers
                  </h3>
                  <p className="text-primary-foreground/80 text-base mb-4">
                    Post your work. Get help fast.
                  </p>
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => handleGetStarted("customer")}
                    className="w-full font-semibold bg-[#FFFFFF]"
                  >
                    Hire Workers
                  </Button>
                </div>
              </Card>

              <Card className="p-6 lg:w-[400px] bg-card/20 border-primary-foreground/20 backdrop-blur-md animate-slide-up shadow-xl hover:scale-105 transition-transform">
                <div className="text-center">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 text-accent" />
                  <h3 className="font-bold mb-2 text-lg text-white">
                    For Workers
                  </h3>
                  <p className="text-primary-foreground/80 text-base mb-4">
                    Find jobs. Earn money daily.
                  </p>
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => handleGetStarted("worker")}
                    className="w-full font-semibold bg-[#FFFFFF]"
                  >
                    Find Work
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-12 sm:py-16 bg-[#F0EBD8]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Popular Job Categories
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Find opportunities in various skilled trades
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {jobCategories.map((category) => (
              <Card
                key={category.name}
                className="p-4 sm:p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer group border-border/50"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-soft`}
                >
                  <category.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  {category.name}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {category.jobs}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 sm:py-16 bg-[#F0EBD8]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Featured Jobs
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Latest opportunities waiting for skilled workers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredJobs.map((job, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-elegant transition-all duration-300 group bg-[#1D2D44]"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {job.category}
                    </Badge>
                    <span className="text-lg sm:text-2xl font-bold text-white">
                      {job.budget}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-white sm:text-lg mb-2 sm:mb-3 leading-tight">
                    {job.title}
                  </h4>
                  <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs text-[#DDDAD0] sm:text-sm">
                    <p>📍 {job.location}</p>
                  </div>
                  <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs text-[#DDDAD0] sm:text-sm">
                    <p>⏰ Duration: {job.time}</p>
                    <ExpiryProgressBar expiry={job.expiry} />
                  </div>
                  <Button variant="outline" className="w-full text-sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-[#F0EBD8]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                1000+
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Active Workers
              </p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                500+
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Jobs Completed
              </p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                98%
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Satisfaction Rate
              </p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">
                24/7
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold">WorkBee</h4>
              </div>
              <p className="text-background/80 text-sm sm:text-base">
                Connecting skilled workers with customers for quick, reliable
                service.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                For Workers
              </h5>
              <ul className="space-y-1 sm:space-y-2 text-background/80 text-sm">
                <li>Find Jobs</li>
                <li>Build Profile</li>
                <li>Get Paid</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                For Customers
              </h5>
              <ul className="space-y-1 sm:space-y-2 text-background/80 text-sm">
                <li>Post Jobs</li>
                <li>Hire Workers</li>
                <li>Manage Projects</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Support
              </h5>
              <ul className="space-y-1 sm:space-y-2 text-background/80 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-background/60 text-xs sm:text-sm">
            <p>&copy; 2024 WorkBee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
