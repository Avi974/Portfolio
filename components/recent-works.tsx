"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github } from "lucide-react"

export default function RecentWorks() {
  const works = [
    {
      title: "Project 1",
      category: "Web Design • React • Creative",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-purple-600 to-blue-600",
      description: "A modern abstract design showcase featuring innovative fold and twist animations built with React and Three.js.",
      technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Project 2",
      category: "Interactive • WebGL • Animation",
      image: "/placeholder.svg?height=300&width=400",
      gradient: "from-pink-600 to-purple-600",
      description: "An interactive color exploration tool featuring dynamic circle animations and real-time color manipulation.",
      technologies: ["WebGL", "Canvas API", "JavaScript", "CSS3"],
      liveUrl: "#",
      githubUrl: "#"
    },
  ]

  return (
    <section id="work" className="py-16 px-6 section-professional">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Recent <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-300 max-w-md">
            Showcasing my latest projects with cutting-edge design and development techniques
            that deliver exceptional user experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="professional-card overflow-hidden group hover:border-blue-400/50 transition-all duration-500 animate-pulse-glow cursor-pointer">
                  <div className={`h-64 bg-gradient-to-br ${work.gradient} relative overflow-hidden`}>
                    <img
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-400 text-sm mb-2">{work.category}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                      <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">{work.title}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {work.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className={`h-64 bg-gradient-to-br ${work.gradient} relative overflow-hidden rounded-lg`}>
                    <img
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-80"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-white">Technologies Used</h4>
                    <div className="flex gap-2 flex-wrap">
                      {work.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-purple-400/50 text-purple-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      View Code
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
