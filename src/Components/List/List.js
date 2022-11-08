import './List.css'
import ItemList from '../ItemList/ItemList'

export default function List({showForm, fastUpdate, deleteData, data}) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>address</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.list && data.list.map((item, index) => <ItemList 
                        key={index} 
                        data={{item: item, formState: data.formState}}
                        updateData={() => showForm("Update", item)}
                        deleteData={() => deleteData(item)}
                        fastUpdate={fastUpdate}
                    />)}
                </tbody>
            </table>
            <div className="row">
                <button type="button" className="btn btn-primary mx-auto" 
                        onClick={() => showForm("Create", {id: '', name: '', age: '', addr: '', phone: ''})}>Create user</button>
            </div>
        </>
    );
}