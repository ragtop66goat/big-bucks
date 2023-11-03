import "./home.css";
import indexLodge from "../../images/indexLodge.jpg";
import indexTrail from "../../images/indexTrail.jpg";

export function Home() {
  return (
    <>
      <div className="home-hero">
        <div className="container">
          <h1 data-testid="hero-text">
            <span>Uncle Big Bucks</span>
            <br />
            hunting lodge
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="content-card">
          <img src={indexLodge} alt="homeLog" className="image" />
          <div className="card-text">
            <h2>
              Welcome to Uncle Big Bucks <br />
              Hunting Lodge!
            </h2>
          </div>
        </div>

        <div className="content-card">
          <div className="card-text-2">
            <p>
              Whether you're a rather young buck yourself, or just young at
              heart, we have a package that's perfect for you. Countless big
              game enthusiasts have left with great stories to tell, and there's
              one waiting on the trail for you too!
            </p>
          </div>
          <img src={indexTrail} alt="homeTrail" className="image" />
        </div>
      </div>
    </>
  );
}
