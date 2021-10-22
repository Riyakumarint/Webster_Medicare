import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'
import Success from '../images/target.png'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    console.log(useParams());
    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/api/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="container">
      <div className="forms-container">
              <div className="verify">
                  <form>
          <h3 className="thanks">Thank you</h3>
                            {/* <div className="up">
                                <img src={Success} alt="thanks" />
                                <h2>Registration Successful</h2>
                            </div>
                            <div className="down">
                                <h2>Congratulation, your account </h2><h2>has been successfully created</h2>
                                <button type="submit"
              className="button">Continue</button>
                            </div>
          */}
          </form>
        </div>
      </div>
    </div>
        </div>
    )
}

export default ActivationEmail