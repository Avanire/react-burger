import React, {useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../services/actions/Auth";
import ProfileMenu from "../ProfileMenu";
import {GridLoader} from "react-spinners";

const Profile = () => {
    const dispatch = useDispatch();
    const {user, request} = useSelector(state => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);

    useEffect(() => {
        setName(() => user.name);
        setEmail(() => user.email);
        setCurrentName(() => user.name);
        setCurrentEmail(() => user.email);
    }, [user])

    const onIconClick = (target) => {
        target.current.focus();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setName(currentName);
        setEmail(currentEmail);
        setPassword('');
    }

    const handleSave = (e) => {
        e.preventDefault();

        dispatch(updateUser(email, password, name));
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <ProfileMenu/>
                {request ? (<div className={styles.preloader}><GridLoader color="#8a37d1"/></div>) :
                    (<form onSubmit={handleSave}>
                        <Input value={name}
                               onChange={e => setName(e.target.value)}
                               type='text'
                               placeholder='Имя'
                               onIconClick={() => onIconClick(nameRef)}
                               icon={'EditIcon'}
                               extraClass='mb-6'
                               ref={nameRef}
                        />
                        <Input value={email}
                               onChange={e => setEmail(e.target.value)}
                               type='text'
                               placeholder='Логин'
                               onIconClick={() => onIconClick(emailRef)}
                               icon={'EditIcon'}
                               extraClass='mb-6'
                               ref={emailRef}
                        />
                        <Input value={password}
                               onChange={e => setPassword(e.target.value)}
                               type='password'
                               placeholder='Пароль'
                               onIconClick={() => onIconClick(passRef)}
                               icon={'EditIcon'}
                               extraClass='mb-6'
                               ref={passRef}
                        />
                        {currentName !== name || currentEmail !== email || password !== '' ? (<div className={styles.buttonBlock}>
                            <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>) : ''}
                    </form>)}
            </div>
        </section>
    );
}

export default Profile;