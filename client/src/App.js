import { useState, useEffect } from "react";

import axios from "axios";

function View(props) {
  const { screen, setScreen } = props;

  const [data, setData] = useState();

  const deleteCookie = async () => {
    try {
      await axios.get("http://localhost:9000/clear-cookie");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/get-data");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>{screen}</p>
      <p>{data}</p>
      <button onClick={getData}>Get Data</button>
      <button onClick={deleteCookie}>Logout</button>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("auth");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async () => {
    try {
      const res = await axios.get("http://localhost:9000/authenticate", {
        auth: { username, password },
      });

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const readCookie = async () => {
    try {
      const res = await axios.get("http://localhost:9000/read-cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      readCookie();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <div className="App">
      {screen === "auth" ? (
        <div>
          <label>Username: </label>
          <br />
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password: </label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={authenticate}>Login</button>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default App;
