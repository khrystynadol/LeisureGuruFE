import './styles.css';
import * as React from 'react';

function App() {
  return (
    <header>
      <div class="all-header-menu">
        <a href = "#" class = "logo">LeisureGuru</a>
        <div class="menu">
          <ul>
            <form>
              <input type="text" placeholder='Browse for places here...' class = "searchTxt"></input>
              <input type="Submit" value="Goooo" class = "searchButton"></input>
            </form>
            <li><a href="#" class = "notification">Notification</a></li>
            <li><a href="#" class = "user">User</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default App;
