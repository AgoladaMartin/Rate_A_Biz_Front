import { useEffect, useState, useCallback, useContext } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '../../Avatar';
import { TokenContext } from '../../../index';
import decodeTokenData from '../../../helpers/decodeTokenData';

import './EditAvatar.css';

const EditAvatar = props => {
  // const { user, userId } = props;
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);

  const { user } = props;

  // const userId = user.id;

  const [image, setImage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const ShowButtonAvatar = () => {
    return <button className='avatar-form-button'>Guardar</button>;
  };

  const getUserImage = useCallback(() => {
    const userAvatar = user?.avatar;
    userAvatar &&
      setAvatarUrl(`http://localhost:4000/static/uploads/${userAvatar}`);
  }, [user]);
  // TODO: ENVIAR MENSAJES A LOS USUARIOS

  useEffect(() => {
    getUserImage();
  }, [getUserImage]);

  const uploadFile = async e => {
    e.preventDefault();

    try {
      let data = new FormData();
      data.append('avatar', image);
      const response = await fetch(
        `http://localhost:4000/users/${decodedToken.id}/avatar`,
        {
          method: 'PUT',
          body: data,
          headers: {
            Authorization: token,
          },
        }
      );

      const responseData = await response.json();
      if (responseData.status === 'ok') {
        setIsEditing(false);
        // TODO: Implementar mensajes mostrado al usuario
        console.log('La imagen se ha subido correctamente');
      }
    } catch (error) {
      console.error('Ha surgido un error al intentar subir la imagen');
    }
  };

  const onFileChange = event => {
    const imageObj = event.target.files[0];
    setImage(imageObj);

    if (event.target.files.length > 0) {
      setIsEditing(true);
      setAvatarUrl(URL.createObjectURL(imageObj));
    }
  };

  return (
    <div className='avatar-section'>
      <form onSubmit={uploadFile}>
        <div className='container'>
          <div className='avatar-container'>
            <Avatar
              avatarUrl={avatarUrl}
              username={user?.username}
              size='medium'
            />
          </div>
          <label className='label-avatar' htmlFor='input-avatar'>
            <AddAPhotoIcon fontSize='large' />
            Selecciona una imagen
          </label>
          <input
            type={'file'}
            name='input-avatar'
            id='input-avatar'
            className='input-avatar'
            onChange={onFileChange}
          />
          {isEditing && <ShowButtonAvatar />}
        </div>
      </form>
    </div>
  );
};

export default EditAvatar;