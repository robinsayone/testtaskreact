import React from 'react';
import ReactDom from 'react-dom';
import UiButton from './../../../component/button/button';
import { render,cleanup , screen } from '@testing-library/react';

import renderer from 'react-test-renderer';

afterEach(cleanup); //its cleans test after every test

it("render without crashing",()=>{
    const div = document.createElement("div");
    ReactDom.render(<UiButton></UiButton>,div);
});

it("renders button correctly",()=>{
    render(<UiButton buttontext="testButton" className="testClass"></UiButton>);
    expect(screen.getByTestId('uiButton')).toHaveTextContent("testButton");

});

it("matches snapshot",()=>{
    const tree = renderer.create(<UiButton buttontext="save"></UiButton>).toJSON();
    expect(tree).toMatchSnapshot();
});