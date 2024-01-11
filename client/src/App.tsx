import { useEffect, useState } from "react";

export default function App() {
  const [num, setNum] = useState<"" | number>("");
  const [getCalculatedData, setGetCalculatedData] = useState(true);
  const [calculated, setCalculated] = useState<{ [key: string]: number }>({});

  const fetchCalculatedData = async () => {
    const data = await (await fetch("/api/calculated")).json();
    console.log({ data: data.results });
    setCalculated(data.results);
    setGetCalculatedData(false);
  };

  const handleSubmit = async () => {
    await fetch("/api/index", {
      method: "POST",
      body: JSON.stringify({ index: num === "" ? 0 : num }),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    setGetCalculatedData(true);
  };

  const numberInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const eventCode = event.code.toLowerCase();
    if (
      !(
        event.code !== null &&
        (eventCode.includes("digit") ||
          eventCode.includes("arrow") ||
          eventCode.includes("home") ||
          eventCode.includes("end") ||
          eventCode.includes("backspace") ||
          (eventCode.includes("numpad") && eventCode.length === 7))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleChange = (value: string) => {
    const numVal = parseInt(value);
    if (isNaN(numVal) || numVal < 0) {
      setNum("");
      return;
    } else if (numVal > 30) return;
    setNum(numVal);
  };

  useEffect(() => {
    if (getCalculatedData) fetchCalculatedData();
  }, [getCalculatedData]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        paddingTop: "128px",
      }}
    >
      <div
        style={{
          height: "fit-content",
          width: "70%",
          padding: "48px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#eee",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Fibonacci</h1>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <p>Enter number to calculate fibonacci:</p>
          <input
            type="number"
            value={num}
            placeholder="number"
            onKeyDown={numberInputKeyDown}
            onChange={(e) => handleChange(e.target.value)}
            style={{ padding: "4px" }}
          />
          <button
            onClick={handleSubmit}
            style={{ padding: "4px", cursor: "pointer" }}
          >
            Submit
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Calculated Values</h2>
            <button
              style={{ padding: "4px" }}
              onClick={() => setGetCalculatedData(true)}
            >
              Sync
            </button>
          </div>
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {Object.keys(calculated).map((key, idx) => (
              <p key={idx}>{`For ${key}, I calculated ${calculated[key]}`}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
