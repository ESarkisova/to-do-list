import React, {useContext, useEffect} from 'react';
import Form from "./Form";
import Notes from "./Notes";
import {DbContext} from "../../context/database/dbContext";
import Loader from "../Loader/Loader";

/*const notes = new Array(4)
    .fill('')
    .map((_,i) => ({id: i, title: `Note ${i+1}`}));*/

const Home = () => {
    const {isLoading, notes, getNotes} = useContext(DbContext);
    useEffect(() => {
        getNotes();
    }, []);

    return(
        <div className="jumbotron">
            <div className="container">
                <Form />
                <hr/>
                {
                    isLoading ? <Loader/>
                    : <Notes notes = {notes}/>
                }

            </div>
        </div>
    )
};

export default Home;