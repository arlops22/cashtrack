describe("Bank Accounts Module", () => {
  describe("POST /bank-accounts", () => {
    it("should create a bank account without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
  });

  describe("PATCH /bank-accounts/:id", () => {
    it("should update a bank account without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
    it("should throw unauthorized error when the user is not the owner of the provided bank account", () => {});
  });

  describe("DELETE /bank-accounts/:id", () => {
    it("should delete a bank account without error", () => {});
    it("should throw unauthorized error when the user is not the owner of the provided bank account", () => {});
  });
});
