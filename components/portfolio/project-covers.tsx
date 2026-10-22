export const covers = [
  { name: "Interview\nAI", color: "#e76c43", ink: "#fffdf7", motif: "interview", line: "Practice. Learn. Repeat." },
  { name: "Qt\nMessenger", color: "#258dbd", ink: "#fffdf7", motif: "messenger", line: "A little more connected." },
  { name: "Mongo\nShardLab", color: "#db4356", ink: "#fffdf7", motif: "cluster", line: "Made to work together." },
  { name: "CAN 2025\nPredictions", color: "#7661ce", ink: "#fffdf7", motif: "football", line: "The beautiful game, in data." },
  { name: "MODEYA", color: "#bd9668", ink: "#fffdf7", motif: "shop", line: "A storefront, thoughtfully built." },
  { name: "E-commerce", color: "#688466", ink: "#fffdf7", motif: "shop", line: "From browse to checkout." },
  { name: "E-service", color: "#429688", ink: "#fffdf7", motif: "assignments", line: "Making room for everyone." },
  { name: "Arabela", color: "#8e526d", ink: "#fffdf7", motif: "shop", line: "Modest fashion, across languages." },
]

export function CoverArt({ motif }: { motif: string }) {
  // Small, original illustrations keep the physical project cards crisp at every size.
  return (
    <svg viewBox="0 0 140 105" fill="none" className="work-cover-art" aria-hidden="true">
      {motif === "interview" && <>
        <rect x="19" y="15" width="103" height="68" rx="9" stroke="currentColor" strokeWidth="2.5" />
        <path d="M49 83v12m43-12v12M38 95h65M55 42l-12 9 12 9m29-18 12 9-12 9m-15-23-7 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m110 6 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="currentColor" />
      </>}
      {motif === "messenger" && <>
        <path d="M16 23a10 10 0 0 1 10-10h64a10 10 0 0 1 10 10v37a10 10 0 0 1-10 10H45L27 83V70h-1a10 10 0 0 1-10-10V23Z" fill="currentColor" opacity=".12" />
        <path d="M16 23a10 10 0 0 1 10-10h64a10 10 0 0 1 10 10v37a10 10 0 0 1-10 10H45L27 83V70h-1a10 10 0 0 1-10-10V23Z" stroke="currentColor" strokeWidth="2.5" />
        <path d="M101 42h13a10 10 0 0 1 10 10v25a10 10 0 0 1-10 10h-1v13L96 87H73a10 10 0 0 1-10-10v-7" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="38" cy="42" r="4" fill="currentColor" /><circle cx="58" cy="42" r="4" fill="currentColor" /><circle cx="78" cy="42" r="4" fill="currentColor" />
      </>}
      {motif === "cluster" && <>
        <path d="M70 33v23m-37 6 37-6 37 6" stroke="currentColor" strokeWidth="2.5" />
        {[{ x: 53, y: 6 }, { x: 15, y: 60 }, { x: 54, y: 64 }, { x: 94, y: 60 }].map(({ x, y }) => <g key={`${x}-${y}`}>
          <path d={`M${x} ${y + 8}v22c0 9 33 9 33 0V${y + 8}`} fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="2.2" />
          <ellipse cx={x + 16.5} cy={y + 8} rx="16.5" ry="7" stroke="currentColor" strokeWidth="2.2" />
          <path d={`M${x} ${y + 20}c0 9 33 9 33 0`} stroke="currentColor" strokeWidth="2.2" />
        </g>)}
      </>}
      {motif === "football" && <>
        <circle cx="67" cy="52" r="40" fill="currentColor" opacity=".08" />
        <circle cx="67" cy="52" r="40" stroke="currentColor" strokeWidth="2.5" />
        <path d="m67 35 16 12-6 19H57l-6-19 16-12ZM67 35V12m16 35 22-7M77 66l12 19M57 66 44 85M51 47l-22-7" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m112 17 9-9m-1 20 11-1M106 8l1-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {motif === "shop" && <>
        <path d="M28 29h84l-7 62H35l-7-62Z" fill="currentColor" fillOpacity=".09" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M49 37V24a21 21 0 0 1 42 0v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m70 49 4 12 13 1-10 8 3 13-10-8-11 8 4-13-10-8 13-1 4-12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </>}
      {motif === "assignments" && <>
        <path d="M30 13h81v82H30V13Z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="2.5" />
        <path d="M45 6v14m19-14v14m19-14v14m19-14v14M30 33h81M61 33v62m25-62v62M30 55h81M30 76h81" stroke="currentColor" strokeWidth="2" />
        <path d="m38 44 5 5 8-9m18 25 5 5 8-9m11-17 5 5 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </>}
    </svg>
  )
}


