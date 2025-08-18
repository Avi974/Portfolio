
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skills = [
    { name: "React / Next.js", level: 95, color: "bg-blue-500" },
    { name: "TypeScript", level: 90, color: "bg-purple-500" },
    { name: "Tailwind CSS", level: 85, color: "bg-cyan-500" },
    { name: "Node.js", level: 80, color: "bg-green-500" },
    { name: "UI/UX Design", level: 88, color: "bg-pink-500" },
    { name: "Three.js", level: 75, color: "bg-orange-500" }
  ]

  const categories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Tools",
      skills: ["Git", "Docker", "Figma", "Adobe XD", "VS Code"]
    }
  ]

  return (
    <section className="py-20 px-6 section-professional">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proficiency in various technologies and tools that help me create exceptional digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Progress Bars */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Proficiency</h3>
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="relative h-2 bg-gray-900/30 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full lightning-storm-bar"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      '--skill-level': skill.level
                    } as React.CSSProperties & { '--skill-level': number }}
                  />
                  <div 
                    className="absolute top-0 left-0 h-full lightning-storm-glow"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      '--skill-level': skill.level
                    } as React.CSSProperties & { '--skill-level': number }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skill Categories */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Technologies & Tools</h3>
            {categories.map((category, index) => (
              <Card key={index} className="professional-card p-6 hover:border-blue-400/50 transition-all duration-500">
                <CardContent className="p-0">
                  <h4 className="text-lg font-semibold text-white mb-3">{category.title}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
