import React, {useContext, useState} from 'react';
import {AlertContext} from "../../context/alert/alertContext";
import {DbContext} from "../../context/database/dbContext";
const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const db = useContext(DbContext);
    const submitHandler = (e) => {
        e.preventDefault();
        if(value.trim()){
            db.addNote(value.trim()).then(() => {
                alert.showAlert('Добавлено в список', 'success');
                setValue('');
            }).catch((err) => {
                alert.showAlert(`Произошла ошибка ${err}`, 'danger');
            });
        } else {
            alert.showAlert('Введите название', 'warning');
        }

    };
    return(
        <form onSubmit = {submitHandler}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">&#10146;</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value = {value}
                    onChange={ e => {setValue(e.target.value)}}
                    placeholder="Введите название"
                    aria-label="Введите название"
                    aria-describedby="basic-addon1" />
            </div>
        </form>
    )
};

export default Form;