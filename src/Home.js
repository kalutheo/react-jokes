import React, { Component } from "react";
import RemoteData from "remote-data-js";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    height={60}
    speed={2}
    primaryColor={"#f3f3f3"}
    secondaryColor={"#ecebeb"}
  >
    <rect x="-3" y="8" rx="3" ry="3" width="350" height="10" />
    <rect x="-3" y="28" rx="3" ry="3" width="400" height="10" />
    <rect x="-3" y="48" rx="3" ry="3" width="360" height="10" />
  </ContentLoader>
);

const Layout = ({ children, isPending, fetch }) => (
  <div className="p-8 bg-white shadow rounded">
    <h1 className="text-green mb-2">Chuck Norris Jokes</h1>
    <div className="display-block">{children}</div>
    <button
      className="rounded bg-green text-white p-1 mt-2 hover:bg-green-dark disabled:bg-grey"
      disabled={isPending}
      onClick={fetch}
    >
      {isPending ? "Loading..." : "Fetch a Joke"}
    </button>
  </div>
);
const Joke = ({ joke }) => <div>{joke.value}</div>;

const ErrorMessage = ({ label }) => (
  <div className="bg-red-lighter p-2 text-red-darker rounded">{label}</div>
);

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
          Pending: () => <MyLoader />,
          Success: data => <Joke joke={data} />,
          Failure: error => <ErrorMessage label="An error occured :-(" />
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
