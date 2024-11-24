import React, { useEffect, useRef, useState } from "react";

const PassGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);

  const inputRef = useRef(null);

  let passGenerator = () => {
    let pass = "";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const specialChars = "!@#$%^&*()";

    const allVals = alphabets + (numbers ? nums : "") + (chars ? specialChars : "");

    for(let i = 0; i < length; i++) {
      pass += allVals.charAt(Math.floor(Math.random() * allVals.length));
  }
  setPassword(pass);
}

const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
};

  useEffect(() => {
    passGenerator();
  }, [length, numbers, chars]);

  return (
    <div>
      <h1 className="text-center text-4xl mx-20 my-10">PassGenerator</h1>

      <div className="bg-slate-300 w-[420px] rounded-lg mx-auto px-10 pt-5 flex flex-col justify-center gap-5">
        <div className="flex justify-between">
          <input
            type="input"
            readOnly
            value={password} ref={inputRef}
            className="w-3/4 p-2 rounded-md outline-none"
          />
          <button onClick={copyToClipboard} className="py-2 px-5 rounded-md bg-green-600 hover:bg-green-700 text-white">Copy</button>
        </div> 
        <div className="flex justify-between my-5">
          <div className="flex justify-center items-center gap-1">
            <input type="range" min={5} max={20} value={length} onChange={(e) => setLength(e.target.value)} />
            <span>Length: {length}</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)}/>
            <span>Nums</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input type="checkbox" checked={chars} onChange={() => setChars(!chars)}/>
            <span>Chars</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassGenerator;
