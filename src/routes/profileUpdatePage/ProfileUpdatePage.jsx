import { useContext } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';

const ProfileUpdatePage = () => {
  const { curentUser, updateUser } = useContext(AuthContext);

  return (
    <div className='profileUpdatePage'>
      <div className='formContainer'>
        <form>
          <h1>Update Profile</h1>
          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              defaultValue={curentUser.username}
            />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              defaultValue={curentUser.email}
            />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className='sideContainer'>
        <img
          src={curentUser.avatar || '/noavatar.webp'}
          alt='avatar icon'
          className='avatar'
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
