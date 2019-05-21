import "./feed.scss";
import React, { Component, ReactElement } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/header";
import { listDogs } from "../modules/dogs";
import { Link } from "react-router-dom";
import { history } from "../history-creator";
import LoadingSpinner from "../components/loading-spinner";
import DogList from "../components/dog-list";

export interface IProps {
  dogs: {
    isLoading: boolean;
    error?: string;
    list: [];
  };
  listDogs: Function;
}

class FeedPage extends Component<IProps> {
  private listOfDogs: string[];
  private currentDog: string | null;

  constructor(props: IProps) {
    super(props);
    // This could be a array of objects with title and slug
    // but for the test, I made it more concise
    this.listOfDogs = ["husky", "hound", "pug", "labrador"];
    this.currentDog = "";
    history.listen(() => {
      this.updateDogListByURL();
    });
  }

  private updateDogListByURL = () => {
    let params = new URLSearchParams(location.search);
    this.currentDog = params.get("category");

    if (this.currentDog) {
      if (this.listOfDogs.indexOf(this.currentDog) < 0) {
        history.push(`/404`);
      } else {
        this.props.listDogs(this.currentDog);
      }
    } else {
      history.push(`/feed?category=${this.listOfDogs[0]}`);
    }
  };

  componentWillMount() {
    this.updateDogListByURL();
  }

  render() {
    return (
      <section className="feed-page">
        <Header />
        <nav className="feed-categories">
          {this.listOfDogs.map(dog => {
            return (
              <Link
                to={{ pathname: "/feed", search: `?category=${dog}` }}
                className={dog === this.currentDog ? "active" : ""}
                key={dog}
              >
                {dog}
              </Link>
            );
          })}
        </nav>

        {this.props.dogs.error ? (
          <div className="signup-error">
            The server returned an error :/ <br /> Please, try again later!
          </div>
        ) : this.props.dogs.isLoading ? (
          <LoadingSpinner
            style={{
              marginTop: 40
            }}
          />
        ) : (
          <DogList list={this.props.dogs.list} />
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ dogs }: any) => ({
  dogs: {
    isLoading: dogs.isLoading,
    error: dogs.error,
    list: dogs.list
  }
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      listDogs
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
