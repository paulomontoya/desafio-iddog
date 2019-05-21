import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import DogBox from "../components/dog-box";
import DogList from "../components/dog-list";
import Header from "../components/header";
import LoadingSpinner from "../components/loading-spinner";
import { history } from "../history-creator";
import { listDogs, selectDog, unselectDog } from "../modules/dogs";
import "./feed.scss";

export interface IProps {
  user: {
    token: string;
  };
  dogs: {
    isLoading: boolean;
    error?: string;
    list: [];
    selectedDog?: {
      category: string;
      index: number;
    };
  };
  listDogs: Function;
  selectDog: Function;
  unselectDog: Function;
}
class FeedPage extends Component<IProps> {
  private listOfCategories: string[];
  private currentCategory: string | null;
  private currentDogIndex: string | null;

  constructor(props: IProps) {
    super(props);

    // This could be a array of objects with title and slug
    // but for the test, I made it more concise
    this.listOfCategories = ["husky", "hound", "pug", "labrador"];
    this.currentCategory = "";
    this.currentDogIndex = "";
  }

  public componentDidMount() {
    this.updateDogListByURL();
    this.updateSelectedDogByURL();

    history.listen(() => {
      this.updateDogListByURL();
      this.updateSelectedDogByURL();
    });
  }

  public render() {
    return this.props.user.token === "" ? (
      <Redirect to="/" />
    ) : (
      <section className="feed-page">
        <Header />
        <nav className="feed-categories">
          {this.listOfCategories.map(dog => {
            return (
              <Link
                to={{ pathname: "/feed", search: `?category=${dog}` }}
                className={dog === this.currentCategory ? "active" : ""}
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
          <>
            <DogBox
              selected={this.props.dogs.selectedDog}
              list={this.props.dogs.list}
            />
            <DogList
              category={this.currentCategory!}
              list={this.props.dogs.list}
            />
          </>
        )}
      </section>
    );
  }

  private updateDogListByURL = () => {
    const params = new URLSearchParams(location.search);

    if (this.currentCategory === params.get("category")) {
      return false;
    }

    this.currentCategory = params.get("category");

    if (this.currentCategory) {
      if (this.listOfCategories.indexOf(this.currentCategory) < 0) {
        history.push(`/404`);
      } else {
        this.props.listDogs(this.currentCategory);
      }
    } else {
      history.push(`/feed?category=${this.listOfCategories[0]}`);
      this.updateDogListByURL();
    }
  };

  private updateSelectedDogByURL = () => {
    const params = new URLSearchParams(location.search);
    this.currentDogIndex = params.get("id");

    if (this.currentCategory && this.currentDogIndex) {
      this.props.selectDog(
        this.currentCategory,
        parseInt(this.currentDogIndex)
      );
    } else {
      this.props.unselectDog();
    }
  };
}

const mapStateToProps = ({ user, dogs }: any) => ({
  user: {
    token: user.token
  },
  dogs: {
    isLoading: dogs.isLoading,
    error: dogs.error,
    list: dogs.list,
    selectedDog: dogs.selectedDog
  }
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      listDogs,
      selectDog,
      unselectDog
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPage);
