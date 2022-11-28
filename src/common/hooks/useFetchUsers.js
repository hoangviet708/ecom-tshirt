import axios from "axios";
import { useEffect, useState } from "react";

const useFetchUser = () => {
  const [users, setUsers] = useState();

  const getData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (response.status === 200 && response.data) {
      setUsers(response.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return [users];
};

export default useFetchUser;
