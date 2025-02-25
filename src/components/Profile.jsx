import React from 'react';
import { updateUser, getUserPhoto } from './API';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: {
        name: false,
        email: false,
        phone: false,
      },
      userData: this.props.userData,
      userPhoto: '',
    };
  }

  componentDidMount() {
    this.fetchUserPhoto();
  }

  fetchUserPhoto = async () => {
    try {
      const userPhoto = await getUserPhoto(this.props.userData.id);
      this.setState({ userPhoto: userPhoto.picture });
    } catch (error) {
      console.error('Error fetching user photo:', error);
    }
  };

  handleEdit = (field) => {
    this.setState((prevState) => ({
      isEditing: {
        ...prevState.isEditing,
        [field]: !prevState.isEditing[field],
      },
    }), () => {
      if (!this.state.isEditing[field]) {
        this.updateUserData();
      }
    });
  };

  handleChange = (e, field) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [field]: value,
      },
    }), () => {
      console.log(`Updated ${field}:`, this.state.userData[field]);
    });
  };

  updateUserData = () => {
    const { userData } = this.state;
    const { userData: initialUserData } = this.props;

    // Check if the user data has changed
    const hasChanged = Object.keys(userData).some(key => userData[key] !== initialUserData[key]);

    if (hasChanged) {
      console.log('Updating user data:', userData);
      updateUser(userData)
        .then(response => {
          console.log('User data updated successfully:', response);
          localStorage.setItem('userData', JSON.stringify(userData));
          window.location.reload();
        })
        .catch(error => {
          console.error('Error updating user data:', error);
        });
    } else {
      console.log('No changes detected, not updating user data.');
    }
  };

  render() {
    const { isEditing, userData, userPhoto } = this.state;

    return (
      <div className="profile">
        <h2>Profile</h2>
        {userPhoto && (
          <div>
            <img src={userPhoto} alt="User" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          </div>
        )}
        <div>
          <strong>Name:</strong>
          <br />
          {isEditing.name ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => this.handleChange(e, 'name')}
            />
          ) : (
            <span>{userData.name}</span>
          )}
          <button onClick={() => this.handleEdit('name')}>
            {isEditing.name ? 'Save' : 'Edit'}
          </button>
        </div>
        <div>
          <strong>Email:</strong>
          <br />
          {isEditing.email ? (
            <input
              type="text"
              value={userData.email}
              onChange={(e) => this.handleChange(e, 'email')}
            />
          ) : (
            <span>{userData.email}</span>
          )}
          <button onClick={() => this.handleEdit('email')}>
            {isEditing.email ? 'Save' : 'Edit'}
          </button>
        </div>
        <div>
          <strong>Phone:</strong>
          <br />
          {isEditing.phone ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => this.handleChange(e, 'phone')}
            />
          ) : (
            <span>{userData.phone}</span>
          )}
          <button onClick={() => this.handleEdit('phone')}>
            {isEditing.phone ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;