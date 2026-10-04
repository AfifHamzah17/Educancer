import { createContext, useContext } from 'react'
export const ShellCtx = createContext({ openExit() {}, openApk() {}, install: {}, theme: {} })
export const useShell = () => useContext(ShellCtx)
