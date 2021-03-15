import React from 'react';
import AppRouter from './router';
import { Global } from '../styles/globals.styled';

export default function App() {
  return (
    <Global>
      <AppRouter />
    </Global>
  );
}

