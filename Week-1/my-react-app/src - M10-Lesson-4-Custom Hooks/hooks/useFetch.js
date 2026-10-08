import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data (memoized with useCallback)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      //--------------------------------------
      /* const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }); */
      //--------------------------------------
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData(); //running or calling fetchData function
  }, [fetchData]); //IMPORTANT: useCallback ensures fetchData is stable and doesn't change on every render
  //But if url changes, it will refetch data
  //refetch is alias name for fetchData function

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
//The key point is that refetch is not a separate function.
//It is simply another name (alias) for the fetchData function returned by
//the custom hook.
/*
fetchData is a function that knows how to:
Set loading to true
Call the API
Get the response
Convert it to JSON
Store the data using setData
Handle errors
Set loading back to false
------------------------------
useFetch returns fetchData as refetch

At the bottom:

return {
    data,
    loading,
    error,
    refetch: fetchData
};
*/
