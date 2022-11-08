import './App.css';
import List from './Components/List/List';
import Form from './Components/Form/Form';
import { useRef, useState } from 'react';

function App() {
    const [formState, setFormState] = useState({
        display: 'hide',
        data: {
            id: '',
            name: '',
            age: '',
            addr: '',
            phone: ''
        }
    });//Form is hide, create or update (hide default)

    const [userList, setUserList] = useState([]); //List of users
    const id = useRef(0); //indentity auto increase

    const setData = (dataNew, state, dataOld) => { //state (update or create), dataOld (only need when update)
        if (state === 'Create') { //Create new data
            id.current = id.current + 1;

            setUserList([
                ...userList,
                {
                    id: id.current, name: dataNew.name, age: dataNew.age, addr: dataNew.addr, phone: dataNew.phone
                }
            ]);
        } else { //Update data
            let index = userList.indexOf(dataOld);
            setUserList(
                [
                    ...userList.slice(0, index),
                    {
                        ...dataOld,
                        name: dataNew.name,
                        age: dataNew.age,
                        addr: dataNew.addr,
                        phone: dataNew.phone
                    },
                    ...userList.slice(index + 1)
                ]
            );
        }
    }

    //Show form
    const showForm = (display, data) => {
        if (display !== 'hide') {
            setFormState({ display: display, data: data });
        } else {
            setFormState({ display: 'hide', data: undefined });
        }
    }

    //Delete item
    const deleteData = (data) => {
        if ((formState.display !== 'Update') || (formState.data.id !== data.id)) { //allow delete when item is not updating
            let index = userList.indexOf(data);
            setUserList(
                [
                    ...userList.slice(0, index),
                    ...userList.slice(index + 1)
                ]
            );
        }
    }

    //Fast update Item
    const fastUpdate = (dataNew, dataOld) => {
        let index = userList.indexOf(dataOld);
        setUserList(
            [
                ...userList.slice(0, index),
                {
                    ...dataOld,
                    name: dataNew.name,
                    addr: dataNew.addr,
                },
                ...userList.slice(index + 1)
            ]
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-7 mt-5'>
                    <List showForm={showForm} fastUpdate={fastUpdate} data={{ list: userList, formState: formState.display }}
                        deleteData={deleteData} />
                </div>
                <div className='col-5 mt-5'>
                    {(formState.display !== 'hide') && <Form state={formState.display} hideForm={showForm}
                        dataFromList={formState.data} setData={setData} />}
                </div>
            </div>
        </div>
    );
}

export default App;
