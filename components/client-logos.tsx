
"use client"

export default function ClientLogos() {
  return (
    <section className="py-16 px-6 border-t border-gray-900 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-16 h-16 bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-lg border border-gray-700/30">
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
