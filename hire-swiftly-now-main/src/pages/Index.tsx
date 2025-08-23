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
  Menu,
  X,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import paintingJob from "@/assets/painting-job.jpg";
import plumbingJob from "@/assets/plumbing-job.jpg";
import photographyJob from "@/assets/photography-job.jpg";
import workbeeLogo from "@/assets/workbee_logo.png";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <header className="relative bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#2A4A5F] shadow-2xl sticky top-0 z-50 backdrop-blur-lg border-b border-white/10">
        {/* Advanced decorative layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/10 to-cyan-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo Section */}
            <div className="flex items-center gap-2 sm:gap-4 group">
              <div className="relative">
                <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <img
                    src={workbeeLogo}
                    alt="WorkBee Logo"
                    className="w-20 h-20 sm:w-8 sm:h-8 lg:w-20 lg:h-20 object-contain drop-shadow-lg filter brightness-110"
                  />
                </div>
              </div>
              <div className="transition-all duration-300">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                  Work
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Bee
                  </span>
                </h1>
                <p className="text-xs text-blue-200/80 font-medium hidden sm:block tracking-wide">
                  Fast • Simple • Trusted
                </p>
              </div>
            </div>

            {/* Enhanced Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                onClick={() => handleGetStarted("worker")}
                className="text-white hover:bg-amber-500 hover:text-white border border-white/20 hover:border-amber-500 transition-all duration-300 font-semibold px-4 lg:px-6 py-2 rounded-full backdrop-blur-sm hover:shadow-lg hover:scale-105 group"
              >
                <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm lg:text-base">Find Work</span>
              </Button>
              <Button
                onClick={() => handleGetStarted("customer")}
                className="text-white bg-transparent hover:bg-amber-500 hover:text-white border border-white/20 hover:border-amber-500 font-semibold px-4 lg:px-6 py-2 rounded-full backdrop-blur-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm lg:text-base">Hire Workers</span>
              </Button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/15 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in bg-gradient-to-b from-white/5 to-transparent rounded-b-2xl backdrop-blur-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium bg-white/10 px-3 py-2 rounded-full border border-white/20">
                    <Shield className="w-3 h-3 text-green-400" />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium bg-white/10 px-3 py-2 rounded-full border border-white/20">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>24/7 Support</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleGetStarted("worker");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-white hover:bg-white/15 hover:text-amber-300 border border-white/20 hover:border-amber-300/60 transition-all duration-300 font-semibold py-3 rounded-xl backdrop-blur-sm hover:scale-105 active:scale-95"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Work
                </Button>
                <Button
                  onClick={() => {
                    handleGetStarted("customer");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-white hover:bg-amber-500 border border-white/20 hover:border-amber-500 font-semibold py-3 rounded-xl backdrop-blur-sm hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Hire Workers
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76] text-primary-foreground py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Enhanced Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-l from-amber-400/15 to-orange-500/15 rounded-full blur-2xl"></div>
          <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-gradient-to-r from-green-400/10 to-teal-500/10 rounded-full blur-xl"></div>
          {/* Floating particles */}
          <div
            className="absolute top-20 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-32 right-1/3 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in">
            {/* Enhanced Hero Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 leading-tight tracking-tight">
                <span className="block text-white font-extrabold relative">
                  Find Workers in{" "}
                  <span className="text-amber-400 font-black relative">
                    Minutes
                  </span>
                </span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 max-w-3xl mx-auto px-4 font-medium leading-relaxed text-white/90">
                Fast • Simple • Trusted
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto px-4 leading-relaxed font-normal">
                Connect with{" "}
                <span className="text-white font-semibold">
                  1000+ trusted professionals
                </span>{" "}
                ready to help!
              </p>
            </div>

            {/* Compact Action Cards with Effects */}
            <div className="flex flex-col lg:flex-row gap-5 justify-center px-4 max-w-4xl mx-auto lg:items-stretch">
              {/* Customer Card */}
              <div className="group relative flex-1 max-w-sm mx-auto lg:mx-0 flex flex-col">
                <Card className="relative p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-gray-100 hover:border-amber-200 overflow-hidden group-hover:-translate-y-1 flex-1 flex flex-col">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/30 transition-all duration-500 rounded-2xl"></div>

                  {/* Top accent with animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="text-center relative z-10 flex-1 flex flex-col">
                    {/* Icon with floating effect */}
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full mb-4 mx-auto group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 group-hover:animate-pulse">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow duration-300">
                        <Users className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-5 flex-1">
                      <h3 className="font-bold mb-2 text-xl text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
                        Customers
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        Post projects and get instant quotes from verified
                        professionals
                      </p>

                      {/* Animated benefit badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-4 group-hover:bg-amber-100 transition-colors duration-300">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-amber-700">
                          5min avg response
                        </span>
                      </div>
                    </div>

                    {/* Enhanced CTA Button */}
                    <Button
                      onClick={() => handleGetStarted("customer")}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 group-hover:shadow-amber-500/25"
                    >
                      <Briefcase className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Hire Workers
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>

                    {/* Compact trust indicators */}
                    <div className="mt-3 flex items-center justify-center gap-4 text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>4.9/5</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span>10K+ completed</span>
                    </div>
                  </div>

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </Card>
              </div>

              {/* Worker Card */}
              <div className="group relative flex-1 max-w-sm mx-auto lg:mx-0 flex flex-col">
                <Card className="relative p-5 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-gray-100 hover:border-blue-200 overflow-hidden group-hover:-translate-y-1 flex-1 flex flex-col">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/30 transition-all duration-500 rounded-2xl"></div>

                  {/* Top accent with animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="text-center relative z-10 flex-1 flex flex-col">
                    {/* Icon with floating effect */}
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-4 mx-auto group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 group-hover:animate-pulse">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow duration-300">
                        <Briefcase className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-5 flex-1">
                      <h3 className="font-bold mb-2 text-xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                        Workers
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        Find local jobs, set rates, and earn on your schedule
                        according to your skill
                      </p>

                      {/* Animated benefit badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-blue-700">
                          500+ earning daily
                        </span>
                      </div>
                    </div>

                    {/* Enhanced CTA Button */}
                    <Button
                      onClick={() => handleGetStarted("worker")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 group-hover:shadow-blue-500/25"
                    >
                      <Users className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Start Earning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>

                    {/* Compact trust indicators */}
                    <div className="mt-3 flex items-center justify-center gap-4 text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span>Verified</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span>Quick payouts</span>
                    </div>
                  </div>

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </Card>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-white/80">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>
                  4.9/5 from{" "}
                  <span className="text-yellow-400 font-bold">10K+</span> users
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4 text-green-400" />
                <span>
                  All workers{" "}
                  <span className="text-green-400 font-bold">verified</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>
                  <span className="text-blue-400 font-bold">24/7</span> support
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Popular Job Categories
            </h3>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover opportunities across various skilled trades and services
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {jobCategories.map((category, index) => (
              <Card
                key={category.name}
                className="group relative p-5 sm:p-6 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white/95 hover:bg-white rounded-2xl overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Subtle gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-purple-100/0 to-pink-100/0 group-hover:from-blue-100/30 group-hover:via-purple-100/30 group-hover:to-pink-100/30 rounded-2xl transition-all duration-500"></div>

                {/* Animated top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"></div>

                <div className="relative z-10">
                  {/* Enhanced icon container without green dots */}
                  <div className="relative mx-auto mb-4 sm:mb-5">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                    >
                      <category.icon className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg group-hover:text-blue-700 transition-colors duration-300">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {category.jobs}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Featured Jobs
            </h3>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Latest high-quality opportunities from trusted clients
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredJobs.map((job, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl transform hover:scale-[1.02] hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image with overlay */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 font-semibold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                      {job.category}
                    </Badge>
                  </div>

                  {/* Budget highlight */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                      {job.budget}
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="font-bold text-gray-900 text-lg sm:text-xl mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                    {job.title}
                  </h4>

                  {/* Job details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        📍 {job.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          ⏰ {job.time}
                        </span>
                      </div>
                      <ExpiryProgressBar expiry={job.expiry} />
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 group-hover:shadow-blue-500/25">
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-12 sm:mt-16">
            <Button className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                View All Jobs
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                1000+
              </div>
              <p className="text-white/80 text-xs sm:text-sm">Active Workers</p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                500+
              </div>
              <p className="text-white/80 text-xs sm:text-sm">Jobs Completed</p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                98%
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                Satisfaction Rate
              </p>
            </div>
            <div className="animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                24/7
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#0D1321] via-[#1D2D44] to-[#3E5C76] text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={workbeeLogo}
                    alt="WorkBee Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold">WorkBee</h4>
              </div>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">
                Connecting skilled workers with customers for quick, reliable
                service nationwide.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-white">
                For Workers
              </h5>
              <ul className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Find Jobs
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Build Profile
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Get Paid
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Worker Dashboard
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-white">
                For Customers
              </h5>
              <ul className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Post Jobs
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Hire Workers
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Manage Projects
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Customer Dashboard
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 sm:mb-5 text-base sm:text-lg text-white">
                Support
              </h5>
              <ul className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">
                  Help Center
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 sm:mt-12 pt-8 sm:pt-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm sm:text-base">
                &copy; 2024 WorkBee. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy
                </span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms
                </span>
                <span>•</span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
