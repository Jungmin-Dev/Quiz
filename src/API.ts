import axios from "axios";
import {shuffleArray} from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionsState = Question & { answers: string[]; }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const request = (method: string, url: string, data?: any) => {
    return axios({
        method,
        url: url,
        data
    }).then((res) => {
        return res.data
    }).catch(res => {
        console.error(res);
        throw res.response.data;
    });
}

export const axiosQuizQuestions = async (amount: number, difficulty: Difficulty) => {

    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await request('get', endpoint));
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray(
            [
                ...question.incorrect_answers,
                question.correct_answer
            ]),

    }));

}
