const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("title", () => {
      it("should throw an error if title is null or not a String", async () => {
        try {
          await Recipe.create({
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when its a valid title", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
          },
        });

        expect(await recipe.title).to.equal(await whereRecipe[0].title);
        expect(await recipe.title).to.be.a("string");
      });
    });

    describe("summary", () => {
      it("should throw an error if summary is null or not a String", async () => {
        try {
          await Recipe.create({
            title: "Milanesa a la napolitana",
            steps: ["Batir huevos", "Apanar churrasco"],
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when its a valid summary", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
          },
        });

        expect(await recipe.summary).to.equal(await whereRecipe[0].summary);
        expect(await recipe.summary).to.be.a("string");
      });
    });

    describe("steps", () => {
      it("should throw an error if steps is null", async () => {
        try {
          await Recipe.create({
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when steps is valid", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
          },
        });
        expect(await recipe.steps.join("")).to.equal(
          await whereRecipe[0].steps.join("")
        );
        expect(await recipe.steps).to.be.a("array");
      });
    });

    describe("image", () => {
      it("should throw an error if image is not a String", async () => {
        try {
          await Recipe.create({
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            image: 20,
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when its a valid image", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
          image: "url",
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            image: "url",
          },
        });

        expect(await recipe.image).to.equal(await whereRecipe[0].image);
        expect(await recipe.image).to.be.a("string");
      });
    });

    describe("score", () => {
      it("should throw an error if score is not a Number", async () => {
        try {
          await Recipe.create({
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            score: "20",
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when its a valid score", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
          score: 20,
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            score: 20,
          },
        });

        expect(await recipe.score).to.equal(await whereRecipe[0].score);
        expect(await recipe.score).to.be.a("number");
      });
    });

    describe("healthScore", () => {
      it("should throw an error if healthScore is not a Number", async () => {
        try {
          await Recipe.create({
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            healthScore: "20",
          });
        } catch (e) {
          expect(e.message).to.not.be.an("null");
        }
      });
      it("should work when its a valid healthScore", async () => {
        const recipe = await Recipe.create({
          title: "Milanesa a la napolitana",
          summary: "Churrasco apanado",
          steps: ["Batir huevos", "Apanar churrasco"],
          healthScore: 20,
        });
        const whereRecipe = await Recipe.findAll({
          where: {
            title: "Milanesa a la napolitana",
            summary: "Churrasco apanado",
            steps: ["Batir huevos", "Apanar churrasco"],
            healthScore: 20,
          },
        });

        expect(await recipe.healthScore).to.equal(
          await whereRecipe[0].healthScore
        );
        expect(await recipe.healthScore).to.be.a("number");
      });
    });
  });
});
