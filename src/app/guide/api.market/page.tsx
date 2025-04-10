"use client";

import { useState } from "react";
import {
  BarChart,
  Code,
  FileCode2,
  Lightbulb,
  ListChecks,
  MessageSquareQuote,
  Rocket,
  ScrollText,
  Settings,
  Star,
  Trophy,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apiCategories = [
  { name: "Advertising", icon: "📢" },
  { name: "Artificial Intelligence", icon: "🧠" },
  { name: "Business", icon: "💼" },
  { name: "Business Software", icon: "🖥️" },
  { name: "Commerce", icon: "🛒" },
  { name: "Communication", icon: "🗣️" },
  { name: "Cryptography", icon: "🔐" },
  { name: "Cybersecurity", icon: "🛡️" },
  { name: "Data", icon: "📊" },
  { name: "Dev Tools", icon: "🛠️" },
  { name: "E Commerce", icon: "🛍️" },
  { name: "Education", icon: "🎓" },
  { name: "Email", icon: "✉️" },
  { name: "Energy", icon: "⚡" },
  { name: "Entertainment", icon: "🎭" },
];

import API_MARKET_LOGO from "@/assets/sponsors/api.market.png";
import API_MARKET_BANNER from "@/assets/sponsors/api.market-banner.png";
import API_MARKET_SAMPLE_PROJECT from "@/assets/sponsors/api.market-sample-project.png";

export default function ApiMarketGuide() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-black text-white font-sans">
      <header className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-900 to-black opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center mix-blend-overlay opacity-20 z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 cursor-pointer">
            Devolympus 2025
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-300">
            API.market Hackathon Track
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Leverage API.market&apos;s powerful ecosystem to build innovative
            solutions and win exciting prizes
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 cursor-pointer"
              onClick={() => window.open("https://api.market/", "_blank")}
            >
              <Rocket className="mr-2 h-5 w-5" /> Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
              onClick={() => window.open("https://docs.api.market/", "_blank")}
            >
              <FileCode2 className="mr-2 h-5 w-5" /> View Documentation
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-900/50 p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-purple-700 cursor-pointer"
            >
              <Star className="mr-2 h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-purple-700 cursor-pointer"
            >
              <Code className="mr-2 h-4 w-4" /> Resources
            </TabsTrigger>
            <TabsTrigger
              value="sample"
              className="data-[state=active]:bg-purple-700 cursor-pointer"
            >
              <Lightbulb className="mr-2 h-4 w-4" /> Sample Project
            </TabsTrigger>
            <TabsTrigger
              value="criteria"
              className="data-[state=active]:bg-purple-700 cursor-pointer"
            >
              <Trophy className="mr-2 h-4 w-4" /> Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <MessageSquareQuote className="mr-2 h-5 w-5" /> About
                    API.market
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your gateway to powerful API integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <img
                      src={API_MARKET_LOGO.src || "/placeholder.svg"}
                      alt="API.market Logo"
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                  <p className="text-gray-300">
                    API.market is a dynamic platform that aggregates a wide
                    array of APIs, making it easy for developers to access
                    external data and functionality. As a key sponsor,
                    API.market helps power innovative solutions that tackle
                    real-world problems.
                  </p>
                  <p className="text-gray-300">
                    With a focus on developer experience, API.market provides
                    comprehensive documentation and support to ensure seamless
                    integration.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <BarChart className="mr-2 h-5 w-5" /> API Categories
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Explore the diverse range of available APIs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {apiCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-gray-800/50 rounded-md hover:bg-gray-700/50 transition-colors cursor-pointer"
                      >
                        <span className="text-xl mr-2">{category.icon}</span>
                        <span className="text-gray-300">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Rocket className="mr-2 h-5 w-5" /> Track Objectives
                </CardTitle>
                <CardDescription className="text-gray-400">
                  What we&apos;re looking for in winning projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Innovative Utilization
                    </h3>
                    <p className="text-gray-400">
                      Use the APIs to build creative and impactful solutions
                      that demonstrate unique approaches.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Technical Excellence
                    </h3>
                    <p className="text-gray-400">
                      Demonstrate your expertise in API integration and modern
                      application development practices.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Real-World Impact
                    </h3>
                    <p className="text-gray-400">
                      Build projects that solve tangible challenges and provide
                      value to potential users.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center text-purple-300">
                  <MessageSquareQuote className="mr-2 h-5 w-5" /> API.market
                  Banner
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <img
                    src={API_MARKET_BANNER.src || "/placeholder.svg"}
                    alt="API.market Banner"
                    className="w-full max-w-3xl h-auto rounded-lg object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <Settings className="mr-2 h-5 w-5" /> Getting Started
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Actionable steps to begin your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-700 text-white mr-2 text-xs font-bold">
                        1
                      </span>
                      Familiarize Yourself with API.market
                    </h3>
                    <ul className="space-y-2 pl-8 list-disc text-gray-300">
                      <li>
                        <span className="font-medium text-purple-300">
                          Sign Up & Explore:
                        </span>{" "}
                        Create an account on API.market and browse the APIs
                        available.
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">
                          Review Documentation:
                        </span>{" "}
                        Get familiar with endpoints, methods, and rate limits.
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">
                          Identify Key APIs:
                        </span>{" "}
                        Pick the API(s) that best fit your project concept.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-700 text-white mr-2 text-xs font-bold">
                        2
                      </span>
                      Define Your Project Goals
                    </h3>
                    <ul className="space-y-2 pl-8 list-disc text-gray-300">
                      <li>
                        <span className="font-medium text-purple-300">
                          Problem Statement:
                        </span>{" "}
                        Clearly state the problem your project addresses.
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">
                          API Role:
                        </span>{" "}
                        Determine how the API(s) provide value to your solution.
                      </li>
                      <li>
                        <span className="font-medium text-purple-300">
                          Outcome Focus:
                        </span>{" "}
                        Plan a demo that highlights effective API integration.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-700 text-white mr-2 text-xs font-bold">
                        3
                      </span>
                      Set Up Your Development Environment
                    </h3>
                    <ul className="space-y-2 pl-8 list-disc text-gray-300">
                      <li>
                        Choose languages and frameworks that promote fast API
                        integration.
                      </li>
                      <li>
                        Implement testing early to confirm that API calls work
                        as expected.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-300">
                    <Code className="mr-2 h-5 w-5" /> Best Practices
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Technical recommendations for successful API integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                        <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                          <Code className="h-4 w-4 text-purple-300" />
                        </div>
                        Error Handling
                      </h3>
                      <p className="text-gray-300">
                        Set up robust error handling and logging for all API
                        calls. Implement proper try/catch blocks and provide
                        meaningful error messages to users.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                        <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                          <Settings className="h-4 w-4 text-purple-300" />
                        </div>
                        Security
                      </h3>
                      <p className="text-gray-300">
                        Secure your API keys and follow platform usage
                        guidelines. Never expose API keys in client-side code
                        and use environment variables for sensitive information.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                        <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                          <BarChart className="h-4 w-4 text-purple-300" />
                        </div>
                        Performance
                      </h3>
                      <p className="text-gray-300">
                        Optimize your integration with caching and limited API
                        requests. Implement rate limiting, pagination, and data
                        caching to improve performance and reduce API costs.
                      </p>
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                        <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                          <Users className="h-4 w-4 text-purple-300" />
                        </div>
                        User Experience
                      </h3>
                      <p className="text-gray-300">
                        Present API data in a clear, accessible, and engaging
                        way. Use loading states, error messages, and intuitive
                        UI to enhance the user experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <ScrollText className="mr-2 h-5 w-5" /> Documentation &
                  Support
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Resources to help you succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <FileCode2 className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Official Documentation
                    </h3>
                    <p className="text-gray-400 mb-4">
                      In-depth guides and API references for all available
                      services
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
                      onClick={() =>
                        window.open("https://docs.api.market/", "_blank")
                      }
                    >
                      View Docs
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Community Forums
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Engage with other developers for assistance and
                      collaboration
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
                      onClick={() =>
                        window.open("https://api.market/", "_blank")
                      }
                    >
                      Join Community
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <MessageSquareQuote className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Customer Support
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Direct channels for resolving technical queries and issues
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
                      onClick={() =>
                        window.open("https://api.market/", "_blank")
                      }
                    >
                      Get Support
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center">
                    <div className="bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="h-6 w-6 text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Webinars & Tutorials
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Learn best practices and advanced integration techniques
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
                      onClick={() =>
                        window.open("https://docs.api.market/", "_blank")
                      }
                    >
                      Watch Tutorials
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sample" className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Lightbulb className="mr-2 h-5 w-5" /> Sample Project
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Explore a real-world implementation using API.market
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-1/2">
                      <h3 className="text-xl font-bold text-white mb-4">
                        API.market Demo Project
                      </h3>
                      <p className="text-gray-300 mb-4">
                        This sample project demonstrates how to effectively
                        integrate with API.market services to build a functional
                        application. It showcases best practices for API
                        authentication, error handling, and data presentation.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-medium text-purple-300 mb-2">
                            Key Features
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li>
                              Multiple API integrations in a single application
                            </li>
                            <li>Responsive design for all device types</li>
                            <li>Efficient error handling and loading states</li>
                            <li>Clean, maintainable code structure</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-purple-300 mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                              React
                            </Badge>
                            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                              Next.js
                            </Badge>
                            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                              Tailwind CSS
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button
                          className="bg-purple-600 hover:bg-purple-500 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://api-market.pulkitxm.com/",
                              "_blank"
                            )
                          }
                        >
                          <Rocket className="mr-2 h-4 w-4" /> View Demo
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-600 text-purple-300 hover:bg-purple-900/30 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://github.com/Pulkitxm/api-market",
                              "_blank"
                            )
                          }
                        >
                          <Code className="mr-2 h-4 w-4" /> View Code
                        </Button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                      <div className="p-2 bg-gray-950 border-b border-gray-800 flex items-center">
                        <div className="flex space-x-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto text-xs text-gray-400">
                          api-market.pulkitxm.com
                        </div>
                      </div>
                      <div className="p-4">
                        <img
                          src={API_MARKET_SAMPLE_PROJECT.src}
                          alt="API.market Sample Project Screenshot"
                          className="w-full h-auto rounded border border-gray-700"
                        />
                        <div className="mt-4 space-y-2">
                          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <Trophy className="mr-2 h-5 w-5" /> Evaluation Criteria
                </CardTitle>
                <CardDescription className="text-gray-400">
                  How your project will be judged
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-purple-700 to-violet-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        Innovativeness
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-3">
                      The creative use of API integrations and originality of
                      the solution.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>25%</span>
                      <span>of total score</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-purple-700 to-violet-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        Functionality
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-3">
                      A seamless, fully functional integration that works as
                      intended.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>20%</span>
                      <span>of total score</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-purple-700 to-violet-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Code className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        Technical Execution
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Quality code, robust error handling, and strong
                      performance.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>20%</span>
                      <span>of total score</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-purple-700 to-violet-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <MessageSquareQuote className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        Presentation
                      </h3>
                    </div>
                    <p className="text-gray-300 mb-3">
                      An impressive demo with clear documentation and
                      explanation.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>15%</span>
                      <span>of total score</span>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-purple-700 to-violet-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Impact</h3>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Real-world benefits and applicability of the solution.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>20%</span>
                      <span>of total score</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-300">
                  <ListChecks className="mr-2 h-5 w-5" /> Submission
                  Requirements
                </CardTitle>
                <CardDescription className="text-gray-400">
                  What to include in your final submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-sm font-bold text-purple-300">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        Working Prototype
                      </h3>
                      <p className="text-gray-300">
                        A functional demo of your project that showcases the API
                        integration. This can be a deployed web app, mobile app,
                        or GitHub repository with clear setup instructions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-sm font-bold text-purple-300">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        Presentation Materials
                      </h3>
                      <p className="text-gray-300">
                        A pitch deck presentation (3-5 minutes) explaining your
                        project, the problem it solves, and how you utilized
                        API.market&apos;s offerings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-900/50 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <span className="text-sm font-bold text-purple-300">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        Source Code
                      </h3>
                      <p className="text-gray-300">
                        Access to your project&apos;s source code (GitHub
                        repository) with a well-structured README file and
                        comments explaining key components.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
