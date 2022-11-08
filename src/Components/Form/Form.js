import { useState, useEffect } from 'react';
import './Form.css'

export default function Form({ state, hideForm, dataFromList, setData }) {
    const [inputs, setInputs] = useState({ id: '', name: '', age: '', addr: '', phone: '' });
    const [feedbacks, setFeedbacks] = useState({ name: '', age: '', addr: '', phone: '' });
    //Set default value to control input form start

    //Set default input
    useEffect(() => {
        setInputs(dataFromList);
    }, [state]);

    //Validate form
    const validateForm = () => {
        let check = true;
        const textReg = /^[\w|\s]+$/ //contain a-z, A-Z, 0-9, _, space
        const numReg = /^\d+$/ //contain 0-9
        let tmpFeedback = {};

        //Validate name
        let nameText = inputs.name.trim();
        if (nameText.length == 0) {
            check = false;
            tmpFeedback = {...tmpFeedback, name: "Name required"};
        } else if (!textReg.test(nameText)) {
            check = false;
            tmpFeedback = {...tmpFeedback, name: "Name must not include special characters"};
        } else {
            tmpFeedback = {...tmpFeedback, name: ""};
        }

        //Validate age
        let ageText = inputs.age.trim();
        if (ageText.length == 0) {
            check = false;
            tmpFeedback = {...tmpFeedback, age: "Age required"};
        } else if (!numReg.test(ageText)) {
            check = false;
            tmpFeedback = {...tmpFeedback, age: "Age must include only digit"};
        } else {
            tmpFeedback = {...tmpFeedback, age: ""};
        }

        //Validate address
        let addrText = inputs.addr.trim();
        if (addrText.length == 0) {
            check = false;
            tmpFeedback = {...tmpFeedback, addr: "Address required"};
        } else if (!textReg.test(addrText)) {
            check = false;
            tmpFeedback = {...tmpFeedback, addr: "Address must not include special characters"};
        } else {
            tmpFeedback = {...tmpFeedback, addr: ""};
        }

        //Validate phone
        let phoneText = inputs.phone.trim();
        if (phoneText.length == 0) {
            check = false;
            tmpFeedback = {...tmpFeedback, phone: "Phone required"};
        } else if (!numReg.test(phoneText)) {
            check = false;
            tmpFeedback = {...tmpFeedback, phone: "Phone must include only digit"};
        } else {
            tmpFeedback = {...tmpFeedback, phone: ""};
        }

        setFeedbacks(tmpFeedback);

        return check;
    }

    //Handle Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(inputs)) { //Valid data
            //setData
            setData(inputs, state, dataFromList);
            //Hide form
            hideForm("hide", { id: '', name: '', age: '', addr: '', phone: '' });
        }
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="form-group form-row">
                <label className='col-2' htmlFor="fName">Name</label>
                <input type="text" name="fName" id="fName" 
                    className={`form-control col-10 ${feedbacks.name ? 'is-invalid' : ''}`} value={inputs.name}
                    onChange={(event) => { setInputs({ ...inputs, name: event.target.value }) }} autoFocus />
                <div className='invalid-feedback'>{feedbacks.name}</div>
            </div>
            <div className="form-group form-row">
                <label className='col-2' htmlFor="fAge">Age</label>
                <input type="text" name="fAge" id="fAge" 
                    className={`form-control col-10 ${feedbacks.age ? 'is-invalid' : ''}`} value={inputs.age}
                    onChange={(event) => setInputs({ ...inputs, age: event.target.value })} />
                <div className='invalid-feedback'>{feedbacks.age}</div>
            </div>
            <div className="form-group form-row">
                <label className='col-2' htmlFor="fAddr">Address</label>
                <input type="text" name="fAddr" id="fAddr" 
                    className={`form-control col-10 ${feedbacks.addr ? 'is-invalid' : ''}`} value={inputs.addr}
                    onChange={(event) => setInputs({ ...inputs, addr: event.target.value })} />
                <div className='invalid-feedback'>{feedbacks.addr}</div>
            </div>
            <div className="form-group form-row">
                <label className='col-2' htmlFor="fPhone">Phone</label>
                <input type="text" name="fPhone" id="fPhone" 
                    className={`form-control col-10 ${feedbacks.phone ? 'is-invalid' : ''}`} value={inputs.phone}
                    onChange={(event) => setInputs({ ...inputs, phone: event.target.value })} />
                <div className='invalid-feedback'>{feedbacks.phone}</div>
            </div>
            <div className="form-row justify-content-center">
                <button type="submit" className="btn btn-success">{state}</button>
            </div>
        </form>
    );
};