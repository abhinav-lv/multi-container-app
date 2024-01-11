import { useEffect, useState } from "react";

const getData = async (setData: Function) => {
  const data = await (await fetch("/api")).json();
  console.log({ data });
  setData(data);
};

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    getData(setData);
  }, []);

  return (
    <div>
      <h1>App</h1>
      <p>data:</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
