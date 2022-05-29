import TargetList from "../containers/TargetList";
import SettingsModal from "../containers/SettingsModal";
import TargetModal from "../containers/TargetModal";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header>
        <div className="grow py-3">Remote Debug Tool</div>

        <div>
          <TargetModal />{" "}
          <SettingsModal />
        </div>
      </Header>

      <div className="max-w-xl mx-auto">
        <TargetList />
      </div>

      <div className="fixed bottom-5 right-5"></div>
    </>
  );
}

export default Home;
