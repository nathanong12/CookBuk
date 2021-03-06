import React from 'react';
import $ from 'jquery';

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.post = this.post.bind(this);
  }

  componentDidMount() {
    this.post('/recipes', this.props.setRecipes);
  }

  post(url, callback) {
    $.ajax({
      type: 'POST',
      url,
      data: {
        username: this.props.user,
      },
    })
      .done((data) => {
        callback(data);
      })
      .fail(() => {
        console.log('POST: Failed to retrieve Recipes');
      });
  }

  render() {
    return (
      <div id="selection-container">
        {
          this.props.recipes.map((recipe, i) => {
            return (
              <div className="selection-recipe" key={i}>
                <h1 className="selection-recipe-name" onClick={() => this.props.selectRecipe(recipe)}>{recipe.name}</h1>
                <span className="selection-span">
                  Time To Prep:
                  {recipe.prepTime}
                </span>
                <br />
                <span className="selection-span">
                  Time To Cook:
                  {recipe.cookTime}
                </span>
                <br />
                <span className="selection-span">
                  Servings:
                  {recipe.servings}
                </span>
                <br />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Selection;
