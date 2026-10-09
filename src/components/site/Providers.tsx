"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SITE } from "@/lib/site";

/* ---------- Session (demo state; replace with real auth) ---------- */

export type User = { name: string; email: string; company?: string };

type Session = {
  signedIn: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <Providers>");
  return ctx;
}

/* ---------- Toast ---------- */

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SITE.sessionKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {}
  }, []);

  const signIn = useCallback((u: User) => {
    setUser(u);
    try {
      localStorage.setItem(SITE.sessionKey, JSON.stringify(u));
    } catch {}
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(SITE.sessionKey);
    } catch {}
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const session = useMemo(
    () => ({ signedIn: !!user, user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={session}>
      <ToastContext.Provider value={showToast}>
        {children}
        <div aria-live="polite" role="status" className="sr-only">
          {toast}
        </div>
        {toast && (
          <div
            aria-hidden="true"
            className="fixed bottom-7 left-1/2 z-[60] rounded-lg bg-navy-800 px-[18px] py-3 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,.4)]"
            style={{ animation: "fasUp .2s ease-out both" }}
          >
            {toast}
          </div>
        )}
      </ToastContext.Provider>
    </SessionContext.Provider>
  );
}
