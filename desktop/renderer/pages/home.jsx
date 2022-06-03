import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import TargetList from "../containers/TargetList";
import SettingsModal from "../containers/SettingsModal";
import TargetModal from "../containers/TargetModal";
import Header from "../components/Header";

function Home() {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    reloadTargets();
  }, []);

  const reloadTargets = () => {
    setTargets(ipcRenderer.sendSync("target-get"));
  };

  return (
    <>
      <Header>
        <div className="grow py-3">Remote Debug Tool</div>

        <div>
          <TargetModal reloadTargets={reloadTargets} /> <SettingsModal />
        </div>
      </Header>

      <div className="max-w-xl mx-auto">
        <TargetList targets={targets} />
      </div>

      <div className="fixed bottom-5 right-5"></div>
    </>
  );
}

export default Home;
