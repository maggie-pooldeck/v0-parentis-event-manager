export function WovenLogo({ className = "" }: { className?: string }) {
  const colors = ["#6477D5", "#E7FA99", "#99FADB", "#F54933", "#FA99E4", "#5ECAEB"]

  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Create a woven potholder pattern */}
      <g>
        {/* Horizontal strips */}
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <g key={`h-${row}`}>
            {[0, 1, 2, 3, 4, 5].map((col) => {
              const colorIndex = (row + col) % colors.length
              const isVisible = (row + col) % 2 === 0
              if (!isVisible) return null
              return (
                <rect
                  key={`h-${row}-${col}`}
                  x={col * 13.33}
                  y={row * 13.33}
                  width={13.33}
                  height={13.33}
                  fill={colors[colorIndex]}
                  opacity={0.9}
                />
              )
            })}
          </g>
        ))}
        {/* Vertical strips overlay */}
        {[0, 1, 2, 3, 4, 5].map((col) => (
          <g key={`v-${col}`}>
            {[0, 1, 2, 3, 4, 5].map((row) => {
              const colorIndex = (row + col + 1) % colors.length
              const isVisible = (row + col) % 2 === 1
              if (!isVisible) return null
              return (
                <rect
                  key={`v-${row}-${col}`}
                  x={col * 13.33}
                  y={row * 13.33}
                  width={13.33}
                  height={13.33}
                  fill={colors[colorIndex]}
                  opacity={0.9}
                />
              )
            })}
          </g>
        ))}
      </g>
      {/* Border to frame the woven pattern */}
      <rect x="1" y="1" width="78" height="78" stroke="#1F2937" strokeWidth="2" fill="none" />
    </svg>
  )
}
