import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LadderRow from './LadderRow';

const TradingLadder: React.FC = () => {
  const levels = useSelector((state: any) => state.ladder.levels);
  const [orderInfo, setOrderInfo] = useState<{ price: number; side: string } | null>(null);

  const handleOrder = (price: number, side: string) => {
    setOrderInfo({ price, side });
  };

  return (
    <div className="overflow-x-auto bg-gray-900 p-2 rounded-lg shadow-lg border border-gray-700 w-full" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <table className="min-w-full text-lg font-mono">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="px-4 py-2">Bid</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Ask</th>
            <th className="px-4 py-2">Volume</th>
            <th className="px-4 py-2">Order</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level: any) => (
            <LadderRow
              key={level.price}
              bidSize={level.bidSize}
              price={level.price}
              askSize={level.askSize}
              volume={level.volume}
              onOrder={handleOrder}
              orderInfo={orderInfo && orderInfo.price === level.price ? orderInfo : null}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingLadder;
