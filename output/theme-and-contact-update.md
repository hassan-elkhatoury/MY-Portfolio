# Theme transition and contact key colors

The Day/Night button now reveals the actual incoming theme from its center over 1.65 seconds. Browser snapshots preserve the outgoing page while a radial mask progressively reveals the new page. An 80–180px feathered boundary and a brief 2px-to-zero blur blend the images and content. Both directions use the same treatment, with no solid color curtain or covered-screen fade. The page stays at its current scroll position.

The browser's native View Transition API captures the root-class change managed by next-themes. A registered CSS length animates the mask radius. Theme CSS transitions are disabled only while snapshots are captured/revealed, so sky images and surfaces are captured in their completed theme. Repeated clicks are ignored during the transition. Resize, page hide, unmount, and paused animations skip the transition safely. Reduced motion and unsupported browsers change theme immediately. Snapshot failures preserve the requested theme and remove temporary styles.

API references: [Document.startViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition) and [CSS @property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property).

Contact key faces now use brick red, plum, blue, teal, and warm gold. Matching darker edges retain the keyboard depth. Label contrast at the lightest part of each face ranges from 4.88:1 to 9.15:1.

Browser verification remains unavailable following the browser policy denial recorded in the preceding update. No rendered screenshot or interaction test is claimed for this change.

The replacement passed targeted ESLint and the production build, including TypeScript and all 16 static pages. The local production server was restarted on port 3000. Final visual confirmation remains outstanding because browser access is blocked.
