/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");
const { getAllRecipes } = require("../../src/routes/getInfo");
const agent = session(app);
const recipe = {
  title: "Milanesa a la napolitana",
  summary: "Churrasco apanado",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
    it("should get all recipes", () => {
      agent.get("/recipes").expect(getAllRecipes());
    });
    it("should get a recipe by query", async () => {
      agent
        .get("/recipes?title=Milanesa%20a%20la%20napolitana")
        .expect(
          await Recipe.findAll({ where: { title: "Milanesa a la napolitana" } })
        );
    });
    it(`should get "Can't find that recipe" if a recipe is not found`, () => {
      agent.get("/recipes?title=asado").expect("Can't find that recipe");
    });
  });
});
