import React from 'react'
// 타입(Types)
import {AnswerObject} from "../App";
// styles(스타일)
import {Wrapper, ButtonWrapper} from "./QuestionCard.styles";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
                                           question,
                                           answers,
                                           callback,
                                           userAnswer,
                                           questionNr,
                                           totalQuestions
                                       }) => {
    return (
        <Wrapper>
            <p className={"number"}>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {
                    answers.map(answer => (
                        <ButtonWrapper
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer}
                            key = {answer}>
                            <button disabled={!!userAnswer} value={answer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}}></span>
                            </button>
                        </ButtonWrapper>
                    ))
                }
            </div>
        </Wrapper>
    )
}

export default QuestionCard;
