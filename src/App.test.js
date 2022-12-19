import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('Login', () => {
    test('se email vazio, entregar mensagem de erro', async() => {
        render(<App />);

        const email = screen.getByTestId('email');

        await userEvent.type(email, "anyValue");
        await userEvent.clear(email);

        const requiredError = screen.queryByTestId('email-required');
        expect(requiredError).not.toBeNull();
    })
    
    test('se email com valor, sumir mensagem de erro', async() => {
        render(<App />);

        const email = screen.getByTestId('email');

        await userEvent.type(email, "anyValue");

        const requiredError = screen.queryByTestId('email-required');
        expect(requiredError).toBeNull();
    })

    test('email modificado', async() => {
        render(<App />);

        const requiredError = screen.queryByTestId('email-required');
        expect(requiredError).toBeNull();
    })

    test('email invalido', async() => {
        render(<App />);

        const email = screen.getByTestId('email');

        await userEvent.type(email, "anyValue");

        const requiredError = screen.queryByTestId('email-invalid');
        expect(requiredError).not.toBeNull();
    })


    test('se senha vazio, entregar mensagem de erro', async() => {
        render(<App />);

        const password = screen.getByTestId('password');

        await userEvent.type(email, "anyValue");
        await userEvent.clear(email);

        const requiredError = screen.queryByTestId('password-required');
        expect(requiredError).not.toBeNull();
    })

    test('se senha com valor, sumir mensagem de erro', async() => {
        render(<App />);

        const password = screen.getByTestId('password');

        await userEvent.type(email, "anyValue");

        const requiredError = screen.queryByTestId('password-required');
        expect(requiredError).toBeNull();
    })



    test('dado email, se vazio, nao aparece recuparar senha', ()=>{
        render(<App/>);

        const recuperarsenha = screen.getByTestId('recover-password-button');

        expect(recuperarsenha).toBeDisabled();
    })

    test('dado email, se valido, aparecer recuparar senha', ()=>{
        render(<App/>);

        const email = screen.getByTestId('email');
        userEvent.type(email, "valid@email.com");

        const recuperarsenha = screen.getByTestId('recover-password-button');

        expect(recuperarsenha).not.toBeDisabled();
    })

    test('dado email, se invalido, desabilitar login', ()=>{
        render(<App/>);

        const loginbotao = screen.getByTestId('login-button');

        expect(loginbotao).toBeDisabled();
    })

    test('dado email, se invalido, desabilitar login', ()=>{
        render(<App/>);

        const email = screen.getByTestId('email');
        userEvent.type(email, "valid@email.com");

        const password = screen.getByTestId('password');
        await userEvent.type(email, "anyValue");

        const loginbotao = screen.getByTestId('login-button');

        expect(loginbotao).not.toBeDisabled();
    })

})