import { pool } from "../../config/db/pool";

export const updateUserProfile = async (userId: number, userName: string, imageUrl: string): Promise<any> => {
  try {
    const result = await pool.query(
      `
      UPDATE users
      SET 
        user_name = $1,
        image_url = $2
      WHERE user_id = $3
      RETURNING user_id, user_name, image_url;
      `,
      [userName, imageUrl, userId]
    );

    if (result.rowCount === 0) {
      throw new Error("User not found or nothing updated");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};