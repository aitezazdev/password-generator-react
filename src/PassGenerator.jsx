import React, { useEffect, useRef, useState } from "react";

const PassGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);

  const inputRef = useRef(null);

  const passGenerator = () => {
    let pass = "";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const specialChars = "!@#$%^&*()";

    const allVals = alphabets + (numbers ? nums : "") + (chars ? specialChars : "");

    for (let i = 0; i < length; i++) {
      pass += allVals.charAt(Math.floor(Math.random() * allVals.length));
    }
    setPassword(pass);
  };

  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand("copy");
  };

  useEffect(() => {
    passGenerator();
  }, [length, numbers, chars]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Password Generator</h1>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={password}
              ref={inputRef}
              className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-gray-700 font-medium">Length: {length}</label>
            <input
              id="length"
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium flex items-center">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
                className="mr-2"
              />
              Include Numbers
            </label>

            <label className="text-gray-700 font-medium flex items-center">
              <input
                type="checkbox"
                checked={chars}
                onChange={() => setChars(!chars)}
                className="mr-2"
              />
              Include Special Characters
            </label>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={passGenerator}
            className="bg-indigo-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassGenerator;