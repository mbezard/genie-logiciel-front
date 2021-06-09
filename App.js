import React from 'react';
import {Provider} from "react-redux";
import store from "./src/components/utils/store/store";
import Route from "./src/components/pages/Route";


export default function App() {

    return (<>
        <Provider store={store}>
            <Route/>
        </Provider>
    </>);
}


