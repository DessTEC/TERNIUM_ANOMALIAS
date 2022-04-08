import React from 'react';
import { useRoutes  } from "react-router-dom";

import { RoutesApp } from '../data/RoutesApp';

export const AppRouter = () => {

    let element= useRoutes(RoutesApp);

    return (
          <div>
            {element}
          </div>
    );
};