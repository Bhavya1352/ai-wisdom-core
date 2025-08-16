import React, { createContext, useContext, useReducer } from 'react';

interface AppState {
  documents: any[];
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
  activeView: 'search' | 'upload' | 'dashboard';
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DOCUMENTS'; payload: any[] }
  | { type: 'ADD_DOCUMENT'; payload: any }
  | { type: 'REMOVE_DOCUMENT'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: any[] }
  | { type: 'SET_ACTIVE_VIEW'; payload: 'search' | 'upload' | 'dashboard' };

const initialState: AppState = {
  documents: [],
  searchResults: [],
  isLoading: false,
  error: null,
  activeView: 'search',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [...state.documents, action.payload] };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addDocument: (document: any) => void;
  removeDocument: (id: string) => void;
  setSearchResults: (results: any[]) => void;
  setActiveView: (view: 'search' | 'upload' | 'dashboard') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const addDocument = (document: any) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
  };

  const removeDocument = (id: string) => {
    dispatch({ type: 'REMOVE_DOCUMENT', payload: id });
  };

  const setSearchResults = (results: any[]) => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  };

  const setActiveView = (view: 'search' | 'upload' | 'dashboard') => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    addDocument,
    removeDocument,
    setSearchResults,
    setActiveView,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;