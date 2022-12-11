import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import 'bootstrap/dist/css/bootstrap.css'
// import { GoogleLogin } from "react-google-login";
// import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
// import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon, MailIcon, LockOpenIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { signup, signin, signinG, getError } from '../store/auth'

const initialForm = { email: '', password: '' }

const Login = () => {
  const [formData, setFormData] = useState(initialForm)
  const [isSignup, setIsSignUp] = useState(false)
  // const [formErrors, setFormErrors] = useState({});
  // const errorServ = useSelector(getError());
  //console.log(errors);
  const [showPassword, setShowPassord] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const loginSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(4, 'Password is too short')
      .max(14, 'Password is too long')
      .required('Password is required'),
    lastName: yup.string(),
    firstName: yup.string()
  })

  const handleSubmitForm = () => {
    if (formData.email && formData.password) {
      // dispatch(signin(formData, history));
      console.log(formData)
    }
  }

  useEffect(() => {
    handleSubmitForm()
  }, [formData])

  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsSignUp(true)
    } else {
      setIsSignUp(false)
    }
  }, [location.pathname])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // const changeToSignIn = () => {
  //     setIsSignUp((prevState) => !prevState);
  // };
  const handleClickShowPassword = () => {
    setShowPassord((prevState) => !prevState)
  }

  // const googleSuccess = async (res) => {
  //     const result = res?.profileObj;
  //     const token = res?.tokenId;
  //     try {
  //         // dispatch(signinG({ result, token }));
  //         history.push("/");
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };
  // const googleFailure = () => {
  //     console.log("Failed with google login");
  // };

  return (
    <div className="">
      <Formik
        initialValues={initialForm}
        onSubmit={(values) => setFormData({ ...formData, ...values })}
        validationSchema={loginSchema}
      >
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props
          return (
            <form className="" onSubmit={handleSubmit} autoComplete="off">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="form-floating loginForm mb-3">
                  <input
                    className="form-control loginInput"
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                    placeholder="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label
                    className="loginLabel d-flex justify-content-center align-items-center "
                    htmlFor="email"
                  >
                    <MailIcon className="loginIcon me-3" />
                    <span>Email ID</span>
                  </label>
                </div>
                {errors.email && touched.email && <p className="">{errors.email}</p>}
                <div className="d-flex justify-content-center align-items-center ">
                  <div className="form-floating loginForm mb-3">
                    <input
                      className="form-control loginInput passwordInputWidth"
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="password"
                    />
                    <label className="loginLabel d-flex justify-content-center" htmlFor="password">
                      <LockOpenIcon className="loginIcon me-3" />
                      <span>Password</span>
                    </label>
                  </div>
                  <button
                    className="buttonLogin buttonLoginColor"
                    type="button"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <EyeIcon className="cursor-pointer" />
                    ) : (
                      <EyeOffIcon className="cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              {isSignup && errors.password && touched.password && (
                <p className="">{errors.password}</p>
              )}

              <div className="m-4 text-center">
                <button
                  className="button submmit buttonLoginColor buttonLoginTextColor"
                  type="submit"
                >
                  LOGIN
                </button>
              </div>
              {/* <GoogleLogin
                                clientId="962925054272-lndsu914k1j7d372dh3ove0dqom90n56.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button
                                        className="flex justify-center w-full px-4 py-2 mb-2 text-center text-gray-500 bg-transparent border"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <FcGoogle className="mx-1 my-0.5" />
                                        <p>Login with Google account</p>
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            /> */}
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login
