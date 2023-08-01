import { configureStore } from "@reduxjs/toolkit";
import busybuyReducer from "./busybuySlice";
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist"; //for not losing the data on page refresh
import storage from 'redux-persist/lib/storage'

    const persistConfig = {
      key: 'root',
      version: 1,
      storage,
    };
    
    const persistedReducer = persistReducer(persistConfig, busybuyReducer);

    export const store = configureStore({
        reducer: {busybuy: persistedReducer},
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }),
      });
      
      export let persistor = persistStore(store);