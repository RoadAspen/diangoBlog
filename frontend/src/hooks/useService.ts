import { useState, useEffect, useCallback } from 'react';
/**
 * @description
 * @param promise
 * @param deps
 * @returns
 */
function useService<T>(promise: Promise<T>, deps: any[] = []) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>(null as T);
  const refresh = useCallback(() => {
    (async () => {
      setLoading(true);
      const data = await promise;
      setData(data);
      setLoading(false);
    })();
  }, [promise]);
  useEffect(() => {
    refresh();
  }, deps);
  return [loading, data, refresh];
}

export default useService;
