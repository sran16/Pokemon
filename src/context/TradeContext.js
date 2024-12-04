import { createContext, useState, useContext } from 'react';

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const [trades, setTrades] = useState([]);

  const proposeTrade = (fromUser, toUser, offeredPokemon, requestedPokemon) => {
    const newTrade = {
      id: Date.now(),
      fromUser,
      toUser,
      offeredPokemon,
      requestedPokemon,
      status: 'pending'
    };
    setTrades(prevTrades => [...prevTrades, newTrade]);
  };

  const respondToTrade = (tradeId, accepted) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId
          ? { ...trade, status: accepted ? 'accepted' : 'rejected' }
          : trade
      )
    );
  };

  return (
    <TradeContext.Provider value={{ trades, proposeTrade, respondToTrade }}>
      {children}
    </TradeContext.Provider>
  );
}

export const useTrade = () => useContext(TradeContext); 