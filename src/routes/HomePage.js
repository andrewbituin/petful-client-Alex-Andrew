import React from "react";

export default class HomePage extends React.Component {
  state = {
    adoptedCats: [],
    adoptedDogs: [],
    currentCat: 0,
    currentDog: 0,
    error: ''
  };
  componentDidMount() {
    const URL = "http://localhost:8080/api";
    return fetch(`${URL}/cat/all`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
          if(data.message && data.message === 'No cats left in queue'){
              this.setState({ error: data.message })
              return
          }
        this.setState({ adoptedCats: data });
      })
      .then(
        fetch(`${URL}/dog/all`, {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            if(data.message && data.message === 'No dogs left in queue'){
                this.setState({ error: data.message })
                return
            }
              this.setState({ adoptedDogs: data });
            })
      );
  }
//   createDogsArray = queue => {
//     let array = [];
//     let current = queue.first;
//     while (current !== null) {
//       array.push(current.value);
//       current = current.next;
//     }
//     return array;
//   };
//   createCatsArray = queue => {
//     let array = [];
//     let current = queue.first;
//     while (current !== null) {
//       array.push(current.value);
//       current = current.next;
//     }
//     return array;
//   };
  generateCatSlide = () => {
    const catDisplayed = this.state.adoptedCats[this.state.currentCat];
    if (catDisplayed) {
      return (
        <div className="cats-slide-container">
          <img
            className="cats-slide-picture"
            src={catDisplayed.imageUrl}
            alt={catDisplayed.imageDescription}
          />
          <h3 className="cats-slide-name">{catDisplayed.name}</h3>
          <p className="cats-slide-story">{catDisplayed.story}</p>
          {(catDisplayed.adoptedBy) ? <p className="cats-slide-adopted">Adopted by: {catDisplayed.adoptedBy}</p> : ''}
          {/* <p className="cats-slide-adoptedBy">{catDisplayed.adoptedBy}</p> */}
          <button type="button" onClick={this.nextCat}>
            Next
          </button>
        </div>
      );
    }
  };
  generateDogSlide = () => {
    const dogDisplayed = this.state.adoptedDogs[this.state.currentDog];
    if (dogDisplayed) {
      return (
        <div className="dogs-slide-container">
          <img
            className="dogs-slide-picture"
            src={dogDisplayed.imageURL}
            alt={dogDisplayed.imageDescription}
          />
          <h3 className="dogs-slide-name">{dogDisplayed.name}</h3>
          <p className="dogs-slide-story">{dogDisplayed.story}</p>
          {(dogDisplayed.adoptedBy) ? <p className="dogs-slide-adopted">Adopted by: {dogDisplayed.adoptedBy}</p> : ''}
          <button type="button" onClick={this.nextDog}>
            Next
          </button>
        </div>
      );
    }
  };
  nextCat = () => {
    if (this.state.currentCat + 1 >= this.state.adoptedCats.length) {
      this.setState({ currentCat: 0 });
    } else {
      this.setState({ currentCat: this.state.currentCat + 1 });
    }
  };
  nextDog = () => {
    if (this.state.currentDog + 1 >= this.state.adoptedDogs.length) {
      this.setState({ currentDog: 0 });
    } else {
      this.setState({ currentDog: this.state.currentDog + 1 });
    }
  };
  render() {
    return (
      <div>
        <h2>Welcome to Adopt a Pet-o-Rama 5001!</h2>
        <div>{this.generateCatSlide()}</div>
        
        <div>
         
        </div>
        <div>{this.generateDogSlide()}</div>
        <p>
          To start, click on the Adopt button. Enter your contact details to be
          entered into our queue. Once you have reached the front of the line,
          you will be presented with an amazing and fluffy (most likely) cat and
          dog that are both ready to be adopted! You can choose to adopt one or
          the other, or both, and bring them back to their dream home.
        </p>
        <button type="button">Start</button>
      </div>
    );
  }
}
