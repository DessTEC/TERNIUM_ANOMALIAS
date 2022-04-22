import {
    Link,
    useLocation,
    matchRoutes,
    useResolvedPath,
  } from "react-router-dom";

  import { RoutesApp } from "../../data/RoutesApp";

export const NavLink = ({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
  }) => 
  {
    let location = useLocation();
    let resolvedLocation = useResolvedPath(to);
    let routeMatches = matchRoutes(RoutesApp, location);
  
    let isActive;
    if (exact) {
      isActive = location.pathname === resolvedLocation.pathname;
    } else {
      // isActive = routeMatches.some(
      //   (match) => match.pathname === resolvedLocation.pathname
      // );
      isActive = location.pathname.includes(to);
    }

  
    let allClassNames =
      className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);


  
    return <Link className={allClassNames} to={to} {...rest} />;
  }