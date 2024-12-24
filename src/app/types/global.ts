// src/types/telegram.d.ts
interface TelegramWebApp {
  initDataUnsafe?: {
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
  };
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
  };
  expand: () => void;
  ready: () => void;
}

declare global {
  interface Window {
    TelegramWebApp: TelegramWebApp;
  }
}
