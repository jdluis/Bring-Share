import {EventInterface} from "@/Interfaces/eventInterface";
import { useState, useEffect } from "react";
import { Alert } from "react-native";


const useAppwrite = ( fn:any ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<EventInterface[]>([]);
  

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
