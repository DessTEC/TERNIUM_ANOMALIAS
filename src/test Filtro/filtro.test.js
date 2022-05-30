import React from 'react';
import { fireEvent, getByText, getQueriesForElement, render, screen } from '@testing-library/react';
import ReactDOM from "react-dom";
import { HomeScreen } from '../components/HomeScreen/HomeScreen';
import { MemoryRouter } from 'react-router-dom'

test('Checar que existe la descripcion de la tarjeta de consulta', () => {
    const {getByText} =  render(<HomeScreen/>, {wrapper: MemoryRouter});
    
    expect(getByText("Consulta tus resultados y reportes anteriores y descargalos a tu PC.")).not.toBeNull();
  });