import lodge from "../../images/lodge.jpg";
import cabin from "../../images/cabin.jpg";

export function Lodging() {
  return (
    <>
      <div className="secondary-hero">
        <div className="container">
          <h1>
            <span>Lodging</span>
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="content-card">
          <img src={lodge} className="image" />
          <div id="card-text">
            <p className="m-2">
              Located in rural Montana, the lodge resembles more of mountain
              mansion after our recent renovations. Uncle Big Bucks has been a
              family owned and run operation for 2 generations, and our
              knowledge of the area is truly unrivaled.
            </p>
          </div>
        </div>

        <div className="content-card">
          <div id="card-text-2">
            <p className="m-2">
              We also offer spacious cabins in remote locations for small groups
              that wish to get to the middle of the action and stay there.
            </p>
          </div>
          <img src={cabin} className="image" />
        </div>
      </div>
    </>
  );
}
