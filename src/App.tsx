import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TradingLadder from './features/ladder/components/TradingLadder';
import { useMockLadderFeed } from './features/ladder/hooks/useMockLadderFeed';

const LadderWithFeed: React.FC = () => {
  useMockLadderFeed();
  return <TradingLadder />;
};

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Trading Ladder</h1>
        <LadderWithFeed />
      </div>
    </Provider>
  );
}

export default App;
