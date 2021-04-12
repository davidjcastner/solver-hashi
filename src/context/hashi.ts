import type { HashiContext } from '../types/HashiContext';
import { createContext, useContext } from 'react';

/** default values for hashi context */
export const initialHashiContext: HashiContext = { cells: [] };

/** react context wrapper for location */
export const HashiCtxComp = createContext<HashiContext>(initialHashiContext);

/** provides location context to all children in Router component */
export const useHashi = (): HashiContext => useContext(HashiCtxComp);
