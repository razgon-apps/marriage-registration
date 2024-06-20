import { QueryClient } from '@tanstack/react-query';

// Настройка QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Настройки кэширования
      gcTime: 1000 * 60 * 10, // 10 минут
      staleTime: 1000 * 60 * 1, // 1 минута
      retry: 2, // Повторить запрос дважды в случае ошибки
      refetchOnWindowFocus: false, // Не перезапрашивать данные при фокусировке окна
    },
  },
});

export default queryClient;
