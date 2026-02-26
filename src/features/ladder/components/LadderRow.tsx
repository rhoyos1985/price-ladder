

import React, { useEffect, useRef, useState } from 'react';
import LadderCell from './LadderCell';

interface LadderRowProps {
  bidOrderSize: number;
  priceLevel: number;
  askOrderSize: number;
  onOrderEntry: (price: number, side: 'Buy' | 'Sell') => void;
  orderDetails?: { price: number; side: 'Buy' | 'Sell' } | null;
}

const FLASH_DURATION_MS = 600;
const FLASH_PRICE_RANGE = 2;
const MID_MARKET_PRICE = 4087.5;

const LadderRow: React.FC<LadderRowProps> = React.memo(({ bidOrderSize, priceLevel, askOrderSize, onOrderEntry, orderDetails }) => {
  const [bidFlashClass, setBidFlashClass] = useState('');
  const [askFlashClass, setAskFlashClass] = useState('');
  const previousBidOrderSize = useRef(bidOrderSize);
  const previousAskOrderSize = useRef(askOrderSize);

  useEffect(() => {
    const isWithinFlashRange = Math.abs(priceLevel - MID_MARKET_PRICE) <= FLASH_PRICE_RANGE;
    if (isWithinFlashRange) {
      if (bidOrderSize > previousBidOrderSize.current) {
        setBidFlashClass('flash-green');
      } else if (bidOrderSize < previousBidOrderSize.current) {
        setBidFlashClass('flash-red');
      } else {
        setBidFlashClass('');
      }
      if (askOrderSize > previousAskOrderSize.current) {
        setAskFlashClass('flash-green');
      } else if (askOrderSize < previousAskOrderSize.current) {
        setAskFlashClass('flash-red');
      } else {
        setAskFlashClass('');
      }
    } else {
      setBidFlashClass('');
      setAskFlashClass('');
    }
    previousBidOrderSize.current = bidOrderSize;
    previousAskOrderSize.current = askOrderSize;
    const timeoutId = setTimeout(() => {
      setBidFlashClass('');
      setAskFlashClass('');
    }, FLASH_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [bidOrderSize, askOrderSize, priceLevel]);

  return (
    <tr>
      <LadderCell
        value={bidOrderSize}
        className={`px-4 py-2 text-right bg-blue-900 text-blue-300 border-r border-gray-700 transition-colors cursor-pointer ${bidFlashClass}`}
        onClick={() => onOrderEntry(priceLevel, 'Buy')}
      />
      <LadderCell value={priceLevel.toFixed(2)} className="px-4 py-2 text-center bg-gray-800 text-white border-r border-gray-700" />
      <LadderCell
        value={askOrderSize}
        className={`px-4 py-2 text-left bg-red-900 text-red-300 border-r border-gray-700 transition-colors cursor-pointer ${askFlashClass}`}
        onClick={() => onOrderEntry(priceLevel, 'Sell')}
      />
      <LadderCell
        value={orderDetails ? `${orderDetails.side} @ ${orderDetails.price.toFixed(2)}` : ''}
        className={`px-4 py-2 text-center bg-gray-700 ${orderDetails ? (orderDetails.side === 'Buy' ? 'text-green-300' : 'text-red-300') : ''}`}
      />
    </tr>
  );
});

export default LadderRow;
