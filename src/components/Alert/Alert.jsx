import React, {useContext} from 'react';
import {AlertContext} from "../../context/alert/alertContext";
import {CSSTransition} from 'react-transition-group';
import './Alert.sass'

const Alert = () => {
    const {alert, hideAlert} = useContext(AlertContext);

    if (!alert.visible) {
        return null;
    }
    return (
        <CSSTransition in = {alert.visible}
                        classNames="alert-trs"
                        timeout={500}
                        mountOnEnter
                        unmountOnExit>
            <div className={`alert alert-${alert.type || 'warning'} mb-0`}>
                <strong>Внимание! </strong> {alert.text}
                <button type="button" className="close" onClick={hideAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    )
};

export default Alert;