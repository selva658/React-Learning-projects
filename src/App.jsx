import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(8);
  const [allowedNumber, setAllowedNumber] = useState(false);
  const [allowedChar, setAllowedChar] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowedNumber) str += "0123456789";
    if (allowedChar) str += "!@#$%^&*()_+";

    for (let i = 1; i <= range; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str[char];
    }
    setPassword(pass);
  }, [range, allowedNumber, allowedChar]);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [range, allowedNumber, allowedChar]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            className="cursor-pointer"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
          <label htmlFor="length">Length:{range}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={allowedNumber}
            onChange={() => setAllowedNumber((prev) => !prev)}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={allowedChar}
            onChange={() => setAllowedChar((prev) => !prev)}
          />
          <label htmlFor="number">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
