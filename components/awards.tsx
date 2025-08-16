"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Award, Medal, Calendar } from "lucide-react"

export default function Awards() {
  const awards = [
    {
      title: "Best Designer of the Month",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      organization: "Tech Innovators Inc.",
      year: "2023",
      icon: <Trophy className="w-8 h-8" />,
    },
    {
      title: "The True Gem",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      organization: "Creative Minds Agency",
      year: "2022",
      icon: <Medal className="w-8 h-8" />,
    },
    {
      title: "First Class Performer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      organization: "Global Solutions Ltd.",
      year: "2021",
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: "Customers Favourite",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      organization: "Web Crafters Co.",
      year: "2020",
      icon: <Trophy className="w-8 h-8" />,
    },
  ]

  return (
    <section id="awards" className="py-16 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">
          <span className="text-purple-400">Awards & Recognition</span>
        </h2>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700 mb-8">
            <TabsTrigger value="recent" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Recent Awards</TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All Time</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              {awards.slice(0, 3).map((award, index) => (
                <Card key={index} className="professional-card p-6 text-center hover:border-purple-400/50 transition-all duration-500 group bg-gray-900/50 border-gray-800">
                  <CardContent className="p-0">
                    <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                      {award.icon}
                    </div>
                    <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-3">
                      {award.year}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white mb-2">{award.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{award.organization}</p>
                    <Separator className="bg-gray-700 mb-3" />
                    <p className="text-gray-300 text-xs leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <Card key={index} className="professional-card p-6 text-center hover:border-purple-400/50 transition-all duration-500 group bg-gray-900/50 border-gray-800">
                  <CardContent className="p-0">
                    <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                      {award.icon}
                    </div>
                    <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-3">
                      {award.year}
                    </Badge>
                    <h3 className="text-xl font-semibold text-white mb-2">{award.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{award.organization}</p>
                    <Separator className="bg-gray-700 mb-3" />
                    <p className="text-gray-300 text-xs leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}