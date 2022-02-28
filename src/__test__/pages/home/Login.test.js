import React from 'react';
import ReactDom from 'react-dom';
import { render , cleanup , fireEvent ,screen} from '@testing-library/react';
import renderer  from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import Login from './../../../pages/Login/Login';
import { BrowserRouter } from 'react-router-dom';


afterEach(cleanup);

it('login page matches snapshot',()=>{
    const loginRender = new ShallowRenderer();
    loginRender.render(<Login />);
    const view = loginRender.getRenderOutput();

    expect(view).toMatchSnapshot();
});


it("login page render without crashing",()=>{
    const div = document.createElement("div");
    ReactDom.render(<BrowserRouter><Login/></BrowserRouter>,div);
});

it("login page  renders correctly" , () =>{
    render(<BrowserRouter><Login/></BrowserRouter>);
    expect(screen.getByText(/dropdown/i)).toBeInTheDocument();

});


