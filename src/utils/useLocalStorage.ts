import { useState, useEffect } from "react";
import { PRODUCTOS } from "src/assets/PARAFERNALIA";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (key === "cartItems" && item) {
        const items = JSON.parse(item);

        const mappedItems = items.map((item: any) => {
          if (PRODUCTOS[item.key] && PRODUCTOS[item.key].stock > 0) {
            return {
              ...PRODUCTOS[item.key],
              key: item.key,
            };
          }
          return null;
        });

        const filteredItems = mappedItems.filter((item: any) => item !== null);

        window.localStorage.setItem(key, JSON.stringify(filteredItems));

        return filteredItems;
      }

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Dispatch a custom event
      window.dispatchEvent(new Event("localStorageChange"));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("localStorageChange", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageChange", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
