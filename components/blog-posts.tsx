"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { getBlogPosts, type BlogPost } from "@/lib/contentful"

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID && process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
          const contentfulPosts = await getBlogPosts()
          setPosts(contentfulPosts)
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [posts])

  const formatDate = (post: BlogPost) => {
    // Try different possible date field names or fall back to created date
    const dateStr = post.fields.date || post.fields.publishDate || post.fields.datePublished || post.sys.createdAt
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTitle = (post: BlogPost) => {
    return post.fields.title || 'Untitled Post'
  }

  const getExcerpt = (post: BlogPost) => {
    return post.fields.summary || post.fields.excerpt || post.fields.description || 'No description available'
  }

  const getCategory = (post: BlogPost) => {
    return post.fields.category || 'TECH'
  }

  const getAuthor = (post: BlogPost) => {
    return post.fields.author || 'Abhik Anand'
  }

  const getImageUrl = (post: BlogPost) => {
    // Prioritize "Header image" field as shown in your Contentful config
    const imageField = post.fields['Header image'] || post.fields['Header Image'] || post.fields.headerImage || post.fields.image || post.fields.featuredImage || post.fields.thumbnail
    if (imageField?.fields?.file?.url) {
      return `https:${imageField.fields.file.url}`
    }
    return "/placeholder.svg"
  }

  if (loading) {
    return (
      <section id="blog" className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white">
              Blog <span className="text-purple-400">Posts</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Loading blog posts...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Blog <span className="text-purple-400">Posts</span>
          </h2>

        </div>

        {posts.length > 2 && (
          <div className="flex justify-end gap-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <Card
              key={post.sys.id}
              className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:border-purple-400 transition-all duration-300 flex-shrink-0 w-80"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={getImageUrl(post)}
                  alt={getTitle(post)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="border-purple-400 text-purple-400 text-xs">
                    {getCategory(post)}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(post)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Published on {formatDate(post)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                  {getTitle(post)}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{getExcerpt(post)}</p>
                <Separator className="bg-gray-700 mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-purple-600 text-white text-xs">
                        <User className="w-3 h-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-400 text-xs">{getAuthor(post)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      const slug = post.fields.slug || post.sys.id
                      window.open(`/blog/${slug}`, '_blank')
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm p-0 bg-transparent border-none cursor-pointer flex items-center"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}