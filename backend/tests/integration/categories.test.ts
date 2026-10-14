describe("Categories Module", () => {
  describe("GET /categories", () => {
    it("should list categories without error", () => {});
    it("should throw unauthorized error when the user is not the owner of the provided category", () => {});
  });

  describe("POST /categories", () => {
    it("should create a category without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
  });

  describe("PATCH /categories/:id", () => {
    it("should update a category without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
    it("should throw unauthorized error when the user is not the owner of the provided category", () => {});
  });

  describe("DELETE /categories/:id", () => {
    it("should delete a category without error", () => {});
    it("should throw unauthorized error when the user is not the owner of the provided category", () => {});
  });
});
