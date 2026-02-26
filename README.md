# Trading Ladder (Depth of Market)

## Overview
Trading Ladder grid inspired by professional platforms. Built with React, TypeScript, Tailwind CSS, and Redux Toolkit.

## Features
- Vertical price grid with Bid, Price, Ask, Volume columns
- High-frequency mock feed (100–250ms updates)
- Global state management with Redux Toolkit
- TradingView-like dark theme and color accents

## Running the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## Architecture
- **State:** Redux Toolkit for ladder data, ensuring scalable and performant updates
- **UI:** Tailwind CSS for rapid styling, TradingView-inspired colors
- **Feed:** Custom hook simulates real-time updates


## Q&A

### State Strategy
For this project, I went with Redux Toolkit for state management. Why? When you have high-frequency updates (like every 100ms), Redux gives you predictable state, easy debugging, and performance tools like memoization. Context API is cool for smaller apps, but Redux is better for global, fast-changing data. Local state or refs would get messy and hard to scale. Redux also plays nice with React and TypeScript, so it's a solid choice for this kind of trading UI.

### Scaling the UI
If you need to show this ladder in 10 different workspaces at once, I'd:
- Make the component fully reusable and parameterized (workspace ID, feed source, etc.)
- Use a parent container to manage multiple ladders, each with its own slice of state
- Optimize rendering: memoize rows/cells, use virtualization if the ladders get big
- Keep each workspace's feed isolated, maybe with separate Redux slices or even different stores if needed
- Make sure the UI stays responsive by throttling updates and avoiding unnecessary re-renders

### Error Handling: Data Lag / Desync
If the WebSocket feed lags or desyncs from the market:
- Show a warning banner or icon in the UI ("Data Lag: Feed is behind market")
- Track timestamps for each update and compare to the current time
- If lag exceeds a threshold (e.g., 500ms), trigger the warning
- Optionally, auto-reconnect or refresh the feed
- Log the issue for monitoring and alert the user if it's critical

### Mentorship: Best Practices for Juniors
1. **Keep Components Small and Focused**
   - Each component should do one thing well. For example, LadderRow just handles a single row, LadderCell just a cell. This makes code easier to test and debug.
2. **Use Explicit Variable Names**
   - Don't use generic names like `data` or `val`. Use `bidOrderSize`, `priceLevel`, etc. It helps everyone understand the code quickly and reduces mistakes.

Bonus: Always add comments for tricky logic (like flash effects or order entry), and keep your code DRY (Don't Repeat Yourself).

