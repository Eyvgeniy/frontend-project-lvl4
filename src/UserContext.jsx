import React from 'react';
import faker from 'faker';
import cookie from 'js-cookie';


const name = faker.name.findName();
cookie.set('user', name);
const UserContext = React.createContext(name);

export default UserContext;
