import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FaFileExcel } from 'react-icons/fa';


const ErrorPage = () => {

    const styles={
        errorMsg : {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"

        }
    }

    return(
        <Fragment>
            <Helmet>
                <style>{'body { background-color: lightblue; }'}</style>
            </Helmet>
            <div style={styles.errorMsg}>
                <h2>Oups ! Cette page n'existe pas</h2>
            </div>
        </Fragment>
    )
}

export default ErrorPage;