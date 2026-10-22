import { memo } from "react"

const groves = [
  [130, 370, .9], [165, 398, .7], [110, 417, 1], [192, 440, .8],
  [470, 160, .9], [505, 186, 1.1], [535, 157, .8], [558, 201, .9], [475, 212, .7],
  [620, 600, 1], [665, 625, .9], [695, 590, 1.2], [736, 636, .8], [645, 665, .7],
  [1030, 495, .9], [1065, 520, 1.1], [1100, 485, .8], [1137, 530, 1],
  [1510, 370, 1], [1547, 390, .8], [1585, 351, 1.1], [1610, 407, .9], [1495, 417, .7],
  [1630, 750, .9], [1670, 782, 1.1], [1705, 739, .8],
]

/** Original vector terrain: a storybook atlas, not a geographical map. */
export const JourneyTerrain = memo(function JourneyTerrain() {
  return (
    <svg className="journey-terrain" viewBox="0 0 1800 900" aria-hidden="true">
      <defs>
        <pattern id="atlas-grid" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M90 0H0V90" fill="none" stroke="#777d5c" strokeWidth=".7" opacity=".12" /></pattern>
        <pattern id="atlas-grain" width="19" height="23" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".7" fill="#737b55" opacity=".15" /><circle cx="13" cy="16" r=".5" fill="#fffdf0" opacity=".8" /></pattern>
        <linearGradient id="atlas-land" x2=".8" y2="1"><stop stopColor="#e8ead6" /><stop offset="1" stopColor="#f4edda" /></linearGradient>
        <linearGradient id="atlas-water" x2="1" y2="1"><stop stopColor="#bcd6d5" /><stop offset="1" stopColor="#d4e3db" /></linearGradient>
        <g id="atlas-tree"><ellipse cx="2" cy="9" rx="15" ry="5" fill="#59684b" opacity=".12" /><path d="M0-38 17-6H9L21 7H-21L-9-6H-17Z" fill="#98ad84" /><path d="M0-38 0 7H21L9-6H17Z" fill="#718f70" /><path d="M0 5V13" stroke="#7a7f60" strokeWidth="3" /></g>
        <g id="atlas-mountain"><path d="M-75 45 0-60 86 45Z" fill="#c2c6ac" /><path d="M0-60 86 45 16 29Z" fill="#9fae92" /><path d="m-24-27 24-33 28 35-22-9-9 12-8-12Z" fill="#fbf8e9" /><path d="M-75 45Q-20 60 86 45" fill="#879978" opacity=".16" /></g>
        <g id="atlas-house"><path d="M-21-3H21V26H-21Z" fill="#eee2bf" /><path d="M0-26 29-3H-29Z" fill="#c48b73" /><path d="M0-26 29-3H7Z" fill="#ab735e" /><path d="M-5 10H5V26H-5ZM-16 4H-9V11H-16ZM10 4H17V11H10Z" fill="#88988b" /><path d="M-24 27H26" stroke="#adad89" strokeWidth="3" /></g>
      </defs>
      <rect width="1800" height="900" fill="url(#atlas-land)" />
      <path d="M0 560C140 530 90 665 220 717S490 703 529 900H0Z" fill="url(#atlas-water)" />
      <path d="M-10 540C160 515 100 650 231 701S508 692 550 920" fill="none" stroke="#f9f5df" strokeWidth="14" />
      <path d="M-10 512C170 495 126 630 244 679S529 673 580 920M-10 489C188 468 155 608 260 655S555 651 607 920" fill="none" stroke="#c4c9ad" strokeWidth="1.5" opacity=".65" />
      <path d="M785-30C710 93 862 132 807 232S702 410 802 547 834 729 992 930" fill="none" stroke="#d8dcc0" strokeWidth="33" />
      <path d="M785-30C710 93 862 132 807 232S702 410 802 547 834 729 992 930" fill="none" stroke="#b9d3cd" strokeWidth="22" />
      <path d="M785-30C710 93 862 132 807 232S702 410 802 547 834 729 992 930" fill="none" stroke="#eff1dd" strokeWidth="1.5" strokeDasharray="12 26" />
      <g fill="#afbd93" opacity=".2">
        <path d="M41 298Q121 234 198 323T221 475Q145 512 63 450T41 298Z" />
        <path d="M400 120Q470 71 560 131T602 250Q468 293 413 231T400 120Z" />
        <path d="M558 552Q653 510 734 553T787 691Q712 742 621 702T558 552Z" />
        <path d="M977 451Q1051 410 1122 456T1179 575Q1033 606 991 550T977 451Z" />
        <path d="M1450 329Q1540 282 1632 335T1652 456Q1510 484 1469 423T1450 329Z" />
      </g>
      <g fill="none" stroke="#afb798" strokeWidth="1.5" opacity=".42">
        {[0, 1, 2, 3, 4].map(index => <path key={index} transform={`translate(${index * 18} ${index * 13}) scale(${1 - index * .09})`} d="M-80 115C8-25 330-70 361 121S160 331 45 264-129 263-80 115Z" />)}
        {[0, 1, 2, 3, 4].map(index => <path key={index} transform={`translate(${index * 115} ${index * 7}) scale(${1 - index * .07})`} d="M1210-40C1295 28 1254 173 1405 210S1663 182 1756 281 1900 151 1879-12" />)}
        {[0, 1, 2, 3].map(index => <path key={index} transform={`translate(${index * 81} ${index * 53}) scale(${1 - index * .07})`} d="M975 724C1020 625 1172 640 1220 718S1340 826 1310 943H955C918 856 912 810 975 724Z" />)}
      </g>
      <rect width="1800" height="900" fill="url(#atlas-grid)" />
      <g opacity=".85">
        <use href="#atlas-mountain" transform="translate(180 180) scale(1.2)" /><use href="#atlas-mountain" transform="translate(300 205) scale(.85)" />
        <use href="#atlas-mountain" transform="translate(1380 145) scale(1.2)" /><use href="#atlas-mountain" transform="translate(1504 139) scale(1.6)" /><use href="#atlas-mountain" transform="translate(1630 173) scale(.9)" />
        <use href="#atlas-mountain" transform="translate(1075 743) scale(.85)" /><use href="#atlas-mountain" transform="translate(1155 765) scale(1.1)" />
      </g>
      {groves.map(([x, y, scale], index) => <use key={index} href="#atlas-tree" transform={`translate(${x} ${y}) scale(${scale})`} />)}
      <g transform="translate(350 320)"><use href="#atlas-house" transform="translate(-34 13) scale(.8)" /><use href="#atlas-house" /><use href="#atlas-house" transform="translate(37 19) scale(.7)" /><path d="M-64 43Q0 55 64 43" fill="none" stroke="#c9bea0" strokeWidth="3" /></g>
      <g transform="translate(1250 340)"><use href="#atlas-house" transform="translate(-25 10) scale(.8)" /><use href="#atlas-house" transform="translate(25 -5)" /></g>
      <g transform="translate(1467 548)"><path d="M-38 0H38V44H-38Z" fill="#e8ddbf" /><path d="m-46 0 46-26L46 0Z" fill="#a4af98" /><path d="M-26 9V35M-9 9V35M9 9V35M26 9V35" stroke="#f8f1d9" strokeWidth="8" /><path d="M-43 44H43" stroke="#b0ad92" strokeWidth="5" /></g>
      <g fill="#77856a" fontFamily="Georgia, serif" fontStyle="italic" fontSize="24" letterSpacing="2">
        <text x="106" y="300" transform="rotate(-8 106 300)">The foothills</text>
        <text x="465" y="470" transform="rotate(-8 465 470)">Learning by doing</text>
        <text x="930" y="155" transform="rotate(4 930 155)">Higher ground</text>
        <text x="1150" y="615" transform="rotate(5 1150 615)">Into the real world</text>
        <text x="1480" y="275" transform="rotate(-6 1480 275)">More to discover</text>
      </g>
      <g fill="none" stroke="#87aaa6" strokeWidth="2" opacity=".55"><path d="M55 708q15-7 30 0t30 0M80 725q15-7 30 0t30 0M223 815q15-7 30 0t30 0M245 833q15-7 30 0t30 0" /></g>
      <text x="90" y="813" fill="#7f9e98" fontFamily="Georgia, serif" fontStyle="italic" fontSize="22" letterSpacing="5" transform="rotate(18 90 813)">a sea of possibilities</text>
      <g transform="translate(1700 430)"><path d="M0 50V-40" stroke="#7c876a" strokeWidth="3" /><path d="M2-40Q30-51 52-35V-6Q30-22 2-10Z" fill="#d18b6f" /><ellipse cy="53" rx="15" ry="4" fill="#7c876a" opacity=".2" /></g>
      <rect width="1800" height="900" fill="url(#atlas-grain)" />
    </svg>
  )
})
