import React, { useState } from 'react';
import axios from 'axios';

const CreateUser: React.FC = () => {
    const [userName, setUserName] = useState('');

    const onChangeUsername = (e: { target: { value: string } }) => {
        const { value } = e.target;
        setUserName(value);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const user = {
            userName,
        };

        console.log('user', process.env.URL);
        axios
            .post(`http://localhost:5000/users/add`, user)
            .then((res) => {
                console.log('res', res.data);
                setUserName('');
            })
            .catch((err) => {
                console.log(err);
                setUserName('');
            });
        // window.location.href = '/';
    };
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>User Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userName}
                        placeholder="Enter User Name"
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create New User"
                        className="btn btn-primary "
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
