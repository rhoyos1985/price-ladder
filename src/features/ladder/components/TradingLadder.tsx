import React from 'react';
import { useSelector } from 'react-redux';
import LadderRow from './LadderRow';
import type { RootState } from '../../../store';
import type { PriceLevel } from '../types/LadderTipes';


const TradingLadder: React.FC = () => {
  const levels: PriceLevel[] = useSelector((state: RootState) => state.ladder.levels);
  const [orderInfo, setOrderInfo] = React.useState<{ price: number; side: 'Buy' | 'Sell' } | null>(null);

  const handleOrder = (price: number, side: 'Buy' | 'Sell') => {
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
            <th className="px-4 py-2">Order</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level: PriceLevel) => (
            <LadderRow
              key={level.price}
              bidOrderSize={level.bidSize}
              priceLevel={level.price}
              askOrderSize={level.askSize}
              onOrderEntry={handleOrder}
              orderDetails={orderInfo && orderInfo.price === level.price ? orderInfo : null}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingLadder;
