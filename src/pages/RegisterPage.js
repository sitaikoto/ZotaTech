import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import useUserStore from '../store/userStore';
import '../styles/RegisterPage.css';

const ErrorIcon = () => (
  <div className="error-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.19526 5.75093C6.45561 5.49058 6.87772 5.49058 7.13807 5.75093L17.8047 16.4176C18.0651 16.6779 18.0651 17.1001 17.8047 17.3604C17.5444 17.6208 17.1223 17.6208 16.8619 17.3604L6.19526 6.69374C5.93491 6.43339 5.93491 6.01128 6.19526 5.75093Z" fill="#D52124"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.8047 5.75093C17.5444 5.49058 17.1223 5.49058 16.8619 5.75093L6.19526 16.4176C5.93491 16.6779 5.93491 17.1001 6.19526 17.3604C6.45561 17.6208 6.87772 17.6208 7.13807 17.3604L17.8047 6.69374C18.0651 6.43339 18.0651 6.01128 17.8047 5.75093Z" fill="#D52124"/>
    </svg>
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = useUserStore((state) => state.register);

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginPlaceholder, setLoginPlaceholder] = useState('metastudio');
  const [emailPlaceholder, setEmailPlaceholder] = useState('example@gmail.com');
  const [phonePlaceholder, setPhonePlaceholder] = useState('+7 (923) 343-45-54');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('sgewfvfds');
  const [confirmPlaceholder, setConfirmPlaceholder] = useState('*********');

  const [errors, setErrors] = useState({
    login: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [maskedPassword, setMaskedPassword] = useState('');
  const [maskedConfirmPassword, setMaskedConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateLogin = (login) => {
    const re = /^[a-zA-Z0-9]{6,}$/;
    return re.test(login);
  };

  const validateForm = () => {
    const newErrors = {
      login: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!login) {
      newErrors.login = 'Логин обязателен';
      isValid = false;
    } else if (!validateLogin(login)) {
      newErrors.login = 'Логин должен быть больше 6 символов';
      isValid = false;
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Некорректный формат email';
      isValid = false;
    }

    if (phone && phone.replace(/[^0-9]/g, '').length !== 11) {
      newErrors.phone = 'Некорректный формат телефона';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        login,
        email,
        phone,
        password,
      };

      register(userData);
      navigate('/profile');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFocus = (field) => {
    switch(field) {
      case 'login':
        setLoginPlaceholder('');
        break;
      case 'email':
        setEmailPlaceholder('');
        break;
      case 'phone':
        setPhonePlaceholder('');
        break;
      case 'password':
        setPasswordPlaceholder('');
        break;
      case 'confirmPassword':
        setConfirmPlaceholder('');
        break;
      default:
        break;
    }
  };

  const handleBlur = (field) => {
    if (field === 'login' && !login) {
      setLoginPlaceholder('metastudio');
    } else if (field === 'email' && !email) {
      setEmailPlaceholder('example@gmail.com');
    } else if (field === 'phone' && !phone) {
      setPhonePlaceholder('+7 (923) 343-45-54');
    } else if (field === 'password' && !password) {
      setPasswordPlaceholder('sgewfvfds');
    } else if (field === 'confirmPassword' && !confirmPassword) {
      setConfirmPlaceholder('*********');
    }
  };

  useEffect(() => {
    if (!showPassword) {
      setMaskedPassword('*'.repeat(password.length));
    } else {
      setMaskedPassword(password);
    }

    if (!showConfirmPassword) {
      setMaskedConfirmPassword('*'.repeat(confirmPassword.length));
    } else {
      setMaskedConfirmPassword(confirmPassword);
    }
  }, [password, confirmPassword, showPassword, showConfirmPassword]);

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="form-content">
          <div className="inputs-container">
            <h1 className="register-title">Регистрация</h1>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="login">Логин</label>
                <div className="input-wrapper">
                  <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    onFocus={() => handleFocus('login')}
                    onBlur={() => handleBlur('login')}
                    className={errors.login ? 'input-error' : ''}
                    placeholder={loginPlaceholder}
                  />
                  {errors.login && <ErrorIcon />}
                </div>
                {errors.login && <div className="error-message">{errors.login}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={errors.email ? 'input-error' : ''}
                    placeholder={emailPlaceholder}
                  />
                  {errors.email && <ErrorIcon />}
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <div className="input-wrapper">
                  <IMaskInput
                    id="phone"
                    mask="+7 (000) 000-00-00"
                    value={phone}
                    unmask={false}
                    onAccept={(value) => setPhone(value)}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    placeholder={phonePlaceholder}
                    className={errors.phone ? 'input-error' : ''}
                    style={{
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      backgroundColor: 'transparent',
                      borderBottom: '1px solid #2B2A29',
                      padding: '8px 0',
                      width: '100%'
                    }}
                  />
                  {errors.phone && <ErrorIcon />}
                </div>
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <div className={`password-input-wrapper ${errors.password ? 'has-error' : ''}`}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "text"}
                    value={showPassword ? password : maskedPassword}
                    onChange={(e) => {
                      if (showPassword) {
                        setPassword(e.target.value);
                      } else {
                        const valueLength = e.target.value.length;
                        const passwordLength = maskedPassword.length;

                        if (valueLength > passwordLength) {
                          const newChar = e.target.value.charAt(valueLength - 1);
                          setPassword(password + newChar);
                        } else if (valueLength < passwordLength) {
                          setPassword(password.slice(0, valueLength));
                        }
                      }
                    }}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className={errors.password ? 'input-error' : ''}
                    placeholder={passwordPlaceholder}
                    autoComplete="new-password"
                  />
                  {errors.password && <ErrorIcon />}
                  <button
                    type="button"
                    className={`password-toggle ${showPassword ? 'visible' : ''}`}
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showPassword ? (
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8.29011C4.5 13.5521 11.5 13.5521 15 8.29011C11 3.23682 4.5 3.23682 1 8.29011Z" stroke="currentColor"/>
                        <path d="M8 11.2368C9.65685 11.2368 11 9.89367 11 8.23682C11 6.57997 9.65685 5.23682 8 5.23682C6.34315 5.23682 5 6.57997 5 8.23682C5 9.89367 6.34315 11.2368 8 11.2368Z" fill="currentColor"/>
                        <path d="M9 8.23682C9.55228 8.23682 10 7.7891 10 7.23682C10 6.68454 9.55228 6.23682 9 6.23682C8.44772 6.23682 8 6.68454 8 7.23682C8 7.7891 8.44772 8.23682 9 8.23682Z" fill="white"/>
                      </svg>
                    ) : (
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5C4.5 10.5 11.5 10.5 15 5.5" stroke="currentColor"/>
                        <path d="M4 8.5L2 10.5" stroke="currentColor"/>
                        <path d="M12 8.5L14 10.5" stroke="currentColor"/>
                        <path d="M8.41391 9.49985V12.3283" stroke="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Повторить пароль</label>
                <div className={`password-input-wrapper ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "text"}
                    value={showConfirmPassword ? confirmPassword : maskedConfirmPassword}
                    onChange={(e) => {
                      if (showConfirmPassword) {
                        setConfirmPassword(e.target.value);
                      } else {
                        const valueLength = e.target.value.length;
                        const confirmLength = maskedConfirmPassword.length;

                        if (valueLength > confirmLength) {
                          const newChar = e.target.value.charAt(valueLength - 1);
                          setConfirmPassword(confirmPassword + newChar);
                        } else if (valueLength < confirmLength) {
                          setConfirmPassword(confirmPassword.slice(0, valueLength));
                        }
                      }
                    }}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    placeholder={confirmPlaceholder}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <ErrorIcon />}
                  <button
                    type="button"
                    className={`password-toggle ${showConfirmPassword ? 'visible' : ''}`}
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showConfirmPassword ? (
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8.29011C4.5 13.5521 11.5 13.5521 15 8.29011C11 3.23682 4.5 3.23682 1 8.29011Z" stroke="currentColor"/>
                        <path d="M8 11.2368C9.65685 11.2368 11 9.89367 11 8.23682C11 6.57997 9.65685 5.23682 8 5.23682C6.34315 5.23682 5 6.57997 5 8.23682C5 9.89367 6.34315 11.2368 8 11.2368Z" fill="currentColor"/>
                        <path d="M9 8.23682C9.55228 8.23682 10 7.7891 10 7.23682C10 6.68454 9.55228 6.23682 9 6.23682C8.44772 6.23682 8 6.68454 8 7.23682C8 7.7891 8.44772 8.23682 9 8.23682Z" fill="white"/>
                      </svg>
                    ) : (
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5C4.5 10.5 11.5 10.5 15 5.5" stroke="currentColor"/>
                        <path d="M4 8.5L2 10.5" stroke="currentColor"/>
                        <path d="M12 8.5L14 10.5" stroke="currentColor"/>
                        <path d="M8.41391 9.49985V12.3283" stroke="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
            </form>
          </div>

          <div className="button-container">
            <div className="button-group">
              <button type="submit" className="register-button" onClick={handleSubmit}>Зарегистрироваться</button>
              <div className="divider"></div>
            </div>

            <p className="register-note">
              Нажимая кнопку «Зарегистрироваться», пользователь соглашается с политикой в отношении обработки персональных данных и публичной офертой
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
