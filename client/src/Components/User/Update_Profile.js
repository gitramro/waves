import React from 'react';
import UserLayout from '../../Hoc/User';
import UpdatePersonalNfo from './Update_Personal_Nfo';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalNfo/>
        </UserLayout>
    );
};

export default UpdateProfile;