import React, { Component } from "react";
import RemoteData from "remote-data-js";

const Layout = ({ children, isPending, fetch }) => (
  <div className="p-8 bg-white shadow rounded">
    <h1 className="text-green mb-2">Chuck Norris Jokes</h1>
    <div className="display-block">{children}</div>
    <button
      className="rounded bg-green text-white p-2 mt-2 hover:bg-green-dark disabled:bg-grey"
      disabled={isPending}
      onClick={fetch}
    >
      {isPending ? "Loading..." : "Fetch a Joke"}
    </button>
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
      <div className="bg-green-lightest w-screen h-screen p-8">
        {requestContent && (
          <Layout isPending={data.isPending()} fetch={this.fetch}>
            {requestContent}
          </Layout>
        )}
      </div>
    );
  }
}

export default Home;
