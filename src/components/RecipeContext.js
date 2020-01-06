import React from 'react';

const RecipeContext = React.createContext({
    completedRecipe: () => {},
    onDelete: () => {}
})

export default RecipeContext;