import axios from "axios";
import * as dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

export const summarizeContent = async (content: string): Promise<any> => {
  try {
    console.log(content);
    const form = new FormData();
    form.append("text", content); // This matches FastAPI's `text: str = Form(...)`
    console.log("Form data:", form);
    const response = await axios.post(
      `${process.env.PYTHONAPI}/summarize`,
      form,
      {
        headers: form.getHeaders(), // Axios uses form-data headers here
      }
    );

    console.log("Summary:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error summarizing content:", error);
    throw error;
  }
};


type MediaItem = {
  type: string;
  url: string;
};

export const convertToText = async (media: MediaItem[]): Promise<any[]> => {
  try {
    const results = await Promise.all(
      media
        .filter((item) => item.type === "image") // only process images
        .map(async (item) => {
          const form = new FormData();
          form.append("url", item.url); // send as "url", not "file"

          const response = await axios.post(
            `${process.env.PYTHONAPI}/caption`,
            form,
            {
              headers: form.getHeaders(),
            }
          );
          return {
            caption: response.data.data,
          };
        })
    );

    return results;
  } catch (error) {
    console.error("Error converting media to text:", error);
    throw error;
  }
};

export const chatBot = async (prompt: string): Promise<any> => {
  try {
    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post(
      `${process.env.PYTHONAPI}/chat`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    if (response.data.response) {
      return response.data.response;
    } else {
      throw new Error(response.data.error || "Unknown error from chatbot");
    }
  } catch (error: any) {
    console.error("Error chatting with bot:", error.message || error);
    throw error;
  }
};