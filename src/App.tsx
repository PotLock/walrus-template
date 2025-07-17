import "./App.css";
import walrusLogo from "./assets/walrus.svg";
import potlockLogo from "/logo.png";

function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <a href="https://potlock.xyz/" target="_blank">
          <img
            src={potlockLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
            alt="Potlock Logo"
          />
        </a>
        <a href="https://www.walrus.xyz/" target="_blank">
          <img
            src={walrusLogo}
            className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
            alt="Walrus logo"
          />
        </a>
      </div>
      <h1 className="text-5xl font-bold my-4 leading-tight">
        Potlock + Walrus
      </h1>
      <div className="card">
        <p>
          This is a template application to demonstrate deploying a static site
          to <a href="https://www.walrus.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Walrus</a>.
        </p>
        <p>
          Follow the instructions in the <code>README.md</code> to deploy your
          own site.
        </p>
      </div>
    </div>
  );
}

export default App;
