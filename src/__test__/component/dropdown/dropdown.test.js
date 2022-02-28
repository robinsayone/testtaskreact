import React from 'react';
import ReactDom from 'react-dom';
import { render,cleanup , screen ,fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';

import BasicSelect from './../../../component/dropdown/dropdown';

afterEach(cleanup);

it("dropdownrender without crashing",()=>{
    const div = document.createElement("div");
    ReactDom.render(<BasicSelect></BasicSelect>,div);
});
it("dropdown renders correctly" , () =>{
    render(<BasicSelect label={"dropdown"}></BasicSelect>);
    expect(screen.getByText(/dropdown/i)).toBeInTheDocument();

});

it("dropdown onchange works correctly",()=>{
    const samefun = jest.fn();
    render(<BasicSelect label={"dropdown"} onChange={samefun}></BasicSelect>);
    const element = screen.getByTestId("dropdowntestId").querySelector('input');
    fireEvent.change(element,{target:{value:'Health213'}});          

});

it("dropdown matches snapshot",()=>{
    const tree = renderer.create(<BasicSelect></BasicSelect>).toJSON();
    expect(tree).toMatchSnapshot();
});