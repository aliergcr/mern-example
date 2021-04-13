import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Exercise from './Exercise';

const ExercisesList: React.FC = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/exercises/')
            .then((res) => {
                setExercises(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const deleteExercise = (id: number) => {
        axios
            .delete(`http://localhost:5000/exercises/${id}`)
            .then((res) => {
                console.log(res);
                // eslint-disable-next-line no-underscore-dangle
                setExercises(exercises.filter((item: any) => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const exercisesList = () => {
        return exercises.map((currentExercise: any) => {
            return (
                <Exercise
                    exercise={currentExercise}
                    deleteExercise={deleteExercise}
                    key={currentExercise._id}
                />
            );
        });
    };

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>User Name</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{exercisesList()}</tbody>
            </table>
        </div>
    );
};

export default ExercisesList;
