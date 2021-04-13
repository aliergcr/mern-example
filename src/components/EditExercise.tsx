import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('tr', tr);

interface Props {
    match: {
        params: { id: number };
    };
}

const EditExercise: React.FC<Props> = (props: Props) => {
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const userInput = useRef(null);

    useEffect(() => {
        getExercise();
        getUsers();
    }, []);

    const getExercise = () => {
        axios
            .get(`http://localhost:5000/exercises/${props.match.params.id}`)
            .then((res) => {
                setUserName(res.data.userName);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getUsers = () => {
        axios
            .get('http://localhost:5000/users')
            .then((res) => {
                if (res.data.length > 0) {
                    setUsers(res.data.map((item: any) => item.userName));
                    setUserName(res.data[0].userName);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChangeUsername = (e: { target: { value: string } }) => {
        const { value } = e.target;
        setUserName(value);
    };

    const onChangeDescription = (e: { target: { value: string } }) => {
        const { value } = e.target;
        setDescription(value);
    };

    const onChangeDuration = (e: { target: { value: string } }) => {
        const { value } = e.target;
        setDuration(Number(value));
    };

    const onChangeDate = (value: any) => {
        setDate(value);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const exercise = {
            userName,
            description,
            duration,
            date,
        };

        console.log('execise', exercise);
        axios
            .post(
                `http://localhost:5000/exercises/update/${props.match.params.id}`,
                exercise,
            )
            .then((res) => {
                console.log('res', res.data);
                setUserName('');
                setDescription('');
                setDuration(0);
            })
            .catch((err) => {
                console.log(err);
                setUserName('');
                setDescription('');
                setDuration(0);
            });

        window.location.href = '/';
    };
    return (
        <div>
            <h3>Edit Exercise</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>User Name:</label>
                    <select
                        ref={userInput}
                        required
                        className="form-control"
                        value={userName}
                        onChange={onChangeUsername}
                    >
                        {users.map((user) => {
                            return (
                                <option key="user" value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration(in minutes):</label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <DatePicker
                        selected={date}
                        locale="tr"
                        dateFormat="PPP"
                        onChange={onChangeDate}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Exercise Log"
                        className="btn btn-primary "
                    />
                </div>
            </form>
        </div>
    );
};

export default EditExercise;
