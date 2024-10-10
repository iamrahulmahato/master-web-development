import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCrWchMjv0k6bget5j0dQo9Lj2ePwrTnNc");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const createPrompt = async (title: string) => {
    try {
        const prompt = `Generate only one prompt not question for creating quiz question topic is ${title} and start prompt just after [[ and end the prompt with ]]`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedPrompt = response.text();
        return {
            status: true,
            generatedPrompt,
        }
    } catch (error: any) {
        return {
            status: false,
            message: error.message
        }
    }
};

export const generateQuestion = async (generatedPrompt: string) => {
	try {
		const prompt = `I want only one question. ${generatedPrompt} and start question just after [[ and end the question with ]]. And also give me the 4 options and answer. Answer should be one of the option without any special symbol. 1st option starts with $$ and end with $$. 2nd option starts with @@ and end with @@. 3rd option starts with ## and end with ##. 4th option starts with && and end with &&. Correct Answer starts with ~~~ and end with ~~~`;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const question = response.text();
		return {
            status: true,
            question,
        }
	} catch (error: any) {
		return {
            status: false,
            message: error.message
        }
	}
};
