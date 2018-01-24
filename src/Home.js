import React, { Component } from "react";
import RemoteData from "remote-data-js";

const Layout = ({ children, data, fetch }) => (
  <div>
    <h1>Chuck Norris Jokes</h1>
    {children}
    <button onClick={fetch}>Fetch a Joke</button>
  </div>
);
const Joke = ({ joke }) => <div>{joke.value}</div>;

class Home extends Component {
  state = { data: null };
  remoteData = null;
  componentDidMount() {
    this.remoteData = new RemoteData({
      url: "https://api.chucknorris.io/jokes/random",
      onChange: data => this.setState({ data })
    });
    this.fetch();
  }

  fetch = () => {
    this.remoteData.fetch();
  };
  render() {
    const { data } = this.state;
    const requestContent = data
      ? data.case({
          NotAsked: () => null,
          Pending: () => "Loading...",
          Success: data => <Joke joke={data} />,
          Failure: error => "An error occured :-("
        })
      : null;
    return (
      <div className="bg-grey w-screen h-screen">
        {requestContent && <Layout fetch={this.fetch}>{requestContent}</Layout>}
      </div>
    );
  }
}

export default Home;
