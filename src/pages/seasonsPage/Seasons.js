import deer from "../../images/deer.jpg";
import elk from "../../images/elk.jpg";
import bear from "../../images/bear.jpg";
import "./seasons.css";

export function Seasons() {
  return (
    <>
      <div className="secondary-hero">
        <h1>
          <span>Seasons</span>
        </h1>
      </div>
      <div className="container">
        <div className="content-card">
          <img src={deer} className="image" />
          <div className="card-text">
            <h2>Deer Season Dates</h2>
            <h3>October</h3>
            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="in">4</td>
                  <td className="in">5</td>
                  <td className="in">6</td>
                  <td className="in">7</td>
                  <td className="in">8</td>
                  <td className="in">9</td>
                </tr>
                <tr>
                  <td className="in">10</td>
                  <td className="in">11</td>
                  <td className="in">12</td>
                  <td className="in">13</td>
                  <td className="in">14</td>
                  <td className="in">15</td>
                  <td className="in">16</td>
                </tr>
                <tr>
                  <td className="in">17</td>
                  <td className="in">18</td>
                  <td className="in">19</td>
                  <td>20</td>
                  <td>21</td>
                  <td>22</td>
                  <td>23</td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>25</td>
                  <td>26</td>
                  <td>27</td>
                  <td>28</td>
                  <td>29</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>31</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-card">
          <div className="card-text-2">
            <h2>Elk Season Dates</h2>
            <h3>November</h3>
            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td className="in">5</td>
                  <td className="in">6</td>
                </tr>
                <tr>
                  <td className="in">7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                  <td className="in">12</td>
                  <td className="in">13</td>
                </tr>
                <tr>
                  <td className="in">14</td>
                  <td>15</td>
                  <td>16</td>
                  <td>17</td>
                  <td>18</td>
                  <td className="in">19</td>
                  <td className="in">20</td>
                </tr>
                <tr>
                  <td className="in">21</td>
                  <td>22</td>
                  <td>23</td>
                  <td>24</td>
                  <td>25</td>
                  <td>26</td>
                  <td>27</td>
                </tr>
                <tr>
                  <td>28</td>
                  <td>29</td>
                  <td>30</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <img src={elk} className="image" />
        </div>

        <div className="content-card">
          <img src={bear} className="image" />
          <div className="card-text">
            <h2>Bear Season Dates</h2>
            <h3>December</h3>
            <table>
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                  <td>9</td>
                  <td>10</td>
                  <td>11</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>13</td>
                  <td className="in">14</td>
                  <td className="in">15</td>
                  <td className="in">16</td>
                  <td className="in">17</td>
                  <td className="in">18</td>
                </tr>
                <tr>
                  <td className="in">19</td>
                  <td className="in">20</td>
                  <td className="in">21</td>
                  <td className="in">22</td>
                  <td className="in">23</td>
                  <td className="in">24</td>
                  <td className="in">25</td>
                </tr>
                <tr>
                  <td className="in">26</td>
                  <td className="in">27</td>
                  <td className="in">28</td>
                  <td>29</td>
                  <td>30</td>
                  <td>31</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
