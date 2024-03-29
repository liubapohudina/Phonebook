import Title from "components/Form/Title";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { Loader } from "../../components/Form/Loader";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/auth-operations";
import { loading  } from "../../redux/auth/auth-selectors";

const RegisterFormPage = () => {

    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(signup(data));
    }
    
    const isLoading = useSelector(loading);

    return (
        <main className="container">
            <Title title="Please Sign Up">
                <RegisterForm onSubmit={onSubmit} />
                {isLoading && <Loader/>}
            </Title>    
        </main>
    )
}

export default RegisterFormPage;