import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
// import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import storage from "reduxjs-toolkit-persist/lib/storage"; // defaults to localStorage for web

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({ user: userSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export let persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
