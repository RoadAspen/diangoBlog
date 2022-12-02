import { useState, useEffect, useCallback } from 'react';
/**
 * @description
 * @param promise
 * @param deps
 * @returns
 */
const useService = (promise: Promise<any>, deps: any[] = []) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const refresh = useCallback(() => {
    (async () => {
      setLoading(true);
      const data = await promise;
      setData(data);
      setLoading(false);
    })();
  }, deps);
  useEffect(() => {
    refresh();
  }, deps);
  return [loading, data, refresh];
};

export default useService;
