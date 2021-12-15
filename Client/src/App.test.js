import React from "react";
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from './Components/Login'
import userEvent from '@testing-library/user-event';
import Home from './Api/Home'

jest.mock('./Api/Home')

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  Home.mockClear();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("On continue navigate to Lobby", () => {
  const onChange = jest.fn();
  const navigate = jest.fn();
  const home = new Home()

  act(() => {
    render(<Login homeApi={home} navigate={navigate} setUserName={onChange} />, container);
  });
  
  const button = document.querySelector("[id=continue-button]");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });


  // get a hold of the button element, and trigger some clicks on it
  expect(navigate).toHaveBeenCalledWith("SelectGame");
});

it("Upates username on continue", () =>{
  const onChange = jest.fn();
  const navigate = jest.fn();
  const home = new Home()

  act(() => {
    render(<Login homeApi={home} navigate={navigate} setUserName={onChange} />, container);
  });
  
  expect(Home).toHaveBeenCalledTimes(1)

  const inputEl = screen.getByLabelText('Username')
  const button = document.querySelector("[id=continue-button]");
  act(() => {
    userEvent.type(inputEl, "testusername");
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(screen.getByLabelText('Username')).toHaveValue("testusername")
  // const homeInstance =  Home.mock.instances[0];
  // const mockSetUsername = homeInstance.setUsername;
  // expect(mockSetUsername).toHaveBeenCalledTimes(1)
});

  
