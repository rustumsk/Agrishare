import { readUserbyEmail } from "../../src/model/user/read.user";
import { pool } from "../../src/config/db/pool";

describe("readUserbyEmail", () => {
    const mockEmail = 'rustum@gmail.com';

    beforeAll(async () => {
        try {
            await pool.query(
                `INSERT INTO Users(user_name, password, user_email, bio,image_url, contact_no, role) VALUES($1, $2, $3,$4,$5,$6,$7)`,
                ["123123", "123123214", mockEmail, null,null,null,null]
            );
        } catch (error) {
            console.error("Error in beforeAll:", error);
        }
    });

    it("should return true if a user exists", async () => {
        const result = await readUserbyEmail(mockEmail);
        expect(result).toBe(true);

    });

    it("should return false if no user exists", async () => {
        const result = await readUserbyEmail("Nigga");

        expect(result).toBe(false);

    });

    afterAll(async () => {
        try {
            await pool.query(`DELETE FROM Users WHERE user_email = $1`, [mockEmail]);
        } catch (error) {
            console.error("Error in afterAll:", error);
        }
    });
});
