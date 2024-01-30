export class MealDetails {
    constructor(mealId) {
      this.mealId = mealId;
    }
    async getData() {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/lookup.php?i=${this.gameId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    }
  }