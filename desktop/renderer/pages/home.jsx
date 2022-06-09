import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";

import TargetList from "../containers/TargetList";
import SettingsModal from "../containers/SettingsModal";
import TargetModal from "../containers/TargetModal";
import Header from "../components/Header";

// Home application page
function Home() {
  // hook to contain the current list of targets
  const [targets, setTargets] = useState([]);

  // when the application loads reload the targets
  useEffect(() => {
    reloadTargets();
  }, []);

  // send command to backend to refresh target info
  const reloadTargets = () => {
    setTargets(ipcRenderer.sendSync("target-get"));
  };

  return (
    <>
      {/* Page title */}
      <Head>
        <title>Remote Debug</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Page Header */}
      <Header>
        {/* Title */}
        <div className="grow py-3">Remote Debug Tool</div>

        {/* Action Buttons */}
        <div>
          <TargetModal reloadTargets={reloadTargets} edit={false} />
          <SettingsModal />
        </div>
      </Header>

      {/* Target List */}
      <div className="max-w-xl mx-auto">
        <TargetList reloadTargets={reloadTargets} targets={targets} />
      </div>
    </>
  );
}

export default Home;
