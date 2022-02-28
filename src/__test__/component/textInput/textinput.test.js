import React from "react";
import reactDom from "react-dom";
import { render,screen , cleanup ,fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer';
import TextInput from './../../../component/textInput/textinput';

afterEach(cleanup);

it("textinput render without crashing",()=>{
    const div = document.createElement("div");
    reactDom.render(<TextInput></TextInput>,div);
});
it("textinput renders correctly" , () =>{
    render(<TextInput label={"Email"}></TextInput>);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

});

it("textinput onchange works correctly",()=>{
    const samefun = jest.fn();
    render(<TextInput label={"Email"} onChange={samefun}></TextInput>);
    const element = screen.getByTestId("textinputTextId").querySelector('input');
    fireEvent.change(element,{target:{value:'test'}});          

});

it("textinput matches snapshot",()=>{
    const tree = renderer.create(<TextInput></TextInput>).toJSON();
    expect(tree).toMatchSnapshot();
});