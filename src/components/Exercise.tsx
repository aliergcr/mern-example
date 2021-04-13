/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

interface Exercise {
    _id: number;
    userName: string;
    description: string;
    duration: number;
    date: string;
}

interface Props {
    exercise: Exercise;
    deleteExercise: (id: number) => void;
}

const Exercise: React.FC<Props> = ({ exercise, deleteExercise }: Props) => {
    const { _id, userName, description, duration, date } = exercise;
    return (
        <tr>
            <td>{userName}</td>
            <td>{description}</td>
            <td>{duration}</td>
            <td>{date.substring(0, 10)}</td>
            <td>
                <Link to={`/edit/${_id}`}>edit</Link>|
                <a
                    href="#"
                    onClick={() => {
                        deleteExercise(_id);
                    }}
                >
                    delete
                </a>
            </td>
        </tr>
    );
};

export default Exercise;
