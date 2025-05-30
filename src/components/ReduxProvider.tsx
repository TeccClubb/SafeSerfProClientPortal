'use client';

import { Provider } from 'react-redux';
// import { store } from '@/store';
import { store } from '@/store/store'; // Adjust the import path as necessary
import React from 'react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
