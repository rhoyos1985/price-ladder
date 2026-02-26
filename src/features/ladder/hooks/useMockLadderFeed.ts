import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLevels, updateLevel } from '../slices/ladderSlice';

const START_PRICE = 4090.0;
const TICK = 0.25;
const LEVELS = 20;

function randomVolume() {
  return Math.floor(Math.random() * 10000 + 100);
}

function randomBidAsk() {
  return Math.floor(Math.random() * 350 + 25);
}

export function useMockLadderFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize grid
    const initialLevels = Array.from({ length: LEVELS }, (_, i) => ({
      price: START_PRICE - i * TICK,
      bidSize: randomBidAsk(),
      askSize: randomBidAsk(),
      volume: randomVolume(),
    }));
    dispatch(setLevels(initialLevels));

    // Simulate feed
    const interval = setInterval(() => {
      for (let i = 0; i < LEVELS; i++) {
        dispatch(updateLevel({
          price: START_PRICE - i * TICK,
          bidSize: randomBidAsk(),
          askSize: randomBidAsk(),
          volume: randomVolume(),
        }));
      }
    }, Math.random() * 150 + 100); // 100-250ms
    return () => clearInterval(interval);
  }, [dispatch]);
}
