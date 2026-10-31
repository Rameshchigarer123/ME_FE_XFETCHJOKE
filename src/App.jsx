import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(API_URL);
      setJoke(res.data);
    } catch {
      setJoke(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  let buttonText = "Fetch joke";
  if (loading) buttonText = "Fetching...";
  else if (error) buttonText = "Try again";

  return (
    <div className="app">
      <h1>Random Joke</h1>

      {!joke && !error && <p>Click the button to fetch a fresh one.</p>}

      {joke && (
        <div className="joke">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}

      {error && <p className="error">Could not fetch a joke. Try again.</p>}

      <button onClick={fetchJoke} disabled={loading}>
        {buttonText}
      </button>
    </div>
  );
}

export default App;
