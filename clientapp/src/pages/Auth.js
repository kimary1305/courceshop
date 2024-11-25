import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);  // Используем контекст для получения данных пользователя
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;

            if (isLogin) {
                data = await login(email, password); // Для логина
            } else {
                // Для регистрации
                data = await registration(email, password);

                // После успешной регистрации сразу логиним пользователя
                data = await login(email, password); // Повторный логин с теми же данными
            }

            console.log("User data from API:", data); // Проверяем, что приходит с API

            if (data && data.role) {
                // Обновляем данные в MobX store
                user.setUser(data);  // Сохраняем данные пользователя, включая роль
                user.setIsAuth(true);  // Устанавливаем, что пользователь авторизован
                navigate(SHOP_ROUTE);  // Перенаправляем на страницу магазина
            } else {
                console.error("Data or role is undefined", data);
                alert("Invalid response from the server.");
            }
        } catch (e) {
            console.error("Error during login/registration:", e);
            alert(e.response ? e.response.data.message : "An error occurred.");
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Log in' : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? 
                            <div>
                                Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                            </div>
                            :
                            <div>
                                Have an account? <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Log in' : 'Register'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
