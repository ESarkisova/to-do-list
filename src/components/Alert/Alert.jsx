import React, {useContext} from 'react';
import {AlertContext} from "../../context/alert/alertContext";
import {CSSTransition} from 'react-transition-group';
import './Alert.sass'

const Alert = () => {
    const {alert, hideAlert} = useContext(AlertContext);

    return (
        <CSSTransition in={alert.visible}
                        classNames="alert"
                        timeout={{
                            enter: 500,
                            exit: 350
                        }}
                       mountOnEnter
                       unmountOnExit>
            <div className={`alert alert-${alert.type || 'warning'} mb-0 alert-dismissible`}>
                <strong>Внимание! </strong> {alert.text}
                <button type="button" className="close" onClick={hideAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    )
};

export default Alert;