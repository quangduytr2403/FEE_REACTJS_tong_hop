import { useEffect, useState } from 'react';
import './ItemList.css'

export default function ItemList({ data, fastUpdate, deleteData, updateData }) {
    const [editing, setEditing] = useState(false); //Is item editing?
    const [inputs, setInputs] = useState({ id: '', name: '', age: '', addr: '', phone: '' });
    const [feedbacks, setFeedbacks] = useState({name: true, addr: true});
    //Set default value to control input form start

    let disabled = (data.formState === 'Update') ? true : false; //Disable fastUpdate when updating by form

    //Set inputs by value from form
    useEffect(() => {
        setInputs(data.item);
    }, [data.item]);

    //Validate inputs
    const validateItem = () => {
        let check = true;
        const textReg = /^[\w|\s]+$/ //contain a-z, A-Z, 0-9, _, space
        let tmpFeedbacks = {}

        //Validate name
        let nameText = inputs.name.trim();
        console.log(nameText);
        if (nameText.length == 0 || !textReg.test(nameText)) {
            check = false;
            tmpFeedbacks = ({...tmpFeedbacks, name: false});
        } else {
            tmpFeedbacks = ({...tmpFeedbacks, name: true});
        }

        //Validate address
        let addrText = inputs.addr.trim();
        if (addrText.length == 0 || !textReg.test(addrText)) {
            check = false;
            tmpFeedbacks = ({...tmpFeedbacks, addr: false});
        } else {
            tmpFeedbacks = ({...tmpFeedbacks, addr: true});
        }
        
        setFeedbacks(tmpFeedbacks);
        return check;
    }

    //Handle confirm
    const handleClick = () => {
        if (validateItem(inputs)) {
            setEditing(false);
            //Update data
            fastUpdate(inputs, data.item);
        }
    }

    //Handle blur
    const handleBlur = () => {
        validateItem(inputs);
    }

    const twoBtn = <>
        <button type="button" id='btnUpdate' className="btn btn-primary mr-3"
            onClick={updateData}><i className="fas fa-edit"></i></button>
        <button type="button" id='btnDelete' className="btn btn-danger"
            onClick={deleteData}><i className="fas fa-times"></i></button>
    </>;

    const oneBtn = <button type="button" id='btnConfirm' className="btn btn-primary"
        onClick={handleClick}><i className="fas fa-check"></i></button>;



    return (
        <tr>
            <td>{data.item.id}</td>
            <td><input type="text" id='iName' 
                className={`form-control-plaintext ${!feedbacks.name ? 'invalid' : ''}`}
                onFocus={() => setEditing(true)}
                onChange={(event) => setInputs({ ...inputs, name: event.target.value })}
                onBlur={handleBlur}
                value={inputs.name}
                disabled={disabled} />
            </td>
            <td><input type="text" id='iAddr' 
                className={`form-control-plaintext ${!feedbacks.addr ? 'invalid' : ''}`}
                onFocus={() => setEditing(true)}
                onChange={(event) => setInputs({ ...inputs, addr: event.target.value })}
                onBlur={handleBlur}
                value={inputs.addr}
                disabled={disabled} /></td>
            <td>{editing ? oneBtn : twoBtn}</td>
        </tr>
    );
}

function validateItem(inputs) {
    let check = true;
    const textReg = /^[\w|\s]+$/ //contain a-z, A-Z, 0-9, _, space

    //Validate name
    let nameInput = document.getElementById('iName');
    let nameText = inputs.name.trim();
    if (nameText.length == 0 || !textReg.test(nameText)) {
        check = false;
        nameInput.style.border = "solid 1px red";
    } else {
        nameInput.style.border = "none";
    }

    //Validate address
    let addrInput = document.getElementById('iAddr');
    let addrText = inputs.addr.trim();
    if (addrText.length == 0 || !textReg.test(addrText)) {
        check = false;
        addrInput.style.border = "solid 1px red";
    } else {
        addrInput.style.border = "none";
    }
    return check;
}