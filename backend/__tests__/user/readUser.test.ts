import { readUserbyEmail } from "../../src/model/user/read.user";
import { pool } from "../../src/config/db/pool";

// Mock the entire module that exports `pool`
jest.mock("../../src/config/db/pool", () => ({
    pool: {
        query: jest.fn(),
    },
}));

describe("readUserbyEmail", () => {
    it("should return true if a user exists", async () => {
        // Arrange: mock the query result for an existing user
        const mockUser = [{ user_email: "test@example.com" }];
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: mockUser });

        // Act: Call the function
        const result = await readUserbyEmail("test@example.com");

        // Assert: Verify that the function returns true
        expect(result).toBe(true);
        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM Users where user_email = $1",
            ["test@example.com"]
        );
    });

    it("should return false if no user exists", async () => {
        // Arrange: mock the query result for no user found
        (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

        // Act: Call the function
        const result = await readUserbyEmail("nonexistent@example.com");

        // Assert: Verify that the function returns false
        expect(result).toBe(false);
        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM Users where user_email = $1",
            ["nonexistent@example.com"]
        );
    });

    it("should throw an error if the query fails", async () => {
        // Arrange: mock the query to throw an error
        (pool.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

        // Act & Assert: Call the function and assert that an error is thrown
        await expect(readUserbyEmail("test@example.com")).rejects.toThrow("Database error");
    });
});
