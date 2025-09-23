import React, { useEffect, useRef, useState } from 'react'
import burguer from '../../assets/burguer.png'
import pizza from '../../assets/pizza.png'

const Categories = () => {
  const items = [
    { name: 'PIZZA', image: pizza },
    { name: 'PIZZA', image: pizza },
    { name: 'HAMBURGUER', image: burguer },
    { name: 'SUSHI', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop' },
    { name: 'SALADA', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop' }
  ]

  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let intervalId

    const tick = () => {
      if (!container) return
      const nextLeft = container.scrollLeft + container.clientWidth
      if (nextLeft + 1 >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollTo({ left: nextLeft, behavior: 'smooth' })
      }
    }

    if (!isHovered) {
      intervalId = setInterval(tick, 3000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row overflow-x-auto gap-4 py-4 pl-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item, index) => (
        <div key={index} className="min-w-[140px] md:min-w-[160px] rounded-lg overflow-hidden shadow">
          <img src={item.image} alt={item.name} className="w-full h-24 md:h-28 object-cover" />
          <div className="bg-white text-center py-2 font-semibold">{item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Categories
