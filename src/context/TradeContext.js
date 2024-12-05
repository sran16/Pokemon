import React, { createContext, useContext, useState, useEffect } from 'react';

const TradeContext = createContext();

export function TradeProvider({ children }) {
  const [trades, setTrades] = useState(() => {
    const savedTrades = localStorage.getItem('trades');
    return savedTrades ? JSON.parse(savedTrades) : [];
  });

  // Sauvegarder les trades dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('trades', JSON.stringify(trades));
  }, [trades]);

  const proposeTrade = (fromUser, toUser, offeredPokemon, requestedPokemon) => {
    const newTrade = {
      id: Date.now().toString(),
      fromUser,
      toUser,
      offeredPokemon,
      requestedPokemon,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setTrades(prevTrades => [...prevTrades, newTrade]);
  };

  const respondToTrade = (tradeId, response) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId
          ? { ...trade, status: response }
          : trade
      )
    );
  };

  const getTradesForUser = (username) => {
    return trades.filter(
      trade => 
        (trade.fromUser === username || trade.toUser === username) &&
        trade.status === 'pending'
    );
  };

  const value = {
    trades,
    proposeTrade,
    respondToTrade,
    getTradesForUser
  };

  return (
    <TradeContext.Provider value={value}>
      {children}
    </TradeContext.Provider>
  );
}

export function useTrade() {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
} 