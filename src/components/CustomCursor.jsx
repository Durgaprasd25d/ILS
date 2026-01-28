import { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false)
  const [click, setClick] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 250, restDelta: 0.001 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isSelectable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      
      setHovered(!!isSelectable)
    }

    const handleMouseDown = () => setClick(true)
    const handleMouseUp = () => setClick(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a961] rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#c9a961] rounded-full pointer-events-none z-[99999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 2.5 : 1,
          opacity: hovered ? 0.4 : 0.8,
          backgroundColor: hovered ? 'rgba(201, 169, 97, 0.1)' : 'transparent',
          borderWidth: click ? '3px' : '1px'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />
    </>
  )
}

export default CustomCursor
