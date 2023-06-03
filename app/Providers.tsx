'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '@/components/store';

const persist = persistStore(store);
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persist}>{children}</PersistGate>
        </Provider>
    );
}
