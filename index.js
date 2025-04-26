
import { useState } from 'react';

export default function Home() {
  const [dob, setDob] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const getZodiacSign = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const zodiac = [
      ["Capricorn", 20], ["Aquarius", 19], ["Pisces", 20], ["Aries", 20], ["Taurus", 21],
      ["Gemini", 21], ["Cancer", 22], ["Leo", 22], ["Virgo", 22], ["Libra", 23],
      ["Scorpio", 23], ["Sagittarius", 22], ["Capricorn", 31]
    ];
    return day > zodiac[month - 1][1] ? zodiac[month][0] : zodiac[month - 1][0];
  };

  const askAstrology = async () => {
    if (!dob) return alert("Please enter your Date of Birth!");
    const zodiacSign = getZodiacSign(dob);
    setLoading(true);
    
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zodiac: zodiacSign })
    });

    const data = await response.json();
    setPrediction(data.reply);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">CosmoVibes ✨</h1>
      <p className="mb-6 text-center">Enter your Date of Birth and see what the stars have in store for you today!</p>
      <input
        type="date"
        className="p-2 rounded bg-gray-800 mb-4 text-white"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button
        onClick={askAstrology}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
      >
        {loading ? "Consulting Stars..." : "Reveal My Day"}
      </button>

      {prediction && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Your Cosmic Guidance:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}
