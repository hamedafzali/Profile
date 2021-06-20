import React from "react";
// import "./App.css";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
const { useState, Component } = React;

const config = {
  apiUrl: "https://randomuser.me/api/",
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  getdPerson = async () => {
    fetch(config.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.state.list.push(data.results[0]);
        this.setState({ list: this.state.list });
      });
  };
  componentDidMount() {
    this.getdPerson();
    this.getdPerson();
    this.getdPerson();
    this.getdPerson();
    this.getdPerson();
    this.getdPerson();
  }

  render() {
    const list = this.state.list;
    if (!list.length)
      return (
        <div className="overlay">
          <div>
            <div className="wait">please wait . . .</div>
          </div>
        </div>
      );
    return <Main list={list} />;
  }
}

const Main = ({ list }) => {
  const clickHandler = (person) => {
    setSelected(person);
  };

  const [selected, setSelected] = useState(list[0]);
  const [selectedNav, setSelectedNav] = useState("card");
  return (
    <div>
      <div className="container">
        <Person
          selected={selected}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
        />
        <CandidatesList
          selected={selected}
          handleClick={clickHandler}
          list={list}
        />
      </div>
      <Footer />
    </div>
  );
};
const Person = ({ selected, selectedNav, setSelectedNav }) => {
  return (
    <div className="person">
      <div className="frame personInfoContainer">
        <div className="title">
          {/* <i className="fa fa-user " /> */}
          {` ${selected.name.first} ${selected.name.last}`}
        </div>
        <div className=" personInfo">
          <ProfileImage
            src={selected.picture}
            alt={selected.name.last}
            customizedStyle="image-md"
          />
          <div>
            <div className="phone">
              <span className="fa-stack fa-lg ">
                <i className="fa fa-phone"></i>
              </span>
              Phone: {selected.phone}
            </div>
            <div className="phone">
              <span className="fa-stack fa-lg ">
                <i className="fa fa-mobile"></i>
              </span>
              Cell: {selected.cell}
            </div>

            <div>
              <span className="fa-stack fa-lg">
                <a href={`tel:${selected.cell}`}>
                  <i className="fa fa-phone contactIcon"></i>
                </a>
              </span>
              <span className="fa-stack fa-lg ">
                <a
                  href={`whatsapp://send?abid=${selected.cell}&text=you are invited to our team!!!`}
                >
                  <i className="fa fa-whatsapp contactIcon"></i>
                </a>
              </span>
              <span className="fa-stack fa-lg">
                <a href={`sms:${selected.cell}`}>
                  <i className="fa fa-comment contactIcon"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <BrowserRouter>
        <Switch>
          <div className="frame personData">
            <div className="navContainer">
              <Link
                to="/PersonDataDetail"
                className={`navItem ${
                  selectedNav === "card" ? "selected" : ""
                }`}
                onClick={() => setSelectedNav("card")}
              >
                <i className={`fa fa-address-card`} />
              </Link>
              <Link
                to="/PersonDataContact"
                className={`navItem ${selectedNav === "at" ? "selected" : ""}`}
                onClick={() => setSelectedNav("at")}
              >
                <i className={`fa fa-at`} />
              </Link>
              <Link
                to="/PersonDataMap"
                className={`navItem ${selectedNav === "map" ? "selected" : ""}`}
                onClick={() => setSelectedNav("map")}
              >
                <i className={`fa fa-map`} />
              </Link>
              <Link
                to="/PersonDataGoogle"
                className={`navItem ${
                  selectedNav === "google" ? "selected" : ""
                }`}
                onClick={() => setSelectedNav("google")}
              >
                <i className={`fa fa-google`} />
              </Link>
              <Link
                to="/PersonDataImages"
                className={`navItem ${
                  selectedNav === "image" ? "selected" : ""
                }`}
                onClick={() => setSelectedNav("image")}
              >
                <i className={`fa fa-image`} />
              </Link>
              <Link
                to="/PersonDataSecurity"
                className={`navItem ${selectedNav === "key" ? "selected" : ""}`}
                onClick={() => setSelectedNav("key")}
              >
                <i className={`fa fa-key`} />
              </Link>
            </div>
            <div>
              <Route
                path="/PersonDataDetail"
                render={(props) => (
                  <PersonDataDetail selected={selected} {...props} />
                )}
              />
              <Route
                path="/PersonDataContact"
                render={(props) => (
                  <PersonDataContact selected={selected} {...props} />
                )}
              />
              <Route
                path="/PersonDataMap"
                render={(props) => (
                  <PersonDataMap selected={selected} {...props} />
                )}
              />
              <Route
                path="/PersonDataGoogle"
                render={(props) => (
                  <PersonDataGoogle selected={selected} {...props} />
                )}
              />
              <Route
                path="/PersonDataImages"
                render={(props) => (
                  <PersonDataImages selected={selected} {...props} />
                )}
              />
              <Route
                path="/PersonDataSecurity"
                render={(props) => (
                  <PersonDataSecurity selected={selected} {...props} />
                )}
              />
              <Redirect to="/PersonDataDetail" />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
const CandidatesList = ({ selected, handleClick, list }) => {
  return (
    <div className="frame candidateInfo">
      {list
        .filter((i) => (i === selected ? null : i))
        .map((i) => (
          <Candidate person={i} handleClick={handleClick} key={Math.random()} />
        ))}
    </div>
  );
};
const PersonDataDetail = ({ selected }) => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <p>
            Name: {selected.name.title} {selected.name.first}{" "}
            {selected.name.last}
          </p>
          <p>Gender: {selected.gender}</p>
          <p>Age: {selected.dob.age}</p>
          <hr />
          <p>Registration date: {selected.registered.date}</p>
        </div>
        <div className="col">
          <p>Country: {selected.location.country}</p>
          <p>State: {selected.location.state}</p>
          <p>City: {selected.location.city}</p>
          <p>
            Street: {selected.location.street.number},
            {selected.location.street.name}
          </p>
          <p>Time Zone: {selected.location.timezone.offset}</p>
        </div>
      </div>
      <div className="description">
        <h1>All about {selected.name.first}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
          fermentum velit, in molestie lacus. Morbi in ex nec ex pellentesque
          condimentum. Nunc ullamcorper, felis id pharetra accumsan, felis eros
          tempor nisl, placerat egestas tellus nunc sit amet dui. Suspendisse
          non erat volutpat, consectetur eros id, feugiat erat. Duis eu luctus
          nisi, sed aliquam orci. Pellentesque ultrices nulla quis aliquam
          cursus. Morbi ut mauris accumsan, malesuada tellus semper, bibendum
          lectus. Pellentesque at lacus justo. Aenean et gravida lorem. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor
          fringilla gravida.
          <a target="_blank" href="tryit.asp?filename=trycss_text">
            "Try it Yourself"
          </a>{" "}
          link.
        </p>
      </div>
    </div>
  );
};
const PersonDataContact = ({ selected }) => {
  return (
    <div className="Container">
      <label for="email">To</label>
      <input type="text" id="email" name="email" value={selected.email} />
      <label for="From">From</label>
      <input type="text" id="From" name="From" value="info@company.com" />
      <textarea className="textarea" placeholder="Email Content...."></textarea>
      <input type="submit" value="Send" />
    </div>
  );
};
const PersonDataMap = ({ selected }) => {
  return (
    <div className="fluid-wrapper">
      {/* <iframe
        width="600"
        height="450"
        style="border:0"
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA"
      ></iframe> */}
      <iframe
        title="map"
        src="http://mapsengine.google.com/map/embed?mid=z-BEFzFo7gdM.kYdiUKVQpQQI"
      ></iframe>
    </div>
  );
};
const PersonDataGoogle = ({ selected }) => {
  return (
    <div className="fluid-wrapper">
      <iframe title="google" src="https://www.google.com/webhp?igu=1"></iframe>
    </div>
  );
};
const PersonDataImages = ({ selected }) => {
  return (
    <div className="fluid-wrapper">
      <iframe
        title="googleimage"
        src={`http://images.google.com/images?q=${selected.name.first}+${selected.name.last}`}
      ></iframe>
    </div>
  );
};
const PersonDataSecurity = ({ selected }) => {
  return (
    <div className="Container">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={selected.login.username}
      />
      <label for="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        value={selected.login.password}
      />

      <input type="submit" value="Change Password" />
    </div>
  );
};
const Candidate = ({ person, handleClick }) => {
  return (
    <div className="candidateInfo-card" onClick={() => handleClick(person)}>
      <ProfileImage
        src={person.picture}
        alt={person.name.last}
        customizedStyle="image-sm"
      />
      <div style={{ width: "100%" }}>
        <div>{`${person.name.first} ${person.name.last}`}</div>
        <div>{`${person.location.country}`}</div>
      </div>
    </div>
  );
};

const ProfileImage = ({ src, alt, customizedStyle }) => {
  return (
    <img
      src={customizedStyle === "image-sm" ? src.thumbnail : src.large}
      alt={alt}
      className={`image ${customizedStyle}`}
    />
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2021 Company All rights reserved.</p>
    </div>
  );
};
export default App;
